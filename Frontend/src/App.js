import React from 'react';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Addrestaurant from './components/addRestaurant';
import RestaurantList from './components/Restaurants';
import Reg from './components/Reg';
import { MenuList } from '@mui/material';
import Navigationbar from './components/Navgationbar';
import { UserProvider } from './components/UserContext';
import menu from './components/Restmenu';
import Menu from './components/Restmenu';
import Model from './components/Model';
import { CartProvider } from './components/CartContext';
import Payment from './components/Address';
import Checkout from './components/Checkout';

/*
function comp()
{
  return(
    <div>
        <Signup/>
    </div>
  );
}
*/
function App() {
  return (
    <UserProvider>
      <CartProvider>
    <div className="App">
        <Routes>


          <Route path='/' element={<RestaurantList />}/>
          <Route path='/Model' element={<Model />}/>
          <Route path='/restmenu' element={<Menu />}/>
          <Route path='/Login' element={<Login/>}/> 
          <Route path='/Reg' element={<Reg/>}/>
          <Route path='/Address' element={<Payment/>}/>
          <Route path='/Checkout' element={<Checkout/>}/>
          
          
          

        </Routes>
    </div>
    </CartProvider>
    </UserProvider>

  );

}

export default App;
