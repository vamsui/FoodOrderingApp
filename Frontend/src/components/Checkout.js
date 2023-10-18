import React, {useEffect, useState} from 'react';

import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import Navigationbar from './Navgationbar';
import "./payment.css";

function Checkout()
{

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [bank, setBank] = useState('')

    const handleNavigation = () => {
        
    }

   



 
    return (
        <div>
            <Navigationbar/>
            <div className="row ">
                <div className="col-md-7 center-div">
            <div className="card-header">
            <h4>Enter your card details</h4>
        </div>
                <div className="">
        <Grid container margin={'15px 10px'} spacing={2}>
                            <Grid item xs={6} >
                                <TextField label="Card number" color='secondary' fullWidth type='number'
                                    variant='outlined' placeholder='12 digit Card number' required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Cvv" color='secondary' fullWidth type='number'
                                    variant='outlined' placeholder='3 digit cvv' required />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{ display: 'inline' }}> Valid Until </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Select value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    name="month" size="small" displayEmpty required>
                                    <MenuItem value="" disabled>Month</MenuItem>
                                    <MenuItem value={'January'}>January</MenuItem>
                                    <MenuItem value={'February'}>February</MenuItem>
                                    <MenuItem value={'March'}>March</MenuItem>
                                    <MenuItem value={'April'}>April</MenuItem>
                                    <MenuItem value={'May'}>May</MenuItem>
                                    <MenuItem value={'June'}>June</MenuItem>
                                    <MenuItem value={'July'}>July</MenuItem>
                                    <MenuItem value={'August'}>August</MenuItem>
                                    <MenuItem value={'September'}>September</MenuItem>
                                    <MenuItem value={'October'}>October</MenuItem>
                                    <MenuItem value={'November'}>November</MenuItem>
                                    <MenuItem value={'December'}>December</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <Select value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    name='year' size='small' displayEmpty required>
                                    <MenuItem value="" disabled>Year</MenuItem>
                                    <MenuItem value={'2023'} >2023</MenuItem>
                                    <MenuItem value={'2024'} >2024</MenuItem>
                                    <MenuItem value={'2025'} >2025</MenuItem>
                                    <MenuItem value={'2026'} >2026</MenuItem>
                                    <MenuItem value={'2027'} >2027</MenuItem>
                                    <MenuItem value={'2028'} >2028</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField label="Name" color='secondary' fullWidth
                                    variant='outlined' placeholder="Card Holder's Name" required />
                            </Grid>
                            <Grid item xs={4} marginLeft={'16%'} marginTop={'25px'}>
                                <Button variant='contained' color='secondary'
                                    fullWidth onClick={handleNavigation}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={4} marginTop={'25px'}>
                                <Button variant='contained' color='success' fullWidth >
                                    Pay
                                </Button>
                            </Grid>
                        </Grid>
                        </div>
                        </div>
                        </div>
                        </div>

    )
}



export default Checkout;
