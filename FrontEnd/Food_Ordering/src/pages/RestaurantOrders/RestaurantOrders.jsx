import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RestaurantOrders.css'; // Import the CSS file

const RestaurantOrders = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState({});
  const userId = localStorage.getItem('userId');


  // Fetch all restaurants owned by the user
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/restaurants/user/${userId}`);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  };

  // Fetch orders for a particular restaurant ID
  const fetchOrdersByRestaurantId = async (restaurantId) => {
    try {
      const response = await axios.get(`http://localhost:8083/api/orders/restaurant/${restaurantId}`);
      setOrders((prevOrders) => ({
        ...prevOrders,
        [restaurantId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching orders for restaurant ${restaurantId}`, error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRestaurants();
    }
  }, [userId]);

  useEffect(() => {
    restaurants.forEach((restaurant) => {
      fetchOrdersByRestaurantId(restaurant.id);
    });
  }, [restaurants]);

  return (
    <div className="container">
      <h2 className="title">Restaurants and Orders</h2>

      <div className="restaurant-container">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-box">
            <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
            <p><strong>Address:</strong> {restaurant.address}</p>
            <p><strong>Contact:</strong> {restaurant.contactNo}</p>
            <p><strong>Open:</strong> {restaurant.open ? 'Yes' : 'No'}</p>

            {/* Orders Section */}
            <div className="orders-box">
              <h4>Orders:</h4>
              {orders[restaurant.id] && orders[restaurant.id].length > 0 ? (
                <ul className="order-list">
                  {orders[restaurant.id].map((order) => (
                    <li key={order.id} className="order-item">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Status:</strong> {order.orderStatus}</p>
                      <p><strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders available for this restaurant.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOrders;
