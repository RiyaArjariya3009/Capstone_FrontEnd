import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import RestaurantOwnerDashboard from './pages/RestaurantOwner/RestaurantOwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import LoginPopup from './components/LoginPopup/LoginPopup';
import RestaurantList from './components/RestaurantList/RestaurantList';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reRender, setReRender] = useState(false); // State to trigger re-render
  const location = useLocation();

  useEffect(() => {
    // Set login state based on localStorage
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, [reRender]); // Dependency array includes reRender to force re-render

  // Determine if Navbar should be hidden based on the current path
  const hideNavbar = location.pathname === '/restaurant-dashboard';

  // Handle login status change (e.g., after logging in or out)
  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      localStorage.removeItem('userId');
    }
    setReRender(prev => !prev); // Toggle reRender state to force re-render
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLogin={() => handleLoginStatus(true)} />}
      <div className="app">
        {!hideNavbar && <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} onSignOut={() => handleLoginStatus(false)} />}
         <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/restaurant-list' element={<RestaurantList />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/customer/:restaurantId' element={<CustomerDashboard />} />
          <Route path='/restaurant-dashboard/*' element={<RestaurantOwnerDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;










/*import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import RestaurantOwnerDashboard from './pages/RestaurantOwner/RestaurantOwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import LoginPopup from './components/LoginPopup/LoginPopup';
import RestaurantList from './components/RestaurantList/RestaurantList';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set login state based on localStorage
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  // Determine if Navbar should be hidden based on the current path
  //const hideNavbar = location.pathname === '/restaurant-dashboard' || 
                //     location.pathname.startsWith('/customer');
  const hideNavbar = location.pathname === '/restaurant-dashboard'

  // Handle login status change (e.g., after logging in or out)
  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      localStorage.removeItem('userId');
    }
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLogin={() => handleLoginStatus(true)} />}
      <div className="app">
        {!hideNavbar && <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} onSignOut={() => handleLoginStatus(false)} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/restaurant-list' element={<RestaurantList />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/customer/:restaurantId' element={<CustomerDashboard />} />
          <Route path='/restaurant-dashboard/*' element={<RestaurantOwnerDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;*/











/*import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import RestaurantOwnerDashboard from './pages/RestaurantOwner/RestaurantOwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import LoginPopup from './components/LoginPopup/LoginPopup';
import RestaurantList from './components/RestaurantList/RestaurantList';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
 // const hideNavbar = location.pathname === '/restaurant-dashboard' || location.pathname.startsWith('/customer');
  const hideNavbar = location.pathname === '/restaurant-dashboard'
   return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        {!hideNavbar && <Navbar setShowLogin={setShowLogin} />}
       { /*<Navbar setShowLogin={setShowLogin} />}*/
       /* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/restaurant-list' element={<RestaurantList/>}/>
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/customer/:restaurantId' element={<CustomerDashboard />} />
          <Route path='/restaurant-dashboard/*' element={<RestaurantOwnerDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;*/

/*import React from 'react'
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import {Route,Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import RestaurantOwnerDashboard from "./pages/RestaurantOwner/RestaurantOwnerDashboard"
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard'
import LoginPopup from './components/LoginPopup/LoginPopup';
import AddRestaurantPage from './pages/AddRestaurantDetail/AddRestaurantPage'


const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  const location = useLocation();
  const hideNavbar = location.pathname === '/restaurant-dashboard' || location.pathname === '/customer-dashboard';
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
    {!hideNavbar && <Navbar setShowLogin={setShowLogin} />}
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/restaurant-dashboard" element={<RestaurantOwnerDashboard />} />
        <Route path='/add-restaurant' element={<AddRestaurantPage />} />
        
      </Routes>

    </div>
    </>
  )
}

export default App;*/
/*import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import RestaurantOwnerDashboard from "./pages/RestaurantOwner/RestaurantOwnerDashboard";
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Navbar from './components/Navbar/Navbar';
import AddRestaurantPage from './pages/AddRestaurantDetail/AddRestaurantPage';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/restaurant-dashboard/add-restaurant') || location.pathname === '/customer-dashboard';

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        {!hideNavbar && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/restaurant-dashboard" element={<RestaurantOwnerDashboard />} />
          <Route path='/add-restaurant' element={<AddRestaurantPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;*/


