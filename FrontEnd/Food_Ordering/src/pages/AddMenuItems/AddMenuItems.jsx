import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8082/api/restaurants/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRestaurants(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setErrorMessage('Failed to fetch restaurants. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                setErrorMessage('Failed to fetch restaurants. Please try again.');
            })
            .finally(() => setIsLoadingRestaurants(false));
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            setIsLoadingCategories(true);
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else {
                        console.error('Unexpected response format:', data);
                        setCategories([]);
                        setErrorMessage('Failed to fetch categories. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setErrorMessage('Failed to fetch categories. Please try again.');
                })
                .finally(() => setIsLoadingCategories(false));
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
        setSelectedCategoryId(''); // Reset category selection when restaurant changes
        setCategories([]); // Clear categories until new ones are loaded
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                setSuccessMessage('Menu item added successfully!');

                // Clear form fields after successful submission
                setSelectedRestaurantId('');
                setSelectedCategoryId('');
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);

                // Clear local storage to remove selections
                localStorage.removeItem('selectedRestaurantId');
                localStorage.removeItem('selectedCategoryId');

                // Hide success message after a short delay
                setTimeout(() => {
                    setSuccessMessage('');
                }, 2000);
            })
            .catch(error => {
                console.error('Error adding menu item:', error);
                setErrorMessage('Failed to add menu item. Please try again.');

                // Hide error message after a short delay
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            });
    };

    return (
        <div className="add-menu-items-container">
            <h2>Add Menu Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="restaurant">Restaurant:</label>
                    {isLoadingRestaurants ? (
                        <p>Loading restaurants...</p>
                    ) : (
                        <select
                            id="restaurant"
                            value={selectedRestaurantId}
                            onChange={handleRestaurantChange}
                            required
                        >
                            <option value="">Select a restaurant</option>
                            {restaurants.map(restaurant => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.restaurantName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {selectedRestaurantId && (
                    <div>
                        <label htmlFor="category">Category:</label>
                        {isLoadingCategories ? (
                            <p>Loading categories...</p>
                        ) : (
                            <select
                                id="category"
                                value={selectedCategoryId}
                                onChange={handleCategoryChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}

                <div>
                    <label htmlFor="foodName">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={e => setFoodName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit">Add Menu Item</button>
            </form>
        </div>
    );
};

export default AddMenuItems;











/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8082/api/restaurants/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRestaurants(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setErrorMessage('Failed to fetch restaurants. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                setErrorMessage('Failed to fetch restaurants. Please try again.');
            })
            .finally(() => setIsLoadingRestaurants(false));
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            setIsLoadingCategories(true);
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else {
                        console.error('Unexpected response format:', data);
                        setCategories([]);
                        setErrorMessage('Failed to fetch categories. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setErrorMessage('Failed to fetch categories. Please try again.');
                })
                .finally(() => setIsLoadingCategories(false));
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
        setSelectedCategoryId(''); // Reset category selection when restaurant changes
        setCategories([]); // Clear categories until new ones are loaded
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                setSuccessMessage('Menu item added successfully!');
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            })
            .catch(error => {
                console.error('Error adding menu item:', error);
                setErrorMessage('Failed to add menu item. Please try again.');
            });
    };

    return (
        <div className="add-menu-items-container">
            <h2>Add Menu Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="restaurant">Restaurant:</label>
                    {isLoadingRestaurants ? (
                        <p>Loading restaurants...</p>
                    ) : (
                        <select
                            id="restaurant"
                            value={selectedRestaurantId}
                            onChange={handleRestaurantChange}
                            required
                        >
                            <option value="">Select a restaurant</option>
                            {restaurants.map(restaurant => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.restaurantName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {selectedRestaurantId && (
                    <div>
                        <label htmlFor="category">Category:</label>
                        {isLoadingCategories ? (
                            <p>Loading categories...</p>
                        ) : (
                            <select
                                id="category"
                                value={selectedCategoryId}
                                onChange={handleCategoryChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}

                <div>
                    <label htmlFor="foodName">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={e => setFoodName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit">Add Menu Item</button>
            </form>
        </div>
    );
};

export default AddMenuItems;*/





/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/restaurants/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Restaurants API Response:", data);

                    if (Array.isArray(data)) {
                        setRestaurants(data);
                    } else {
                        setRestaurants([data]);
                    }
                } else {
                    setErrorMessage('Failed to load restaurants. Please try again.');
                }
            } catch (error) {
                setErrorMessage('Error occurred while fetching restaurants. Please try again.');
            } finally {
                setIsLoadingRestaurants(false);
            }
        };

        fetchRestaurants();
    }, [userId]);

    useEffect(() => {
        if (selectedRestaurantId) {
            setIsLoadingCategories(true);
            const fetchCategories = async () => {
                try {
                    const response = await fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Categories API Response:", data);

                        if (Array.isArray(data)) {
                            setCategories(data);
                        } else {
                            setCategories([data]);
                        }
                    } else {
                        setErrorMessage('Failed to load categories. Please try again.');
                    }
                } catch (error) {
                    setErrorMessage('Error occurred while fetching categories. Please try again.');
                } finally {
                    setIsLoadingCategories(false);
                }
            };

            fetchCategories();
        }
    }, [selectedRestaurantId]);

    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8082/api/menuItems/add', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Menu item added successfully!');
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            } else {
                setErrorMessage('Failed to add menu item. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error occurred. Please try again.');
        }
    };

    return (
        <div className="add-menu-items-container">
            <h2>Add Menu Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="restaurant">Restaurant:</label>
                    {isLoadingRestaurants ? (
                        <p>Loading restaurants...</p>
                    ) : (
                        <select
                            id="restaurant"
                            value={selectedRestaurantId}
                            onChange={handleRestaurantChange}
                            required
                        >
                            <option value="">Select a restaurant</option>
                            {restaurants.map(restaurant => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.restaurantName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    {isLoadingCategories ? (
                        <p>Loading categories...</p>
                    ) : (
                        <select
                            id="category"
                            value={selectedCategoryId}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label htmlFor="foodName">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={e => setFoodName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit">Add Menu Item</button>
            </form>
        </div>
    );
};

export default AddMenuItems;*/





/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('userId');

    // Fetch user details based on userId
    
   useEffect(() => {
        fetch(`http://localhost:8082/api/restaurants/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.role === 'RESTAURANT_OWNER') {
                    setRestaurants([{ id: data.id, name: data.username }]);
                } else {
                    console.error('Unexpected response format:', data);
                    setErrorMessage('Failed to fetch user details. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setErrorMessage('Failed to fetch user details. Please try again.');
            })
            .finally(() => setIsLoadingRestaurants(false));
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            setIsLoadingCategories(true);
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else {
                        console.error('Unexpected response format:', data);
                        setCategories([]);
                        setErrorMessage('Failed to fetch categories. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setErrorMessage('Failed to fetch categories. Please try again.');
                })
                .finally(() => setIsLoadingCategories(false));
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                setSuccessMessage('Menu item added successfully!');
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            })
            .catch(error => {
                console.error('Error adding menu item:', error);
                setErrorMessage('Failed to add menu item. Please try again.');
            });
    };

    return (
        <div className="add-menu-items-container">
            <h2>Add Menu Item</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="restaurant">Restaurant:</label>
                    {isLoadingRestaurants ? (
                        <p>Loading restaurants...</p>
                    ) : (
                        <select
                            id="restaurant"
                            value={selectedRestaurantId}
                            onChange={handleRestaurantChange}
                            required
                        >
                            <option value="">Select a restaurant</option>
                            {restaurants.map(restaurant => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    {isLoadingCategories ? (
                        <p>Loading categories...</p>
                    ) : (
                        <select
                            id="category"
                            value={selectedCategoryId}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label htmlFor="foodName">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={e => setFoodName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit">Add Menu Item</button>
            </form>
        </div>
    );
};

export default AddMenuItems;*/







/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8081/api/auth/getUserBy/${userId}`)
            .then(response => response.json())
            .then(data => {
                // Handle both array and object responses
                if (Array.isArray(data)) {
                    setRestaurants(data);
                } else if (data && data.restaurants) {
                    setRestaurants(data.restaurants);
                } else {
                    console.error('Unexpected response format:', data);
                    setRestaurants([]);  // Set to empty array if unexpected format
                }
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                setRestaurants([]);  // Set to empty array on error
            });
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => {
                    // Handle both array and object responses
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else if (data && data.categories) {
                        setCategories(data.categories);
                    } else {
                        console.error('Unexpected response format:', data);
                        setCategories([]);  // Set to empty array if unexpected format
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setCategories([]);  // Set to empty array on error
                });
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                // Clear the form or show a success message
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            })
            .catch(error => console.error('Error adding menu item:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="restaurant">Restaurant:</label>
                <select
                    id="restaurant"
                    value={selectedRestaurantId}
                    onChange={handleRestaurantChange}
                    required
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.length > 0 ? (
                        restaurants.map(restaurant => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No restaurants available</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No categories available</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="foodName">Food Name:</label>
                <input
                    type="text"
                    id="foodName"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={e => setImage(e.target.files[0])}
                    required
                />
            </div>

            <button type="submit">Add Menu Item</button>
        </form>
    );
};

export default AddMenuItems;*/




/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8081/api/auth/getUserBy/${userId}`)
            .then(response => response.json())
            .then(data => {
                // Ensure that data is an array
                if (Array.isArray(data)) {
                    setRestaurants(data);
                } else {
                    console.error('Expected an array of restaurants, but got:', data);
                    setRestaurants([]);  // Set to empty array if not an array
                }
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                setRestaurants([]);  // Set to empty array on error
            });
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => {
                    // Ensure that data is an array
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else {
                        console.error('Expected an array of categories, but got:', data);
                        setCategories([]);  // Set to empty array if not an array
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setCategories([]);  // Set to empty array on error
                });
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                // Clear the form or show a success message
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            })
            .catch(error => console.error('Error adding menu item:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="restaurant">Restaurant:</label>
                <select
                    id="restaurant"
                    value={selectedRestaurantId}
                    onChange={handleRestaurantChange}
                    required
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.length > 0 ? (
                        restaurants.map(restaurant => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No restaurants available</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No categories available</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="foodName">Food Name:</label>
                <input
                    type="text"
                    id="foodName"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={e => setImage(e.target.files[0])}
                    required
                />
            </div>

            <button type="submit">Add Menu Item</button>
        </form>
    );
};

export default AddMenuItems;*/





/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8081/api/auth/getUserBy/${userId}`)
            .then(response => response.json())
            .then(data => {
                // Ensure that data is an array
                if (Array.isArray(data)) {
                    setRestaurants(data);
                } else {
                    console.error('Expected an array of restaurants, but got:', data);
                    setRestaurants([]);  // Set to empty array if not an array
                }
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                setRestaurants([]);  // Set to empty array on error
            });
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => {
                    // Ensure that data is an array
                    if (Array.isArray(data)) {
                        setCategories(data);
                    } else {
                        console.error('Expected an array of categories, but got:', data);
                        setCategories([]);  // Set to empty array if not an array
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setCategories([]);  // Set to empty array on error
                });
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                // Clear the form or show a success message
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            })
            .catch(error => console.error('Error adding menu item:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="restaurant">Restaurant:</label>
                <select
                    id="restaurant"
                    value={selectedRestaurantId}
                    onChange={handleRestaurantChange}
                    required
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.length > 0 ? (
                        restaurants.map(restaurant => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No restaurants available</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No categories available</option>
                    )}
                </select>
            </div>

            <div>
                <label htmlFor="foodName">Food Name:</label>
                <input
                    type="text"
                    id="foodName"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={e => setImage(e.target.files[0])}
                    required
                />
            </div>

            <button type="submit">Add Menu Item</button>
        </form>
    );
};

export default AddMenuItems;*/



/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(localStorage.getItem('selectedRestaurantId') || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(localStorage.getItem('selectedCategoryId') || '');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8081/api/auth/getUserBy/${userId}`)
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => setCategories(data))
                .catch(error => console.error('Error fetching categories:', error));
        }
    }, [selectedRestaurantId]);

    // Store selected restaurant and category in local storage
    const handleRestaurantChange = (e) => {
        const restaurantId = e.target.value;
        setSelectedRestaurantId(restaurantId);
        localStorage.setItem('selectedRestaurantId', restaurantId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        localStorage.setItem('selectedCategoryId', categoryId);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                // Clear the form or show a success message
                setFoodName('');
                setDescription('');
                setPrice('');
                setImage(null);
            })
            .catch(error => console.error('Error adding menu item:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="restaurant">Restaurant:</label>
                <select
                    id="restaurant"
                    value={selectedRestaurantId}
                    onChange={handleRestaurantChange}
                    required
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.map(restaurant => (
                        <option key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="foodName">Food Name:</label>
                <input
                    type="text"
                    id="foodName"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={e => setImage(e.target.files[0])}
                    required
                />
            </div>

            <button type="submit">Add Menu Item</button>
        </form>
    );
};

export default AddMenuItems;*/




/*import React, { useState, useEffect } from 'react';
import './AddMenuItems.css';

const AddMenuItems = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem('userId');

    // Fetch restaurants based on userId
    useEffect(() => {
        fetch(`http://localhost:8081/api/auth/getUserBy/${userId}`)
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, [userId]);

    // Fetch categories based on selected restaurant ID
    useEffect(() => {
        if (selectedRestaurantId) {
            fetch(`http://localhost:8082/api/categories/getAllCategory/${selectedRestaurantId}`)
                .then(response => response.json())
                .then(data => setCategories(data))
                .catch(error => console.error('Error fetching categories:', error));
        }
    }, [selectedRestaurantId]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantId', selectedRestaurantId);
        formData.append('categoryId', selectedCategoryId);
        formData.append('foodName', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://localhost:8082/api/menuItems/add', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Menu item added:', data);
                // Clear the form or show a success message
            })
            .catch(error => console.error('Error adding menu item:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="restaurant">Restaurant:</label>
                <select
                    id="restaurant"
                    value={selectedRestaurantId}
                    onChange={e => setSelectedRestaurantId(e.target.value)}
                    required
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.map(restaurant => (
                        <option key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={e => setSelectedCategoryId(e.target.value)}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="foodName">Food Name:</label>
                <input
                    type="text"
                    id="foodName"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={e => setImage(e.target.files[0])}
                    required
                />
            </div>

            <button type="submit">Add Menu Item</button>
        </form>
    );
};

export default AddMenuItems;*/
