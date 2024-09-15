import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Updated styles

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [countdown, setCountdown] = useState(1000); // 30 seconds timer for cancellation
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const deliveryAddressId = 1; // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically
    const [orderId, setOrderId] = useState(null); // To store the order ID after fetching from userId

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            console.log('Cart items response:', response.data);

            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                if (!restaurantId) {
                    setRestaurantId(item.restaurantId); // Set restaurant ID only once
                }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price,
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            console.log('Update cart response:', response.data);

            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            fetchCartItems();
        }
    };

    const placeOrder = async () => {
        try {
            const orderData = {
                userId: Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);

            console.log('Place order response:', response.data);

            if (response.status === 201) {
                alert('Order placed successfully!');
                fetchLatestOrderDetails();
                setOrderPlaced(true);
                setShowPopup(true);
                startCountdown();
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    const fetchLatestOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/orders/user/${userId}`);
            console.log('Order details response:', response.data);

            if (response.data && response.data.length > 0) {
                const latestOrder = response.data[0];
                console.log('Latest order:', latestOrder);
                setOrderId(latestOrder.id);
                console.log('Order ID set to:', latestOrder.id);
            } else {
                console.log('No orders found for this user.');
            }
        } catch (error) {
            console.error('Error fetching latest order details', error);
        }
    };

    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const cancelOrder = async () => {
        try {
            if (orderId) {
                const response = await axios.delete(`http://localhost:8083/api/orders/cancel/${orderId}`);
                console.log('Cancel order response:', response.data);
                if (response.status === 200) {
                    alert('Order canceled successfully!');
                    setShowPopup(false);
                }
            } else {
                alert('No order to cancel.');
            }
        } catch (error) {
            console.error('Error canceling order', error);
            alert('Failed to cancel the order.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.cartId} className="cart-item">
                        <div>
                            <h3>Menu Item: {item.menuItemName}</h3>
                            <p>Restaurant: {item.restaurantName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rs. {item.menuItemPrice}</p>
                            <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                        </div>
                        <div>
                            <button
                                className="increment"
                                onClick={() => updateCartItemQuantity(item.cartId, 1)}
                            >
                                +
                            </button>
                            <button
                                className="decrement"
                                onClick={() => updateCartItemQuantity(item.cartId, -1)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && !orderPlaced && (
                <button className="place-order-button" onClick={placeOrder}>
                    Place Order
                </button>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Order Placed</h2>
                        <p>You have {countdown} seconds to cancel the order.</p>
                        {countdown > 0 ? (
                            <button onClick={cancelOrder} className="cancel-button">Cancel Order</button>
                        ) : (
                            <p>Time to cancel the order has expired.</p>
                        )}
                        <button onClick={() => setShowPopup(false)} className="continue-button">
                            Continue with Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Assuming you have the styles here

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [countdown, setCountdown] = useState(1000); // 30 seconds timer for cancellation
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const deliveryAddressId = 1; // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically
    const [orderId, setOrderId] = useState(null); // To store the order ID after fetching from userId

    // Fetch the cart items when the component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            console.log('Cart items response:', response.data); // Log the response

            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                if (!restaurantId) {
                    setRestaurantId(item.restaurantId); // Set restaurant ID only once
                }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price, // Include price here
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    // Update cart item quantity
    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            console.log('Update cart response:', response.data); // Log the response

            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            fetchCartItems();
        }
    };

    // Place the order
    const placeOrder = async () => {
        try {
            const orderData = {
                userId: Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            // Send the request to place the order
            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);

            console.log('Place order response:', response.data); // Log the response

            // Check if the order was placed successfully
            if (response.status === 201) {
                alert('Order placed successfully!');

                // Fetch the latest order details for the user to get the orderId
                fetchLatestOrderDetails();
                setOrderPlaced(true); // Mark the order as placed
                setShowPopup(true); // Show the cancel order popup
                startCountdown(); // Start the 30-second countdown
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    // Fetch the latest order details for the user using userId to get the orderId
    const fetchLatestOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/orders/user/${userId}`);
            console.log('Order details response:', response.data); // Log the full response

            // Assuming the latest order is at index 0, but adjust based on your response structure
            if (response.data && response.data.length > 0) {
                const latestOrder = response.data[0]; 
                console.log('Latest order:', latestOrder); // Log the latest order
                setOrderId(latestOrder.id); // Store the latest orderId
                console.log('Order ID set to:', latestOrder.id); // Log the order ID
            } else {
                console.log('No orders found for this user.');
            }
        } catch (error) {
            console.error('Error fetching latest order details', error);
        }
    };

    // Start the countdown timer
    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer); // Stop the countdown at 0
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    // Cancel the order
    const cancelOrder = async () => {
        try {
            if (orderId) {
                const response = await axios.delete(`http://localhost:8083/api/orders/cancel/${orderId}`);
                console.log('Cancel order response:', response.data); // Log the response
                if (response.status === 200) {
                    alert('Order canceled successfully!');
                    setShowPopup(false); // Hide the popup
                }
            } else {
                alert('No order to cancel.');
            }
        } catch (error) {
            console.error('Error canceling order', error);
            alert('Failed to cancel the order.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.cartId} className="cart-item">
                        <div>
                            <h3>Menu Item: {item.menuItemName}</h3>
                            <p>Restaurant: {item.restaurantName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rs. {item.menuItemPrice}</p>
                            <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                        </div>
                        <div>
                            <button
                                className="increment"
                                onClick={() => updateCartItemQuantity(item.cartId, 1)}
                            >
                                +
                            </button>
                            <button
                                className="decrement"
                                onClick={() => updateCartItemQuantity(item.cartId, -1)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && !orderPlaced && (
                <button className="place-order-button" onClick={placeOrder}>
                    Place Order
                </button>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Order Placed</h2>
                        <p>You have {countdown} seconds to cancel the order.</p>
                        {countdown > 0 ? (
                            <button onClick={cancelOrder} className="cancel-button">Cancel Order</button>
                        ) : (
                            <p>Time to cancel the order has expired.</p>
                        )}
                        <button onClick={() => setShowPopup(false)} className="continue-button">
                            Continue with Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;*/


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Assuming you have the styles here

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [countdown, setCountdown] = useState(30); // 30 seconds timer for cancellation
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const deliveryAddressId = 1; // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically
    const [orderId, setOrderId] = useState(null); // To store the order ID after fetching from userId

    // Fetch the cart items when the component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                if (!restaurantId) {
                    setRestaurantId(item.restaurantId); // Set restaurant ID only once
                }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price, // Include price here
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    // Update cart item quantity
    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            fetchCartItems();
        }
    };

    // Place the order
    const placeOrder = async () => {
        try {
            const orderData = {
                userId: Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            // Send the request to place the order
            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);

            // Check if the order was placed successfully
            if (response.status === 201) {
                alert('Order placed successfully!');

                // Fetch the latest order details for the user to get the orderId
                fetchLatestOrderDetails();
                setOrderPlaced(true); // Mark the order as placed
                setShowPopup(true); // Show the cancel order popup
                startCountdown(); // Start the 30-second countdown
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    // Fetch the latest order details for the user using userId to get the orderId
    const fetchLatestOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/orders/user/${userId}`);
            const latestOrder = response.data[0]; // Assuming the latest order is the first in the list
            setOrderId(latestOrder.orderId); // Store the latest orderId
        } catch (error) {
            console.error('Error fetching order details', error);
        }
    };

    // Start the 30-second countdown for order cancellation
    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer); // Stop the countdown at 0
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    // Cancel the order
    const cancelOrder = async () => {
        try {
            const response = await axios.delete(`http://localhost:8083/api/orders/cancel/${orderId}`); // Use the stored orderId
            if (response.status === 200) {
                alert('Order canceled successfully!');
                setShowPopup(false); // Hide the popup after canceling
            }
        } catch (error) {
            console.error('Error canceling order', error);
            alert('Failed to cancel the order.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.cartId} className="cart-item">
                        <div>
                            <h3>Menu Item: {item.menuItemName}</h3>
                            <p>Restaurant: {item.restaurantName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rs. {item.menuItemPrice}</p>
                            <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                        </div>
                        <div>
                            <button
                                className="increment"
                                onClick={() => updateCartItemQuantity(item.cartId, 1)}
                            >
                                +
                            </button>
                            <button
                                className="decrement"
                                onClick={() => updateCartItemQuantity(item.cartId, -1)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && !orderPlaced && (
                <button className="place-order-button" onClick={placeOrder}>
                    Place Order
                </button>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Order Placed</h2>
                        <p>You have {countdown} seconds to cancel the order.</p>
                        {countdown > 0 ? (
                            <button onClick={cancelOrder} className="cancel-button">Cancel Order</button>
                        ) : (
                            <p>Time to cancel the order has expired.</p>
                        )}
                        <button onClick={() => setShowPopup(false)} className="continue-button">
                            Continue with Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;*/




/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Assuming you have the styles here

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [countdown, setCountdown] = useState(30); // 30 seconds timer for cancellation
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const deliveryAddressId = 1; // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically
    const [orderId, setOrderId] = useState(null); // To store the order ID after placing the order

    // Fetch the cart items when the component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                if (!restaurantId) {
                    setRestaurantId(item.restaurantId); // Set restaurant ID only once
                }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price, // Include price here
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    // Update cart item quantity
    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            fetchCartItems();
        }
    };

    // Place the order
    const placeOrder = async () => {
        try {
            const orderData = {
                userId: Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            // Send the request to place the order
            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);

            // Check if the order was placed successfully
            if (response.status === 201) {
                alert('Order placed successfully!');

                // Store the order ID from the response
                setOrderId(response.data.orderId); // Store the orderId for future use
                setOrderPlaced(true); // Mark the order as placed
                setShowPopup(true); // Show the cancel order popup
                startCountdown(); // Start the 30-second countdown
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    // Start the 30-second countdown for order cancellation
    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer); // Stop the countdown at 0
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    // Cancel the order
    const cancelOrder = async () => {
        try {
            const response = await axios.delete(`http://localhost:8083/api/orders/cancel/${orderId}`); // Use the stored orderId
            if (response.status === 200) {
                alert('Order canceled successfully!');
                setShowPopup(false); // Hide the popup after canceling
            }
        } catch (error) {
            console.error('Error canceling order', error);
            alert('Failed to cancel the order.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.cartId} className="cart-item">
                        <div>
                            <h3>Menu Item: {item.menuItemName}</h3>
                            <p>Restaurant: {item.restaurantName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rs. {item.menuItemPrice}</p>
                            <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                        </div>
                        <div>
                            <button
                                className="increment"
                                onClick={() => updateCartItemQuantity(item.cartId, 1)}
                            >
                                +
                            </button>
                            <button
                                className="decrement"
                                onClick={() => updateCartItemQuantity(item.cartId, -1)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && !orderPlaced && (
                <button className="place-order-button" onClick={placeOrder}>
                    Place Order
                </button>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Order Placed</h2>
                        <p>You have {countdown} seconds to cancel the order.</p>
                        {countdown > 0 ? (
                            <button onClick={cancelOrder} className="cancel-button">Cancel Order</button>
                        ) : (
                            <p>Time to cancel the order has expired.</p>
                        )}
                        <button onClick={() => setShowPopup(false)} className="continue-button">
                            Continue with Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;*/



/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Assuming you have the styles here

const Cart = () => {
     const [cartItems, setCartItems] = useState([]);
     const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed
     const [showPopup, setShowPopup] = useState(false);
      const [countdown, setCountdown] = useState(30); // 30 seconds timer
      const userId = localStorage.getItem('userId');
      const deliveryAddressId = 1; // Assuming delivery address is stored
      const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically
      const [orderId, setOrderId] = useState(null); // To store the order ID after placing the order
  
      useEffect(() => {
          fetchCartItems();
      }, []);
  
      const fetchCartItems = async () => {
          try {
              const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
              const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                  const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                  const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);
  
                  if (!restaurantId) {
                      setRestaurantId(item.restaurantId); // Set restaurant ID only once
                  }
  
                  return {
                      ...item,
                      menuItemName: menuItemResponse.data.foodName,
                      menuItemPrice: menuItemResponse.data.price, // Include price here
                      restaurantName: restaurantResponse.data.restaurantName,
                  };
              }));
  
              setCartItems(itemsWithDetails);
          } catch (error) {
              console.error('Error fetching cart items', error);
          }
      };
  
      const updateCartItemQuantity = async (cartId, quantityChange) => {
          try {
              setCartItems(prevCartItems =>
                  prevCartItems.map(item =>
                      item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                  )
              );
  
              const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                  params: { quantityChange }
              });
  
              if (response.data.message === "Item Removed Successfully") {
                  setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
              }
          } catch (error) {
              console.error('Error updating cart item quantity', error);
              fetchCartItems();
          }
      };
  
      const placeOrder = async () => {
          try {
              const orderData = {
                  userId: Number(userId),
                  deliveryAddressId: deliveryAddressId,
                  restaurantId: restaurantId,
                  cartItems: cartItems.map(item => ({
                      menuItemId: item.menuItemId,
                      quantity: item.quantity,
                      price: item.menuItemPrice
                  }))
              };
  
              const response = await axios.post('http://localhost:8083/api/orders/place', orderData);
              if (response.status === 201) {
                  alert('Order placed successfully!');
                  setOrderId(response.data.orderId); // Store the order ID
                  setOrderPlaced(true); // Set orderPlaced to true after successful order
                  setShowPopup(true); // Show the popup for canceling the order
                  startCountdown(); // Start the 30-second countdown
              }
          } catch (error) {
              console.error('Error placing order', error);
              alert('Failed to place order. Please try again.');
          }
      };
  
      const startCountdown = () => {
          const timer = setInterval(() => {
              setCountdown(prevCountdown => {
                  if (prevCountdown <= 1) {
                      clearInterval(timer); // Stop the countdown at 0
                      return 0;
                  }
                  return prevCountdown - 1;
              });
          }, 1000);
      };
  
      const cancelOrder = async () => {
          try {
              const response = await axios.delete(`http://localhost:8083/api/orders/cancel/${orderId}`);
              if (response.status === 200) {
                  alert('Order canceled successfully!');
                  setShowPopup(false); // Hide the popup
              }
          } catch (error) {
              console.error('Error canceling order', error);
              alert('Failed to cancel the order.');
          }
      };
  
      return (
          <div className="cart-container">
              <h1 className="cart-header">My Cart</h1>
              {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
              ) : (
                  cartItems.map(item => (
                      <div key={item.cartId} className="cart-item">
                          <div>
                              <h3>Menu Item: {item.menuItemName}</h3>
                              <p>Restaurant: {item.restaurantName}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: Rs. {item.menuItemPrice}</p>
                              <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                          </div>
                          <div>
                              <button
                                  className="increment"
                                  onClick={() => updateCartItemQuantity(item.cartId, 1)}
                              >
                                  +
                              </button>
                              <button
                                  className="decrement"
                                  onClick={() => updateCartItemQuantity(item.cartId, -1)}
                               >
                                  -
                              </button>
                          </div>
                      </div>
                  ))
              )}
  
              {cartItems.length > 0 && !orderPlaced && (
                  <button className="place-order-button" onClick={placeOrder}>
                      Place Order
                  </button>
              )}
  
              {showPopup && (
                  <div className="popup">
                      <div className="popup-content">
                          <h2>Order Placed</h2>
                          <p>You have {countdown} seconds to cancel the order.</p>
                          {countdown > 0 ? (
                              <button onClick={cancelOrder} className="cancel-button">Cancel Order</button>
                          ) : (
                              <p>Time to cancel the order has expired.</p>
                          )}
                          <button onClick={() => setShowPopup(false)} className="continue-button">
                              Continue with Order
                          </button>
                      </div>
                  </div>
              )}
          </div>
      );
  };
  
  export default Cart;*/
  


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if order is placed
    const userId = localStorage.getItem('userId');
    const deliveryAddressId = 1; // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                // Set restaurantId only once, assuming all items come from the same restaurant
                if (!restaurantId) {
                    setRestaurantId(item.restaurantId);
                }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price, // Include price here
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            // Optimistically update the local state
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            // Make the API call to update the quantity
            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            // Handle response from the server
            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            // Revert the optimistic update in case of an error
            fetchCartItems();
        }
    };

    const placeOrder = async () => {
        try {
            const orderData = {
                userId: Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);
            if (response.status === 201) {
                alert('Order placed successfully!');
                setOrderPlaced(true); // Set orderPlaced to true after successful order
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.cartId} className="cart-item">
                        <div>
                            <h3>Menu Item: {item.menuItemName}</h3>
                            <p>Restaurant: {item.restaurantName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rs. {item.menuItemPrice}</p>
                            <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                        </div>
                        <div>
                            <button
                                className="increment"
                                onClick={() => updateCartItemQuantity(item.cartId, 1)}
                            >
                                +
                            </button>
                            <button
                                className="decrement"
                                onClick={() => updateCartItemQuantity(item.cartId, -1)}
                                /* disabled={item.quantity <= 1} */
                        /*    >
                                -
                            </button>
                        </div>
                    </div>
                ))
            )}

            {/* Conditionally render the "Place Order" button only if cart is not empty and order is not placed */
           /* {cartItems.length > 0 && !orderPlaced && (
                <button className="place-order-button" onClick={placeOrder}>
                    Place Order
                </button>
            )}
        </div>
    );
};

export default Cart;*/



/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if order is placed
    const userId = localStorage.getItem('userId');
    const deliveryAddressId = 1; // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                // Set restaurantId only once, assuming all items come from the same restaurant
                if (!restaurantId) {
                    setRestaurantId(item.restaurantId);
                }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price, // Include price here
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            // Optimistically update the local state
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            // Make the API call to update the quantity
            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            // Handle response from the server
            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            // Revert the optimistic update in case of an error
            fetchCartItems();
        }
    };

    const placeOrder = async () => {
        try {
            const orderData = {
                userId: Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);
            if (response.status === 201) {
                alert('Order placed successfully!');
                setOrderPlaced(true); // Set orderPlaced to true after successful order
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.map(item => (
                <div key={item.cartId} className="cart-item">
                    <div>
                        <h3>Menu Item: {item.menuItemName}</h3>
                        <p>Restaurant: {item.restaurantName}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs. {item.menuItemPrice}</p>
                        <p>Total: Rs. {item.quantity * item.menuItemPrice}</p>
                    </div>
                    <div>
                        <button
                            className="increment"
                            onClick={() => updateCartItemQuantity(item.cartId, 1)}
                        >
                            +
                        </button>
                        <button
                            className="decrement"
                            onClick={() => updateCartItemQuantity(item.cartId, -1)}
                            /* disabled={item.quantity <= 1} */
                      /*  >
                            -
                        </button>
                    </div>
                </div>
            ))}

            {!orderPlaced && ( // Conditionally render the "Place Order" button
                <button className="place-order-button" onClick={placeOrder}>
                    Place Order
                </button>
            )}
        </div>
    );
};

export default Cart;*/





/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; 

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('userId');
    const deliveryAddressId = 1 // Assuming delivery address is stored
    const [restaurantId, setRestaurantId] = useState(null); // To be populated dynamically

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/carts/getCartByUserId/${userId}`);
            const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
                const menuItemResponse = await axios.get(`http://localhost:8082/api/menuItems/getMenuItem/${item.menuItemId}`);
                const restaurantResponse = await axios.get(`http://localhost:8082/api/restaurants/getRestaurant/${item.restaurantId}`);

                // Set restaurantId only once, assuming all items come from the same restaurant
                if (!restaurantId) {
                    setRestaurantId(item.restaurantId);
              }

                return {
                    ...item,
                    menuItemName: menuItemResponse.data.foodName,
                    menuItemPrice: menuItemResponse.data.price,  // Include price here
                    restaurantName: restaurantResponse.data.restaurantName,
                };
            }));

            setCartItems(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items', error);
        }
    };

    const updateCartItemQuantity = async (cartId, quantityChange) => {
        try {
            // Optimistically update the local state
            setCartItems(prevCartItems =>
                prevCartItems.map(item =>
                    item.cartId === cartId ? { ...item, quantity: item.quantity + quantityChange } : item
                )
            );

            // Make the API call to update the quantity
            const response = await axios.put(`http://localhost:8083/api/carts/update/${cartId}`, null, {
                params: { quantityChange }
            });

            // Handle response from the server
            if (response.data.message === "Item Removed Successfully") {
                setCartItems(prevCartItems => prevCartItems.filter(item => item.cartId !== cartId));
            }
        } catch (error) {
            console.error('Error updating cart item quantity', error);
            // Revert the optimistic update in case of an error
            fetchCartItems();
        }
    };

    const placeOrder = async () => {
        try {
            const orderData = {
                userId:Number(userId),
                deliveryAddressId: deliveryAddressId,
                restaurantId: restaurantId,
                cartItems: cartItems.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: item.menuItemPrice
                }))
            };

            const response = await axios.post('http://localhost:8083/api/orders/place', orderData);
            if (response.status === 201) {
                alert('Order placed successfully!');
            }
        } catch (error) {
            console.error('Error placing order', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-header">My Cart</h1>
            {cartItems.map(item => (
                <div key={item.cartId} className="cart-item">
                    <div>
                        <h3>Menu Item: {item.menuItemName}</h3>
                        <p>Restaurant: {item.restaurantName}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs. {item.menuItemPrice}</p> 
                        <p>Total: Rs. {item.quantity * item.menuItemPrice}</p> 
                    </div>
                    <div>
                        <button 
                            className="increment" 
                            onClick={() => updateCartItemQuantity(item.cartId, 1)}
                        >
                            +
                        </button>
                        <button 
                            className="decrement" 
                            onClick={() => updateCartItemQuantity(item.cartId, -1)}
                           /* disabled={item.quantity <= 1} */
                     /*  >
                            -
                        </button>
                    </div>
                </div>
            ))}
            <button className="place-order-button" onClick={placeOrder}>
                Place Order
            </button> 
        </div>
    );
};

export default Cart;*/





