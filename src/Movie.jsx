import React from "react";
import { useState } from "react";
import "./Movie.css";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "./services/movieService";


const Movie = ({ movieKey, movieId, title, hall, price, poster, likes, dislikes, updateLikes, updateDislikes, updateMoviesAfterDelete}) => {
  
  const navigate = useNavigate();

  const handleLike = () => {
    updateLikes(movieKey); 
  };

  const handleDislike = () => {
    updateDislikes(movieKey);
  };

  const handleEdit = () => {
    navigate(`/movies/edit/${movieId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteMovie(movieId);
      updateMoviesAfterDelete(movieKey);
    } catch (err) {
      console.error("Greska pri brisanju filma", err);
    }
  };

  const defaultPrice = 300;
  const displayPrice = price || defaultPrice;
  
  return (
    <div className="container">
      <div className="img">
        <img className="movie-img" src={poster} alt={title} />
      </div>
      <div className="info">
        <div>
          <span>{title}</span>
          {hall !== undefined ? (
            <span>, sala: {hall}, cena: {displayPrice}din</span>
          ) : (
            <span> Film jos uvek nije u ponudi</span>
          )}
        </div>
        <div className="buttons">
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
          <button onClick={handleDelete}>Delete</button>
          <p>Likes: {likes}</p>
          <p>Dislikes: {dislikes}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;