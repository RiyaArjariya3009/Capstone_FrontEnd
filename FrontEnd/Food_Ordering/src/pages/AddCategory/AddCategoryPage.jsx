import React, { useState, useEffect } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Log the response to inspect it

          // Check if data is an array or a single object
          if (Array.isArray(data)) {
            setRestaurants(data);
          } else {
            // Handle single object response if needed
            setRestaurants([data]);
          }
        } else {
          setErrorMessage('Failed to load restaurants. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Select Restaurant:</label>
          <select
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.restaurantName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;



/*import React, { useState, useEffect } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Log the response to inspect it

          // Since the response is a single object, put it into an array to use map
          setRestaurants([data]);
        } else {
          setErrorMessage('Failed to load restaurant. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurant. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Select Restaurant:</label>
          <select
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.restaurantName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;*/


/*import React, { useState, useEffect } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]); // Ensure initial state is an array
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setRestaurants(data);
          } else {
            setErrorMessage('Unexpected response format. Please try again.');
          }
        } else {
          setErrorMessage('Failed to load restaurants. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Select Restaurant:</label>
          <select
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.restaurantName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;*/

/*import React, { useState, useEffect } from 'react';

const AddCategoryPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const userId = localStorage.getItem('userId'); // Retrieve the userId from local storage

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetch restaurants based on the userId
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data); // Set the restaurants array in state
          console.log('Fetched Restaurants:', data); // Log the fetched data
        } else {
          setErrorMessage('Failed to load restaurants. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.restaurantName} (ID: {restaurant.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCategoryPage;*/

/*import React, { useState, useEffect } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Retrieve the userId from local storage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch restaurants based on the userId
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data); // Set the restaurants array in state
        } else {
          setErrorMessage('Failed to load restaurants. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <h1>{userId}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Select Restaurant:</label>
          <select
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.restaurantName}
                </option>
              ))
            ) : (
              <option disabled>No restaurants available</option>
            )}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;*/

/*import React, { useState, useEffect } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched restaurants:", data); // Log the response data
          setRestaurants(data); // Assuming `data` is an array
        } else {
          setErrorMessage('Failed to load restaurants. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <h1>{userId}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Select Restaurant:</label>
          <select
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            <option value="">Select a restaurant</option>
            {Array.isArray(restaurants) && restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.restaurantName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;*/

/*import React, { useState, useEffect } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        } else {
          setErrorMessage('Failed to load restaurants. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Error occurred while fetching restaurants. Please try again.');
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Select Restaurant:</label>
          <select
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;*/

/*import React, { useState } from 'react';
import './AddCategoryPage.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      restaurantId: parseInt(restaurantId),
    };

    try {
      const response = await fetch('http://localhost:8082/api/categories/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        setSuccessMessage('Category added successfully!');
        setCategoryName('');
        setRestaurantId('');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantId">Restaurant ID:</label>
          <input
            type="number"
            id="restaurantId"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            required
            placeholder="Enter restaurant ID"
          />
        </div>
        <button type="submit" className="submit-button">Add Category</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddCategoryPage;*/
