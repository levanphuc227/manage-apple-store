import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const create = (name, description) => {
  return axios.post(API_URL + "v1/auth/admin/category", {
    name,
    description,
  });
};
const getOptionByGroupProduct = (id) => {

  return axios.get(API_URL + `v1/groupproduct/${id}/options`)
    .then((response) => {
      return response.data;
    });
}


const OptionService = {
  create,
  getOptionByGroupProduct,
}

export default OptionService;
