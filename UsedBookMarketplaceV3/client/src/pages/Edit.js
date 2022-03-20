import React, { useContext, useState } from 'react'
import { Form, InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { editBook} from '../services';
import BooksContext from '../context/BooksContext';
import { useParams } from "react-router-dom";

const Edit =  () => {
    const {books, updateBooks} = useContext(BooksContext)
    const { id } = useParams();
    console.log(id)
    const book =  books.find((book) => book._id == id)

 const navigate = useNavigate()
 const [bookName, setBookName] = useState(`${book.bookName}`);
 const [photoUrl, setPhotoUrl] = useState(`${book.photoUrl}`);
 const [discription, setDiscription] = useState(`${book.discription}`);
 const [price, setPrice] = useState(`${book.price}`);
 const [bookCondition, setCondition] = useState(`${book.bookCondition}`);


const editHandler = async (e)=>{
    e.preventDefault();
    await editBook( id, bookName, photoUrl, bookCondition, discription, price)
    setBookName('')
    setPhotoUrl('')
    setDiscription('')
    setPrice('')
    setCondition('Not Mentioned')
    updateBooks()
    navigate('/')

}

  return (
   
<div className="container" style={{width: '35rem'}}>
<Card style={{ width: '30rem'}}>
<Card.Body style={{backgroundColor: '#e3e3e3'}}>
<h1>Enter Book Details</h1>

<Form onSubmit={editHandler}>   

<Form.Label>Book Name</Form.Label>
<Form.Control type="text" placeholder="Type the Book's Name" onChange={ (e)=>  setBookName(e.target.value)} value={bookName} required />
 <br />
   
<Form.Label>Book Photos</Form.Label>
<Form.Control type="text" placeholder="Photo URL" onChange={ (e)=>  setPhotoUrl(e.target.value)} value={photoUrl} required/>
<br />

<Form.Label>Book Condition</Form.Label>
<Form.Select aria-label="Book Condition" onChange={ (e)=>  setCondition(e.target.value)} value={bookCondition}>
<option value='Not Mentioned'>Open this select menu</option>
<option value="Just like new">As New</option>
<option value="Good">Good</option>
<option value="Usable">Usable</option>
</Form.Select>
<br />

<Form.Label>Book Discription</Form.Label>
<Form.Control as="textarea" rows={3} onChange={ (e)=>  setDiscription(e.target.value)} value={discription} required/>
<br /> 

<Form.Label>Price</Form.Label>
<InputGroup className="mb-3">
    <InputGroup.Text>$</InputGroup.Text>
    <FormControl aria-label="Amount (to the nearest dollar)" onChange={ (e)=>  setPrice(e.target.value)} value={price} required/>
    <InputGroup.Text>.00</InputGroup.Text>
</InputGroup>
<br /> 
<Button variant="primary" type="submit">Save</Button>

</Form>
</Card.Body>
</Card>
		</div>

  )
}

export default Edit