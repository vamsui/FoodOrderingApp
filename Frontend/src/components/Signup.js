import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
function Signup() {
  const navigate = useNavigate();

  const [Regid, setId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [emailExists, setEmailExists] = useState([]); // State to track email existence


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
    const mobileRegex = /^\d{10,15}$/;
    return mobileRegex.test(mobile);
  };

  const validateForm = () => {

    if (!isNameValid(firstname)) {
      alert('First name is invalid.');
      return false;
    }

    if (!isNameValid(lastname)) {
      alert('Last name is invalid.');
      return false;
    }



    if (!firstname.trim() || !lastname.trim()) {
      alert('Enter your name');
      setError('First name and last name are required.');
      return false;
    }

    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.');
      alert('Please enter a valid email address.');
      return false;
    }

    if (!isPasswordValid(password)) {
      setError(
        'Password must be at least 8 characters and contain one special character, one number, and one lowercase letter.'
      );
      alert(
        'Password must be at least 8 characters and contain one special character, one number, and one lowercase letter.'
      );
      return false;
    }

    if (password !== confirmpassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match.');
      return false;
    }

    if (!isMobileValid(mobile)) {
      setError('Mobile number is invalid.');
      alert('Mobile number is invalid.');
      return false;
    }

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





  const handleFormSubmit = (event) => {
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
    navigate("./Login");

  }





  return (
    <div>
      <h1>Registration Details</h1>
      <div class="container mt-4" >
        <form method='post' action='' onSubmit={handleFormSubmit}>
          <div class="form-group">

            <label>First Name</label>
            <input type="text" class="form-control" id="firstname"
              value={firstname}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">

            <label>Last Name</label>
            <input type="text" class="form-control" id="lastname"
              value={lastname}
              onChange={(event) => {
                setLasttName(event.target.value);
              }}
            />
          </div>

          <div class="form-group">

            <label>Email address</label>
            <input type="text" class="form-control" id="useremail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>password</label>
            <input type="password" class="form-control" id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />


          </div>

          <div class="form-group">
            <label>Confirm password</label>
            <input type="password" class="form-control" id="cpassword"
              value={confirmpassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
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
          <div>
            <button class="btn btn-primary mt-4"  >Register</button>

          </div>
        </form>

      </div>


    </div>
  );
}

export default Signup;
