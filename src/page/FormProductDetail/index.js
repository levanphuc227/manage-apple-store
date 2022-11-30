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
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};




const ProductDetail = () => {

    const param = useParams()
    const groupProductId = param.id

    console.log('param', param)
    const [options, setOptions] = useState([]);

    useEffect(() => {
        OptionService.getOptionByGroupProduct(groupProductId).then((response) => {
            setOptions(response.data);
        });
    },[]);
    //https://stackoverflow.com/questions/59884278/add-key-value-pair-to-existing-array-of-objects
    useEffect(() => {
        // Since can't use an async func directly with useEffect -
        // define an async func to handle your updates and call it within the useEffect func
        const updateOption = async () => {
            // Create a new array for your updated state
            const updatedOptions = [];
    
            // Loop over your values inline so your can await results to make them sync
            for (let index = 0; index < options.length; index ++) {
                const option = options[index];
                // const newVal = await returnNewValueForNewKeyFunction(option, index);
    
                // Create a shallow copy of the original value and add the newValue
                updatedOptions[index] = { ...option, 'value': '' };
                // ... Any other logic you need
            }
    
            // Call set with the updated value so React knows to re-render
            setOptions(updatedOptions);
        };
    
        // Trigger your async update
        updateOption();
    }, [])

    // const optionsCopy = [...options];
    // //Logic to update your list here
    // optionsCopy[index]['value'] = '';
    // setOptions(optionsCopy)
    // options.map(i=>({...i,value:''}))

    // const [options, setOptions] = useState([
    //     { id: '',name:'', value: '',unit:''},
    // ])
    console.log('options', options);
    const handleFormChange = (event, index) => {
        let data = [...options];
        data[index][event.target.name] = event.target.value;
        setOptions(data);
    }


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
            Productdetailervice.create(
                groupProductId,
                price,
                image,
                options,

            ).then(
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
        <div className="col-md-12">
            <div className="card card-container">
                <h1>create product detail</h1>


                <Form onSubmit={handleSubmit} ref={form}>
                    <div className="form-group">

                    </div>

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
                        
                        console.log('form', form)
                        return (
                            <>
                                <div key={index}>
                                    <div className="form-group">
                                        <label htmlFor={form.name}>{form.name}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={form.id}
                                            onChange={event => handleFormChange(event, index)}
                                            value={form.value}
                                        />
                                    </div>
                                </div>
                            </>
                        )
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
    );
};

export default ProductDetail;
