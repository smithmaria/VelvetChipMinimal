import './OrderInfo.css'

function OrderInfo() {
  return (
    <div className="order-container">
      <div>
        <h1>Order Info</h1>
        <div className='order-list'>
          <div className='order-item'>
            <div>
              <h3>Product Name</h3>
              $9.99
            </div>
            <button className='remove'>Remove</button>
          </div>
        </div>
      </div>
      <button className='place-order'>Place Order</button>
    </div>
  )
}

export default OrderInfo;