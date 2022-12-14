import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import OptionService from "../../services/option.service";
import Productdetailervice from "../../services/productdetail.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const ProductDetail = () => {
  const param = useParams();
  const groupProductId = param.id;

  console.log("param", param);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    OptionService.getOptionByGroupProduct(groupProductId).then((response) => {
      setOptions(response.data);
      const newOptions = [...response.data];
      newOptions.forEach((newOption) => {
        newOption.value = "";
      });
      setOptions(newOptions);
    });
  }, [groupProductId]);

  // useEffect(() => {
  //     const newOptions = [...options]
  //     newOptions.forEach(newOption => {
  //         newOption.value = '';
  //     });
  //     setOptions(newOptions);
  //     setIsAddKeyOption(1);
  // }, [isAddKeyOption]);

  const handleFormChange = (event, index) => {
    let data = [...options];
    data[index]["value"] = event.target.value;
    setOptions(data);
  };

  const form = useRef();
  const checkBtn = useRef();

  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };
  const onChangeImage = (e) => {
    const image = e.target.value;
    setImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      Productdetailervice.create(groupProductId, price, image, options).then(
        () => {
          navigate(`/manageGroupProduct/${groupProductId}`);
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="wrap-table">
      <div className="col-md-12">
        <div className="card card-container">
          <h1>create product detail</h1>

          <Form onSubmit={handleSubmit} ref={form}>
            <div className="form-group">
              <label htmlFor="Link image">Link image</label>
              <Input
                type="text"
                className="form-control"
                name="image"
                value={image}
                onChange={onChangeImage}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">price</label>
              <Input
                type="text"
                className="form-control"
                name="price"
                value={price}
                onChange={onChangePrice}
                validations={[required]}
              />
            </div>

            {options.map((form, index) => {
              console.log("form", form);
              return (
                <>
                  <div key={index}>
                    <div className="form-group">
                      <label htmlFor={form.name}>{form.name}</label>
                      <input
                        name={form.name}
                        placeholder={form.name}
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.value}
                        className="form-control"
                      />
                    </div>
                  </div>
                </>
              );
            })}

            <br />
            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Create</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
