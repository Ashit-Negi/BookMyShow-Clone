import { axiosInstance } from "./index";

// to get all the movies added
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// add a single movie
export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

//get a single movie by id
export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/movies/movie/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
