import { useState, useEffect } from 'react'
import { getBooks } from '../api/booksApi'
import SearchBar from '../components/SearchBar.jsx'
import BookList from '../components/BookList'
import Cart from "../components/Cart.jsx"
import "./HomePage.css"
function HomePage() {
    const [search, setSearch] = useState('')
    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBooks()
            .then((data) => {
                setBookList(data)
            })
            .catch((error) => {
                console.error('Error cargando libros:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const filteredBooks = bookList.filter((book) =>
        book.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <div className="app">
            <header className="header">
                <h1>Librería Online</h1>
                <SearchBar search={search} setSearch={setSearch} />
            </header>

            <div className="page-layout">
                <main className="book-list">
                    {loading ? (
                        <p>Cargando libros...</p>
                    ) : (
                        <>
                            <BookList books={filteredBooks} />
                            {filteredBooks.length === 0 && (
                                <p>No se encontraron libros.</p>
                            )}
                        </>
                    )}
                </main>

                <Cart />
            </div>
        </div>
    );
}

export default HomePage;