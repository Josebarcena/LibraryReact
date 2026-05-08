import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import OrderCard from '../components/OrderCard'
import Cart from '../components/Cart'

function ProfilePage() {
    const { user } = useAuth()
    const { orders } = useCart()

    return (
        <div className="page-layout">
        <div className="profile-page">
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
                        <OrderCard key={order.id} order={order} />
                    ))
                )}
            </section>
        </div>
            <Cart />
        </div>
    )
}

export default ProfilePage