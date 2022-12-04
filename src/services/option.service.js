import axios from "axios";

// const API_URL =process.env.REACT_APP_API_URL;


const getOptionByGroupProduct = (id) => {

  return axios.get(`/api/v1/groupproduct/${id}/options`)
    .then((response) => {
      return response.data;
    });
}


const OptionService = {
  getOptionByGroupProduct,
}

export default OptionService;
