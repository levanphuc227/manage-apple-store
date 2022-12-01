import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const create = (category,
  name,
  price,
  image,
  option,
  description,
  services,
  specific,
) => {
  return axios.post(API_URL + "v1/auth/admin/groupproduct", {
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
  return axios.get(API_URL + "v1/groupproducts")
    .then((response) => {
      return response.data;
    });
};
const getOne = (id) => {
  return axios.get(API_URL + `v1/groupproduct/${id}`)
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
