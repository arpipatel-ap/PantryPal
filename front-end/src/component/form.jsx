import { useState } from 'react';

import '../style/add_recipes.scss'; 

export default function Form() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(recipe);
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

  