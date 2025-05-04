export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl">Zaklęta Strona</h1>
            <div className="space-x-2">
                <button className="btn">Zaloguj</button>
                <button className="btn">Koszyk (0)</button>
            </div>
        </header>
    );
}
