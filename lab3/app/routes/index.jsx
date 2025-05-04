import React, { useState, useMemo } from "react";
import { useBooks } from "../context/BookContext";
import Header from "../components/Header";
import FilterForm from "../components/FilterForm";
import BookCard from "../components/BookCard";

export default function Index() {
    const { books } = useBooks();
    const [filters, setFilters] = useState({ price: "", cover: "", pages: "", author: "", keyword: "" });

    const filtered = useMemo(() => {
        return books.filter(book => {
            return (
                (!filters.price || book.price <= filters.price) &&
                (!filters.cover || book.cover === filters.cover) &&
                (!filters.pages || book.pages >= filters.pages) &&
                (!filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
                (!filters.keyword || book.title.toLowerCase().includes(filters.keyword.toLowerCase()))
            );
        });
    }, [books, filters]);

    return (
        <>
            <Header />
            <FilterForm filters={filters} setFilters={setFilters} onSearch={() => {}} />
            <section className="book-list p-4 bg-white rounded m-4">
                <h2 className="text-lg mb-2">Dostępne książki</h2>
                <ul>{filtered.map(book => <BookCard key={book.id} book={book} />)}</ul>
            </section>
            <section className="add-book p-4 flex justify-center">
                <a href="/new" className="btn">Dodaj nową książkę</a>
            </section>
        </>
    );
}
