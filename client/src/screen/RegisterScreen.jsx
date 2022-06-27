import React,{useState,useEffect} from 'react'
import {Link,useNavigate, useSearchParams} from 'react-router-dom';
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import Message from '../shared/Alerts';
import Loader from '../shared/Loader';
import { register } from '../actions/userAction';
import FormContainer from '../shared/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Alerts from '../shared/Alerts';
const RegisterScreen = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setcPassword]=useState('');
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const search=useSearchParams()
    const dispatch=useDispatch()
    const userRegister=useSelector(state=>state.userRegister);
    const {loading,error,userInfo}=userRegister;
    const navigate=useNavigate();
    useEffect(()=>{
        // if(userInfo){
        //     navigate(redirect);
        // }
    })
    // const redirect=location.search ? location.search.split('=')[1]:'/';
    // const redirect=search.get('=')?search.get('='):'/';

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!=cpassword){
            setmessage('Password do not match')
        }
        else{
        dispatch(register(name,email,password))
        setname('');
        setEmail('');
        setPassword('');
        setcPassword('');
        }
    }
  return (
    <div>
            <FormContainer>     
            <h1>Register</h1>
            {error && <Alerts varient="danger">{error}</Alerts>}
            {loading && <Loader />}
            {message && <Alerts varient="danger">{message}</Alerts>}
            {userInfo && <Alerts varient="danger">{userInfo.message}</Alerts>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setname(e.target.value)}} />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" value={cpassword} onChange={(e)=>{setcPassword(e.target.value)}} />
                </Form.Group>
                <Button type="submit" varient="primary">Register</Button>
            </Form>
            <Row>
                <Col>
                   Have an account ?
                   <Link to={'/login'}>Login</Link>
                </Col>
            </Row>
            </FormContainer>    
    </div>
  )
}

export default RegisterScreen
