import React from "react";
import { useState } from "react";
import Movie from "./Movie";
import MovieForm from "./MovieForm";
import { useEffect } from "react";

const MOVIES = [
  {
    title: "Captain America - The First Avenger",
    hall: 2,
    price: 350,
    poster: "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg",
    likes: 0,     
    dislikes: 0  
  },
  {
    title: "The Papillon",
    hall: 1,
    price: 300,
    poster: "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg",
    likes: 0,     
    dislikes: 0  
  },
  {
    title: "The Lost City of Z",
    hall: 5,
    price: 350,
    poster: "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    likes: 0,     
    dislikes: 0  
  },
  {
    title: "Klaus",
    hall: 3,
    poster: "https://m.media-amazon.com/images/I/7128yjOjl9L.jpg",
    likes: 0,     
    dislikes: 0  
  },
  {
    title: "Bullet Train",
    poster: "https://m.media-amazon.com/images/I/71INz6LX8aL._AC_UF894,1000_QL80_.jpg",
    likes: 0,     
    dislikes: 0  
  }
];

const Movies = () => {

  const [movies, setMovies] = useState(MOVIES);
  const [topMovie, setTopMovie] = useState(null);
  const date = new Date().toLocaleDateString('sr-RS');

  useEffect(() => {
  let bestMovie = movies[0];
  let bestScore = movies[0].likes - movies[0].dislikes;

  movies.forEach((movie, index) => {
    const score = movie.likes - movie.dislikes;
    if (score > bestScore) {
      bestScore = score;
      bestMovie = { ...movie, index };
    }
  });

  setTopMovie(bestMovie);
}, [movies]);

useEffect(() => {
  console.log("Postavka filmova");
  
  return () => {
    console.log("Sklanjanje filmova");
  };
}, []);

  const updateLikes = (key) => {
  setMovies(prev => {
    const newMovies = [...prev];
    newMovies[key].likes = (newMovies[key].likes || 0) + 1;
    return newMovies;
  });
};

const updateDislikes = (key) => {
  setMovies(prev => {
    const newMovies = [...prev];
    newMovies[key].dislikes = newMovies[key].dislikes + 1;
    return newMovies;
  });
};

  
  const addMovie = movie => {
    setMovies(prev => [
      ...prev,
      {
        title: movie.title,
        hall: movie.hall,
        price: movie.price,
        poster: movie.url,
        likes: Math.floor(Math.random() * 5) + 1,      
        dislikes: Math.floor(Math.random() * 5) + 1    
      }
    ]);
  };

  const editMovie = (editedMovie, key) => {
    setMovies(prev => {
      const newMovies = [...prev]; 
      newMovies[key].title = editedMovie.title;
      newMovies[key].hall = editedMovie.hall;
      newMovies[key].price = editedMovie.price;
      newMovies[key].poster = editedMovie.poster;
      return newMovies; 
    });
  };

  return (
    <div>
      <p><strong>Repertoar za danas ({date})</strong></p>
      {topMovie && (
      <div style={{ backgroundColor: '#FFD700', padding: '10px', marginBottom: '10px',}}>
      <h3>⭐ Najbolje ocenjen film:</h3>
      <p><strong>{topMovie.title}</strong></p>
      <p>Ocena: {topMovie.likes - topMovie.dislikes} (Likes: {topMovie.likes}, Dislikes: {topMovie.dislikes})</p>
    </div>
    )}
      {movies.map((movie, index) => (
        <Movie 
          key={index}
          movieKey={index}
          editMovie={editMovie}
          updateLikes={updateLikes}     
          updateDislikes={updateDislikes}
          title={movie.title} 
          hall={movie.hall} 
          price={movie.price}
          poster={movie.poster}
          likes={movie.likes}
          dislikes={movie.dislikes}
        />
      ))}
      <MovieForm handleMovie={addMovie} />
    </div>
  );
};

export default Movies;