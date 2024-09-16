/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantOwnerDashboard.css';
import { FaHome, FaUser, FaSignOutAlt, FaPlus, FaUtensils, FaReceipt } from 'react-icons/fa'; // Import FaReceipt
import AddRestaurantPage from '../AddRestaurantDetail/AddRestaurantPage';
import AddCategoryPage from '../AddCategory/AddCategoryPage';
import AddMenuItems from '../AddMenuItems/AddMenuItems';
import ViewRestaurantAsOwner from '../ViewRestaurantAsOwner/ViewRestaurantAsOwner';
import RestaurantOrders from '../RestaurantOrders/RestaurantOrders';
import Profile from '../ViewProfile/Profile';

const RestaurantOwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="dashboard-container">
      
      <div className="topnav">
        <div className="topnav-left">
          <h2>Restaurant Owner Portal</h2>
        </div>
        <div className="topnav-right">
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </div>
      </div>

    
      <div className="sidenav">
        <div className="sidenav-header">
          <h2>Dashboard</h2>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <FaHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addRestaurant')}>
              <FaPlus className="icon" /> Add Restaurant
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addCategory')}>
              <FaPlus className="icon" /> Add Category
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addMenuItem')}>
              <FaPlus className="icon" /> Add Menu Item
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('viewRestaurant')}>
              <FaUtensils className="icon" /> View Restaurants
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('viewOrders')}>
              <FaReceipt className="icon" /> View Orders
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */
    /*  <div className="main-content">
        {activeComponent === 'addRestaurant' && <AddRestaurantPage />}
        {activeComponent === 'addCategory' && <AddCategoryPage />}
        {activeComponent === 'addMenuItem' && <AddMenuItems />}
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'viewRestaurant' && <ViewRestaurantAsOwner />}
        {activeComponent === 'viewOrders' && <RestaurantOrders />}
      </div>
    </div>
  );
};

export default RestaurantOwnerDashboard;*/


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantOwnerDashboard.css';
import { FaHome, FaUser, FaSignOutAlt, FaPlus, FaUtensils, FaReceipt } from 'react-icons/fa';
import AddRestaurantPage from '../AddRestaurantDetail/AddRestaurantPage';
import AddCategoryPage from '../AddCategory/AddCategoryPage';
import AddMenuItems from '../AddMenuItems/AddMenuItems';
import ViewRestaurantAsOwner from '../ViewRestaurantAsOwner/ViewRestaurantAsOwner';
import RestaurantOrders from '../RestaurantOrders/RestaurantOrders';
{/*import Profile from '../ViewProfile/Profile';*/}
import Modal1 from './Modal1'; // Import the Modal component

const RestaurantOwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeComponent1, setActiveComponent1] = useState('');

  const handleMenuClick1 = (component) => {
    setActiveComponent1(component);
  };

  const handleMenuClick = (component) => {
    setActiveComponent(component);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveComponent(null);
  };

  return (
    <>
    <div className="dashboard-container">
      <div className="topnav">
        <div className="topnav-left">
          <h2>Restaurant Portal</h2>
        </div>
        <div className="topnav-right">
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </div>
      </div>

      <div className="sidenav">
        <div className="sidenav-header">
          <h2>Dashboard</h2>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <FaHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addRestaurant')}>
              <FaPlus className="icon" /> Add Restaurant
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addCategory')}>
              <FaPlus className="icon" /> Add Category
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addMenuItem')}>
              <FaPlus className="icon" /> Add Menu Item
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick1('viewRestaurant')}>
              <FaUtensils className="icon" /> View Restaurants
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick1('viewOrders')}>
              <FaReceipt className="icon" /> View Orders
            </a>
          </li>
        </ul>
      </div>

      {/* Modal for popup */}
      <Modal1 show={showModal} onClose={closeModal}>
        {activeComponent === 'addRestaurant' && <AddRestaurantPage />}
        {activeComponent === 'addCategory' && <AddCategoryPage />}
        {activeComponent === 'addMenuItem' && <AddMenuItems />}
      
      </Modal1>
    
    </div>
    {activeComponent1 === 'viewRestaurant' && <ViewRestaurantAsOwner />}
    {activeComponent1 === 'viewOrders' && <RestaurantOrders />}
    </>
  );
};

