import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import "./payment.css";
import Navigationbar from './Navgationbar';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


function Payment() {


    const [firstname, setFirstName] = useState("");

    const [lastname, setLasttName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [state, setState] = useState("");

    const location = useLocation();

    // const orderid = location.state.order;

    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [mobile, setMobile] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    const isNameValid = (name) => {
        // Regular expression to allow letters followed by optional numbers at the end
        const nameRegex = /^[A-Za-z]+(?:\d+)?$/;
        return nameRegex.test(name);
    };

    const isStateValid = (state) => {
        // Regular expression to allow letters followed by optional numbers at the end
        const nameRegex = /^[A-Za-z]+(?:\d+)?$/;
        return nameRegex.test(state);
    };

    const isCityValid = (city) => {
        // Regular expression to allow letters followed by optional numbers at the end
        const nameRegex = /^[A-Za-z]+(?:\d+)?$/;
        return nameRegex.test(city);
    };


    const isEmailValid = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };



    const isMobileValid = (mobile) => {
        // Check if the mobile number has exactly 10 digits
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };


    const isZipcodeValid = (mobile) => {
        // Check if the mobile number has exactly 10 digits
        const zipRegex = /^\d{6}$/;
        return zipRegex.test(zipcode);
    };



    const [validationMessages, setValidationMessages] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const validateForm = () => {
        const errors = {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
        };

        if (!isNameValid(firstname)) {
            errors.firstname = 'Please enter a valid Firstname.';
        }

        if (!isNameValid(lastname)) {
            errors.lastname = 'Please enter a valid Lastname.';
        }

        if (!firstname.trim()) {
            errors.firstname = 'First name is required.';
        }

        if (!lastname.trim()) {
            errors.lastname = 'Last name is required.';
        }

        if (!isEmailValid(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (!isMobileValid(mobile)) {
            errors.mobile = 'Mobile number is invalid.';
        }

        if (!isCityValid(city)) {
            errors.city = 'City is invalid.';
        }

        if (!isStateValid(state)) {
            errors.state = 'State is invalid.';
        }

        if (!isZipcodeValid(zipcode)) {
            errors.zipcode = 'Zipcode is invalid.';
        }

        if (!address.trim()) {
            errors.address = 'Address is required.';
        }

        setValidationMessages(errors);

        setError('');
        return !Object.values(errors).some((error) => error); // Return true if there are no errors
    };

    const [error, setError] = useState([]);


    const handleCancel = () => {
        Swal.fire({
          icon: 'warning', // Set the icon to 'warning'
          title: 'are you sure to cancel your order',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {




            
            // Handle confirmed logic here
            // For example, navigate to 'Model'
            navigate('/');
          } else if (result.isDismissed) {
            // Handle dismissal logic here
          }
        });
      };




    const placeorder = () => {
        if (!validateForm()) {

            return;
        }


        const dataToSubmit = {

            firstname,
            lastname,
            mobile,
            email,
            address,
            city,
            state,
            zipcode,
        }
        fetch("http://localhost:8080/v1/saveaddress", {
            method: 'POST',
            headers: {
                "content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }, body: JSON.stringify(dataToSubmit)
        }).then(response => response.json())
            .then(json => console.log(json))

        setFirstName("");
        setLasttName("");
        setMobile("");
        setEmail("");
        setAddress("");
        setCity("");
        setState("");
        setZipcode("");

        Swal.fire("address is added proceeding towards payment")
        navigate("/Checkout")
    }
    return (
        <div>
            <div className="row" >

                <div className="col-md-7 center-div" >
                    <div className="card">
                        <div className="card-header">
                            <h4>Enter your address</h4>
                        </div>
                        <div className="card-body">

                            <div className="row">


                                <Grid container margin={'15px 10px'} spacing={2}>

                                    <Grid item xs={6} >
                                        <TextField label="Firstname" color='secondary' fullWidth type='text'
                                            variant='outlined' placeholder='Enter your firtsname' required
                                            value={firstname}
                                            onChange={(event) => setFirstName(event.target.value)}

                                        />

                                        <div style={{ color: 'red' }}>{validationMessages.firstname}</div>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Lastname" color='secondary' fullWidth type='text'
                                            variant='outlined' placeholder='Enter your lastsname' required
                                            value={lastname}
                                            onChange={(event) => setLasttName(event.target.value)}

                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.lastname}</div>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Phonenumber" color='secondary' fullWidth type='number'
                                            variant='outlined' placeholder='Enter your phonenumber' required
                                            value={mobile}
                                            onChange={(event) => setMobile(event.target.value)}
                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.mobile}</div>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Gmail" color='secondary' fullWidth type='text'
                                            variant='outlined' placeholder='enter your gmail' required

                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.email}</div>

                                    </Grid>


                                    <Grid item xs={12}>
                                        <TextField label="Address" rows="3" color='secondary' fullWidth type='text'
                                            variant='outlined' placeholder="Enter your address" required
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.address}</div>


                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField label="City" color='secondary' fullWidth type='text'
                                            variant='outlined' placeholder="Enter your city" required
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.city}</div>


                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField label="State" rows="3" color='secondary' fullWidth type='text'
                                            variant='outlined' placeholder="Enter your state" required
                                            value={state}
                                            onChange={(event) => setState(event.target.value)}

                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.state}</div>


                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField label="Pincode" rows="3" color='secondary' fullWidth type='number'
                                            variant='outlined' placeholder="Enter your pincode" required
                                            value={zipcode}
                                            onChange={(event) => setZipcode(event.target.value)}
                                        />
                                        <div style={{ color: 'red' }}>{validationMessages.zipcode}</div>


                                    </Grid>



                                    <Grid item xs={6} marginTop={'25px'}>
                                        <Button variant='contained' color='primary' fullWidth onClick={() => handleCancel()} >
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} marginTop={'25px'}>
                                        <Button variant='contained' color='success' fullWidth onClick={() => placeorder()} >
                                            Place your order
                                        </Button>
                                    </Grid>
                                </Grid>


                            </div>

                        </div>
                    </div>
                </div>



            </div>
        </div>

    )
}
export default Payment;
