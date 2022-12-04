import axios from "axios";

// const API_URL =process.env.REACT_APP_API_URL;


const getAll = () => {
  return axios.get("/api/v1/auth/admin/orders/")
    .then((response) => {
      return response.data;
    });
};
const getOne = (idorder) => {
  return axios.get(`/api/v1/auth/admin/order/${idorder}`)
    .then((response) => {
      return response.data;
    });
};

const updateStatusOrder = (idorder,idStatus) => {
  console.log(idorder,idStatus)
  return axios.put(`/api/v1/auth/admin/order/${idorder}/status/${idStatus}`)
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

