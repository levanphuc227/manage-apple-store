import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import FormGroupProduct from '../FormGroupProduct';
import CategoryService from "../../services/category.service";
import OptionService from "../../services/option.service";
import GroupProductService from "../../services/groupproduct.service";
import { Route, Link, Routes, useParams } from 'react-router-dom';






const ManageProductDetail = () => {

    const params = useParams();
    let navigate = useNavigate();

    const [id, setId] = useState([params.id]);
    const [listProductDetail, setListProductDetail] = useState([]);
    const [inforProduct, setInforProduct] = useState([]);
    const [listOption, setListOption] = useState([]);

    useEffect(() => {

        GroupProductService.getOne(id).then((response) => {
            setListProductDetail(response.data.product_details);
            setListOption(response.data.options);
            setInforProduct(response.data);
        });
    },[id]);
    // useEffect(() => {
        
    //     GroupProductService.getOne(id).then((response) => {
    //         setInforProduct(response.data);
    //     });
    // });
    // useEffect(() => {
    //     OptionService.getOptionByGroupProduct(id).then((response) => {
    //         setListOption(response.data);
    //     });
    // },[]);

    const routeChange = () => {
        let path = `addproductdetail`;
        navigate(path);
    }
    return (
        <>
            <h1>Page product detail</h1>
            <h2>Product name: {inforProduct.name}</h2>

            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">image</th>
                        <th scope="col">price</th>
                        <th scope="col">option</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProductDetail.map((productDetail, index) => {

                            return (
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    {/* <td>{productDetail.image[1, 12]}</td> */}
                                    <td>{productDetail.image.slice(0, 20)}</td>
                                    <td>{productDetail.price}</td>
                                    <td>
                                        <ul>

                                            {
                                                listOption.map((option, index) => {
                                                    return <li key={index}> {option.key}: {productDetail[option.key]} </li>
                                                })
                                            }
                                        </ul>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary">preview</button>
                                        <button type="button" className="btn btn-primary">update</button>
                                        <button type="button" className="btn btn-danger">delete</button>

                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
            <button type="button" className="btn btn-primary" onClick={routeChange}>Create product detail</button>
            <h2>description:</h2>
            <div dangerouslySetInnerHTML={{ __html: inforProduct.description }} />
        </>
    )
};

export default ManageProductDetail;
