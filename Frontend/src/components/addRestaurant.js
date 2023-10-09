import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
function Addrestaurant() {
  const navigate = useNavigate();

  const [Restid, setId] = useState("");
  const [restaurantname, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [imageurl, setImageUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const dataToSubmit = {
      restaurantname,
      description,
      address,
      mobile,
      imageurl,
    }
    fetch("http://localhost:8080/v1/addrestaurant", {
      method: 'POST',
      headers: {
        "content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }, body: JSON.stringify(dataToSubmit)
    }).then(response => response.json())
      .then(json => console.log(json))
    alert("Restaurant is added");
    setId("");
    setRestaurantName("");
    setDescription("");
    setAddress("");
    setMobile("");
    setImageUrl("");
    setUsers("");
    navigate("./Restaurants");

  }





  return (
    <div>
      <h1>Registration Details</h1>
      <div class="container mt-4" >
        <form method='post' action='' onSubmit={handleFormSubmit}>
          <div class="form-group">

            <label>Restaurant Name</label>
            <input type="text" class="form-control" id="firstname"
              value={restaurantname}
              onChange={(event) => {
                setRestaurantName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">

            <label>Description</label>
            <input type="text" class="form-control" id="lastname"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <div class="form-group">

            <label>Address</label>
            <input type="text" class="form-control" id="useremail"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>Mobile</label>
            <PhoneInput country={'in'} value={mobile} inputProps={{
              required: true,
              style: {
                width: '100%',
                height: '40px' // Adjust the width as needed
              },
            }}
              onChange={(value) => {
                setMobile(value);
              }}
            />
          </div>

          <div class="form-group">
            <label>image_url</label>
            <input type="text" class="form-control" id="imageurl"
              value={imageurl}
              onChange={(event) => {
                setImageUrl(event.target.value);
              }}
            />
          </div>


          <div>
            <button class="btn btn-primary mt-4"  >Add restaurant</button>

          </div>
        </form>

      </div>


    </div>
  );
}

export default Addrestaurant;
