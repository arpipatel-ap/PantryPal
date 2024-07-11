import React from "react";
import '../style/navbar.scss';
import cooklogo from '../Assets/cook.png';


const NavBar = ({show, isLoggedIn }) =>{
  return (
    
   <div className={show ? "sidenav active" : "sidenav"}>
    
    <img src ={cooklogo} alt = 'logo' className="logo"/>
    <ul>
        <li><a href="/">Home</a></li>
        {isLoggedIn ? (
          <>
            <li><a href="#!">Profile</a></li>
            <li><a href="/my_recipes">My Recipes</a></li>
            <li><a href="/add_recipes">Add Recipe</a></li>
            <li><a href="/saved_recipes">Saved</a></li>
            <li><a href="#!">Categries</a></li>
            <li><a href="/logout">Logout</a></li>
          </>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        )}
      </ul>
   </div>
  );
}

export default NavBar;