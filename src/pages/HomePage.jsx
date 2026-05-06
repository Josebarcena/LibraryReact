// pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { getBooks } from '../api/booksApi';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';

function HomePage({ search, setSearch }) {  // Recibe search y setSearch desde App
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBooks()
            .then((data) => setBookList(data))
            .catch((error) => console.error('Error cargando libros:', error))
            .finally(() => setLoading(false));
    }, []);

    const filteredBooks = bookList.filter((book) =>
        book.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div className="app">
            <header className="header">
                <h1>Librería Online</h1>
                <SearchBar search={search} setSearch={setSearch} />
            </header>
            <main className="book-list">
                {loading ? (
                    <p>Cargando libros...</p>
                ) : (
                    <>
                        <BookList books={filteredBooks} />
                        {filteredBooks.length === 0 && <p>No se encontraron libros.</p>}
                    </>
                )}
            </main>
        </div>
    );
}

export default HomePage;