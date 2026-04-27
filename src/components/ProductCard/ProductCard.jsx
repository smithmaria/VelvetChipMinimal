import './ProductCard.css'

function ProductCard({name, price}) {
  return (
    <div className="product-card">
      <div>
        <h3>{name}</h3>
        ${price}
      </div>
      <div>
        <button className='add-item'>Add</button>
      </div>
    </div>
  )
}

export default ProductCard;