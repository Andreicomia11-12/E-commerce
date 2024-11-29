import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/userActions';

import ProtectedRoute from './components/route/protectedRoute';
import store from './store';
import { ToastContainer } from 'react-toastify';

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ProtectedRoute - Only authenticated users can access the Profile page */}
            <Route
              path="/me"
              element={<ProtectedRoute element={<Profile />} />}
            />
          </Routes>
          <ToastContainer />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
