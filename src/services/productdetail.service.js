import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const create = (
  groupProductId,
  price,
  image,
  option,
  ) => {
    console.log('bug',option)
  return axios.post(API_URL + `v1/auth/admin/groupproduct/${groupProductId}/productdetail`, {
                price,
                image,
                option,
  });
};

const ProductDetail = {
  create,

}

export default ProductDetail;
