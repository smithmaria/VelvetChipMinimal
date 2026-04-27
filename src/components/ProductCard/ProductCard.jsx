import './ProductCard.css'

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div>
        <h3>{product.name}</h3>
        ${product.price.toFixed(2)}
      </div>
      <div>
        <button className='add-item' onClick={() => onAdd(product)}>Add</button>
      </div>
    </div>
  )
}

export default ProductCard;