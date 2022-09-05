import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./screen/ProductDetails";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingScreen from "./screen/ShippingScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="my-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/orders/:id" element={<OrderScreen/>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
