import './App.css'

import Results from './components/Results/Results'
import OrderInfo from './components/OrderInfo/OrderInfo'

function App() {

  return (
    <>
      <div className='home-grid'>
        <Results />
        <OrderInfo />
      </div>
    </>
  )
}

export default App
