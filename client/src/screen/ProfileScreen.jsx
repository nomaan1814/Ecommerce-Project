import React,{useState,useEffect} from 'react'
import {Link,useNavigate, useSearchParams} from 'react-router-dom';
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import Message from '../shared/Alerts';
import Loader from '../shared/Loader';
import { getUserDetails, register,updateuserProfile } from '../actions/userAction';
import FormContainer from '../shared/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Alerts from '../shared/Alerts';
const ProfileScreen = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setcPassword]=useState('');
    const [name,setname]=useState('');
    const [message,setmessage]=useState('');
    const search=useSearchParams()
    const dispatch=useDispatch()
    const userDetails=useSelector(state=>state.userDetails);
    const userLogin=useSelector(state=>state.userLogin);
    const {userInfo}=userLogin;
    const {loading,user,error}=userDetails;
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile);
    const {userDetup}=userUpdateProfile;
    const navigate=useNavigate();
    useEffect(()=>{
        if(!userInfo){
              navigate('/login')
        }
        else{
            if(!user?.name){
               dispatch(getUserDetails())
            }else{
                setname(user.name);
                setEmail(user.email)
            }
        }
    },[navigate,userInfo,user,dispatch])
    const submitHandler=(e)=>{
         e.preventDefault();
         dispatch(updateuserProfile({id:user._id,name,email,password}))
    }
   
  return (
    <div>
       <Row>
         <Col md={3}>
         {/* <FormContainer>      */}
            <h1>Update Information</h1>
            {error && <Alerts varient="danger">{error}</Alerts>}
            {userDetup && <Message variant='success'>Profile Updated</Message>}
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
                <Button type="submit" varient="primary">Update</Button>
            </Form>
            <Row>
                <Col>
                   Have an account ?
                   <Link to={'/login'}>Login</Link>
                </Col>
            </Row>
            {/* </FormContainer>    */}
         </Col>
         <Col md={9}>
            <h1>My Orders</h1>
         </Col>
        </Row>     
    </div>
  )
}

export default ProfileScreen
