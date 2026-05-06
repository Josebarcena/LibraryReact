import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header>
            <span onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                Librería Online
            </span>

            <nav>
                {user ? (
                    <>
                        <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                            {user.name}
                        </span>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')}>Iniciar sesión</button>
                )}
            </nav>
        </header>
    )
}

export default Header