import { Avatar, Box, Grid, Paper, TextField, Typography, Button, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import Swal from 'sweetalert2';



function Reg() {


    const paperStyle = { padding: 50, height: '120vh', width: 480, margin: "40px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const [Regid, setId] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLasttName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();

    const isNameValid = (name) => {
        // Regular expression to allow letters followed by optional numbers at the end
        const nameRegex = /^[A-Za-z]+(?:\d+)?$/;
        return nameRegex.test(name);
    };


    const isEmailValid = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        // Regular expression for password validation (8 characters, 1 special char, 1 number, 1 lowercase, 1 uppercase)
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const isMobileValid = (mobile) => {
        // Check if the mobile number has exactly 10 digits
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };


    const [validationMessages, setValidationMessages] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        mobile: '',

    });
    const validateForm = () => {
        const errors = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            mobile: '',
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

        if (!isPasswordValid(password)) {
            errors.password = 'Please enter a valid password.';

        }

        if (password !== confirmpassword) {
            errors.confirmpassword = 'Password do not match.';
        }

        if (!isMobileValid(mobile)) {
            errors.mobile = 'Please enter a valid mobile number.';

        }

        setValidationMessages(errors);

        return !Object.values(errors).some((error) => error); // Return true if there are no errors
    
    };


    const checkEmailExistence = async () => {
        if (!email) {
            return; // Don't make the API call if the email field is empty
        }

        try {

            const res = await fetch(
                `http://localhost:8080/v1/checkemail?email=${email}`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
            const dat = await res.json();
            setUsers(dat);
            console.log(dat)

        } catch (error) {
            console.error("Error checking email existence:", error);
        }
    };

    useEffect(() => {
        console.log(checkEmailExistence());
    }, [email]); // Run the checkEmailExistence function when the email state changes




    const formHandler = (event) => {
        event.preventDefault();
        if (!validateForm()) {

            return;
        }
        //console.log(checkEmailExistence());
        if (users === true) {
            Swal.fire("Email user already registered");
            return;
        }
        const dataToSubmit = {
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            mobile,
        }
        fetch("http://localhost:8080/v1/create", {
            method: 'POST',
            headers: {
                "content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }, body: JSON.stringify(dataToSubmit)
        }).then(response => response.json())
            .then(json => console.log(json))
        console.log(email)
        Swal.fire("Registration is successfully")
        setId("");
        setFirstName("");
        setLasttName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMobile("");
        setUsers("");
        navigate("/Login");


    }




    return (
        <div >

            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        <h2>Sign in</h2>
                    </Grid>
                    <div>
                        <TextField
                            label='First Name'
                            placeholder='Enter First Name'
                            fullWidth
                            required
                            value={firstname}
                            onChange={(event) => setFirstName(event.target.value)}
                            style={{ padding: '12px' }}
                        />
                                    <div style={{ color: 'red' }}>{validationMessages.firstname}</div>

                    </div>
                    <div>
                        <TextField
                            label='Last Name'
                            placeholder='Enter Last Name'
                            fullWidth
                            required
                            value={lastname}
                            onChange={(event) => setLasttName(event.target.value)}
                            style={{ padding: '12px' }}
                        />
                                    <div style={{ color: 'red' }}>{validationMessages.lastname}</div>
                    </div>
                    <div>
                        <TextField
                            label='Gmail'
                            placeholder='Enter Gmail'
                            fullWidth
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ padding: '12px' }}
                        />
                                    <div style={{ color: 'red' }}>{validationMessages.email}</div>
                    </div>
                    <div>
                        <TextField
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            fullWidth
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            style={{ padding: '12px' }}
                        />
                        <div style={{ color: 'red' }}>{validationMessages.password}</div>

                    </div>
                    <div>
                        <TextField
                            label='Confirm Password'
                            placeholder='Confirm password'
                            type='password'
                            fullWidth
                            required
                            value={confirmpassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            style={{ padding: '12px' }}

                        />
                                    <div style={{ color: 'red' }}>{validationMessages.confirmpassword}</div>
                    </div>
                    <div>
                        <TextField country={'in'} label='Mobile' placeholder='phone number' type='number' fullWidth required
                            value={mobile}
                            onChange={(event) => {
                                setMobile(event.target.value);
                            }}
                            padding="150px"
                            style={{ padding: '12px' }} // Add inline style for padding
                        />

<div style={{ color: 'red' }}>{validationMessages.mobile}</div>
                    </div>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={formHandler}>Sign in</Button>
                    
                </Paper>
            </Grid>

        </div>
    );
}
export default Reg;
