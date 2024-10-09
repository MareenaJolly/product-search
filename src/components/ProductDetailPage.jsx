// components/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css'; // Import the CSS for styling

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const isFavorite = favorites.some(favorite => favorite.id === parseInt(id));

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== parseInt(id));
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">Back to Search</Link>
      <h1 className="product-title">{product.title}</h1>
      <div className="product-info">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-details">
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: <strong>${product.price}</strong></p>
          <button onClick={toggleFavorite} className="favorite-button">
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
