import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { addToCart, removefromcart } from "../actions/cartActions";
import {
  Link,
  Route,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Alerts from "../shared/Alerts";

const CartScreen = ({ match, location, history }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParms] = useSearchParams();
  const productid = params.id;
  const qty = Number(searchParms.get("qty"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (productid) {
      dispatch(addToCart(productid, qty));
    }
  }, [dispatch, productid, qty]);
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;
  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
  };
  const checkout = () => {
    navigate("/shipping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItem.length === 0 ? (
            <Alerts>
              Your cart is empty !<Link to="/">Go Back</Link>
            </Alerts>
          ) : (
            <ListGroup variant="flush" className="mt-3">
              {cartItem.map((item) => (
                <ListGroupItem>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal (
                  {cartItem.reduce((acc, item) => {
                    return acc + item.qty;
                  }, 0)}
                  ) Items
                </h2>
                $
                {cartItem
                  .reduce((acc, item) => {
                    return acc + item.qty * item.price;
                  }, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItem.length === 0}
                onClick={checkout}
              >
                Proceed to Checkout
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
