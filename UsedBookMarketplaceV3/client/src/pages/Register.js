import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/workshop-styles.css';
import useInput from '../hooks/useInput';
import { register } from '../services';
import { Form, Button, Card} from 'react-bootstrap';

const Register = () => {

  const passwordRef = useRef();
  const navigate = useNavigate(); 
  
  const {
		value: email,
		hasError: emailInvalid,
		valid: emailValid,
		changeHandler: emailChangeHandler,
		blurHandler: emailBlurHandler,
	} = useInput(
		(email) => email.trim().length !== "" && email.includes("@") 
	);

  const {
		value: password,
		hasError: passwordInvalid,
		valid: passwordValid,
		changeHandler: passwordChangeHandler,
		blurHandler: passwordBlurHandler,
  } = useInput((password) => password.trim().length > 5);

  const {
		value: password2,
		hasError: password2Invalid,
		valid: password2Valid,
		changeHandler: password2ChangeHandler,
		blurHandler: password2BlurHandler,
  } = useInput((p) => p === passwordRef?.current?.value);
  
  const formValid = emailValid & passwordValid && password2Valid;
  
  const submitHandler = async(e) => { 
    e.preventDefault();
    if (!formValid) { 
      return;
    }
    register(email, password);
    navigate('/login')
  }


  return (
    <div className="container" style={{width: '30rem'}}>
<Card style={{ width: '30rem'}}>
<Card.Body style={{backgroundColor: '#e3e3e3'}}>
<h1>Register Page</h1>
<Form onSubmit={submitHandler} noValidate>
  <Form.Group className="mb-3">
    <Form.Label>Email address</Form.Label>
    <Form.Control  type="text"
            id="email"
            onChange={ emailChangeHandler }
            value={ email }
            autoComplete="off"
            onBlur={ emailBlurHandler} placeholder="Enter email" />
     { emailInvalid && <Form.Text className="text-muted" > Invalid email input</Form.Text> }
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" id="password" onChange={ passwordChangeHandler } onBlur={ passwordBlurHandler} value={ password }
            ref={ passwordRef}/>
    
    { passwordInvalid && <Form.Text className="text-muted"> Invalid password input</Form.Text> }
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label> Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" id="password2" onChange={ password2ChangeHandler } onBlur={ password2BlurHandler} value={ password2} />
    { password2Invalid &&  <Form.Text className="text-muted"> Invalid confirmed password</Form.Text> }
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

</Card.Body>
</Card>
		</div>
	);
}

export default Register