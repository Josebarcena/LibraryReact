import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LandingPage() {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Bienvenido a la Librería Online</h1>

            <button onClick={() => navigate('/login')}>
                Iniciar sesión
            </button>

            <button onClick={() => navigate('/home')}>
                Explorar catálogo
            </button>
        </div>
    )
}

export default LandingPage