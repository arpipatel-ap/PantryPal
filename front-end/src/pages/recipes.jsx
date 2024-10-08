import { useState, useEffect } from "react";
import Footer from "../component/footer";
import Search from "../component/search";
import RecipeCard from "../component/recipeCard";
import '../style/navbar.scss';
import '../style/footer.scss';
import '../style/recipes.scss';


const Recipes = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (query = '') => {
    try {
      const endpoint = query ? `/recipes/search?query=${query}` : '/recipes/recipes';
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error('Failed to fetch recipes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
    }
  }
  useEffect(() => {
    
    if (userId !== null) {
      fetchRecipes();
    }
  }, [userId]);
  const handleSearch = (query) => {
    fetchRecipes(query);
  }
  return (
    <div className="content">

      <div className="main">
        <Search onSearch={handleSearch} />
        <div className="recipes-container">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} userId={userId} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;