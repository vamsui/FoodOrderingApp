import { Avatar, Box, Grid, Paper, TextField, Typography, Button, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser from UserContext
import Swal from 'sweetalert2';


function Login() {
  const { isLoggedIn, login, logout, useremail, setUserEmailValue } = useUser(); // Access user data and function
  const navigate = useNavigate();
  const paperStyle = { padding: 50, height: '70vh', width: 380, margin: "50px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const [email, setEmail] = useState("");
  const [validemail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");

  const [validpassword, setValidPassword] = useState(true);
  const [users, setUsers] = useState([]);




  const [validationMessages, setValidationMessages] = useState({

    email: '',
    password: '',

  });

  const validateForm = () => {

    const errors = {
      email: '',
      password: '',
    };


    if (!email.trim()) {
      errors.email = 'Please enter a valid email address.';

    }

    if (!password.trim()) {
      errors.password = 'Please enter a valid password.';
    }


    setValidationMessages(errors);


    return !Object.values(errors).some((error) => error);
  };


  const formHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) {

      return;
    }

    try {

      const res = await fetch(
        `http://localhost:8080/v1/login?email=${email}&password=${password}`, {
        method: "GET",

        headers: {
          "content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      //   const responseText = await res.text();
      //console.log(responseText);
      const dat = await res.json();
      setUsers(dat);
      console.log(dat)
      if (dat === true) {
        login();
        setUserEmailValue(email);
        Swal.fire(`Login Successful`)
        navigate("/");

      }
      else {
        Swal.fire(`Entered wrong email or password`)
      }

    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };

  return (
    <div >

      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <h2>Sign in</h2>
          </Grid>
          <div>
            <TextField label='Gmail' placeholder='Enter Gmail' fullWidth required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={{ padding: '12px' }} // Add inline style for padding
            />
            <div style={{ color: 'red' }}>{validationMessages.email}</div>
          </div>
          <div>
            <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              padding="150px"
              style={{ padding: '12px' }} // Add inline style for padding

            />
            <div style={{ color: 'red' }}>{validationMessages.password}</div>
          </div>
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={formHandler}>Sign in</Button>
          <Typography > Do you have an account ?
            <Link href="./Reg" >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>

    </div>
  );
}
export default Login;
