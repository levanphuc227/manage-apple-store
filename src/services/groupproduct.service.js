import axios from "axios";

// const API_URL =process.env.REACT_APP_API_URL;

const create = (
  category,
  name,
  price,
  image,
  option,
  description,
  services,
  specific,
) => {
  console.log( category,
    name,
    price,
    image,
    option,
    description,
    services,
    specific,)
  return axios.post("/api/v1/auth/admin/groupproduct", {
    'categoryId': category,
    name,
    price,
    image,
    option,
    description,
    services,
    specific,
  });
};

const getAll = () => {
  return axios.get("/api/v1/groupproducts")
    .then((response) => {
      return response.data;
    });
};
const getOne = (id) => {
  return axios.get(`/api/v1/groupproduct/${id}`)
    .then((response) => {
      return response.data;
    });
};


const GroupProduct = {
  create,
  getAll,
  getOne,

}

export default GroupProduct;
