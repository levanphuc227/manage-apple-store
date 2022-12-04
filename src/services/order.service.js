// import axios from "axios";
import httpRequest from "../utils/httpRequest";
// const API_URL =process.env.REACT_APP_API_URL;


const getAll = () => {
  return httpRequest.get("/api/v1/auth/admin/orders/")
    .then((response) => {
      return response.data;
    });
};
const getOne = (idorder) => {
  return httpRequest.get(`/api/v1/auth/admin/order/${idorder}`)
    .then((response) => {
      return response.data;
    });
};

const updateStatusOrder = (idorder,idStatus) => {
  console.log(idorder,idStatus)
  return httpRequest.put(`/api/v1/auth/admin/order/${idorder}/status/${idStatus}`)
  .then((response) => {
    return response.data;
  });

};


const Orders = {
  getAll,
  getOne,
  updateStatusOrder,
}

export default Orders;

