import React, { useState } from 'react';
import './ViewMenuItems.css';

function ViewMenuItems({ items, restaurantId, userId }) {
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = async (menuItemId, price) => {
    try {
      // Prepare the cart item request DTO
      const cartItemRequestDto = {
        userId,
        restaurantId,
        menuItemId,
        price,
        quantity: 1, // Default quantity is 1, will be incremented if it exists
      };

      // Send the request to add the item to the cart
      const response = await fetch('http://localhost:8083/api/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemRequestDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart');
      }

      const data = await response.json();
      console.log('Cart updated:', data);

      // Show success popup
      setPopupMessage('Cart Added Successfully!');
      setShowPopup(true);
    } catch (error) {
      console.error('Error updating cart:', error);

      // Show error message in the popup
      setPopupMessage(error.message);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="menu-items">
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={`data:image/png;base64,${item.imageData}`} alt={item.name} />
          <div className="menu-item-details">
            <h4>{item.foodName}</h4>
            <p>{item.description}</p>
            <p>Price: Rs. {item.price}</p>
            <button onClick={() => addToCart(item.id, item.price)}>Add to Cart</button>
          </div>
        </div>
      ))}

      {/* Popup Message */}
      {showPopup && (
        <div className="popup" onClick={handleClosePopup}>
          {popupMessage}
        </div>
      )}
    </div>
  );
}

export default ViewMenuItems;



/*import React, { useState } from 'react';
import './ViewMenuItems.css';

function ViewMenuItems({ items, restaurantId, userId }) {
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = async (menuItemId, price) => {
    try {
      // Prepare the cart item request DTO
      const cartItemRequestDto = {
        userId,
        restaurantId,
        menuItemId,
        price,
        quantity: 1, // Default quantity is 1, will be incremented if it exists
      };

      // Send the request to add the item to the cart
      const response = await fetch('http://localhost:8083/api/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemRequestDto),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      console.log('Cart updated:', data);

      // Show the success popup
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="menu-items">
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={`data:image/png;base64,${item.imageData}`} alt={item.name} />
          <div className="menu-item-details">
            <h4>{item.foodName}</h4>
            <p>{item.description}</p>
            <p>Price: Rs. {item.price}</p>
            <button onClick={() => addToCart(item.id, item.price)}>Add to Cart</button>
          </div>
        </div>
      ))}

      {/* Popup Message }*/
     /* {showPopup && (
        <div className="popup">
          Cart Added Successfully!
        </div>
      )}
    </div>
  );
}

export default ViewMenuItems;*/


/*import React from 'react';
import './ViewMenuItems.css';

function ViewMenuItems({ items, restaurantId, userId }) {
  const addToCart = async (menuItemId, price) => {
    try {
      // Prepare the cart item request DTO
      const cartItemRequestDto = {
        userId,
        restaurantId,
        menuItemId,
        price,          // Include the price
        quantity: 1,    // Default quantity is 1, will be incremented if it exists
      };

      // Send the request to add the item to the cart
      const response = await fetch('http://localhost:8083/api/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemRequestDto),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      console.log('Cart updated:', data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="menu-items">
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={`data:image/png;base64,${item.imageData}`} alt={item.name} />
          <div className="menu-item-details">
            <h4>{item.foodName}</h4>
            <p>{item.description}</p>
            <p>Price: Rs. {item.price}</p>
            <button onClick={() => addToCart(item.id, item.price)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewMenuItems;*/












/*import React from 'react';
import './ViewMenuItems.css';

function ViewMenuItems({ items, restaurantId, userId }) {
  const addToCart = async (menuItemId) => {
    try {
      // Prepare the cart item request DTO
      const cartItemRequestDto = {
        userId,
        restaurantId,
        menuItemId,
        quantity: 1, // Default quantity is 1, will be incremented if it exists
      };

      // Send the request to add the item to the cart
      const response = await fetch('http://localhost:8083/api/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemRequestDto),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      console.log('Cart updated:', data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="menu-items">
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={`data:image/png;base64,${item.imageData}`} alt={item.name} />
          <div className="menu-item-details">
            <h4>{item.foodName}</h4>
            <p>{item.description}</p>
            <p>Price: Rs. {item.price}</p>
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewMenuItems;*/









