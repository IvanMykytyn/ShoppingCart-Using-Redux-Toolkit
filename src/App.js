import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotals } from './features/cart/cartSlice'
import { getCartItems } from './features/cart/cartSlice'

function App() {
  const dispatch = useDispatch()
  const {cartItems, isLoading, isOpen} = useSelector(store => ({...store.cart,...store.modal}))
  
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(()=>{
    dispatch(calculateTotals())
  },[cartItems]);
  

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
