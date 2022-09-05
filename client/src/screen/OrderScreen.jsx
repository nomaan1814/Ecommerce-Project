import React, { useState } from 'react';
import {Button,Row,Col, ListGroup, Image, Card} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Alerts from '../shared/Alerts';
import CheckOutStep from '../components/CheckOutStep';
import { useEffect } from 'react';
import { orderDetailsAction, payOrder } from '../actions/orderAction';
import Loader from '../shared/Loader';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET} from '../constants/orderConstant';

const OrderScreen = () => {
    const [sdkReady,setSdk]=useState(false)
    const params=useParams();
    const dispatch=useDispatch();
    const orderPay=useSelector(state=>state.orderPay);
    const{loading:loadingPay,success:successPay}=orderPay;
    const orderDetails=useSelector(state=>state.orderDetail);
    const {order,loading,error}=orderDetails;
    const orderId=params.id;
    if(!loading){
      const addDecimal=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
     }
     order.itemsPrice=addDecimal(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    }
    useEffect(()=>{
         const addPaypalScript=async()=>{
             const {data:clientId}=await axios.get(`/api/config/paypal`);
             const script=document.createElement('script');
             script.type="text/javascript";
             script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}&locale=en_US`;
             script.async=true;
             script.onload=()=>{
                  setSdk(true)
             }
             document.body.appendChild(script);
         }
         if(!order || successPay){
        dispatch(orderDetailsAction(params.id))
        dispatch({type:ORDER_PAY_RESET})
         }
         else if(!order.isPaid){
          if(!window.paypal){
            addPaypalScript()
          }else{
            setSdk(true)
          }
         }
    },[dispatch,orderId,order,successPay])
    const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult);
        dispatch(payOrder(orderId,paymentResult))
    }
  return loading ? <Loader />:error?<Alerts variant="danger">{error}</Alerts>:
  <>
     <h2>Order {order._id}</h2>
     <Row>
         <Col md={8}>
             <ListGroup.Item>
                 <h2>Shipping</h2>
                  <p>
                    <strong>Address:</strong>
                      {order.shippingAddress.address}&nbsp;
                      {order.shippingAddress.city}&nbsp;
                      {order.shippingAddress.postalCode}&nbsp;
                      {order.shippingAddress.country}&nbsp;
                  </p>
                  {
                  order.isDelivered ? <Alerts variant="success">Paid On {order.DeliverdAt}</Alerts>
                  :<Alerts variant="danger">Not Delivered</Alerts>
                 }
             </ListGroup.Item>
             <ListGroup.Item>
                 <h2>Payment Method</h2>
                 <p><strong>Method:</strong>
                 <strong>{order.paymentMethod}</strong></p>
                 {
                  order.isPaid ? <Alerts variant="success">Paid On {order.paidAt}</Alerts>
                  :<Alerts variant="danger">Not Paid</Alerts>
                 }
             </ListGroup.Item>
             <ListGroup.Item>
                           <h2>Order Item</h2>
                           <p><strong>{order.orderItems.length===0?<Alerts>Your Cart is empty</Alerts>:<ListGroup variant="flush">
                                {order.orderItems.map((item,index)=>(
                                   <ListGroup.Item key={index}>
                                      <Row>
                                        <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid/>
                                        </Col>
                                        <Col>
                                           <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X ${item.price}=${item.price}
                                        </Col>
                                      </Row>
                                   </ListGroup.Item>
                                ))}
                            </ListGroup>}</strong></p>
                      </ListGroup.Item>
         </Col>
         <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                  <ListGroup.Item>
                        <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Row>
                    <Col>
                       Items
                    </Col>
                    <Col>
                       ${order.itemsPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                       Shipping Price
                    </Col>
                    <Col>
                       ${order.shippingPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                       Tax
                    </Col>
                    <Col>
                       ${order.taxPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                       Total
                    </Col>
                    <Col>
                       ${order.totalPrice}
                    </Col>
                  </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Alerts variant="danger">{error}</Alerts>}
                  </ListGroup.Item>
                  
              </ListGroup>
            </Card>
             {!order.isPaid && (<ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? <Loader/>:<PayPalButton amount={order.totalPrice}
                onSuccess={successPaymentHandler}/>}
             </ListGroup.Item>)}
         </Col>
     </Row>
  </>
}

export default OrderScreen
