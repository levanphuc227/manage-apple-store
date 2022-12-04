// import axios from "axios";
import httpRequest from "../utils/httpRequest";
// const API_URL =process.env.REACT_APP_API_URL;


const getOptionByGroupProduct = (id) => {

  return httpRequest.get(`/api/v1/groupproduct/${id}/options`)
    .then((response) => {
      return response.data;
    });
}


const OptionService = {
  getOptionByGroupProduct,
}

export default OptionService;
