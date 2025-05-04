export default function BookCard({ book }) {
    return (
        <li className="border-b border-gray-300 py-4">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p>
                Autor: {book.author} | {book.pages} stron | Okładka: {book.cover} | Cena: {Number(book.price).toFixed(2)} zł

            </p>
            <div className="mt-2 flex gap-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Dodaj do koszyka</button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edytuj</button>
                <button className="bg-yellow-5oo text-white px-3 py-1 rounded hover:bg-yellow-700">Usuń</button>
            </div>
        </li>
    );
}
