// components/FavoritesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'; // Import the custom CSS for the Favorites page

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div className="favorites-containers">
      <h1 className="favorites-titles">Favorites</h1>
      <Link to="/" className="back-links">Back to Search</Link>
      <div className="favorites-lists">
        {favorites.map((product) => (
          <div key={product.id} className="favorites-cards">
            <Link to={`/product/${product.id}`} className="favorites-links">
              <img src={product.image} alt={product.title} className="favorites-images" />
              <h2 className="favorites-titles">{product.title}</h2>
              <p className="favorites-prices">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
