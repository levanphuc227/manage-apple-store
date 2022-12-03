import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import CategoryService from "../../services/category.service";
import GroupProductService from "../../services/groupproduct.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};


const GroupProduct = () => {



    const [options, setOptions] = useState([
        { 'name': '', 'value': '', 'unit': '' },
    ])

    const handleFormChange = (event, index) => {
        let data = [...options];
        data[index][event.target.name] = event.target.value;
        setOptions(data);
    }



    const addOptions = () => {
        console.log('Options', options.length)
        if (options[options.length - 1].name && options[options.length - 1].value) {
            let newOption = {
                'name': '',
                'value': '',
                'unit': ''
            }
            setOptions([...options, newOption])
        }
    }

    const removeOptions = (index) => {
        let data = [...options];
        data.splice(index, 1)
        setOptions(data)
    }



    const form = useRef();
    const checkBtn = useRef();

    const [listCategory, setListCategory] = useState([]);

    const [category, setCategory] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [services, setServices] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [specific, setSpecific] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.getAll().then((response) => {
            setListCategory(response.data);
        });
    }, []);

    const onChangeCategory = (event) => {
        const category = event.target.value
        console.log(category);
        setCategory(category)
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };
    const onChangeServices = (e) => {
        const services = e.target.value;
        setServices(services);
    };
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
            GroupProductService.create(category,
                name,
                price,
                image,
                options,
                description,
                services,
                specific,
            ).then(
                () => {
                    navigate("/manageGroupProduct");
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
                <h1>create group product</h1>


                <Form onSubmit={handleSubmit} ref={form}>
                    {/* <Form  ref={form}> */}
                    <div className="form-group">
                        <label htmlFor="name">category</label>
                        <select class="form-select" value={category} onChange={onChangeCategory}>
                        <option selected disabled>select category</option>
                            {
                                listCategory.map(category => {
                                    console.log(category)

                                    return <option value={category.id}>{category.name} </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            validations={[required]}
                        />
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
                    {/* 
                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required]}
                        />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="description">description</label>

                        <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setDescription(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
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
                    <div className="form-group">
                        <label htmlFor="services">services</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="services"
                            value={services}
                            onChange={onChangeServices}
                            validations={[required]}
                        />
                    </div>
                    {options.map((form, index) => {
                        return (
                            <div className="form__option" key={index}>
                                <input
                                    spellCheck={false}
                                    name='name'
                                    placeholder='name'
                                    onChange={event => handleFormChange(event, index)}
                                    value={form.name}
                                />
                                <input
                                    spellCheck={false}
                                    name='value'
                                    placeholder='value'
                                    onChange={event => handleFormChange(event, index)}
                                    value={form.age}
                                />
                                <input
                                    spellCheck={false}
                                    name='unit'
                                    placeholder='unit'
                                    onChange={event => handleFormChange(event, index)}
                                    value={form.unit}
                                />
                                <button onClick={() => removeOptions(index)}>Remove</button>
                            </div>
                        )
                    })}
                    <button type="button" onClick={addOptions}>Add More..</button>
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

export default GroupProduct;
