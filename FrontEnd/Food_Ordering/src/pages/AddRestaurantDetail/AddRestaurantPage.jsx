/*import React, { useState, useEffect } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('restaurantName', restaurantName);
    formData.append('address', address);
    formData.append('contactInformation', contactInformation);
    formData.append('openingHours', openingHours);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message || "Restaurant added successfully!");
        setError("");
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setDescription("");
        setImage(null);

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage("");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/



/*import React, { useState, useEffect } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('restaurantName', restaurantName);
    formData.append('address', address);
    formData.append('contactInformation', contactInformation);
    formData.append('openingHours', openingHours);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message || "Restaurant added successfully!");
        setError("");
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setDescription("");
        setImage(null);
        setIsPopupOpen(false); // Close the popup after successful submission
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage("");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <button onClick={() => setIsPopupOpen(true)} className="submit_button">Open Form</button>
      
      {isPopupOpen && (
        <>
          <div className="overlay" onClick={() => setIsPopupOpen(false)}></div>
          <div className="popup">
            <button className="close-button" onClick={() => setIsPopupOpen(false)}>&times;</button>
            <h2>Add Restaurant</h2>
            <form onSubmit={handleSubmit} className="add-restaurant-form">
              <div className="form-group">
                <input
                  id="restaurantName"
                  type="text"
                  placeholder="Enter restaurant name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="address"
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="contactInformation"
                  type="text"
                  placeholder="Enter contact information"
                  value={contactInformation}
                  onChange={(e) => setContactInformation(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="openingHours"
                  type="text"
                  placeholder="Enter opening hours"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="submit_button">Add Restaurant</button>
              {successMessage && <p className="success-text">{successMessage}</p>}
              {error && <p className="error-text">{error}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AddRestaurantPage;*/



import React, { useState, useEffect } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [description, setDescription] = useState(""); // Added description state
  const [image, setImage] = useState(null); // Changed from imageUrl to image
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null); // Initialize as null

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('restaurantName', restaurantName);
    formData.append('address', address);
    formData.append('contactInformation', contactInformation);
    formData.append('openingHours', openingHours);
    formData.append('description', description); // Append the description
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json(); // Get JSON response if needed
        setSuccessMessage(result.message || "Restaurant added successfully!");
        setError(""); // Clear any previous error messages
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setDescription(""); // Clear the description field
        setImage(null);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage(""); // Clear any previous success messages
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="add-restaurant-container">

      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="image"
            type="file"
            onChange={handleImageChange} // Handle image file selection
          />
        </div>
        <button type="submit" className="submit_button">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;





/*import React, { useState, useEffect } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [image, setImage] = useState(null); // Changed from imageUrl to image
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null); // Initialize as null

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('restaurantName', restaurantName);
    formData.append('address', address);
    formData.append('contactInformation', contactInformation);
    formData.append('openingHours', openingHours);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json(); // Get JSON response if needed
        setSuccessMessage(result.message || "Restaurant added successfully!");
        setError(""); // Clear any previous error messages
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setImage(null);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage(""); // Clear any previous success messages
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="add-restaurant-container">
      <br />
      <h2>Add Restaurant</h2>
      <br />
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="image"
            type="file"
            onChange={handleImageChange} // Handle image file selection
          />
        </div>
        <button type="submit" className="submit-button">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/

/*import React, { useState, useEffect } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null); // Initialize as null

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    const data = {
      userId,
      restaurantName,
      address,
      contactInformation,
      openingHours,
      imageUrl,
    };

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Restaurant added successfully!");
        setError(""); // Clear any previous error messages
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setImageUrl("");

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage(""); // Clear any previous success messages
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="add-restaurant-container">
      <br />
      <h2>Add Restaurant</h2>
      <br />
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="imageUrl"
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/

/*import React, { useState, useEffect } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null); // Initialize as null
  //const [userEmail, setUserEmail] = useState(""); // Initialize as empty string

  useEffect(() => {
    // Retrieve userId and email from localStorage
    const storedUserId = localStorage.getItem('userId');
    //const storedUserEmail = localStorage.getItem('userEmail');

    if (storedUserId) {
      setUserId(storedUserId);
    }

    /*if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }*/
  /*}, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*

    const data = {
      userId,
      restaurantName,
      address,
      contactInformation,
      openingHours,
      imageUrl,
      };

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Restaurant added successfully!");
        setError(""); // Clear any previous error messages
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setImageUrl("");
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage(""); // Clear any previous success messages
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="add-restaurant-container">
      <br></br>
      <h2>Add Restaurant</h2>
      <br></br>
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="imageUrl"
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/

/*import React, { useState } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId] = useState(1); // Example user ID, replace with actual user ID from context or auth

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 24; 

    const data = {
      userId,
      restaurantName,
      address,
      contactInformation,
      openingHours,
      imageUrl
    };

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Restaurant added successfully!");
        setError(""); // Clear any previous error messages
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setImageUrl("");
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage(""); // Clear any previous success messages
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="imageUrl"
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/

/*import React, { useState } from 'react';
import './AddRestaurantPage.css'; // Assuming you have a CSS file for styling

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId] = useState(1); // Example user ID, replace with actual user ID from context or auth

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 24; 
   // const email = "Radha@nucleusteq.com";

    const data = {
      userId,
      restaurantName,
      address,
      contactInformation,
      openingHours,
      imageUrl
    };

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Restaurant added successfully!");
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactInformation("");
        setOpeningHours("");
        setImageUrl("");
      } else {
        alert("Error adding restaurant.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit} className="add-restaurant-form">
        <div className="form-group">
          <input
            id="restaurantName"
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
           <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
           <input
            id="contactInformation"
            type="text"
            placeholder="Enter contact information"
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
         <input
            id="openingHours"
            type="text"
            placeholder="Enter opening hours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="imageUrl"
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/


/*import React, { useState } from 'react';
import './AddRestaurantPage.css';

const AddRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerId = 24; 
    const email = "Radha@nucleusteq.com";

    const data = {
      ownerId,
      restaurantName,
      email,
      address,
      contactNo,
      open: true,
      openingHours,
      imageUrl
    };

    try {
      const response = await fetch('http://localhost:8082/api/restaurants/createRestaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Restaurant added successfully!");
        setError("");
        // Clear form fields
        setRestaurantName("");
        setAddress("");
        setContactNo("");
        setOpeningHours("");
        setImageUrl("");
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        setSuccessMessage("");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className='add-restaurant-page'>
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Opening Hours"
          value={openingHours}
          onChange={(e) => setOpeningHours(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Restaurant</button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default AddRestaurantPage;*/
