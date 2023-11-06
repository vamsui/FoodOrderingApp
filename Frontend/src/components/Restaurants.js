import React from 'react';

import { useState, useEffect } from 'react';
import './RestaurantList.css'; // Import your CSS file
import Form from 'react-bootstrap/Form'
import Navigationbar from './Navgationbar';
import { useUser } from './UserContext'; // Import useUser from UserContext
import { useNavigate } from 'react-router-dom';


function RestaurantList() {
  const navigate = useNavigate();
  const userContext = useUser(); // Get the user context object

  // Access the menulist property from the user context object

  // Now you can use menulist as needed


  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    // Fetch restaurant data from the backend API
    fetch('http://localhost:8080/v1/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching restaurant data:', error);
      });
  }, []);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedRestaurant(null); // Clear selected restaurant when searching
  };


  const filteredRestaurants = restaurants.filter((restaurant) =>

    restaurant.restaurantname.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const menuHandler = (restaurant) => {
    setSelectedRestaurant(restaurant);

    userContext.menulist = restaurant.restid
    navigate('/restmenu')
  };

  return (
    <div className='body'>

      <div className="container mt-3">

        <Form className='d-flex justify-content-center align-items-center mt-3'>

          <Form.Group className=" mx-2 col-lg-4" controlId="formBasicEmail">

            <Form.Control type="text"
              onChange={handleSearchChange}
              placeholder="Search Restaurant" />
          </Form.Group>
          <button className='btn text-light col-lg-1' style={{ background: "#ed4c67" }}>Submit</button>
        </Form>

        <section className='item_section mt-4 container'>
          <h2 className='px-4' style={{ fontWeight: 400 }}>Restaurants in Mumbai Open now</h2>

          <div className="row" style={{ width: '75rem', border: "none" }}>
            {filteredRestaurants.map((restaurant) => (
              <div className="col-md-4" key={restaurant.restid}>
                <div className="card mb-4 mt-2   restaurant-card" >
                  <img
                    src={restaurant.imageurl}
                    className=" cd"
                    alt={restaurant.restaurantname}
                  />
                  <div className="card-body" >
                    <h5 className="card-title">{restaurant.restaurantname}</h5>
                    <p className="card-text">{restaurant.description}</p>
                    <p className="card-text">Address: {restaurant.address}</p>
                    <p className="card-text">Phone: {restaurant.mobile}</p>
                    <button
                      className="btn btn-primary" onClick={() => menuHandler(restaurant)}>
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default RestaurantList;
