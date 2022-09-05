import React, { useState } from 'react';
import {Button,Row,Col, ListGroup, Image, Card} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Alerts from '../shared/Alerts';
import CheckOutStep from '../components/CheckOutStep';
import { orderCreateAction } from '../actions/orderAction';
import { useEffect } from 'react';

const PlaceOrderScreen = () => {
   const cart = useSelector(state=>state.cart) 
   const dispatch=useDispatch();
   const orderCreate=useSelector(state=>state.orderCreate)
   const {order,success,error}=orderCreate;
   const navigate=useNavigate();

   const addDecimal=(num)=>{
      return (Math.round(num*100)/100).toFixed(2)
   }
   cart.itemsPrice=addDecimal(cart.cartItem.reduce((acc,item)=>acc+item.price*item.qty,0))
   cart.shippingPrice=addDecimal(cart.itemsPrice>500?0:50);
   cart.taxPrice=addDecimal(Number((0.15*cart.itemsPrice).toFixed(2)))
   cart.totalPrice=Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)

   const placeOrderHandler=()=>{
        dispatch(orderCreateAction({
          orderItems:cart.cartItem,
          shippingAddress:cart.shippingAddress,
          paymentMethod:cart.paymentMethod,
          itemsPrice:cart.itemsPrice,
          shippingPrice:cart.shippingPrice,
          taxPrice:cart.taxPrice,
          totalPrice:cart.totalPrice
        }))
  }
  useEffect(()=>{
    if(success){
         navigate(`/orders/${order._id}`)
    }
    // eslint-disable-next-line
  },[navigate,success])

  return (
    <div>
        <CheckOutStep step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                      <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Address:</strong></p>
                            {cart.shippingAddress.address}&nbsp;
                            {cart.shippingAddress.city}&nbsp;
                            {cart.shippingAddress.postalCode}&nbsp;
                            {cart.shippingAddress.country}&nbsp;
                      </ListGroup.Item>
                      <ListGroup.Item>
                           <h2>Payment Method</h2>
                           <p><strong>{cart.paymentMethod}</strong></p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                           <h2>Order Item</h2>
                           <p><strong>{cart.cartItem.length===0?<Alerts>Your Cart is empty</Alerts>:<ListGroup variant="flush">
                                {cart.cartItem.map((item,index)=>(
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
                </ListGroup>
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
                       ${cart.itemsPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                       Shipping Price
                    </Col>
                    <Col>
                       ${cart.shippingPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                       Tax
                    </Col>
                    <Col>
                       ${cart.taxPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                       Total
                    </Col>
                    <Col>
                       ${cart.totalPrice}
                    </Col>
                  </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Alerts variant="danger">{error}</Alerts>}
                  </ListGroup.Item>
                  <Button type="button" className="btn-block" disabled={cart.cartItem===0} onClick={placeOrderHandler}>
                          Place Order
                  </Button>
              </ListGroup>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen
