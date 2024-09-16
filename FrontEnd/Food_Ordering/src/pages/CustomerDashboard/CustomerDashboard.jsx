/*import React, { useState } from 'react';
import './ViewMenuItems.css';

function ViewMenuItems({ items, userId }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  const handleAddToCart = async (item) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          menuItemId: item.id,
          restaurantId: item.restaurantId, // Assume `item.restaurantId` is available
          quantity: 1, // Adjust quantity as needed
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || 'Item added to cart successfully');
        setErrorMessage('');
      } else {
        // Handle error response
        if (result.error === 'DifferentRestaurantException') {
          // Show popup for updating or canceling
          setShowPopup(true);
          setPopupContent('You can only add items from one restaurant at a time. Would you like to update your cart or cancel?');
          setCurrentItem(item);
        } else {
          setErrorMessage(result.message || 'Failed to add item to cart');
          setSuccessMessage('');
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the item to the cart.');
      setSuccessMessage('');
    }
  };

  const handleUpdateCart = async () => {
    try {
      // Perform cart update: remove old items and add the new item
      await fetch('/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          menuItemId: currentItem.id,
          restaurantId: currentItem.restaurantId,
          quantity: 1,
        }),
      });

      // Update or reset states after success
      setShowPopup(false);
      setSuccessMessage('Cart updated successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred while updating the cart.');
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="menu-items">
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={`data:image/png;base64,${item.imageData}`} alt={item.foodName} />
          <div className="menu-item-details">
            <h4>{item.foodName}</h4>
            <p>{item.description}</p>
            <p>Price: Rs. {item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        </div>
      ))}

      {successMessage && <div className="message success">{successMessage}</div>}
      {errorMessage && <div className="message error">{errorMessage}</div>}

      {showPopup && (
        <div className="popup">
          <p>{popupContent}</p>
          <button onClick={handleUpdateCart}>Update Cart</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ViewMenuItems;*/





import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SideNavbar from '../../pages/SideNavbar/SideNavbar';
import ViewMenuItems from '../ViewMenuItems/ViewMenuItems';
import './CustomerDashboard.css';

