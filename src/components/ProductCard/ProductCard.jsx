import './ProductCard.css'

function ProductCard({ product, onAdd, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <div>
        <h3>{product.name}</h3>
        ${product.price.toFixed(2)}
      </div>
      <div>
        <button className='add-item' onClick={e => {
          e.stopPropagation(); 
          onAdd(product);
        }}>
          Add
        </button>
      </div>
    </div>
  )
}

export default ProductCard;