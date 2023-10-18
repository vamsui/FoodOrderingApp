import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import "./payment.css";
import Navigationbar from './Navgationbar';



 function Payment() {


    const [firstname, setFirstName] = useState("");
    const [validfirstname, setValidFirstName] = useState(true);
    const [lastname, setLasttName] = useState("");
    const [validlastname, setValidLastName] = useState(true);
    const [email, setEmail] = useState("");
    const [validemail, setValidEmail] = useState(true);
    const [address, setAddress] = useState("");

    const [validaddress, setValidAddress] = useState(true);
    const [state, setState] = useState("");
    const [validstate, setValidState] = useState(true);
    

    const [city, setCity] = useState("");
    const [validcity, setValidCity] = useState(true);
    
    const [zipcode, setZipcode] = useState("");
    const [validzipcode, setValidZipcode] = useState(true);
    
    const [mobile, setMobile] = useState("");

    const [validmobile, setValidMobile] = useState(true);
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


    const validateForm = () => {



        if (!isNameValid(firstname)) {
            setValidFirstName(false);
            //alert('First name is invalid.');
            return false;
        }
        setValidFirstName(true);

        if (!isNameValid(lastname)) {
            setValidLastName(false);
            //  alert('Last name is invalid.');
            return false;
        }
        setValidLastName(true);



        if (!firstname.trim()) {
            //   alert('Enter your name');
            setValidFirstName(false);
            setError('First name and last name are required.');
            return false;
        }

        if (!address.trim()) {
            //   alert('Enter your name');
            setValidAddress(false);
            setError('First name and last name are required.');
            return false;
        }

        setValidFirstName(true);
        setValidAddress(true);

        if (!lastname.trim()) {
            //   alert('Enter your name');
            setValidLastName(false);
            setError('Last name and last name are required.');
            return false;
        }

        setValidLastName(true);

        if (!isEmailValid(email)) {
            setValidEmail(false);
            setError('Please enter a valid email address.');
            // alert('Please enter a valid email address.');
            return false;
        }
        setValidEmail(true);


        if (!isMobileValid(mobile)) {
            setValidMobile(false);
            setError('Mobile number is invalid.');
            //alert('Mobile number is invalid.');
            return false;
        }

        setValidMobile(true);

        if(!isCityValid(city)){
            setValidCity(false);
            return false;
        }
        setValidCity(true);

        if(!isStateValid(state)){
            setValidState(false);
            return false;
        }
        setValidState(true);




        if (!isZipcodeValid(zipcode)) {
            setValidZipcode(false);
            setError('Zipcode number is invalid.');
            //alert('Mobile number is invalid.');
            return false;
        }

        setValidZipcode(true);


        if (!state.trim()) {
            //   alert('Enter your name');
            setValidState(false);
            setError('state field are required.');
            return false;
        }
        
        setValidState(true);


        if (!city.trim()) {
            //   alert('Enter your name');
            setValidCity(false);
            setError('city is required.');
            return false;
        }
        
        setValidCity(true);



        setError('');
        return true;
    };

    const [error, setError] = useState([]);





    const placeorder=()=>{
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

        alert("order placed successfully")
        navigate("./Checkout")
    }
    return (
        <div>    <Navigationbar/>

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
                                    
                                    {!validfirstname && <p>Please enter valid  Firstname.</p>}
                            </Grid>
                            <Grid item xs={6}>
                            <TextField label="Lastname" color='secondary' fullWidth type='text'
                                    variant='outlined' placeholder='Enter your lastsname' required 
                                    value={lastname}
                                    onChange={(event) => setLasttName(event.target.value)}
                                
                                    />
                                                            {!validlastname && <p>Please enter valid  Lastname.</p>}
                            </Grid>
                            <Grid item xs={6}>
                            <TextField label="Phonenumber" color='secondary' fullWidth type='number'
                                    variant='outlined' placeholder='Enter your phonenumber' required 
                                    value={mobile}
                                    onChange={(event) => setMobile(event.target.value)}
                                    />
                                                            {!validmobile && <p>Please enter valid  mobile number.</p>}

                            </Grid>
                            <Grid item xs={6}>
                            <TextField label="Gmail" color='secondary' fullWidth type='text'
                                    variant='outlined' placeholder='enter your gmail' required
                                    
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    />
                                                            {!validemail && <p>Please enter valid  email.</p>}

                            </Grid>
                            

                            <Grid item xs={12}>
                                <TextField label="Address" rows="3" color='secondary' fullWidth type='text'
                                    variant='outlined' placeholder="Enter your address" required 
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    />
                                                            {!validaddress && <p>Please enter valid  address.</p>}

                            </Grid>

                            <Grid item xs={4}>
                                <TextField label="City" color='secondary' fullWidth type='text'
                                    variant='outlined' placeholder="Enter your city" required 
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    />
                                                            {!validcity && <p>Please enter valid  city.</p>}

                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="State" rows="3" color='secondary' fullWidth type='text'
                                    variant='outlined' placeholder="Enter your state" required 
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                    
                                    />
                                                            {!validstate && <p>Please enter valid  state.</p>}

                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Pincode" rows="3" color='secondary' fullWidth type='number'
                                    variant='outlined' placeholder="Enter your pincode" required 
                                    value={zipcode}
                                    onChange={(event) => setZipcode(event.target.value)}
                                    />
                                                            {!validzipcode && <p>Please enter valid  Zipcode.</p>}

                            </Grid>



                            <Grid item xs={12} marginTop={'25px'}>
                                <Button variant='contained' color='success' fullWidth onClick={() =>placeorder()} >
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
