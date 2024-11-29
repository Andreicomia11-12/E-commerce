
import { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/Home';

import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/login'
import Register from './components/user/Register';

import { loadUser } from './actions/userActions';

import store from './store';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />

            <Route path="/product/:id" element={<ProductDetails />} />


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
