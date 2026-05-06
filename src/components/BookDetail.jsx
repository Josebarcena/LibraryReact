// components/DetallesLibro.jsx
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './BookDetail.css';

function BookDetail({ search, setSearch }) {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const book = location.state?.book;

    if (!book) {
        return (
            <div>
                <p>No se encontró el libro (ID: {id}).</p>
                <p>Intenta acceder desde la lista principal.</p>
            </div>
        );
    }

    const añadirCarrito = () => {
        const input = document.getElementById("unidades");
        const units = input.value;

        const valor = book.id;
    };

    const backEvent = () => {
        navigate('/');
    };

    return (
        <div>
            <header className="header">
                <h1>Detalles del Libro</h1>
                <SearchBar search={search} setSearch={setSearch} />
            </header>
            <main>
                <div class="backB">
                    <div class="buttonBack">
                        <button name="button" align="left" onClick={backEvent}>Atras</button>
                    </div>
                    <div class="bookView">
                        <div class="bookFront">
                            <img src={book.image} width="300" height="450" alt="bookImage" />
                        </div>
                        <div class="bookPropieties">
                            <div class="bookDescription">
                                <h1>{book.title}</h1>
                                <p><strong>Autor:</strong> {book.author}</p>
                                <p><strong>Precio:</strong> {book.price} €</p>
                                <p><strong>Género:</strong> {book.genre}</p>
                            </div>
                            <div class="bookBuy">
                                <label>Unidades: </label>
                                <input type="number" id="unidades" name="unidades" defaultValue={1} min="1" max="9" /> 
                                <button name="button" onClick={añadirCarrito}>Añadir libro al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BookDetail;