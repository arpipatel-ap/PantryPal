import {useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import Search from "../component/search";
import RecipeCard from "../component/recipeCard";
import '../style/navbar.scss';
import '../style/footer.scss';
import '../style/recipes.scss';

import img1 from "../Assets/img_1.jpg";
import img2 from "../Assets/img_2.jpg";
import image from "../Assets/image.jpg";



const Recipes = () =>{
  const [showNav, setShowNav] = useState(false)
  const recipes = [
    {
        title: "Chicken Pan Pizza",
        image: image,
        authorImg: img2,
    }, 
    {
        title: "Spaghetti and Meatballs",
        image: image,
        authorImg: img2,
    },
    {
        title: "American Cheese Burger",
       image: image,
        authorImg: img2,
    },
    {
        title: "Mutton Biriyani",
        image: image,
        authorImg: img2,
    },
    {
        title: "Japanese Sushi",
        image: image,
        authorImg: img2,
    },
    {
        title: "Chicken Pan Pizza",
        image: image,
        authorImg: img2,
    }, 
    {
        title: "Spaghetti and Meatballs",
        image: image,
        authorImg: img2,
    },
    {
        title: "American Cheese Burger",
        image: image,
        authorImg: img2,
    },
    {
        title: "Mutton Biriyani",
        image: image,
        authorImg: img2,
    },
    {
        title: "Japanese Sushi",
        image: image,
        authorImg: img2,
    },
    {
        title: "American Cheese Burger",
        image: image,
        authorImg: img2,
    },
    {
        title: "Mutton Biriyani",
        image: image,
        authorImg: img2,
    }
].sort(() => Math.random() - 0.5)
  return (

    <div className="content">
      <header>
        <GiHamburgerMenu  onClick={() => setShowNav(!showNav)}/>
        <a href ="#!" className="logo" >Pantry<span>Pal</span></a>
      </header>
      <NavBar show ={showNav} /> 
      <div className="main">
        <Search />
            <div className="recipes-container">
                {/* <RecipeCard /> */}
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
      </div>
      <Footer />
    </div>
  
  );
}

export default Recipes;