import { Link } from "react-router-dom";
function BookCard({ book }) {
    return (
        <div className="book-card">
            {/*<h2>{book.title}</h2>*/}
            <Link to={`/libro/${book.id}`} state={{ book }}>
                <h2>{book.title}</h2>
            </Link>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Código:</strong> {book.code}</p>
            <p><strong>Precio:</strong> {book.price} €</p>
        </div>
    )
}

export default BookCard;