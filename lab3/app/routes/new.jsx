// app/routes/new.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useBooks } from "../context/BookContext";
import Header from "../components/Header";

export default function NewBook() {
    const { addBook } = useBooks();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        author: "",
        pages: "",
        cover: "twarda",
        price: "",
        keyword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.author || !form.pages || !form.price) return;

        addBook(form);
        navigate("/"); // po dodaniu wróć na stronę główną
    };

    return (
        <>
            <Header />
            <section className="p-4 m-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">Dodaj Książkę</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        required
                        type="text"
                        placeholder="Tytuł"
                        value={form.title}
                        onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        required
                        type="text"
                        placeholder="Autor"
                        value={form.author}
                        onChange={(e) => setForm(f => ({ ...f, author: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        required
                        type="number"
                        placeholder="Liczba stron"
                        value={form.pages}
                        onChange={(e) => setForm(f => ({ ...f, pages: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                    <select
                        value={form.cover}
                        onChange={(e) => setForm(f => ({ ...f, cover: e.target.value }))}
                        className="w-full border p-2 rounded"
                    >
                        <option value="twarda">Twarda</option>
                        <option value="miękka">Miękka</option>
                    </select>
                    <input
                        required
                        type="number"
                        placeholder="Cena (zł)"
                        value={form.price}
                        onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Opis/Słowa kluczowe"
                        value={form.keyword}
                        onChange={(e) => setForm(f => ({ ...f, keyword: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        Dodaj książkę
                    </button>
                </form>
            </section>
        </>
    );
}
