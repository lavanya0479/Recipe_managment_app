import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Lazy load components
const RecipeList = React.lazy(() => import('./components/RecipeList'));
const AddRecipe = React.lazy(() => import('./components/AddRecipe'));
const RecipeDetails = React.lazy(() => import('./components/RecipeDetails'));
const EditRecipe = React.lazy(() => import('./components/EditRecipe'));
const SearchRecipe = React.lazy(() => import('./components/SearchRecipe'));
const Favorites = React.lazy(() => import('./components/Favorite'));

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from the backend API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-right">
          <Link to="/add">Add Recipe</Link>
          <Link to="/favorites">Favorites</Link>
          {/* Search Bar */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search recipes..."
              id="searchInput"
            />
            <button
              onClick={() => {
                const searchTerm = document.getElementById('searchInput').value;
                if (searchTerm.trim()) {
                  // window.history.pushState({}, '', `/search?term=${searchTerm}`);
                  window.location.href = `/search?term=${searchTerm}`
                }
              }}
            >
              Go
            </button>
          </div>
        </div>
      </nav>

      {/* Loading State */}
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Define Routes */}
            <Route path="/" element={<RecipeList recipes={recipes} />} />
            <Route path="/add" element={<AddRecipe fetchRecipes={fetchRecipes} />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipe fetchRecipes={fetchRecipes} />} />
            <Route path="/search" element={<SearchRecipe recipes={recipes} />} />
            <Route path="/favorites" element={<Favorites recipes={recipes} />} />
          </Routes>
        </React.Suspense>
      )}
    </Router>
  );
};

export default App;
