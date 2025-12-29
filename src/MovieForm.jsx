import React from "react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createMovie, updateMovie, getMovieById } from "./services/movieService";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      title: '',
      hall: '',
      price: '',
      poster: ''
    }
  });

  useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      const movie = await getMovieById(id);
      reset({
        title: movie.name,
        hall: movie.hall,
        price: movie.price,
        poster: movie.poster
      });
    } catch (err) {
      setError("Greska pri ucitavanju filma");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setError(null);
      setLoading(true);

      const movieData = {
        name: data.title,
        hall: parseInt(data.hall),
        price: parseInt(data.price),
        poster: data.poster
      };

      if (id) {
        movieData.id = parseInt(id);
        await updateMovie(id, movieData);
      } else {
        await createMovie(movieData);
      }

      navigate('/movies');
    } catch (err) {
      setError("Greska pri cuvanju filma. Proverite da su svi podaci ispravni.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <p>Ucitavanje...</p>;
  }

  return (
    <div>
      <h2>{id ? 'Izmeni film' : 'Dodaj novi film'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title:
          <input type="text" {...register('title', { required: true })} />
        </label>
          {formState.errors.title && (<p style={{ color: 'red' }}>{formState.errors.title.message || "Title is required"}</p>)}
        <br />

        <label>
          Hall:
          <input type="text" {...register('hall', { required: true, min: 1, max: 12 })} />
        </label>
          {formState.errors.hall && (<p style={{ color: 'red' }}>{formState.errors.hall.message || "Hall is required"}</p>)}
        <br />

        <label>
          Price:
          <input type="number" {...register('price', { required: true })} />
        </label>
          {formState.errors.price && (<p style={{ color: 'red' }}>{formState.errors.price.message || "Price is required"}</p>)}
        <br />

        <label>
          URL:
          <input type="text" {...register('url')} />
        </label>
            {formState.errors.poster && (<p style={{ color: 'red' }}>{formState.errors.poster.message || "Poster is required"}</p>)}
        <br />
<button type="submit" disabled={loading}>
          {loading ? 'Čuvanje...' : (id ? 'Izmeni' : 'Dodaj')}
        </button>
        <button type="button" onClick={() => navigate('/movies')}>
          Odustani
        </button>
      </form>
    </div>
  );
};


export default MovieForm;