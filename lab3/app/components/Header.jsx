import { useBooks } from "../context/BookContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const { myBooksOnly, toggleMyBooksOnly, currentUserId } = useBooks();

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl">Zaklęta Strona</h1>
            <div className="space-x-2">
                <button className="btn" onClick={() => navigate("/login")}>Zaloguj</button>
                {currentUserId && (
                    <button className="btn" onClick={toggleMyBooksOnly}>
                        {myBooksOnly ? "Wszystkie" : "MOJE"}
                    </button>
                )}
                <button className="btn">Koszyk (0)</button>
            </div>
        </header>
    );
}
