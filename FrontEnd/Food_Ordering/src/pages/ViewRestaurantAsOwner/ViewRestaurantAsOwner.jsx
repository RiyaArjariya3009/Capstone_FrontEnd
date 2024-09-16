import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import Modal component
import './ViewRestaurantAsOwner.css';

//Modal.setAppElement('#root'); // Required for accessibility reasons

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for better error handling

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8082/api/restaurants/getAllRestaurant')
      .then(response => {
        const restaurantData = Array.isArray(response.data) ? response.data : [];
        setRestaurants(restaurantData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching the restaurants:", err);
        setError('Failed to fetch restaurants. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const handleViewOrders = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setModalIsOpen(true);
    setIsLoading(true); // Show loading spinner while fetching orders
    setError(null); // Reset error state

    axios.get(`http://localhost:8083/api/orders/restaurant/${restaurantId}`)
      .then(response => {
        const orderData = Array.isArray(response.data) ? response.data : [];
        setOrders(orderData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching the orders:", err);
        setError('Failed to fetch orders. Please try again later.');
        setOrders([]); // Reset orders in case of error
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setOrders([]);
    setError(null); // Reset error when modal is closed
  };

  return (
    <div className="restaurant-list">
      {isLoading && !modalIsOpen && <p>Loading restaurants...</p>} {/* Loading indicator for restaurants */}
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      
      {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={`data:image/png;base64,${restaurant.imageUrl}`}
              alt={restaurant.restaurantName}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.restaurantName}</h2>
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Contact:</strong> {restaurant.contactNo}</p>
              <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
              <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
              <button
                className="view-orders-button"
                onClick={() => handleViewOrders(restaurant.id)}
              >
                View Orders
              </button>
            </div>
          </div>
        ))
      ) : (
        !isLoading && <p>No restaurants found</p> // Show only when not loading
      )}

      {/* Modal for viewing orders */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Orders Modal"
        className="Modal"
        overlayClassName="Overlay"
        shouldCloseOnEsc={true} // Allow closing on ESC key
      >
        <h3>Orders for Restaurant ID: {selectedRestaurantId}</h3>
        <button className="close-modal-button" onClick={closeModal}>
          Close
        </button>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error-message">{error}</p> // Show error if any
        ) : (
          <div className="orders-list">
            {orders.length > 0 ? (
              orders.map(order => (
                <div key={order.id} className="order-card">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Customer Name:</strong> {order.customerName}</p>
                  <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                </div>
              ))
            ) : (
              <p>No orders found for this restaurant.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewRestaurantAsOwner;



/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import Modal component
import './ViewRestaurantAsOwner.css';

Modal.setAppElement('#root'); // Required for accessibility reasons

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8082/api/restaurants/getAllRestaurant')
      .then(response => {
        const restaurantData = Array.isArray(response.data) ? response.data : [];
        setRestaurants(restaurantData);
        setIsLoading(false); // Turn off loading after data is fetched
      })
      .catch(error => {
        console.error("Error fetching the restaurants:", error);
        setIsLoading(false);
      });
  }, []);

  const handleViewOrders = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setModalIsOpen(true); // Open the modal
    setIsLoading(true); // Start loading while fetching orders

    axios.get(`http://localhost:8083/api/orders/restaurant/${restaurantId}`)
      .then(response => {
        const orderData = Array.isArray(response.data) ? response.data : [];
        setOrders(orderData);
        setIsLoading(false); // Stop loading after data is fetched
      })
      .catch(error => {
        console.error("Error fetching the orders:", error);
        setOrders([]); // Reset orders in case of an error
        setIsLoading(false); // Stop loading on error
      });
  };

  const closeModal = () => {
    setModalIsOpen(false); // Close the modal
    setOrders([]); // Clear orders when closing the modal
  };

  return (
    <div className="restaurant-list">
      {isLoading && <p>Loading...</p>} {/* Loading state */
     /* {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={`data:image/png;base64,${restaurant.imageUrl}`}
              alt={restaurant.restaurantName}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.restaurantName}</h2>
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Contact:</strong> {restaurant.contactNo}</p>
              <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
              <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
              <button
                className="view-orders-button"
                onClick={() => handleViewOrders(restaurant.id)}
              >
                View Orders
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No restaurants found</p>
      )}

      {
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Orders Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h3>Orders for Restaurant ID: {selectedRestaurantId}</h3>
        <button className="close-modal-button" onClick={closeModal}>
          Close
        </button>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="orders-list">
            {orders.length > 0 ? (
              orders.map(order => (
                <div key={order.id} className="order-card">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Customer Name:</strong> {order.customerName}</p>
                  <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                </div>
              ))
            ) : (
              <p>No orders found for this restaurant.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewRestaurantAsOwner;*/





/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRestaurantAsOwner.css'; // Import the CSS for styling

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]); // State for storing orders, initialized as an array
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null); // Track selected restaurant ID

  useEffect(() => {
    axios.get('http://localhost:8082/api/restaurants/getAllRestaurant')
      .then(response => {
        const restaurantData = Array.isArray(response.data) ? response.data : [];
        setRestaurants(restaurantData);
      })
      .catch(error => console.error("Error fetching the restaurants:", error));
  }, []);

  const handleViewOrders = (restaurantId) => {
    setSelectedRestaurantId(restaurantId); // Set the selected restaurant ID
    axios.get(`http://localhost:8083/api/orders/restaurant/${restaurantId}`)
      .then(response => {
        // Ensure the response is an array
        const orderData = Array.isArray(response.data) ? response.data : [];
        setOrders(orderData); // Set orders with the fetched data
      })
      .catch(error => {
        console.error("Error fetching the orders:", error);
        setOrders([]); // Set orders to an empty array on error
      });
  };

  return (
    <div className="restaurant-list">
      {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={`data:image/png;base64,${restaurant.imageUrl}`}
              alt={restaurant.restaurantName}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.restaurantName}</h2>
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Contact:</strong> {restaurant.contactNo}</p>
              <p><strong>Email:</strong> {restaurant.email || 'N/A'}</p>
              <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
              <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
              <button 
                className="view-orders-button" 
                onClick={() => handleViewOrders(restaurant.id)}
              >
                View Orders
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No restaurants found</p> 
      )}

      {/* Display Orders */
     /* {selectedRestaurantId && Array.isArray(orders) && orders.length > 0 ? (
        <div className="orders-container">
          <h3>Orders for Restaurant ID: {selectedRestaurantId}</h3>
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        selectedRestaurantId && <p>No orders found for this restaurant.</p>
      )}
    </div>
  );
};

export default ViewRestaurantAsOwner;*/


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRestaurantAsOwner.css'; // Import the CSS for styling

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]); // State for storing orders
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null); // Track selected restaurant ID

  useEffect(() => {
    axios.get('http://localhost:8082/api/restaurants/getAllRestaurant')
      .then(response => {
        const restaurantData = Array.isArray(response.data) ? response.data : [];
        setRestaurants(restaurantData);
      })
      .catch(error => console.error("Error fetching the restaurants:", error));
  }, []);

  const handleViewOrders = (restaurantId) => {
    setSelectedRestaurantId(restaurantId); // Set the selected restaurant ID
    axios.get(`http://localhost:8083/api/orders/restaurant/${restaurantId}`) // Replace with your actual API endpoint
      .then(response => {
        const orderData = Array.isArray(response.data) ? response.data : [];
        setOrders(orderData);
      })
      .catch(error => {
        console.error("Error fetching the orders:", error);
        setOrders([]); // Handle error by setting orders to an empty array
      });
  };

  return (
    <div className="restaurant-list">
      {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={`data:image/png;base64,${restaurant.imageUrl}`}
              alt={restaurant.restaurantName}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.restaurantName}</h2>
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Contact:</strong> {restaurant.contactNo}</p>
              <p><strong>Email:</strong> {restaurant.email || 'N/A'}</p>
              <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
              <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
              <button 
                className="view-orders-button" 
                onClick={() => handleViewOrders(restaurant.id)}
              >
                View Orders
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No restaurants found</p> 
      )}

      {/* Display Orders */
     /* {selectedRestaurantId && Array.isArray(orders) && orders.length > 0 ? (
        <div className="orders-container">
          <h3>Orders for Restaurant ID: {selectedRestaurantId}</h3>
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        selectedRestaurantId && <p>No orders found for this restaurant.</p>
      )}
    </div>
  );
};

export default ViewRestaurantAsOwner;*/









/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRestaurantAsOwner.css'; // Import the CSS for styling

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]); // State for storing orders
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null); // Track selected restaurant ID

  useEffect(() => {
    axios.get('http://localhost:8082/api/restaurants/getAllRestaurant')
      .then(response => {
        const restaurantData = Array.isArray(response.data) ? response.data : [];
        setRestaurants(restaurantData);
      })
      .catch(error => console.error("Error fetching the restaurants:", error));
  }, []);

  const handleViewOrders = (restaurantId) => {
    setSelectedRestaurantId(restaurantId); // Set the selected restaurant ID
    axios.get(`http://localhost:8083/api/orders/restaurant/${restaurantId}`) // Replace with your actual API endpoint
      .then(response => {
        const orderData = Array.isArray(response.data) ? response.data : [];
        setOrders(orderData);
      })
      .catch(error => console.error("Error fetching the orders:", error));
  };

  return (
    <div className="restaurant-list">
      {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={`data:image/png;base64,${restaurant.imageUrl}`}
              alt={restaurant.restaurantName}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.restaurantName}</h2>
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Contact:</strong> {restaurant.contactNo}</p>
              <p><strong>Email:</strong> {restaurant.email || 'N/A'}</p>
              <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
              <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
              <button 
                className="view-orders-button" 
                onClick={() => handleViewOrders(restaurant.id)}
              >
                View Orders
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No restaurants found</p> 
      )}

      /*
      {selectedRestaurantId && orders.length > 0 && (
        <div className="orders-container">
          <h3>Orders for Restaurant ID: {selectedRestaurantId}</h3>
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                {/* Add more order details as needed */
            /*  </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRestaurantAsOwner;*/








