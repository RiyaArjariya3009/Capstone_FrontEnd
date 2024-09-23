import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import './RestaurantList.css';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8082/api/restaurants/getAllRestaurant')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleOrderNow = (restaurant) => {
       // const userId = localStorage.getItem('userId'); // Check if the user is logged in
       const userId=localStorage.getItem('userId'); ;

        if (userId) {
            // User is logged in, navigate to the CustomerDashboard with restaurant details
            navigate(`/customer/${restaurant.id}`, { state: { ...restaurant } });
        } else {
            // User is not logged in, show modal with message
            setModalMessage('Please log in to place an order.');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/'); // Redirect to login after closing the modal
    };

    return (
        <div className="restaurant-list">
            <h2>Restaurants</h2>
            <ul className="restaurant-grid">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id} className="restaurant-item">
                        <img 
                            src={`data:image/png;base64,${restaurant.imageUrl}`} 
                            alt={restaurant.restaurantName}
                            className="restaurant-image"
                        />
                        <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
                        <p>Address: {restaurant.address}</p>
                        <p>Opening Hours: {restaurant.openingHours}</p>
                        <p>Status: {restaurant.open ? 'Open' : 'Closed'}</p>
                        <button 
                            className="order-now-btn"
                            onClick={() => handleOrderNow(restaurant)} // Check if user is logged in
                        >
                            Order Now
                        </button>
                    </li>
                ))}
            </ul>
            {showModal && (
                <Modal message={modalMessage} onClose={closeModal} />
            )}
        </div>
    );
}

export default RestaurantList;










/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8082/api/restaurants/getAllRestaurant')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleOrderNow = (restaurant) => {
        const userId = localStorage.getItem('userId'); // Check if the user is logged in

        if (userId) {
            // User is logged in, navigate to the CustomerDashboard with restaurant details
            navigate(`/customer/${restaurant.id}`, { state: { ...restaurant } });
        } else {
            // User is not logged in, redirect to the login page
            alert('Please log in to place an order.');
            navigate('/');
        }
    };

    return (
        <div className="restaurant-list">
            <h2>Restaurants</h2>
            <ul className="restaurant-grid">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id} className="restaurant-item">
                        <img 
                            src={`data:image/png;base64,${restaurant.imageUrl}`} 
                            alt={restaurant.restaurantName}
                            className="restaurant-image"
                        />
                        <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
                        <p>Address: {restaurant.address}</p>
                        <p>Opening Hours: {restaurant.openingHours}</p>
                        <p>Status: {restaurant.open ? 'Open' : 'Closed'}</p>
                        <button 
                            className="order-now-btn"
                            onClick={() => handleOrderNow(restaurant)} // Check if user is logged in
                        >
                            Order Now
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantList;*/




/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8082/api/restaurants/getAllRestaurant')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleOrderNow = (restaurant) => {
        // Navigate to CustomerDashboard and pass restaurant details
        navigate(`/customer/${restaurant.id}`, { state: { ...restaurant } });
    };

    return (
        <div className="restaurant-list">
            <h2>Restaurants</h2>
            <ul className="restaurant-grid">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id} className="restaurant-item">
                        <img 
                            src={`data:image/png;base64,${restaurant.imageUrl}`} 
                            alt={restaurant.restaurantName}
                            className="restaurant-image"
                        />
                        <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
                        <p>Address: {restaurant.address}</p>
                        <p>Opening Hours: {restaurant.openingHours}</p>
                        <p>Status: {restaurant.open ? 'Open' : 'Closed'}</p>
                        <button 
                            className="order-now-btn"
                            onClick={() => handleOrderNow(restaurant)} // Pass restaurant object
                        >
                            Order Now
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantList;*/




































/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8082/api/restaurants/getAllRestaurant')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleOrderNow = (restaurantId, imageUrl) => {
        navigate(`/customer/${restaurantId}`, { state: { imageUrl } });
    };

    return (
        <div className="restaurant-list">
            <h2>Restaurants</h2>
            <ul className="restaurant-grid">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id} className="restaurant-item">
                        <img 
                            src={`data:image/png;base64,${restaurant.imageUrl}`} 
                            alt={restaurant.restaurantName}
                            className="restaurant-image"
                        />
                        <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
                        <p>Address: {restaurant.address}</p>
                        <p>Opening Hours: {restaurant.openingHours}</p>
                        <p>Status: {restaurant.open ? 'Open' : 'Closed'}</p>
                        <button 
                            className="order-now-btn"
                            onClick={() => handleOrderNow(restaurant.id, restaurant.imageUrl)} // Pass imageUrl
                        >
                            Order Now
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantList;*/




