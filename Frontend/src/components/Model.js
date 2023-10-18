// Modal.js
import React from 'react';
import { useUser } from './UserContext'; // Import useUser from UserContext
import { useCart } from './CartContext';
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import "./Model.css";
import Navigationbar from './Navgationbar';
import { useNavigate } from 'react-router-dom'
function Model() {
  //const { cart, addToCart, updateCart } = useCart();
  const [itemcart, setItemCart] = useState([]);

  const navigate = useNavigate();

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



const pay=()=>{
  
  navigate("/Address");

};



  const savecart=(item,status)=>{


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
          if(status==='plus')
          {
            const updatedQuantity = existingCartItem.quantity + 1; // Increase the quantity by 1
            const updatedTotalCost = updatedQuantity * item.cost;
            existingCartItem.quantity = updatedQuantity;
            existingCartItem.totalcost = updatedTotalCost;
  
          }
          else
          {
            const updatedQuantity = existingCartItem.quantity - 1; // Decrease the quantity by 1
            const updatedTotalCost = Math.max(updatedQuantity, 0) * item.cost;

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


const deletecart=(item)=>{

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
        })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };
  
}




  
  return (

    <div className='model-container'>
      <Navigationbar/>

        {itemcart && itemcart.map((itemcart, cartindex) =>  {
          console.log(itemcart.quantity)
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


                <span  onClick={() => deletecart(itemcart)}><FaTrash /></span>
              </div>

            </div>
          )
        })
      }
      <div className='price'>
        <p> Total Rs <span></span>
          {
            itemcart.map(item => item.cost * item.quantity).reduce((total, value) => total + value, 0)
          }
        </p>
      </div >
      <div className='price'>
        <button className="btn btn-primary" onClick={()=>pay()}>Proceed to Pay</button>
      </div>
    </div >
  )


}

export default Model;
