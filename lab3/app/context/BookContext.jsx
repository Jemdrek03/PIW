import React, { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();
export const useBooks = () => useContext(BookContext);

const defaultBooks = [
    { id: 1, title: "Wiedźmin: Ostatnie Życzenie", author: "Andrzej Sapkowski", pages: 350, cover: "twarda", price: 39.99 },
    { id: 2, title: "Mały Książę", author: "Antoine de Saint-Exupéry", pages: 120, cover: "miękka", price: 19.99 },
    { id: 3, title: "Kosiarze", author: "Neal Shusterman", pages: 440, cover: "twarda", price: 44.99 },
    { id: 4, title: "Małe kobietki", author: "Louisa May Alcott", pages: 500, cover: "miękka", price: 34.99 },
    { id: 5, title: "No Longer Human", author: "Osamu Dazai", pages: 280, cover: "miękka", price: 29.99 }
];

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState(() => {
        const saved = localStorage.getItem("books");
        return saved ? JSON.parse(saved) : defaultBooks;
    });

    const addBook = (book) => {
        const newBook = { ...book, id: Date.now() };
        setBooks((prev) => [...prev, newBook]);
    };

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    return <BookContext.Provider value={{ books, addBook }}>{children}</BookContext.Provider>;
};
