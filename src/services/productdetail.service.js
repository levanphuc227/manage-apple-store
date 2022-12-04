import axios from "axios";

// const API_URL =process.env.REACT_APP_API_URL;

const create = (
  groupProductId,
  price,
  image,
  option,
  ) => {
    console.log('bug',option)
  return axios.post(`/api/v1/auth/admin/groupproduct/${groupProductId}/productdetail`, {
                price,
                image,
                option,
  });
};

const ProductDetail = {
  create,

}

export default ProductDetail;
