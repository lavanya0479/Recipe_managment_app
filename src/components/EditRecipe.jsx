import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    prepTime: '',
    cuisine: '',
    image: ''  // Added image URL field
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/recipes/${id}`, formData);
      navigate(`/recipes/${id}`); // Redirect after saving changes
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  if (!formData.title) return <p>Loading...</p>;

  return (
    <form className="add-recipe-form" onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input
        name="title"
        placeholder="Recipe Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        name="ingredients"
        placeholder="Ingredients (comma-separated)"
        value={formData.ingredients}
        onChange={handleChange}
        required
        className="form-input"
      />
      <textarea
        name="steps"
        placeholder="Cooking Steps"
        value={formData.steps}
        onChange={handleChange}
        required
        className="form-textarea"
      ></textarea>
      <input
        name="prepTime"
        placeholder="Preparation Time"
        value={formData.prepTime}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        name="cuisine"
        placeholder="Cuisine Type"
        value={formData.cuisine}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="form-input"
      />
<button style={{ backgroundColor: 'orange' }} type="submit" className="submit-btn">Save Changes</button>
</form>
  );
};

export default EditRecipe;
