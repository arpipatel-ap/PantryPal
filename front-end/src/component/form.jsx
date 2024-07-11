import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/add_recipes.scss'; 

export default function Form() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    description: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(recipe);
    try {
      const response = await fetch('/add_recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate('/recipes');
        console.log('Add recipe successful');
      } else {
        // Registration failed, handle the error
        console.error('Add recipe failed:', data.error);
       
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      setError('Add recipe failed: ' + error.message );
    }

  };
  return (
    <div className="add-recipes">
    <h1>Add Recipes</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name of the Recipe</label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleInputChange}
          />
          {recipe.image && (
            <img
              src={recipe.image}
              alt="Recipe"
              className="image-preview"
            />
          )}
        </div>
      <button type="submit">Add Recipes</button>
    </form>
  </div>
);
};

  