import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"

function CheckoutPage() {
    const { cart, clearCart, addOrder } = useCart()
    const navigate = useNavigate()

    const total = cart.reduce((sum, item) => {
        return sum + (item.price || 0) * (item.quantity || 1)
    }, 0)

    const handlePayment = () => {
        window.alert("El pedido se ha realizado correctamente")
        addOrder(cart)
        clearCart()
        navigate("/home")
    }

    if (cart.length === 0) {
        return (
            <div>
                <h1>Checkout</h1>
                <p>No hay libros en el carrito.</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Checkout</h1>

            <h2>Resumen del pedido</h2>

            {cart.map((book) => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>Autor: {book.author}</p>
                    <p>Cantidad: {book.quantity || 1}</p>
                    {book.price && <p>Precio: {book.price} €</p>}
                </div>
            ))}

            <h2>Total: {total} €</h2>

            <button onClick={handlePayment}>
                Proceder al pago
            </button>
        </div>
    )
}

export default CheckoutPage