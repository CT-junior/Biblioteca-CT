/* eslint-disable prefer-const */
/* eslint-disable no-sequences */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint no-param-reassign: "error" */

import { setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
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
            console.log(err);
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
            const auxVector = s.books.filter((item) => item.id != id);
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
            console.log(err);
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
        console.log(newBook);

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
            s.books.map((s) => {
                if (s.id === newBook.id) {
                    s.imageUrl = newBook.imageUrl;
                    s.name = newBook.name;
                    s.author = newBook.author;
                    s.volume = newBook.volume;
                    s.category = newBook.category;
                    s.createdAt = newBook.createdAt;
                }
            });

            s.isLoading = false;
        });
    } catch (err) {
        store.update((s) => {
            s.isLoading = false;
            console.log(err);
        });
    }
};
