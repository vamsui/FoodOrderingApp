import { Avatar, Box, Grid, Paper, TextField, Typography, Button, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import { useEffect, useState, useNavigate } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'


function Reg() {


    const paperStyle = { padding: 50, height: '120vh', width: 480, margin: "40px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const [Regid, setId] = useState("");
    const [firstname, setFirstName] = useState("");
    const [validfirstname, setValidFirstName] = useState(true);
    const [lastname, setLasttName] = useState("");
    const [validlastname, setValidLastName] = useState(true);
    const [email, setEmail] = useState("");
    const [validemail, setValidEmail] = useState(true);
    const [password, setPassword] = useState("");

    const [validpassword, setValidPassword] = useState(true);
    const [confirmpassword, setConfirmPassword] = useState("");

    const [validconfirmpassword, setValidConfirmPassword] = useState(true);
    const [mobile, setMobile] = useState("");

    const [validmobile, setValidMobile] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [emailExists, setEmailExists] = useState([]);


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
        setValidFirstName(true);

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

        if (!isPasswordValid(password)) {
            setValidPassword(false);
            setError(
                'Password must be at least 8 characters and contain one special character, one number, and one lowercase letter.'
            );

            return false;
        }
        setValidPassword(true);

        if (password !== confirmpassword) {
            setValidConfirmPassword(false);
            setError('Passwords do not match.');
            //alert('Passwords do not match.');
            return false;
        }
        setValidConfirmPassword(true);
        if (!isMobileValid(mobile)) {
            setValidMobile(false);
            setError('Mobile number is invalid.');
            //alert('Mobile number is invalid.');
            return false;
        }

        setValidMobile(true);

        setError('');
        return true;
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
            alert("Email already exists");
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
        alert("Registration is successful");
        setId("");
        setFirstName("");
        setLasttName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMobile("");
        setUsers("");


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
                        {!validfirstname && <p>Please enter valid  Firstname.</p>}

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
                        {!validlastname && <p>Please enter valid  Lastname.</p>}
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
                        {!validemail && <p>Please enter valid  Gmail.</p>}
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
                        {!validpassword && <p>Please enter valid  password.</p>}
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
                        {!validconfirmpassword && <p>Passwords do not match.</p>}

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

                        {!validmobile && <p>Please enter valid number.</p>}
                    </div>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={formHandler}>Sign in</Button>
                    
                </Paper>
            </Grid>

        </div>
    );
}
export default Reg;
