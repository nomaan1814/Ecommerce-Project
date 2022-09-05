import React, { useState } from 'react';
import { Form,Button,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckOutStep from '../components/CheckOutStep';
const PaymentScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;
    if(!shippingAddress){
        navigate('/shipping')
    }
    const [paymentMethod,setPaymentMethod]=useState('paypal')
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        navigate('/placeorder')
    }
  return (
    <>
      <CheckOutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as="legend">
                Select payment Method
            </Form.Label>
            <Col>
              <Form.Check type="radio" label="Paypal or credit card" id="paypal"
              name="paymentMethod" value="paypal" onChange={(e)=>setPaymentMethod(e.target.value)} checked></Form.Check>
              <Form.Check type="radio" label="Stripe" id="stripe"
              name="paymentMethod" value="stripe" onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </>
  )
}

export default PaymentScreen
