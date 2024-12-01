import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import ListOrders from './components/order/ListOrders';
import OrderSuccess from './components/cart/OrderSuccess';
import Login from './components/user/login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/userActions';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import OrderDetails from './components/order/OrderDetails';

// Admin Imports
import Dashboard from './components/admin/Dashboard';


import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping   />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<OrderSuccess />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Directly include the Profile component */}
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/orders/me" element={<ListOrders />} />
            <Route path="/order/:id" element={<OrderDetails  />} />

            <Route path="/dashboard/" isAdmin={true} element={<Dashboard />} />
          </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
