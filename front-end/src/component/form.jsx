import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/add_recipes.scss'; 

export default function Form() {
  const [recipe, setRecipe] = useState({
    name: '',
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
      const response = await fetch('/add', {
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
        console.log('Registration successful');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', data.error);
       
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed: ' + error.message );
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
          name="name"
          value={recipe.name}
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

  