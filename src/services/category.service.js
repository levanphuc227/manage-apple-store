import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const create = (name, description ) => {
  return axios.post(API_URL + "v1/auth/admin/category", {
    name,
    description,
  });
};
const getAll = ( ) => {
  return axios.get(API_URL + "v1/categorys")
  .then((response) =>{
    return response.data;
  });
};


const CategoryService = {
  create,
  getAll,
}

export default CategoryService;
