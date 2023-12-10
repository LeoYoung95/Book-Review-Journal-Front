import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BRJ_REACT_BASE,
});
export const BASE_URL = process.env.REACT_APP_BRJ_REACT_BASE;
export const TAGS_API = `${BASE_URL}/api/tags`;


// Helper function for handling errors
const handleResponse = (response) => {
  return response.data;
};

const handleError = (error) => {
  // Log the error for debugging
  console.error("API call error:", error.response || error);
  
  if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || "Server responded with an error");
  } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
  } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
  }
};

export const findTagById = async (id) => {
  return request.get(`${TAGS_API}/${id}`).then(handleResponse).catch(handleError);
};