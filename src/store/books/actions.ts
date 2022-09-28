/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import {
    setDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDocs,
    collection,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { store } from ".";
import { generateId } from "../../common/functions";
import { BooksUserProps, BookProps } from "../../interfaces/Book";
import { RegistryProps } from "../../interfaces/Registry";
import { UserProps } from "../../interfaces/User";
import { toast } from "../../pages/_app";
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
        toast({
            title: "Livro adicionado com sucesso!",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Ocorreu um erro ao adicionar um livro!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
        });
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
        toast({
            title: "Livro removido com sucesso!!",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Ocorreu um erro ao remover um livro!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
        });
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
        toast({
            title: "Livro editado com sucesso!!",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Falha na edição do livro!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
        });
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

        const booksCollectionRef = collection(db, "books");

        const response = await getDocs(booksCollectionRef);

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
    } catch (error) {
        toast({
            title: "Falha na comunicação com o banco de dados!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
            position: "top-right",
        });
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const borrowBook = async (book: BookProps, user: UserProps) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const bookDocRef = doc(db, "books", book.id);
        const userDocRef = doc(db, `users/${user.id}/books`, book.id);

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

        await setDoc(userDocRef, {
            description: book,
            status: "pendente",
            startDate,
            endDate,
        });

        const registry: RegistryProps = {
            id: startDate,
            action: "emprestado",
            book,
            date: startDate,
            user,
        };

        newRegistry(registry);

        store.update((s) => {
            s.books.forEach((sBook) => {
                if (sBook.id === book.id) {
                    sBook.status = "unavailable";
                    sBook.borrowedTo.user = user;
                    sBook.borrowedTo.startDate = startDate;
                    sBook.borrowedTo.endDate = endDate;
                }
            });

            let bookExists = false;

            s.booksUser.forEach((sBook) => {
                if (sBook.description.id === book.id) {
                    bookExists = true;
                }
            });

            if (bookExists) {
                s.booksUser.forEach((sBook) => {
                    sBook.status = "pendente";
                    sBook.startDate = startDate;
                    sBook.endDate = endDate;
                });
            } else {
                s.booksUser.push({
                    description: book,
                    status: "pendente",
                    startDate,
                    endDate,
                });
            }

            s.isLoading = false;
        });

        toast({
            title: "Livro emprestado com sucesso!",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Error no empréstimo de livro.",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
        });
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

        const booksCollectionRef = collection(
            db,
            `users/${String(userID)}/books`
        );

        const response = await getDocs(booksCollectionRef);

        const books: BooksUserProps[] = response.docs.map((doc) => {
            return {
                description: doc.data().description,
                endDate: doc.data().endDate,
                startDate: doc.data().startDate,
                status: doc.data().status,
            };
        });

        store.update((s) => {
            s.booksUser = books;
            s.isLoading = false;
        });
    } catch (error) {
        toast({
            title: "Falha na comunicação com o banco de dados!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
            position: "top-right",
        });

        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const returnBookUser = async (user: UserProps, book: BooksUserProps) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const bookDocRef = doc(db, "books", book.description.id);

        const userBookDocRef = doc(
            db,
            `users/${user.id}/books`,
            book.description.id
        );

        await deleteDoc(userBookDocRef);

        await updateDoc(bookDocRef, {
            borrowedTo: null,
            status: "available",
        });

        const date = new Date(Date.now()).toISOString();
        const registry: RegistryProps = {
            id: date,
            action: "devolvido",
            book: book.description,
            date,
            user,
        };

        newRegistry(registry);

        store.update((s) => {
            s.books.forEach((sBook) => {
                if (sBook.id === book.description.id) {
                    sBook.borrowedTo = null;
                    sBook.status = "available";
                }
            });

            const auxVector = s.booksUser.filter(
                (item) => item.description.id !== book.description.id
            );
            const sLegth = s.booksUser.length;
            for (let i = 0; i < sLegth; i++) {
                s.booksUser.pop();
            }
            for (let j = 0; j < auxVector.length; j++) {
                s.booksUser.push(auxVector[j]);
            }

            s.isLoading = false;
        });
        toast({
            title: "Livro devolvido com sucesso!",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Falha na devolução do livro!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
        });
    }
};

export const reBorrowBook = async (book: BooksUserProps, user: UserProps) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const bookDocRef = doc(db, "books", book.description.id);
        const userBookDocRef = doc(
            db,
            `users/${user.id}/books`,
            book.description.id
        );

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

        await updateDoc(userBookDocRef, {
            status: "pendente",
            startDate,
            endDate,
        });

        const registry: RegistryProps = {
            id: startDate,
            action: "emprestado",
            book: book.description,
            date: startDate,
            user,
        };

        newRegistry(registry);

        store.update((s) => {
            s.books.forEach((sBook) => {
                if (sBook.id === book.description.id) {
                    sBook.status = "unavailable";
                    sBook.borrowedTo.user = user;
                    sBook.borrowedTo.startDate = startDate;
                    sBook.borrowedTo.endDate = endDate;
                }
            });

            s.booksUser.forEach((sBook) => {
                if (sBook.description.id === book.description.id) {
                    sBook.status = "pendente";
                    sBook.startDate = startDate;
                    sBook.endDate = endDate;
                }
            });

            s.isLoading = false;
        });

        toast({
            title: "Livro re-emprestado com sucesso!",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        toast({
            title: "Falha na devolução do livro!",
            status: "error",
            description: error,
            duration: 4000,
            isClosable: true,
        });
        store.update((s) => {
            s.isLoading = false;
        });
    }
};
