import {useState, useEffect} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "../component/navbar";
import Footer from "../component/footer";
import Search from "../component/search";
import RecipeCard from "../component/recipeCard";
import '../style/navbar.scss';
import '../style/footer.scss';
import '../style/recipes.scss';

const Recipes = () =>{
  const [showNav, setShowNav] = useState(false)
  const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     async function fetchRecipes() {
//       try {
//         // const response = await fetch('/recipes/recipes'); // Fetch recipes from your backend


const fetchRecipes = async (query = '') => {
    try {
        const endpoint = query ? `/recipes/search?query=${query}` : '/recipes/recipes';
      const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data); // Update recipes state with fetched data
        } else {
          console.error('Failed to fetch recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    }
    useEffect(() => {
        fetchRecipes(); // Fetch all recipes initially
      }, []);
    
      const handleSearch = (query) => {
        fetchRecipes(query); // Fetch recipes based on search query
      }
  return (
    <div className="content">
      <header>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <a href="#!" className="logo"> Pantry<span>Pal</span>
        </a>
      </header>
      <NavBar show={showNav} />
      <div className="main">
      <Search onSearch={handleSearch} />
        <div className="recipes-container">
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