import {
    addDoc,
    collection,
    query,
    where,
    serverTimestamp,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { firestore, auth } from "./init";

export const createBook = async (book) => {
    const newBook = {
        ...book,
        userId: auth?.currentUser?.uid,
        created: serverTimestamp(),
    };

    try {
        const bookCollection = collection(firestore, "books");
        const docRef = await addDoc(bookCollection, newBook);
        console.log("Book added:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding book:", error);
    }
};


export const readBooks = async () => {
    const books = [];
    const bookCollection = collection(firestore, "books");
    const user = auth?.currentUser;


    const q = query(bookCollection);
    const results = await getDocs(q);

    results.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return books;
};

export const updateBook = async (bookId, updatedData) => {
    const bookRef = doc(firestore, "books", bookId);
    try {
        await updateDoc(bookRef, updatedData);
        console.log("Book updated:", bookId);
    } catch (error) {
        console.error("Error updating book:", error);
    }
};


export const deleteBook = async (bookId) => {
    const bookRef = doc(firestore, "books", bookId);
    try {
        await deleteDoc(bookRef);
        console.log("Book deleted:", bookId);
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};
