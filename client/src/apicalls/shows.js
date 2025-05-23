import { axiosInstance } from ".";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getShowsBytheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-shows-by-theater",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.put("/api/shows/update-show", payload);
    console.log(payload, response);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/delete-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getAlltheatersByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-theaters-by-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-show-by-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
