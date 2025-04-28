import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchRecipe = ({ recipes }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('term') || '';

  // Filter recipes whenever the searchTerm changes
  useEffect(() => {
    console.log('Search term:', searchTerm);
    if (recipes.length > 0) {
      handleSearch(searchTerm);
    }
  }, [searchTerm, recipes]);

  const handleSearch = (term) => {
    const filtered = recipes.filter(recipe => {
      const title = recipe.title || '';
      const ingredients = recipe.ingredients || '';
      const cuisine = recipe.cuisine || '';
      return (
        title.toLowerCase().includes(term.toLowerCase()) ||
        ingredients.toLowerCase().includes(term.toLowerCase()) ||
        cuisine.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredRecipes(filtered);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Search Results</h2>
      {filteredRecipes.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px 0',
          }}
        >
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                maxWidth: '250px',
                textAlign: 'center',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: 'none', color: '#333' }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <h3>{recipe.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found matching your search.</p>
      )}
      <Link to="/">
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to Recipe List
        </button>
      </Link>
    </div>
  );
};

export default SearchRecipe;
