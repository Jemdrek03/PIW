import React from "react";

export default function FilterForm({ filters, setFilters, onSearch }) {
    return (
        <section className="filters p-4 bg-white rounded m-4">
            <h2 className="text-lg mb-2">Filtruj książki</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearch();
                }}
                className="space-y-3"
            >
                <label>
                    Cena max:
                    <input type="number" onChange={(e) => setFilters(f => ({ ...f, price: e.target.value }))} />
                </label>
                <label>
                    Okładka:
                    <select onChange={(e) => setFilters(f => ({ ...f, cover: e.target.value }))}>
                        <option value="">Dowolna</option>
                        <option value="twarda">Twarda</option>
                        <option value="miękka">Miękka</option>
                    </select>
                </label>
                <label>
                    Ilość stron min:
                    <input type="number" onChange={(e) => setFilters(f => ({ ...f, pages: e.target.value }))} />
                </label>
                <label>
                    Autor:
                    <input type="text" onChange={(e) => setFilters(f => ({ ...f, author: e.target.value }))} />
                </label>
                <label>
                    Słowo kluczowe:
                    <input type="text" onChange={(e) => setFilters(f => ({ ...f, keyword: e.target.value }))} />
                </label>
                <button type="submit" className="btn btn-primary">Szukaj</button>
            </form>
        </section>
    );
}
