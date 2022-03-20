import React, { useState } from 'react'
import { Form, InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addBook} from '../services';



const SellBooks = (props) => {

const navigate = useNavigate()
 const [bookName, setBookName] = useState('');
 const [photoUrl, setPhotoUrl] = useState('');
 const [discription, setDiscription] = useState('');
 const [price, setPrice] = useState('');
 const [bookCondition, setCondition] = useState('');


const submitHandler = async (e)=>{
    e.preventDefault();
    await addBook(bookName, photoUrl, bookCondition, discription, price)
  
    setBookName('')
    setPhotoUrl('')
    setDiscription('')
    setPrice('')
    setCondition('Not Mentioned')
    props.updateBooks()
    navigate('/')

}


  return (
<div className="container" style={{width: '35rem'}}>
<Card style={{ width: '30rem'}}>
<Card.Body style={{backgroundColor: '#e3e3e3'}}>
<h1>Enter Book Details</h1>

<Form onSubmit={submitHandler}>   

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

<Form.Label>Book Description</Form.Label>
<Form.Control as="textarea" rows={3} onChange={ (e)=>  setDiscription(e.target.value)} value={discription} required/>
<br /> 

<Form.Label>Price</Form.Label>
<InputGroup className="mb-3">
    <InputGroup.Text>$</InputGroup.Text>
    <FormControl aria-label="Amount (to the nearest dollar)" onChange={ (e)=>  setPrice(e.target.value)} value={price} required/>
    <InputGroup.Text>.00</InputGroup.Text>
</InputGroup>
<br /> 
<Button variant="primary" type="submit">ADD</Button>

</Form>
</Card.Body>
</Card>
		</div>
  )
}

export default SellBooks