import React from 'react';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Addrestaurant from './components/addRestaurant';
import RestaurantList from './components/Restaurants';
import Reg from './components/Reg';


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
    <div className="App">
        <Routes>

        <Route path='/' element={<Reg />} />
          
        <Route path='/' element={<RestaurantList />} />
        <Route path='/' element={<Addrestaurant />} />
          <Route path='/' element={<Login />} />


        </Routes>
    </div>

  );

}

export default App;
