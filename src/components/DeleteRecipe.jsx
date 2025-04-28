import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteRecipe = ({ recipeId, fetchRecipes }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
      
      // Call fetchRecipes to update the recipe list (in App.jsx or RecipeList.jsx)
      fetchRecipes();
      
      // Navigate back to the home page or a different page
      navigate('/');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipe;
