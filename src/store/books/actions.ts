/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import {
    setDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    getDocs,
    collection,
    arrayUnion,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { store } from ".";
import { generateId } from "../../common/functions";
import { BooksUserProps, BookProps } from "../../interfaces/Book";
import { RegistryProps } from "../../interfaces/Registry";
import { UserProps } from "../../interfaces/User";
import { db, handleUploadImage, storage } from "../../services/firebase";
import { newRegistry } from "../registries/actions";

export const addBook = async (
    book: BookProps,
    imageFile: File | undefined | null,
    user: UserProps
) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const id = generateId(book.name, "-", 1000);
        const imageUrl = await handleUploadImage(imageFile, id);
        const createdAt = new Date(Date.now()).toISOString();

        const newBook: BookProps = {
            id,
            createdAt,
            name: book.name,
            author: book.author,
            category: book.category,
            volume: book.volume,
            imageUrl,
            status: "available",
            borrowedTo: null,
        };

        await setDoc(doc(db, "books", newBook.id), newBook);

        store.update((s) => {
            s.books.push(newBook);
            s.isLoading = false;
        });

        const registry: RegistryProps = {
            id: createdAt,
            action: "adicionado",
            book: newBook,
            date: createdAt,
            user,
        };

        newRegistry(registry);
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const removeBook = async (
    id: String,
    book: BookProps,
    user: UserProps
) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const imageRef = ref(storage, String(id));
        const date = new Date(Date.now()).toISOString();

        await deleteObject(imageRef);
        await deleteDoc(doc(db, "books", String(id)));

        const registry: RegistryProps = {
            id: date,
            action: "removido",
            book,
            date,
            user,
        };

        newRegistry(registry);

        store.update((s) => {
            const auxVector = s.books.filter((item) => item.id !== id);
            const sLegth = s.books.length;
            for (let i = 0; i < sLegth; i++) {
                s.books.pop();
            }
            for (let j = 0; j < auxVector.length; j++) {
                s.books.push(auxVector[j]);
            }
            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const editBook = async (
    book: BookProps,
    newValues: BookProps,
    imageFile: File | undefined,
    user: UserProps
) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        let { imageUrl } = book;
        const { id } = book;
        // se imageFile for diferente de nula, a imagem antiga é excluida, e uma nova é enviado ao storage
        if (imageFile != null) {
            const imageRef = ref(storage, id);

            await deleteObject(imageRef);

            imageUrl = await handleUploadImage(imageFile, id);
        }

        const editDateAt = new Date(Date.now()).toISOString();

        const newBook: BookProps = {
            id,
            createdAt: book.createdAt,
            name: newValues.name,
            author: newValues.author,
            category: newValues.category,
            volume: newValues.volume,
            imageUrl,
            status: book.status,
            borrowedTo: book.borrowedTo,
        };

        const bookDocRef = doc(db, "books", id);

        await updateDoc(bookDocRef, {
            imageUrl: newBook.imageUrl,
            name: newBook.name,
            author: newBook.author,
            category: newBook.category,
            volume: newBook.volume,
        });

        const registry: RegistryProps = {
            id: editDateAt,
            action: "editado",
            book: newBook,
            date: editDateAt,
            user,
        };

        newRegistry(registry);

        store.update((s) => {
            s.books.forEach((book) => {
                if (book.id === newBook.id) {
                    book.imageUrl = newBook.imageUrl;
                    book.name = newBook.name;
                    book.author = newBook.author;
                    book.volume = newBook.volume;
                    book.category = newBook.category;
                }
            });

            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const requestBooksFirebase = async () => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const bookCollectionRef = collection(db, "books");

        const response = await getDocs(bookCollectionRef);

        const books: BookProps[] = response.docs.map((doc) => {
            return {
                id: doc.id,
                imageUrl: doc.data().imageUrl,
                name: doc.data().name,
                author: doc.data().author,
                category: doc.data().category,
                volume: doc.data().volume,
                createdAt: doc.data().createdAt,
                status: doc.data().status,
                borrowedTo: doc.data().borrowedTo,
            };
        });

        store.update((s) => {
            s.books = books;
            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const requestBooksUserFirebase = async (userID: string) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });
        const userDocRef = doc(db, "users", userID);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();

        const books: BooksUserProps[] = userData.borrowedBooks.map((doc) => {
            return {
                borrowedBook: {
                    id: doc.borrowedBook.id,
                    imageUrl: doc.borrowedBook.imageUrl,
                    name: doc.borrowedBook.name,
                    author: doc.borrowedBook.author,
                    category: doc.borrowedBook.category,
                    volume: doc.borrowedBook.volume,
                    createdAt: doc.borrowedBook.createdAt,
                    status: doc.borrowedBook.status,
                },
                startDate: doc.startDate,
                endDate: doc.endDate,
                status: doc.status,
            };
        });

        store.update((s) => {
            s.booksUser = books;
            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const borrowBook = async (borrowedBook: BookProps, user: UserProps) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const bookDocRef = doc(db, "books", borrowedBook.id);
        const userDocRef = doc(db, "users", user.id);

        const date = new Date(Date.now());
        const startDate = date.toISOString();
        const endDate = new Date(
            date.setDate(date.getDay() + 30)
        ).toISOString();

        await updateDoc(bookDocRef, {
            status: "unavailable",
            borrowedTo: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                startDate,
                endDate,
            },
        });

        await updateDoc(userDocRef, {
            borrowedBooks: arrayUnion({
                borrowedBook,
                status: "pendente",
                startDate,
                endDate,
            }),
        });

        const registry: RegistryProps = {
            id: startDate,
            action: "emprestado",
            book: borrowedBook,
            date: startDate,
            user,
        };

        newRegistry(registry);

        store.update((s) => {
            s.books.forEach((book) => {
                if (book.id === borrowedBook.id) {
                    book.status = "unavailable";
                    book.borrowedTo.user = user;
                    book.borrowedTo.startDate = startDate;
                    book.borrowedTo.endDate = endDate;
                }
            });
            requestBooksFirebase();
            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = true;
        });
    }
};
