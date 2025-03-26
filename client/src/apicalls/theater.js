import { axiosInstance } from "./index";

export const addTheater = async (value) => {
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
export const udateTheater = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/update-theater",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const deleteTheater = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/delete-theater",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
