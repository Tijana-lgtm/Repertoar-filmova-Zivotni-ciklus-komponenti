import AxiosConfig from "../../axiosConfig";

const RESOURCE = "/api/Movies";

export async function getAllMovies() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}

export async function getMovieById(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createMovie(movieData) {
  const response = await AxiosConfig.post(RESOURCE, movieData);
  return response.data;
}

export async function updateMovie(id, movieData) {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, movieData);
  return response.data;
}