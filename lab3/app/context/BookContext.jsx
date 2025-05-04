import React, { createContext, useContext, useState, useEffect } from "react";
import { createBook, readBooks } from "../data/bookService.js";
import { auth } from "../data/init.js";

const BookContext = createContext();
export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [myBooksOnly, setMyBooksOnly] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const addBook = async (book) => {
        try {
            await createBook(book);
            const booksFromDb = await readBooks();
            setBooks(booksFromDb);
        } catch (error) {
            console.error("Błąd przy dodawaniu książki:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setCurrentUserId(user.uid);
            else setCurrentUserId(null);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        readBooks().then(setBooks);
    }, []);

    const toggleMyBooksOnly = () => {
        setMyBooksOnly(prev => !prev);
    };

    const filteredBooks = myBooksOnly && currentUserId
        ? books.filter(b => b.userId === currentUserId)
        : books;

    return (
        <BookContext.Provider value={{
            books: filteredBooks,
            allBooks: books,
            addBook,
            myBooksOnly,
            toggleMyBooksOnly,
            currentUserId
        }}>
            {children}
        </BookContext.Provider>
    );
};
