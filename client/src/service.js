import axios from "axios";
 
const errorHandler = err => {
  throw err;
};
 
const uploadImage = (file) => {
    return axios
      .post("/api/upload", file)
      .then(res => res.data)
      .catch(errorHandler);
  };

export default {
  uploadImage,
};