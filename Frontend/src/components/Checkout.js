import React, { useEffect, useState } from 'react';

import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import ReactDOM from 'react-dom';
import { useHistory, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import useUser from UserContext

import Navigationbar from './Navgationbar';
import "./payment.css";
import Swal from 'sweetalert2';





function Checkout() {

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;
    const [month, setMonth] = useState('')

    const navigate = useNavigate();

    const [year, setYear] = useState('')
    const [cno, setCno] = useState('')
    const [cvv, setCvv] = useState('')
    const [amount, setAmount] = useState('')
    const [name, setName] = useState('')
    const {  userorderid } = useUser();



    useEffect(() => {
        fetch(`http://localhost:8080/v1/findOrder?orderid=${userorderid}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Set the order details in the state
                const totalCost = data.items.reduce((total, item) => total + item.totalcost, 0);
                setAmount(totalCost)

            })
            .catch((error) => {
                console.error('Error fetching order details:', error);
            });
    }, []);

    const handleCancel = () => {
        Swal.fire({
            icon: 'warning', // Set the icon to 'warning'
            title: 'are you sure to cancel the payment',
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



    const [validationMessages, setValidationMessages] = useState({
        cno: '',
        cvv: '',
        month: '',
        year: '',
        name: '',
        amount: '',
    });


    const validateForm = () => {
        const errors = {
            cno: '',
            cvv: '',
            month: '',
            year: '',
            name: '',
            amount: '',
        };
        // Basic form validation
        const cardNumberPattern = /^\d{12}$/;
        if (!cno.match(cardNumberPattern)) {
            errors.cno = 'Please enter a valid 12 digit number.';
        }
        // Validate the CVV (3 digits)
        const cvvPattern = /^\d{3}$/;
        if (!cvv.match(cvvPattern)) {
            errors.cvv = 'Please enter a valid 3 cvv.';
        }
        if (!month) {
            errors.month = 'Please select the month.';
        }
        if (!year) {
            errors.year = 'Please select the year.';
        }
        const namePattern = /^[A-Za-z\s]+$/;
        if (!name.match(namePattern)) {
            errors.name = 'Please enter a valid name.';
        }

        setValidationMessages(errors);


        return !Object.values(errors).some((error) => error);
    };


    const email=()=>{

        console.log(cart);
    }
    const handleNavigation = () => {


        if (!validateForm()) {

            return;
        }
        console.log(userorderid)
        fetch(`http://localhost:8080/v1/findOrder?orderid=${userorderid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {


           // setCart(data);
            fetch(`http://localhost:8080/v1/sendEmail`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((emailResponse) => {
                  if (!emailResponse.ok) {
                    console.error('Failed to send email:');
                  }
                })
                .catch((error) => {
                  console.error('Error sending mail:', error);
                });

        });      





console.log(cart)


        fetch('http://localhost:8080/v1/cartall')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Iterate through the cart items and delete each item
                data.forEach((cartItem) => {
                    fetch(`http://localhost:8080/v1/deletecart/${cartItem.orderitemid}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((deleteResponse) => {
                            if (!deleteResponse.ok) {
                                console.error('Failed to delete cart item with ID:', cartItem.orderitemid);
                            }
                        })
                        .catch((error) => {
                            console.error('Error deleting cart item:', error);
                        });
                });
            })
            .then(() => {
                // All cart items have been deleted
                console.log('All cart items deleted');
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });





        Swal.fire("order is successfully placed");
        setCno('');
        setCvv('');
        setMonth('');
        setAmount('');
        setYear('');
        setName('');
        navigate('/');




    }





    return (
        <div>
            <div className="row ">
                <div className="col-md-7 center-div">
                    <div className="card-header">
                        <h4>Enter your card details</h4>
                    </div>
                    <div className="">
                        <Grid container margin={'15px 10px'} spacing={2}>
                            <Grid item xs={6} >
                                <TextField label="Card number" color='secondary' fullWidth type='number'
                                    variant='outlined' placeholder='12 digit Card number' required
                                    value={cno}
                                    onChange={(event) => setCno(event.target.value)}

                                />
                                <div style={{ color: 'red' }}>{validationMessages.cno}</div>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Cvv" color='secondary' fullWidth type='number'
                                    variant='outlined' placeholder='3 digit cvv' required
                                    value={cvv}
                                    onChange={(event) => setCvv(event.target.value)}
                                />
                                <div style={{ color: 'red' }} >{validationMessages.cvv}</div>

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
                                <div style={{ color: 'red' }}>{validationMessages.month}</div>

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
                                <div style={{ color: 'red' }}>{validationMessages.year}</div>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField label="Name" color='secondary' fullWidth
                                    variant='outlined' placeholder="Card Holder's Name" required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <div style={{ color: 'red' }}>{validationMessages.name}</div>
                            </Grid>

                            <Grid item xs={7}>
                                <TextField label="Amount" color='secondary' fullWidth
                                    variant='outlined' placeholder="enter the amount" required
                                    value={amount}
                                    InputProps={{
                                        readOnly: true,  // Make the field read-only
                                    }}
                            
                                />
                                <div style={{ color: 'red' }}>{validationMessages.amount}</div>
                            </Grid>
                            <Grid item xs={4} marginLeft={'16%'} marginTop={'25px'}>
                                <Button variant='contained' color='secondary'
                                    fullWidth onClick={() => handleCancel()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={4} marginTop={'25px'}>
                                <Button variant='contained' color='success' fullWidth onClick={() => handleNavigation()}>
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
