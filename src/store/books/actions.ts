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
import { BookProps } from "../../interfaces/Book";
import { db, handleUploadImage, storage } from "../../services/firebase";

export const addBook = async (book: BookProps, imageFile?: File) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const randonNumber = String(Math.floor(Math.random() * 100000));

        const name = book.name
            .replace(/\s+/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();

        const id = `${name}.${randonNumber}`;

        const imageUrl = await handleUploadImage(imageFile, id);

        const createdAt = new Date(Date.now()).toISOString();

        const newBook: BookProps = {
            id,
            createdAt,
            imageUrl,
            ...book,
        };

        await setDoc(doc(db, "books", newBook.id), newBook);

        store.update((s) => {
            s.books.push(newBook);
            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
        });
    }
};

export const removeBook = async (id: String) => {
    try {
        store.update((s) => {
            s.isLoading = true;
        });

        const imageRef = ref(storage, String(id));

        await deleteObject(imageRef);

        await deleteDoc(doc(db, "books", String(id)));

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
    imageFile: File
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

        const createdAt = new Date(Date.now()).toISOString();

        const newBook: BookProps = {
            id: book.id,
            createdAt,
            imageUrl,
            ...newValues,
        };

        const bookDocRef = doc(db, "books", newBook.id);

        await updateDoc(bookDocRef, {
            imageUrl: newBook.imageUrl,
            name: newBook.name,
            author: newBook.author,
            category: newBook.category,
            volume: newBook.volume,
            createdAt: newBook.createdAt,
        });

        store.update((s) => {
            s.books.forEach((book) => {
                if (book.id === newBook.id) {
                    book.imageUrl = newBook.imageUrl;
                    book.name = newBook.name;
                    book.author = newBook.author;
                    book.volume = newBook.volume;
                    book.category = newBook.category;
                    book.createdAt = newBook.createdAt;
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
        const books = response.docs.map((doc) => {
            return {
                id: doc.id,
                imageUrl: doc.data().imageUrl,
                name: doc.data().name,
                author: doc.data().author,
                category: doc.data().category,
                volume: doc.data().volume,
                createdAt: doc.data().createdAt,
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