export default RestaurantOwnerDashboard;






/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantOwnerDashboard.css';
import { FaHome, FaUser, FaSignOutAlt, FaPlus, FaUtensils, FaReceipt } from 'react-icons/fa'; // Import FaReceipt
import AddRestaurantPage from '../AddRestaurantDetail/AddRestaurantPage';
import AddCategoryPage from '../AddCategory/AddCategoryPage';
import AddMenuItems from '../AddMenuItems/AddMenuItems';
import ViewRestaurantAsOwner from '../ViewRestaurantAsOwner/ViewRestaurantAsOwner';
import RestaurantOrders from '../RestaurantOrders/RestaurantOrders';
import Profile from '../ViewProfile/Profile';

const RestaurantOwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="dashboard-container">
  
      <div className="topnav">
        <div className="topnav-left">
          <h2>Restaurant Portal</h2>
        </div>
        <div className="topnav-right">
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </div>
      </div>

    
      <div className="sidenav">
        <div className="sidenav-header">
          <h2>Dashboard</h2>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <FaHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addRestaurant')}>
              <FaPlus className="icon" /> Add Restaurant
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addCategory')}>
              <FaPlus className="icon" /> Add Category
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addMenuItem')}>
              <FaPlus className="icon" /> Add Menu Item
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('viewRestaurant')}>
              <FaUtensils className="icon" /> View Restaurants
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('viewOrders')}>
              <FaReceipt className="icon" /> View Orders
            </a>
          </li>
        </ul>
      </div>

      
      <div className="main-content">
        {activeComponent === 'addRestaurant' && <AddRestaurantPage />}
        {activeComponent === 'addCategory' && <AddCategoryPage />}
        {activeComponent === 'addMenuItem' && <AddMenuItems />}
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'viewRestaurant' && <ViewRestaurantAsOwner />}
        {activeComponent === 'viewOrders' && <RestaurantOrders />}
      </div>
    </div>
  );
};

export default RestaurantOwnerDashboard;*/




/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantOwnerDashboard.css';
import { FaHome, FaUser, FaSignOutAlt, FaPlus, FaUtensils, FaReceipt } from 'react-icons/fa'; // Import FaReceipt
import AddRestaurantPage from '../AddRestaurantDetail/AddRestaurantPage';
import AddCategoryPage from '../AddCategory/AddCategoryPage';
import AddMenuItems from '../AddMenuItems/AddMenuItems';
import ViewRestaurantAsOwner from '../ViewRestaurantAsOwner/ViewRestaurantAsOwner';
import RestaurantOrders from '../RestaurantOrders/RestaurantOrders';
import Profile from '../ViewProfile/Profile';

const RestaurantOwnerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="dashboard-container">
      <div className="sidenav">
        <div className="sidenav-header">
          <h2>Dashboard</h2>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <FaHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('profile')}>
              <FaUser className="icon" /> Profile
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addRestaurant')}>
              <FaPlus className="icon" /> Add Restaurant
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addCategory')}>
              <FaPlus className="icon" /> Add Category
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('addMenuItem')}>
              <FaPlus className="icon" /> Add Menu Item
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('viewRestaurant')}>
              <FaUtensils className="icon" /> View Restaurants
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleMenuClick('viewOrders')}>
              <FaReceipt className="icon" /> View Orders
            </a>
          </li>
          <li>
            <Link to="/logout">
              <FaSignOutAlt className="icon" /> Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        {activeComponent === 'addRestaurant' && <AddRestaurantPage />}
        {activeComponent === 'addCategory' && <AddCategoryPage />}
        {activeComponent === 'addMenuItem' && <AddMenuItems />}
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'viewRestaurant' && <ViewRestaurantAsOwner />}
        {activeComponent === 'viewOrders' && <RestaurantOrders />}
      </div>
    </div>
  );
};

export default RestaurantOwnerDashboard;*/










