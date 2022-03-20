import React, { useContext } from 'react'
import BooksContext from '../context/BooksContext';
import '../assets/workshop-styles.css';
import { updateCart } from '../services';
function MyCart() {

  const {cartItems, setCartItems, updatedCart} = useContext(BooksContext)
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * Number(c.price), 0);
  const taxPrice = itemsPrice * 0.08;
  const shippingPrice = itemsPrice > 2000 ? 0 : 5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const onAdd = async(book) => {
    const exist = cartItems.find((x) => x._id === book._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === book._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...book, qty: 1 }]);
    }
    await updateCart(cartItems)
    // updatedCart()
  };
  const onRemove = async(book) => {
    const exist = cartItems.find((x) => x._id === book._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== book._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === book._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
    await updateCart(cartItems)
    // updatedCart()
  };


  return (
    <div className='cart_div col-8'>
       <h2>Cart Items</h2>
    <div>
      {cartItems.length === 0 && <div>Cart is empty</div>}
      {cartItems.map((item, index) => (
        <div key={index} className="row">
          <div className="col-2">{item.bookName}</div>
          <div className="col-2">
            <button onClick={() => onRemove(item)} className="remove">
              -
            </button>{' '}
            <button onClick={() => onAdd(item)} className="add">
              +
            </button>
          </div>

          <div className="col-2 text-right">
            {item.qty} x ${Number(item.price)}
          </div>
        </div>
      ))}

      {cartItems.length !== 0 && (
        <>
          <hr></hr>
          <div className="row">
            <div className="col-2">Items Price</div>
            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2">Tax Price</div>
            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2">Shipping Price</div>
            <div className="col-1 text-right">
              ${shippingPrice.toFixed(2)}
              
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <strong>Total Price</strong>
            </div>
            <div className="col-1 text-right">
              <strong>
                ${totalPrice.toFixed(2)}
          
                </strong>
            </div>
          </div>
          <hr />
          <div className="row">
            <button onClick={() => alert('Implement Checkout!')}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  )
}

export default MyCart