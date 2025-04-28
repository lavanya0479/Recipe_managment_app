import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = ({ recipes, setRecipes }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Toggle favorite status
  const handleFavoriteToggle = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id); // Remove from favorites
    } else {
      updatedFavorites = [...favorites, id]; // Add to favorites
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Persist to localStorage
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');

    // Proceed with deletion only if user confirmed
    if (confirmDelete) {
      try {
        // Send the delete request to the server
        await axios.delete(`http://localhost:3001/recipes/${id}`);
        
        // After deleting, reload the page to refresh the recipes
        window.location.reload();
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    } else {
      console.log('Delete action canceled.');
    }
  };

  return (
    <div className="recipe-list-container">
      <h1>Recipes</h1>
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            const isFavorite = favorites.includes(recipe.id);

            return (
              <div key={recipe.id} className="recipe-card">
                <img
                  src={recipe.image || 'https://via.placeholder.com/300x200'}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-prep-time">Prep Time: {recipe.prepTime}</div>
                <div className="card-actions">
                  <Link to={`/recipes/${recipe.id}`}>
                    <button className="view-btn">View</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(recipe.id)}>
                    Delete
                  </button>
                  <button
                    className={`favorite-btn ${isFavorite ? 'liked' : ''}`}
                    onClick={() => handleFavoriteToggle(recipe.id)}
                  >
                    {isFavorite ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
