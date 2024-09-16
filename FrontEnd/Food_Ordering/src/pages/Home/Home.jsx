import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import RestaurantList from '../../components/RestaurantList/RestaurantList';

//import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
//import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { useState } from 'react';
//import Cart from '../Cart/Cart';

function Home() {
  const[category,setCategory]=useState("All");

  return (
    <div>
        <Header/>
        {/*<ExploreMenu category={category} setCategory={setCategory}/>*/ }
        {/* <FoodDisplay category={category}/>*/}
        <RestaurantList category={category} setCategory={setCategory}/>
      
      
    </div>
  )
}

export default Home
