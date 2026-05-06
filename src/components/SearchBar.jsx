import { useNavigate } from 'react-router-dom';
import { books } from '../data/books'; // ajusta la ruta según tu estructura
function SearchBar({ search, setSearch }) {

    const navigate = useNavigate();

    const irACheckout = () => {

        const filteredBooks = books.filter(book => book.id < 10);

        // Para pruebas, asignamos una cantidad aleatoria de unidades a cada libro filtrado
        const newBooks = filteredBooks.map(book => ({
            ...book,          
            unidades: Math.floor(Math.random() * 5)
        }))

        navigate('/checkout', { state: { items: newBooks } }); 
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por título..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />
            <button onClick={irACheckout}>Ir al Checkout</button>
        </div>
    )
}

export default SearchBar;