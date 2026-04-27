import './OrderInfo.css'

const HARDCODED_USER_ID = '698f5779a9d65576e627c76f';

function OrderInfo({ cartItems, onRemove, onClear }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity, 0
  );

  async function handlePlaceOrder() {
    if (cartItems.length === 0) return;

    const order = {
      userId: HARDCODED_USER_ID,
      orderDate: new Date().toISOString(),
      items: cartItems.map(({ productId, size, priceAtPurchase, quantity }) => ({
        productId,
        size,
        priceAtPurchase,
        quantity
      })),
      total: parseFloat(total.toFixed(2))
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (res.ok) {
        alert('Order placed!');
        onClear();
      }
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  }

  return (
    <div className="order-container">
      <div>
        <h1>Order Info</h1>
        <div className='order-list'>
          {cartItems.map(item => (
            <div key={item.productId} className='order-item'>
              <div>
                <h3>{item.name}</h3>
                ${item.priceAtPurchase.toFixed(2)} × {item.quantity}
              </div>
              <button className='remove' onClick={() => onRemove(item.productId)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
        )}
      </div>
      <button className='place-order' onClick={handlePlaceOrder}>Place Order</button>
    </div>
  )
}

export default OrderInfo;