function CustomerDashboard() {
    const { restaurantId } = useParams();
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const userId = localStorage.getItem('userId');

    const restaurantImageUrl = location.state?.imageUrl;
    const restaurantName = location.state?.restaurantName;
    const restaurantAddress = location.state?.address;
    const restaurantStatus = location.state?.open ? 'Open' : 'Closed';
    const restaurantOpeningHours = location.state?.openingHours;

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch(`http://localhost:8082/api/categories/getAllCategory/${restaurantId}`);
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        loadCategories();
    }, [restaurantId]);

    useEffect(() => {
        if (selectedCategory !== null) {
            async function loadMenuItems() {
                try {
                    const response = await fetch(`http://localhost:8082/api/menuItems/menuItemsByCategory/${selectedCategory}`);
                    const menuItemsData = await response.json();
                    setMenuItems(menuItemsData);
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            }
            loadMenuItems();
        }
    }, [selectedCategory]);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className="container">
            <header className="header1">
                {restaurantImageUrl && (
                    <img
                        src={`data:image/png;base64,${restaurantImageUrl}`}
                        alt="Restaurant Header"
                    />
                )}
            </header>
            <div className="restaurant-details">
                <p><strong>Name:</strong> {restaurantName}</p>
                <p><strong>Address:</strong> {restaurantAddress}</p>
                <p><strong>Status:</strong> {restaurantStatus}</p>
                <p><strong>Opening Hours:</strong> {restaurantOpeningHours}</p>
            </div>
            <div className="content">
                <SideNavbar categories={categories} onSelectCategory={handleSelectCategory} className="sidebar"/>
                <div className="main-content">
                    <ViewMenuItems items={menuItems} restaurantId={restaurantId} userId={userId} />
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;










/*import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SideNavbar from '../../pages/SideNavbar/SideNavbar';
import ViewMenuItems from '../ViewMenuItems/ViewMenuItems';
import './CustomerDashboard.css';

function CustomerDashboard() {
    const { restaurantId } = useParams();
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const restaurantImageUrl = location.state?.imageUrl;
    const restaurantName = location.state?.restaurantName;
    const restaurantAddress = location.state?.address;
    const restaurantStatus = location.state?.open ? 'Open' : 'Closed';
    const restaurantOpeningHours = location.state?.openingHours;

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch(`http://localhost:8082/api/categories/getAllCategory/${restaurantId}`);
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        loadCategories();
    }, [restaurantId]);

    useEffect(() => {
        if (selectedCategory !== null) {
            async function loadMenuItems() {
                try {
                    const response = await fetch(`http://localhost:8082/api/menuItems/menuItemsByCategory/${selectedCategory}`);
                    const menuItemsData = await response.json();
                    setMenuItems(menuItemsData);
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            }
            loadMenuItems();
        }
    }, [selectedCategory]);

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className="container">
            <header className="header1">
                {restaurantImageUrl && (
                    <img
                        src={`data:image/png;base64,${restaurantImageUrl}`}
                        alt="Restaurant Header"
                    />
                )}
               
            </header>
            <div className="restaurant-details">
                   <p><strong>Address:</strong> {restaurantName}</p>
                    <p><strong>Address:</strong> {restaurantAddress}</p>
                    <p><strong>Status:</strong> {restaurantStatus}</p>
                    <p><strong>Opening Hours:</strong> {restaurantOpeningHours}</p>
                </div>
            <div className="content">
                <SideNavbar categories={categories} onSelectCategory={handleSelectCategory} className="sidebar"/>
                <div className="main-content">
                    <ViewMenuItems items={menuItems} />
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;*/








/*import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SideNavbar from '../../pages/SideNavbar/SideNavbar';
import ViewMenuItems from '../ViewMenuItems/ViewMenuItems';
import './CustomerDashboard.css';

function CustomerDashboard() {
    const { restaurantId } = useParams();
    const location = useLocation(); // Get location object
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Access the restaurant details from location state
    const restaurantImageUrl = location.state?.imageUrl;
    const restaurantAddress = location.state?.address;
    const restaurantStatus = location.state?.open ? 'Open' : 'Closed';
    const restaurantOpeningHours = location.state?.openingHours;

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch(`http://localhost:8082/api/categories/getAllCategory/${restaurantId}`);
                const categoriesData = await response.json();
                console.log('Fetched categories:', categoriesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        loadCategories();
    }, [restaurantId]);

    useEffect(() => {
        if (selectedCategory !== null) {
            async function loadMenuItems() {
                try {
                    console.log('Fetching menu items for category:', selectedCategory);
                    const response = await fetch(`http://localhost:8082/api/menuItems/menuItemsByCategory/${selectedCategory}`);
                    const menuItemsData = await response.json();
                    console.log('Menu items data:', menuItemsData);
                    setMenuItems(menuItemsData);
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            }
            loadMenuItems();
        }
    }, [selectedCategory]);

    const handleSelectCategory = (categoryId) => {
        console.log('Category selected:', categoryId);
        setSelectedCategory(categoryId);
    };

    return (
        <div className="container">
            <header className="header1">
                {restaurantImageUrl && (
                    <img
                        src={`data:image/png;base64,${restaurantImageUrl}`} // Use the restaurant image URL
                        alt="Restaurant Header"
                    />
                )}
                <div className="restaurant-details">
                    <p><strong>Address:</strong> {restaurantAddress}</p>
                    <p><strong>Status:</strong> {restaurantStatus}</p>
                    <p><strong>Opening Hours:</strong> {restaurantOpeningHours}</p>
                </div>
            </header>
            <div className="content">
                <SideNavbar categories={categories} onSelectCategory={handleSelectCategory} />
                <div className="main-content">
                    <ViewMenuItems items={menuItems} />
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;*/


/*import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SideNavbar from '../../pages/SideNavbar/SideNavbar';
import ViewMenuItems from '../ViewMenuItems/ViewMenuItems';
import './CustomerDashboard.css';

function CustomerDashboard() {
    const { restaurantId } = useParams();
    const location = useLocation(); // Get location object
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const restaurantImageUrl = location.state?.imageUrl; // Access the image URL

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch(`http://localhost:8082/api/categories/getAllCategory/${restaurantId}`);
                const categoriesData = await response.json();
                console.log('Fetched categories:', categoriesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        loadCategories();
    }, [restaurantId]);

    useEffect(() => {
        if (selectedCategory !== null) {
            async function loadMenuItems() {
                try {
                    console.log('Fetching menu items for category:', selectedCategory);
                    const response = await fetch(`http://localhost:8082/api/menuItems/menuItemsByCategory/${selectedCategory}`);
                    const menuItemsData = await response.json();
                    console.log('Menu items data:', menuItemsData);
                    setMenuItems(menuItemsData);
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            }
            loadMenuItems();
        }
    }, [selectedCategory]);

    const handleSelectCategory = (categoryId) => {
        console.log('Category selected:', categoryId);
        setSelectedCategory(categoryId);
    };

    return (
        <div className="container">
            <header className="header1">
                {restaurantImageUrl && (
                    <img
                        src={`data:image/png;base64,${restaurantImageUrl}`} // Use the restaurant image URL
                        alt="Restaurant Header"
                    />
                )}
            </header>
            <div className="content">
                <SideNavbar categories={categories} onSelectCategory={handleSelectCategory} />
                <div className="main-content">
                    <ViewMenuItems items={menuItems} />
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;*/












