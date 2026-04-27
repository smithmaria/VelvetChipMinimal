import { useState } from 'react'
import './App.css'
import Results from './components/Results/Results'
import OrderInfo from './components/OrderInfo/OrderInfo'

function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAdd(product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product._id);
      if (existing) {
        return prev.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId: product._id,
        name: product.name,
        priceAtPurchase: product.price,
        size: product.sizes[0],
        quantity: 1
      }];
    });
  }

  function handleRemove(productId) {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  }

  return (
    <div className='home-grid'>
      <Results onAdd={handleAdd} />
      <OrderInfo 
        cartItems={cartItems} 
        onRemove={handleRemove}
        onClear={() => setCartItems([])}
      />
    </div>
  )
}

export default App;