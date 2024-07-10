import React, { useState } from 'react';
import '../style/view_recipes.scss';

export default function View() {
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    rating: '',
    description: '',
    comment: '',
    comments: [],
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, comments: [...form.comments, form.comment], comment: '' });
    // handle other form submission logic here
  };

  return (
    <div className="recipe-form">
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Image</label>
            <input type="text" name="image" value={form.image} onChange={handleInputChange} placeholder="Image URL" />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleInputChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Ingredients</label>
          <input type="text" name="ingredients" value={form.ingredients} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input type="text" name="rating" value={form.rating} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleInputChange}></textarea>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
      <div className="comments-section">
        <h2>Comments</h2>
        <div className="form-group">
          <label>Add comments</label>
          <input type="text" name="comment" value={form.comment} onChange={handleInputChange} />
        </div>
        {form.comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
