import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { users } from '../data/users'
import logo from '../assets/Relatos_de_papel_logo.png'

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
            <main>
                <form onSubmit={handleSubmit}>
                    <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto 1rem', height: '5rem' }} />
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