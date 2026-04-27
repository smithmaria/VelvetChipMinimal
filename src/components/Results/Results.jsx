import { useState, useEffect } from 'react';
import './Results.css';
import ProductCard from '../ProductCard/ProductCard';

function Results() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='results-container'>
      <div className='products-title'>
        <h1>Products</h1>
        <button className='products-button'>View Products</button>
      </div>
      <div className='products-list'>
        {products.map(product => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price.toFixed(2)}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;