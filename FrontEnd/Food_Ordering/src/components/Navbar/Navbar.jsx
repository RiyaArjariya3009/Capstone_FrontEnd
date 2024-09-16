/*import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin, isLoggedIn }) {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#app-download' 
          onClick={() => setMenu("category")} 
          className={menu === "category" ? "active" : ""}
        >
          category
        </a>
        {isLoggedIn && (
          <Link 
            to='/add-restaurant' 
            onClick={() => setMenu("add-restaurant")} 
            className={menu === "add-restaurant" ? "active" : ""}
          >
            Add Restaurant
          </Link>
        )}
        </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="basket" />
          <div className="dot"></div>
        </div>
        {!isLoggedIn && (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/


/*import React from 'react'
import './Navbar.css'
import { useState } from 'react';
import {Link} from 'react-router-dom';

import {assets} from '../../assets/assets'
function Navbar({setShowLogin}) {
  const[menu,setMenu]=useState("home")
  return (
    <div className="navbar">
    
     
      <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
          <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
          <a href='#app-download' onClick={()=>setMenu("category")} className={menu==="category"?"active":""}>category</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
       </ul>
       <div class="navbar-right">
          <img src={assets.search_icon} alt=""/>
          <div className="navbar-search-icon">
             <img src={assets.basket_icon} alt=""/>
             <div className="dot"></div> 
          </div>
          <button onClick={()=>setShowLogin(true)}>sign in</button>
       </div>
    </div> 
  )
}

export default Navbar;*/
/*import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#app-download' 
          onClick={() => setMenu("category")} 
          className={menu === "category" ? "active" : ""}
        >
          category
        </a>
        <a 
          href='#footer' 
          onClick={() => setMenu("contact-us")} 
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <Link to="/cart" className="navbar-cart-icon">
          <img src={assets.basket_icon} alt="basket" />
          <div className="dot"></div>
        </Link>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
}

export default Navbar;*/
/*import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if userId is present in localStorage to determine login status
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!userId);
  }, []);

  const handleSignOut = () => {
    // Clear user data from localStorage and update login state
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#app-download' 
          onClick={() => setMenu("category")} 
          className={menu === "category" ? "active" : ""}
        >
          category
        </a>
        <a 
          href='#footer' 
          onClick={() => setMenu("contact-us")} 
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
        {isLoggedIn && (
          <>
            <Link 
              to='/customer/:restaurantId' 
              onClick={() => setMenu("/customer/:restaurantId")} 
              className={menu === "/customer/:restaurantId" ? "active" : ""}
            >
               Cart
            </Link>
            <Link 
              to='/cart' 
              className="navbar-cart-icon"
            >
              <img src={assets.basket_icon} alt="basket" />
              <div className="dot"></div>
            </Link>
          </>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <button onClick={handleSignOut}>sign out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/
/*import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userId is present in localStorage to determine login status
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId); // Set isLoggedIn to true if userId exists, otherwise false
  }, []);

  const handleSignOut = () => {
    // Clear user data from localStorage and update login state
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
     {/*   <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#restaurant-list' 
          onClick={() => setMenu("restaurant-list")} 
          className={menu === "restaurant-list" ? "active" : ""}
        >
          restaurant
        </a>*/
      
      /*  {isLoggedIn && (
          <>
            <Link 
              to='/customer/:restaurantId' 
              onClick={() => setMenu("/customer/:restaurantId")} 
              className={menu === "/customer/:restaurantId" ? "active" : ""}
            >
            </Link>
            <Link
             to='#footer' 
             onClick={() => setMenu("contact-us")} 
            className={menu === "contact-us" ? "active" : ""}
           >
          contact-us
          </Link>
            <Link 
              to='/cart' 
              className="navbar-cart-icon"
            >
              <img src={assets.basket_icon} alt="basket" />
              <div className="dot"></div>
            </Link>
          </>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <button onClick={handleSignOut}>sign out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/
/*import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {
  // Initialize isLoggedIn based on the value in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    // Update login status if localStorage changes
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const handleSignOut = () => {
    // Clear user data from localStorage and update login state
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
     {/*   <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#restaurant-list' 
          onClick={() => setMenu("restaurant-list")} 
          className={menu === "restaurant-list" ? "active" : ""}
        >
          restaurant
        </a>}*/
      
       /* {isLoggedIn && (
          <>
            <Link 
              to='/customer/:restaurantId' 
              onClick={() => setMenu("/customer/:restaurantId")} 
              className={menu === "/customer/:restaurantId" ? "active" : ""}
            >
            </Link>
            <Link
             to='#footer' 
             onClick={() => setMenu("contact-us")} 
            className={menu === "contact-us" ? "active" : ""}
           >
          contact-us
          </Link>
            <Link 
              to='/cart' 
              className="navbar-cart-icon"
            >
              <img src={assets.basket_icon} alt="basket" />
              <div className="dot"></div>
            </Link>
          </>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <button onClick={handleSignOut}>sign out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/
/*import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {
  // Initialize isLoggedIn based on the value in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null to indicate loading
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    // Update login status based on localStorage
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId); // Set isLoggedIn based on whether userId exists
  }, []);

  const handleSignOut = () => {
    // Clear user data from localStorage and update login state
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to the home page
  };

  // Prevent rendering until login status is known
  if (isLoggedIn === null) {
    return null; // Or you can return a loading spinner here if you want
  }

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
     {/*   <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#restaurant-list' 
          onClick={() => setMenu("restaurant-list")} 
          className={menu === "restaurant-list" ? "active" : ""}
        >
          restaurant
        </a>}*/
      
       /* {isLoggedIn && (
          <>
            <Link 
              to='/customer/:restaurantId' 
              onClick={() => setMenu("/customer/:restaurantId")} 
              className={menu === "/customer/:restaurantId" ? "active" : ""}
            >
            </Link>
            <Link
             to='#footer' 
             onClick={() => setMenu("contact-us")} 
            className={menu === "contact-us" ? "active" : ""}
           >
          contact-us
          </Link>
            <Link 
              to='/cart' 
              className="navbar-cart-icon"
            >
              <img src={assets.basket_icon} alt="basket" />
              <div className="dot"></div>
            </Link>
          </>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <button onClick={handleSignOut}>sign out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/
/*import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin, isLoggedIn, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/'); // Redirect to the home page after sign out
  };

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          className="menu-link"
        >
          home
        </Link>
        {isLoggedIn && (
          <>
            <Link 
              to='/customer/:restaurantId' 
              className="menu-link"
            >
              customer dashboard
            </Link>
            <Link 
              to='/cart' 
              className="navbar-cart-icon"
            >
              <img src={assets.basket_icon} alt="basket" />
              <div className="dot"></div>
            </Link>
            <Link 
              to='#footer' 
              className="menu-link"
            >
              contact-us
            </Link>
          </>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <button onClick={handleSignOut}>sign out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;*/

import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin, isLoggedIn, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/'); // Redirect to the home page after sign out
  };

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <Link 
          to='/' 
          className="menu-link"
        >
          home
        </Link>
        {isLoggedIn && (
          <>
            <Link 
              to='/customer/:restaurantId' 
              className="menu-link"
            >
            </Link>
            <Link 
              to='/cart' 
              className="navbar-cart-icon"
            >
              <img src={assets.basket_icon} alt="basket" />
              <div className="dot"></div>
            </Link>
            <Link 
              to='#footer' 
              className="menu-link"
            >
              contact-us
            </Link>
          </>
        )}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <button onClick={handleSignOut}>sign out</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;



