export const fetchCategories = async (restaurantId) => {
    const response = await fetch(`http://localhost:8082/api/categories/getAllCategory/${restaurantId}`);
    const data = await response.json();
    return data;
};

export const fetchMenuItems = async (restaurantId, categoryId) => {
 //   const response = await fetch(`https://your-api-endpoint.com/restaurants/${restaurantId}/menuitems?category=${categoryId}`);
   const data = await response.json();
    return data;
};



/*export const fetchCategories = async () => {
    const response = await fetch('https://your-api-endpoint.com/categories');
    const data = await response.json();
    return data;
  };
  
  export const fetchMenuItems = async (categoryId) => {
    const response = await fetch(`https://your-api-endpoint.com/menuitems?category=${categoryId}`);
    const data = await response.json();
    return data;
  };*/
  