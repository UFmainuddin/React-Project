
import { Form, Button, Card} from 'react-bootstrap';
import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useInput from '../hooks/useInput';
import { login } from '../services';


const Login = () => {
  const { setIsAuth, isAuth } = useContext(AuthContext);
  const navigate = useNavigate()

  
   const {
			value: email,
			hasError: emailInvalid,
			valid: emailValid,
			changeHandler: emailChangeHandler,
			blurHandler: emailBlurHandler,
			reset: emailReset,
		} = useInput((email) => email.trim().length !== "" && email.includes("@"));

		const {
			value: password,
			hasError: passwordInvalid,
			valid: passwordValid,
			changeHandler: passwordChangeHandler,
			blurHandler: passwordBlurHandler,
			reset: passwordReset,
  } = useInput((password) => password.trim().length > 5);
  
  const formValid = emailInvalid && passwordValid

  const submitHandler = (e) => {
    e.preventDefault()
    login(email, password, setIsAuth);
    navigate('/');
 
  };


  return (
	
      <div className="container" style={{width: '30rem'}}>
<Card style={{ width: '30rem'}}>
<Card.Body style={{backgroundColor: '#e3e3e3'}}>
<h1>Login Page</h1>

<Form onSubmit={submitHandler}>
  <Form.Group className="mb-3">
    <Form.Label>Email address</Form.Label>
    <Form.Control  type="email" id="email" onChange={ emailChangeHandler } onBlur={ emailBlurHandler } value={ email } placeholder="Enter email" autoComplete="off"/>
     { emailInvalid && <Form.Text className="text-muted" > please enter valid email</Form.Text> }
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Password</Form.Label>
    <Form.Control placeholder="Password" type="password" id="password" onChange={ passwordChangeHandler } onBlur={ passwordBlurHandler } value={ password}/>
    
    { passwordInvalid && <Form.Text className="text-muted"> please enter valid password</Form.Text> }
  </Form.Group>

 

  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>

</Card.Body>
</Card>
		</div>
	
	);
}

export default Login