import  React, { useState ,useEffect} from'react';
import {FaTimes,FaUser,FaOpencart} from "react-icons/fa";
import {useRef} from 'react';
import { useCart } from './CartContext';
import "./Navigationbar.css";
import { useUser } from './UserContext'; // Import useUser from UserContext
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Navigationbar()

{
    const navigate=useNavigate();
    const { cartquantity } = useCart();

    const [showCart, setShowCart] = useState(false);
  
  
    const navRef=useRef();
    const { isLoggedIn, login, logout } = useUser(); // Access user data and function
    const [cartCount, setCartCount] = useState(0); // State to keep track of cart item count
    const [totalQuantity,setTotalQuantity]=useState("");

    const [itemcart, setItemCart] = useState([]);



    const showNavBar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    const showCartContents = () => {
        setShowCart(true);
        navigate('/Model')
      };
    
      const hideCartContents = () => {
        setShowCart(false);
      };
  

    const handleLogout=()=>{
        logout();
    }


    const aler=()=>{
      Swal.fire("Login into your account")
    }


    return(
    <header>
        <div ><a className="zomato-name" href='/'>Zomato</a></div>

        <nav ref={navRef}>
            
            <li><a href='/'>Home</a></li>
            {isLoggedIn?(
            <li><a href='./Model'>Orders</a></li>):
            (<li><a href='#' onClick={aler}> Orders</a></li>)
            }
            {isLoggedIn?(
            <li><a href='/' onClick={handleLogout}>Logout</a></li>)
            :

            (<li><a href='/Login' >Login</a></li>)}


            <button className='nav-btn nav-close-btn' onClick={showNavBar}>
                <FaTimes/>
            </button>

        </nav>

        <button className='nav-btn' onClick={showNavBar}>
            <FaUser/>
        </button>

        {isLoggedIn?(
          <div>
            <span  className='nav-btn1' onClick={showCartContents}  ><ShoppingCartIcon style={{ marginTop:'8px', fontSize: '31px' }} /  > </span></div>
            )  :
            (<div>
              <span  className='nav-btn1' onClick={aler}  ><ShoppingCartIcon style={{ marginTop:'8px', fontSize: '31px' }} / > </span></div>)
            }
        
       

    </header>
    
    );

}

export default Navigationbar;