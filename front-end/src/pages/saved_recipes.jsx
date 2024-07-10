import {useState} from "react";
import NavBar from "../component/navbar";
import '../style/navbar.scss';
import '../style/footer.scss';
import '../style/navbar.scss';
import '../style/footer.scss';
import '../style/my_recipes.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "../component/footer";
import img2 from "../Assets/img_2.jpg";
import image from "../Assets/image.jpg";
import Saved from "../component/saved";


const SavedRecipes = () =>{
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
    }
  ]
  return (

    <div className="content">
      <header>
        <GiHamburgerMenu  onClick={() => setShowNav(!showNav)}/>
        <a href ="#!" className="logo" >Pantry<span>Pal</span></a>
      </header>
      <NavBar show ={showNav} /> 
      <div className="main">
      <div className="recipes-container">
                {/* <RecipeCard /> */}
                {recipes.map((recipe, index) => (
                    <Saved key={index} recipe={recipe} />
                ))}
     </div>
      </div>
      <Footer />
    </div>
  
  );
}

export default SavedRecipes;