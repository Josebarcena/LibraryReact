import PriceTag from './PriceTag'

function OrderCard({ order }) {
    return (
        <div className="order-card">
            <p>
                <strong>Pedido del {order.date}</strong> — Total: <PriceTag price={order.total} />
            </p>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.title} × {item.quantity} — <PriceTag price={item.price * item.quantity} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrderCard
