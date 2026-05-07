import { useParams, Link } from "react-router-dom"
import { getBookById } from "../api/booksApi.js"
import { useCart } from "../context/CartContext.jsx"
import Cart from "../components/Cart.jsx"

function BookDetail() {
    const { id } = useParams()
    const book = getBookById(id)
    const { addToCart } = useCart()

    if (!book) return <p>Libro no encontrado</p>

    return (
        <div className="page-layout">
            <main>
                <Link to="/home">← Volver</Link>

                <div className="book-detail-content">
                    <img src={book.image} alt={book.title} />

                    <div className="book-detail-info">
                        <h1>{book.title}</h1>
                        <p>Autor: {book.author}</p>
                        <p>Año: {book.year}</p>
                        <p>Género: {book.genre}</p>
                        <p>Precio: {book.price} €</p>

                        <button onClick={() => addToCart(book)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </main>

            <Cart />
        </div>
    )
}

export default BookDetail