import { Avatar, Box,Grid,Paper,TextField,Typography,Button,Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import {useEffect, useState } from "react";


function Login() {
  const paperStyle={padding :50,height:'70vh',width:380, margin:"50px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  


  const formHandler = async (event) => {
    event.preventDefault();
    
      try {

        const res= await fetch(
          `http://localhost:8080/v1/login?email=${email}&password=${password}`,{
              method:"GET",

              headers: {
                  "content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
              },
          });

     //   const responseText = await res.text();
        //console.log(responseText);
          const dat= await res.json();
        setUsers(dat);
          console.log(dat)
          if(users === true)
          {
            alert("success");
            return ;
          }
          else
          {
            alert("email or password is wrong");
          }
    
            } catch (error) {
        console.error("Error checking email existence:", error);
      }
    };  





    return (
      <div >

        <Grid>
          <Paper elevation ={20} style ={paperStyle}>
            <Grid align='center'>
            <Avatar style= {avatarStyle}><LockIcon/></Avatar>
            <h2>Sign in</h2>
            </Grid>
            <TextField label='Gmail'   placeholder='Enter Gmail' fullWidth required
            value={email}
            onChange={(event) =>
              {
                setEmail(event.target.value);      
              }}
              style={{ padding: '12px' }} // Add inline style for padding

            />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                value={password}
                onChange={(event) =>
                  {
                    setPassword(event.target.value);      
                  }}
                  padding="150px"
                  style={{ padding: '12px' }} // Add inline style for padding

                />

                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth  onClick={formHandler}>Sign in</Button>
                <Typography > Do you have an account ?
                     <Link href="./Signup" >
                        Sign Up 
                </Link>
                </Typography>
          </Paper>
        </Grid>

      </div>
    );
  }
  export default Login;
  