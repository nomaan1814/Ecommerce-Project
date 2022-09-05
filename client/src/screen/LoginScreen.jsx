import React,{useState,useEffect} from 'react'
import {Link,useNavigate, useSearchParams} from 'react-router-dom';
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import Message from '../shared/Alerts';
import Loader from '../shared/Loader';
import { login } from '../actions/userAction';
import FormContainer from '../shared/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Alerts from '../shared/Alerts';
const LoginScreen = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const search=useSearchParams()
    const dispatch=useDispatch()
    const useLogin=useSelector(state=>state.userLogin);
    const {loading,error,userInfo}=useLogin
    const navigate=useNavigate();
    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    })
    // const redirect=location.search ? location.search.split('=')[1]:'/';
    // const redirect=search?search:'/';

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }
  return (
    <div>
            <FormContainer>     
            <h1>Sign In</h1>
            {error && <Alerts varient="danger">{error}</Alerts>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </Form.Group>
                <Button type="submit" varient="primary">SIGN IN</Button>
            </Form>
            <Row>
                <Col>
                   New customer ?
                   <Link to={'/register'}>Register</Link>
                   {/* <Link to={redirect?`register?redirect=${redirect}`:'/register'}>Register</Link> */}
                </Col>
            </Row>
            </FormContainer>    
    </div>
  )
}

export default LoginScreen
