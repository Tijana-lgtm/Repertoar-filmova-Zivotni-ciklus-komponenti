import React from "react";
import { useForm } from 'react-hook-form';

const MovieForm = ({ handleMovie, movieKey, title, hall, price, poster }) => {

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      title: title,
      hall: hall,
      price: price,
      poster: poster
    }
  });


  const onSubmit = (data) => {
    handleMovie(data, movieKey);
    reset();
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;