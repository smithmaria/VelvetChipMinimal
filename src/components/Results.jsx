import './Results.css'

import ProductCard from './ProductCard/ProductCard';

function Results() {
  return (
    <div>
      <div className='products-title'>
        <h1>Products</h1>
        <button className='products-button'>View Products</button>
      </div>
      <div>
        <ProductCard 
          name='T-Shirt'
          price='9.99'
        />
        <ProductCard 
          name='Pants'
          price='49.99'
        />
      </div>
    </div>
  )
}

export default Results;