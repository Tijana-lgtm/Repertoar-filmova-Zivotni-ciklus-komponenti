import React from "react";
import { useState } from "react";
import Movie from "./Movie";
import MovieForm from "./MovieForm";
import { useEffect } from "react";
import { createMovie, updateMovie, getMovieById, getAllMovies } from "./services/movieService";

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

  const [movies, setMovies] = useState([]);
  const [topMovie, setTopMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const date = new Date().toLocaleDateString('sr-RS');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      setError("Greska pri ucitavanju filmova. Proverite da li server radi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length === 0) return;

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

  
 if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p>Ucitavanje filmova...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
        <p>{error}</p>
        <button onClick={loadMovies}>Pokusaj ponovo</button>
      </div>
    );
  }

  const addMovie = async (movie) => {
  try {
    const movieForApi = {
      name: movie.title,
      hall: movie.hall,
      price: movie.price,
      poster: movie.url,    
      likes: 0,
      dislikes: 0
    };

    const createdMovie = await createMovie(movieForApi);

    setMovies(prev => [...prev, createdMovie]);
  } catch (err) {
    console.error("Greska pri dodavanju filma", err);
  }
};

const editMovie = async (editedMovie, key) => {
  try {
    const movieId = movies[key].id;

    const movieForApi = {
      id: movieId,
      name: editedMovie.title,
      hall: editedMovie.hall,
      price: editedMovie.price,
      poster: editedMovie.poster,
      likes: movies[key].likes,
      dislikes: movies[key].dislikes
    };

    const updated = await updateMovie(movieId, movieForApi);

    setMovies(prev => {
      const newMovies = [...prev];
      newMovies[key] = updated;
      return newMovies;
    });
  } catch (err) {
    console.error("Greska pri izmeni filma", err);
  }
};



  return (
    <div>
      <p><strong>Repertoar za danas ({date})</strong></p>
      {topMovie && (
      <div style={{ backgroundColor: '#FFD700', padding: '10px', marginBottom: '10px',}}>
      <h3>⭐ Najbolje ocenjen film:</h3>
      <p><strong>{topMovie.name}</strong></p>
      <p>Ocena: {topMovie.likes - topMovie.dislikes} (Likes: {topMovie.likes}, Dislikes: {topMovie.dislikes})</p>
    </div>
    )}
      {movies.map((movie, index) => (
        <Movie 
          key={movie.id}
          movieKey={index}
          movieId={movie.id}
          updateLikes={updateLikes}     
          updateDislikes={updateDislikes}
          title={movie.name} 
          hall={movie.hall} 
          price={movie.price}
          poster={movie.poster}
          likes={movie.likes}
          dislikes={movie.dislikes}
        />
      ))}
    </div>
  );
};

export default Movies;