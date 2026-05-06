import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { users } from '../data/users'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const found = users.find(
            (u) => u.email === email && u.password === password
        )

        if (found) {
            console.log('Usuario encontrado:', found)
            login(found)
            navigate('/profile')
        } else {
            setError('Email o contraseña incorrectos')
        }
    }

    return (
        <div className="app">
            <header className="header">
                <h1>Iniciar sesión</h1>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit">Entrar</button>
                </form>
            </main>
        </div>
    )
}

export default LoginPage