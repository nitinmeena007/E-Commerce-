import './App.css';
import Header from './component/layout/Header/Header.js';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile' 
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';


function App() {


  const {isAuthenticated, user} = useSelector(state=>state.user)

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });

    store.dispatch(loadUser());

  }, []);

  return (
    <div>
      <Header /> 

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails/>} />
        <Route exact path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>} />
        <Route exact path='/search' element={<Search/>} />
        <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
        <Route exact path='/login' element={<LoginSignUp/>} />
        <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
        <Route exact path='/password/forgot' element={<ForgotPassword/>} />
        <Route exact path='/password/reset/:token' element={<ResetPassword/>} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
