import axios from "axios";



// const API_URL =process.env.REACT_APP_API_URL;

const create = (name, description ) => {
  return axios.post("/api/v1/auth/admin/category", {
    name,
    description,
  });
};
const getAll = ( ) => {
  return axios.get("/api/v1/categorys")
  .then((response) =>{
    return response.data;
  });
};


const CategoryService = {
  create,
  getAll,
}

export default CategoryService;
