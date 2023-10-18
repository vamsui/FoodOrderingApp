
import Form from 'react-bootstrap/Form'
import './RestaurantList.css'; // Import your CSS file
import mainheaderImage from "../assests/headerBanner.jpg";
import Navigationbar from './Navgationbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Import useUser from UserContext
import { useUser } from './UserContext'; // Import useUser from UserContext

import MealsSummary from './MealsSummary';
import { v4 as uuidv4 } from 'uuid';



function Menu() {


  const userContext = useUser(); // Get the user context object

  // Access the menulist property from the user context object
  const menulist = userContext.menulist;
  const [items, setItems] = useState([]);
  const [selecteditem, setselecteditem] = useState(null);
  const [search, setSearch] = useState('');
  const { cart, addToCart ,updateCart} = useCart();
  const{isLoggedIn,useremail}=useUser();

  useEffect(() => {
    // Fetch restaurant data from the backend API
    fetch(`http://localhost:8080/v1/getmenu?restid=${menulist}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        console.log(menulist);

      })
      .catch((error) => {
        console.error('Error fetching restaurant data:', error);
      });
  }, [menulist]);

  const searchHandler = (event) => {
    setSearch(event.target.value);
    setselecteditem(null);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const updatecart = (item, orderitemid) => {
    // Create an object representing the cart item to be saved or updated
    const cartItem = {
      orderitemid, // Use the provided or generated unique orderitemid
      itemid: item.itemid, // Keep the same itemid
      email: useremail,
      name: item.name,
      cost: item.cost,
      quantity: 1, // You can set the initial quantity here
      totalcost: item.cost, // Set the initial total cost
      imageurl: item.imageurl,
    };

    
  
    // Make the API request to save or update the cart item with its unique orderitemid
    fetch('http://localhost:8080/v1/savecart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.quantity)
        addToCart(data);
        console.log(cart)
      //  console.log('Item added to cart:', data);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };
  





  const savecart=(item)=>{

    fetch(
      `http://localhost:8080/v1/orderid?email=${useremail}&itemid=${item.itemid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {


        if (data.email===useremail && data.quantity>0) {
          // If the item already exists in the cart, update its quantity
    
          const existingCartItem = data;
          const updatedQuantity = existingCartItem.quantity + 1; // Increase the quantity by 1
          const updatedTotalCost = updatedQuantity * item.cost;
          existingCartItem.quantity = updatedQuantity;
          existingCartItem.totalcost = updatedTotalCost;
  
          // Make a PUT request to update the item in the cart
          fetch('http://localhost:8080/v1/savecart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingCartItem),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              return response.json();
            })
            .then((updatedData) => {
                addToCart(updatedData)
                console.log(cart)

              // Handle the response, e.g., update your cart state
            //  console.log('Item quantity increased in the cart:', updatedData);
            })
            .catch((error) => {
              console.error('Error updating item quantity in the cart:', error);
            });
        } else {
          // If the item doesn't exist in the cart, save it as a new item with a generated orderitemid
          const orderitemid = uuidv4();
          updatecart(item, orderitemid);
        }
      })
      .catch((error) => {
        console.error('Error checking item existence in the cart:', error);
      });

  }

  const handlecart =(item) =>{


   {isLoggedIn?(savecart(item)): alert("Login into your account")}

   
 
  }

  return (
    <div className='body'>
      <Navigationbar />
      <div className={"main-image"}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>

      <MealsSummary />

      <div className="container mt-3">

        <Form className='d-flex justify-content-center align-items-center mt-3'>

          <Form.Group className=" mx-2 col-lg-4" controlId="formBasicEmail">

            <Form.Control type="text"
              onChange={searchHandler}
              placeholder="Search food itemss" />
          </Form.Group>
          <button className='btn text-light col-lg-1' style={{ background: "#ed4c67" }}>Submit</button>
        </Form>
        <section className='item_section mt-4 container'>
          <h2 className='px-4' style={{ fontWeight: 400 }}>Menu List</h2>
          <div className='row' style={{ width: '75rem', border: "none" }}>
            {filteredItems.map((item) => (
              <div className="col-md-6 " key={item.restid}>
                <div className='card mt-2 mb-2 item-card'>
                  <div className='flex-container'>
                    <div>
                      <img src={item.imageurl}
                        className='cd1'
                        alt='items.itemname'
                      />
                    </div>
                    <div className='cd2 order-controls'>
                      <h5 className='card-title'>{item.name}</h5>
                      <p className='card-text'>{item.description}</p>
                      <p className='card-text'>{item.cost} </p>
                      
                      <button
                        className="btn btn-primary" onClick={ () => handlecart(item)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div className='card-body'>
                    <div className="order-controls">

                    </div>

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

export default Menu;