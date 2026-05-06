import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function ProfilePage() {
    const { user } = useAuth()
    const { orders } = useCart()

    return (
        <div>
            <h1>Mi perfil</h1>
            <Link to="/home">← Ir al inicio</Link>

            <section>
                <h2>Datos del usuario</h2>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>

            <section>
                <h2>Últimos pedidos</h2>

                {orders.length === 0 ? (
                    <p>No has realizado ningún pedido todavía.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id}>
                            <p><strong>Pedido del {order.date}</strong> — Total: {order.total.toFixed(2)} €</p>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.title} × {item.quantity} — {(item.price * item.quantity).toFixed(2)} €
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </section>
        </div>
    )
}

export default ProfilePage