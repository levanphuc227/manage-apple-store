// import axios from "axios";
import httpRequest from "../utils/httpRequest";


// const API_URL =process.env.REACT_APP_API_URL;

const create = (name, description ) => {
  return httpRequest.post("/api/v1/auth/admin/category", {
    name,
    description,
  });
};
const getAll = async ( ) => {
  const response = await httpRequest.get("/api/v1/categorys");
  return response.data;
};


const CategoryService = {
  create,
  getAll,
}

export default CategoryService;
