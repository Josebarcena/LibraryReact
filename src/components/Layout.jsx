import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';

function Layout({ search, setSearch }) {
    return (
        <div>
            <header>
                <h1>Mi Biblioteca</h1>
                <SearchBar search={search} setSearch={setSearch} />
            </header>
            <main>
                <Outlet />  {/* Aquí se renderiza la página actual (lista o detalles) */}
            </main>
        </div>
    );
}

export default Layout;