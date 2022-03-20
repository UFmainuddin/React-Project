import React, { useContext } from 'react'
//import '../assets/workshop-styles.css'
import { Card, Button} from 'react-bootstrap';
import BooksContext from '../context/BooksContext';
import AuthContext from '../context/AuthContext';
import ImageSlider from './ImageSlider';
import { deleteBook, updateCart } from '../services';
import { NavLink, useNavigate } from "react-router-dom";


const CardComponet= ({book})=> {

  const navigate = useNavigate()
  const {updateBooks, cartItems, setCartItems, updatedCart} = useContext(BooksContext)
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const {_id, bookName, photoUrl, bookCondition, discription, price, seller} = book


  let isOwner = false;

  {isAuth&& (isOwner = JSON.parse(localStorage.getItem("userData")).id == seller._id)}
 

  const deleteHandler = async()=>{
     await deleteBook(_id)
     updateBooks()
  }
 
  
  const onAdd = async() => {
    if(isAuth){

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
 
    }else{
        navigate('/login')
    }

  };

  return (

<Card style={{ width: '18rem'}}>

<ImageSlider images={ [photoUrl, photoUrl]}/>

<Card.Body style={{backgroundColor: '#e3e3e3'}}>
 <Card.Title>{bookName}</Card.Title>
 <h6>{bookCondition}</h6>
 <Card.Text>
  {discription}
 </Card.Text>
 <span style={{fontWeight: 'bold', marginRight: '15px',  fontSize: '18px'}}>Price: ${price}</span>
<Button variant="success" onClick={onAdd}>ADD TO CART</Button>


 {isOwner&&  <div style={{margin: '5px'}}>
 <Button variant="danger" onClick={deleteHandler}>Delete</Button>
 <NavLink to= {`/book/${_id}`} > <Button>Edit</Button> </NavLink></div>}
 <small>Seller: {seller.username}</small>
</Card.Body>
</Card>

  )

}


export default CardComponet



