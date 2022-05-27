import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams, Link } from "react-router-dom";
// import products from "../products";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { detailsProducts } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import Loader from "../shared/Loader";
import Alerts from "../shared/Alerts";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  //   const product = products.find((p) => {
  //     return p._id === params.id;
  //   });
  // const [product, setProduct] = useState([]);
  useEffect(() => {
    dispatch(detailsProducts(params.id));
    // const fetchprod = async () => {
    //   const { data } = await axios.get(`/api/product/${params.id}`);
    //   setProduct(data);
    // };
    // fetchprod();
  }, [dispatch]);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alerts variant={"danger"}>{error}</Alerts>
      ) : (
        <div>
          <Link to="/" className="text-decoration-none">
            <i className="fas fa-arrow-left"></i>&nbsp; Go BACK
          </Link>
          <Row className="mt-2">
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price:${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <FormControl
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className="btn w-100"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
