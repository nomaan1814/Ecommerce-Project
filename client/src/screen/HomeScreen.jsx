import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import Loader from "../shared/Loader";
import Alerts from "../shared/Alerts";
const HomeScreen = () => {
  // const [products, setProduct] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    // const fetchprod = async () => {
    //   const { data } = await axios.get("/api/product");
    //   setProduct(data);
    // };
    // fetchprod();
  }, [dispatch]);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alerts variant={"danger"}>{error}</Alerts>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={3}>
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
