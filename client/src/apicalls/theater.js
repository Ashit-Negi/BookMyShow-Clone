import { axiosInstance } from "./index";

export const addtheater = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/add-theater",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const updatetheater = async (value) => {
  try {
    const response = await axiosInstance.put(
      "/api/theaters/update-theater",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const deletetheater = async (value) => {
  try {
    const response = await axiosInstance.put(
      "/api/theaters/delete-theater",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const getAlltheatersForAdmin = async (value) => {
  try {
    const response = await axiosInstance.get(
      "/api/theaters/get-all-theaters",
      value
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const getAlltheaters = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/get-all-theaters-by-owner",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
