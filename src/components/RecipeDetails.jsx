import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetails = ({ fetchRecipes }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setRecipe(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error fetching recipe. Please try again later.');
      console.error('Error fetching recipe:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${id}`);
      fetchRecipes();
      navigate('/'); // Redirect to home page after delete
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError('Failed to delete the recipe. Please try again later.');
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p className="loading">Loading...</p>;

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      {/* Content Section */}
      <div style={{ flex: '2', marginRight: '20px' }}>
        {/* Recipe Title */}
        <h1>{recipe.title}</h1>

        {/* Preparation Time */}
        <h3>
          <strong>Preparation Time:</strong> <span style={{ fontSize: '1.2rem' }}>{recipe.prepTime}</span>
        </h3>

        {/* Cuisine */}
        <h3><strong>Cuisine:</strong> <span style={{ fontSize: '1.2rem' }}>{recipe.cuisine}</span></h3>

        {/* Ingredients */}
        <h3><strong>Ingredients:</strong></h3>
        <ul>
          {recipe.ingredients.split(',').map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>

        {/* Steps */}
        <h3><strong>Steps:</strong></h3>
        <ol>
          {recipe.steps.split('\n').map((step, index) => (
            <li key={index}>{step.trim()}</li>
          ))}
        </ol>

        {/* Buttons */}
        <div>
          <Link to={`/edit/${recipe.id}`}>
            <button className="edit">Edit Recipe</button>
          </Link>
          <Link to="/">
            <button className="back">Back to Recipes</button>
          </Link>
        </div>
      </div>
      
      {/* Image Section */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            flex: '1', // Adjust width to occupy available space
            maxWidth: '300px', // Restrict maximum width
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          }}
        />
      )}
    </div>
  );
};

export default RecipeDetails;
