// import axios from "axios";
import httpRequest from "../utils/httpRequest";
// const API_URL =process.env.REACT_APP_API_URL;


const getAll = async (phoneNumber,status) => {
  // const response = await httpRequest.get("/api/v1/auth/admin/orders/");
  const response = await httpRequest.get(`/api/v1/auth/admin/orders/?numberphone=${phoneNumber}&status=${status}`);
  return response.data;
};
const getOne = async (idorder) => {
  const response = await httpRequest.get(`/api/v1/auth/admin/order/${idorder}`);
  return response.data;
};

const updateStatusOrder = async (idorder,idStatus) => {

  const response = await httpRequest.put(`/api/v1/auth/admin/order/${idorder}/status/${idStatus}`);
  return response.data;

};


const Orders = {
  getAll,
  getOne,
  updateStatusOrder,
}

export default Orders;

