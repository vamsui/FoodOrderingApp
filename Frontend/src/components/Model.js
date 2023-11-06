// Modal.js
import React from 'react';
import { useUser } from './UserContext'; // Import useUser from UserContext
import { useCart } from './CartContext';
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

import "./payment.css";

import "./Model.css";
import Navigationbar from './Navgationbar';
import { useNavigate } from 'react-router-dom'

function Model() {
  //const { cart, addToCart, updateCart } = useCart();
  const [itemcart, setItemCart] = useState([]);
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();
  const { useremail,setUserOrderIdValue } = useUser();


  useEffect(() => {
    fetch('http://localhost:8080/v1/cartall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then((data) => {

        setItemCart(data)
        console.log(itemcart);
      });
  }, []);


console.log(useremail);
  const pay = () => {

    
    const orditemid = uuidv4();
    setUserOrderIdValue(orditemid);

    const orderr = {
      orderid: orditemid,
      items: itemcart, // Assuming `itemcart` contains the list of items in the cart
      totalCost: calculateTotalCost(itemcart), // Implement this function to calculate the total cost
      email:useremail
    };
    console.log(useremail)

    // Make a POST request to your server to save the order
    fetch('http://localhost:8080/v1/saveOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderr),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOrder(data);
        // Handle success (e.g., display a success message or navigate to a success page)
        console.log('Order saved successfully:', data);
        navigate('/Address');
        // After successfully saving the order, you can clear the cart or perform other actions
        // Clear the cart or perform other actions
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message to the user)
        console.error('Error saving order:', error);
      });



   

  };

  const calculateTotalCost = (items) => {
    // Implement this function to calculate the total cost based on the items in the cart
    return items.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const savecart = (item, status) => {


    fetch(
      `http://localhost:8080/v1/orderid?email=${item.email}&itemid=${item.itemid}`,
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
        // If the item already exists in the cart, update its quantity

        const existingCartItem = data;
        console.log(existingCartItem)
        if (status === 'plus') {
          const updatedQuantity = existingCartItem.quantity + 1; // Increase the quantity by 1
          const updatedTotalCost = updatedQuantity * item.cost;
          existingCartItem.email = item.email;
          existingCartItem.quantity = updatedQuantity;
          existingCartItem.totalcost = updatedTotalCost;

        }
        else {
          const updatedQuantity = existingCartItem.quantity - 1; // Decrease the quantity by 1
          const updatedTotalCost = Math.max(updatedQuantity, 0) * item.cost;
          existingCartItem.email = item.email;
          existingCartItem.quantity = Math.max(updatedQuantity, 0);
          existingCartItem.totalcost = updatedTotalCost;

        }

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
            // Update the state with the new array that reflects the updated quantity
            setItemCart((prevItemCart) =>
              prevItemCart.map((item) =>
                item.orderitemid === existingCartItem.orderitemid
                  ? existingCartItem
                  : item
              )
            );
          })
          .catch((error) => {
            console.error('Error updating item quantity in the cart:', error);

          });

      })
      .catch((error) => {
        console.error('Error checking item existence in the cart:', error);
      });

  }


  const deletecart = (item) => {

    {

      // Replace with your API URL
      const apiUrl = `http://localhost:8080/v1/deletecart/${item.orderitemid}`;

      fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Remove the deleted item from the itemcart state
          const updatedItemCart = itemcart.filter((cartItem) => cartItem.orderitemid !== item.orderitemid);
          setItemCart(updatedItemCart);
          Swal.fire("Item deleted successfully from cart");
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    };

  }







return (
  <div className='model-container'  data-testid='model-component'>
    {itemcart && itemcart.length > 0 && (
      <div>
        {itemcart.map((itemcart, cartindex) => {
          console.log(itemcart.quantity);
          return (
            <div className='cart'>
            <div className='cart-item'>
              <img src={itemcart.imageurl} width={200} />
            </div>
            <div className='cart-item'>

              <span> <b>{itemcart.name}</b> </span>
            </div>
            <div className='cart-item'>
              <button className="btn btn-primary"
                onClick={() => savecart(itemcart, 'minus')}


              >-</button>
              <input type="text" class="f" id="lastname"
                value={itemcart.quantity}

              />

              <button className="btn btn-primary"
                onClick={() => savecart(itemcart, 'plus')}



              >+</button>


              <span> Rs. {itemcart.cost * itemcart.quantity} </span>


              <span onClick={() => deletecart(itemcart)}><FaTrash /></span>
            </div>

          </div>
          );
        })}
        
        <div className='price'>
          <p> Total Rs <span></span>
            {
              itemcart.map(item => item.cost * item.quantity).reduce((total, value) => total + value, 0)
            }
          </p>
        </div>
        <div className='price'>
          <button className="btn btn-primary" onClick={() => pay()}>Proceed to Pay</button>
        </div>
      </div>
    )}
    {itemcart && itemcart.length < 1 && (

      <h1 className='center-div'> your cart is empty</h1>
    )
}
  </div>
);

          }
export default Model;
