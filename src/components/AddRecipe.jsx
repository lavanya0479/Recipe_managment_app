import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({ fetchRecipes }) => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    prepTime: '',
    cuisine: '',
    image: ''  // New field for image URL
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/recipes', formData);
      
      // Check if the response status is successful (201 or 200)
      if (response.status === 201 || response.status === 200) {
        alert("Recipe added successfully!");  // Show success message
        fetchRecipes();  // Fetch updated list of recipes
        navigate('/');   // Redirect to the home page
      } else {
        console.error('Failed to add recipe:', response.data);
      }
    } catch (error) {
      // Log error message if the request fails
      console.error('Error adding recipe:', error.response || error.message);
      alert("Failed to add recipe. Please try again.");
    }
  };

  return (
    <form className="add-recipe-form" onSubmit={handleSubmit}>
      <h2>Add a New Recipe</h2>
      <input
        name="title"
        placeholder="Recipe Title"
        onChange={handleChange}
        value={formData.title}
        required
        className="form-input"
      />
      <input
        name="ingredients"
        placeholder="Ingredients (comma-separated)"
        onChange={handleChange}
        value={formData.ingredients}
        required
        className="form-input"
      />
      <textarea
        name="steps"
        placeholder="Cooking Steps"
        onChange={handleChange}
        value={formData.steps}
        required
        className="form-textarea"
      ></textarea>
      <input
        name="prepTime"
        placeholder="Preparation Time"
        onChange={handleChange}
        value={formData.prepTime}
        required
        className="form-input"
      />
      <input
        name="cuisine"
        placeholder="Cuisine Type"
        onChange={handleChange}
        value={formData.cuisine}
        required
        className="form-input"
      />
      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        value={formData.image}
        className="form-input"
      />
      <button type="submit" className="submit-btn">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
