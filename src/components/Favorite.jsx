// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';

// // const Favorites = ({ recipes }) => {
// //   const [favorites, setFavorites] = useState([]);

// //   useEffect(() => {
// //     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
// //     setFavorites(storedFavorites);
// //   }, []);

// //   const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

// //   return (
// //     <div className="favorites-container">
// //       <h1>Your Favorite Recipes</h1>
// //       <div className="recipe-grid">
// //         {favoriteRecipes.length > 0 ? (
// //           favoriteRecipes.map((recipe) => (
// //             <div key={recipe.id} className="recipe-card">
// //               <img
// //                 src={recipe.image || 'https://via.placeholder.com/300x200'}
// //                 alt={recipe.title}
// //                 className="recipe-image"
// //               />
// //               <div className="recipe-title">{recipe.title}</div>
// //               <div className="recipe-prep-time">Prep Time: {recipe.prepTime}</div>
// //               <div className="card-actions">
// //                 <Link to={`/recipes/${recipe.id}`}>
// //                   <button className="view-btn">View</button>
// //                 </Link>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No favorite recipes found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Favorites;
// import React, { useState, useEffect } from 'react'; 
// import { Link } from 'react-router-dom';

// const Favorites = ({ recipes }) => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     // Get stored favorites from localStorage
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     setFavorites(storedFavorites);
//   }, []);

//   // Function to handle removing a recipe from favorites
//   const removeFromFavorites = (id) => {
//     const updatedFavorites = favorites.filter((recipeId) => recipeId !== id);
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Update localStorage
//   };

//   // Filter the recipes to show only the favorites
//   const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

//   return (
//     <div className="favorites-container">
//       <h1>Your Favorite Recipes</h1>
//       <div className="recipe-grid">
//         {favoriteRecipes.length > 0 ? (
//           favoriteRecipes.map((recipe) => (
//             <div key={recipe.id} className="recipe-card">
//               <img
//                 src={recipe.image || 'https://via.placeholder.com/300x200'}
//                 alt={recipe.title}
//                 className="recipe-image"
//               />
//               <div className="recipe-title">{recipe.title}</div>
//               <div className="recipe-prep-time">Prep Time: {recipe.prepTime}</div>
//               <div className="card-actions">
//                 <Link to={`/recipes/${recipe.id}`}>
//                   <button className="view-btn">View</button>
//                 </Link>
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromFavorites(recipe.id)}
//                 >
//                   Remove from Favorites
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No favorite recipes found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Favorites;
import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const Favorites = ({ recipes }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get stored favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to handle adding/removing from favorites
  const handleFavoriteToggle = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((recipeId) => recipeId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Update localStorage
  };

  // Filter the recipes to show only the favorites
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div className="favorites-container">
      <h1>Your Favorite Recipes</h1>
      <div className="recipe-grid">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => {
            // Check if the current recipe is a favorite
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
          <p>No favorite recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