/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRestaurantAsOwner.css'; // Import the CSS for styling

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/restaurants/getAllRestaurant')  // Replace with your API endpoint
      .then(response => {
        const restaurantData = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
        setRestaurants(restaurantData);
      })
      .catch(error => console.error("Error fetching the restaurants:", error));
  }, []);

  return (
    <div className="restaurant-list">
      {restaurants.length > 0 ? (
        restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
           { /*<img src={restaurant.imageUrl} alt={restaurant.restaurantName} className="restaurant-image" />*/
         /*  <img  src={`data:image/png;base64,${restaurant.imageUrl}`} 
                            alt={restaurant.restaurantName}
                            className="restaurant-image"
                        />
            <div className="restaurant-info">
              <h2>{restaurant.restaurantName}</h2>
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Contact:</strong> {restaurant.contactNo}</p>
              <p><strong>Email:</strong> {restaurant.email || 'N/A'}</p>
              <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
              <p><strong>Opening Hours:</strong> {restaurant.openingHours || 'N/A'}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No restaurants found</p> // Fallback message if no restaurants
      )}
    </div>
  );
};

export default ViewRestaurantAsOwner;*/



/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRestaurantAsOwner.css'; // Import the CSS for styling

const ViewRestaurantAsOwner = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('/api/restaurants')  // Replace with your API endpoint
      .then(response => setRestaurants(response.data))
      .catch(error => console.error("Error fetching the restaurants:", error));
  }, []);

  return (
    <div className="restaurant-list">
      {restaurants.map(restaurant => (
        <div key={restaurant.id} className="restaurant-card">
          <img src={restaurant.imageUrl} alt={restaurant.restaurantName} className="restaurant-image" />
          <div className="restaurant-info">
            <h2>{restaurant.restaurantName}</h2>
            <p><strong>Address:</strong> {restaurant.address}</p>
            <p><strong>Contact:</strong> {restaurant.contactNo}</p>
            <p><strong>Email:</strong> {restaurant.email || 'N/A'}</p>
            <p><strong>Open:</strong> {restaurant.open ? "Yes" : "No"}</p>
            <p><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewRestaurantAsOwner;*/
