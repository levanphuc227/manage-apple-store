import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import styles from './ManageGroupProduct.module.scss'
// import classNames from 'classnames/bind';

import GroupProductService from "../../services/groupproduct.service";

// let cx = classNames.bind(styles);

const GroupProduct = () => {
  const [listGroupProduct, setListGroupProduct] = useState([]);

  useEffect(() => {
    GroupProductService.getAll().then((response) => {
      console.log(response);
      setListGroupProduct(response.data);
    });
  }, []);
  console.log(listGroupProduct);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `addgroupproduct`;
    navigate(path);
  };
  return (
    <div className="wrap-table">
      <h1>Manage Group Product</h1>
      <button type="button" class="btn btn-primary" onClick={routeChange}>
        Create Group Product
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            {/* <th scope="col">description</th> */}
            {/* <th scope="col">price</th> */}
            {/* <th scope="col">services</th> */}
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {listGroupProduct.map((groupProduct, index) => {
            return (
              <tr>
                <th scope="row">{index}</th>
                <td>
                  {" "}
                  <img src={groupProduct.image} alt={groupProduct.name} />
                </td>
                <td>{groupProduct.name}</td>
                <td>{groupProduct.price.toLocaleString().concat("đ")}</td>
                {/* <td>{groupProduct.description}</td> */}

                {/* <td >{groupProduct.services}</td> */}
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      navigate(`${groupProduct.id}`);
                    }}
                  >
                    Preview
                  </button>
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GroupProduct;
