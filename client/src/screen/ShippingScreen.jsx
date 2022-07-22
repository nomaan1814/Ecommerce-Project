import React from 'react';
import {Form,Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import { useState } from 'react';
import FormContainer from '../shared/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckOutStep from '../components/CheckOutStep';
const ShippingScreen = () => {
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;
    const [address,setAddress]=useState(shippingAddress.address);
    const [city,setCity]=useState(shippingAddress.city);
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode);
    const [country,setCountry]=useState(shippingAddress.country);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment');
    }
  return (
    <FormContainer>
        <CheckOutStep step1 step2 />
        <Form onSubmit={submitHandler}>
             <Form.Group controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder='Enter Address' value={address} onChange={(e)=>setAddress(e.target.value)} required></Form.Control>
             </Form.Group>
             <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)} required></Form.Control>
             </Form.Group>
             <Form.Group controlId='postalCode'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" placeholder='Enter postal code' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required></Form.Control>
             </Form.Group>
             <Form.Group controlId='country'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder='Enter Country' value={country} onChange={(e)=>setCountry(e.target.value)} required></Form.Control>
             </Form.Group>
             <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
