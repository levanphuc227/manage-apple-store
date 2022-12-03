import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OrderService from "../../services/order.service";
import { Route, Link, Routes, useParams } from 'react-router-dom';






const ManageProductDetail = () => {

    const params = useParams();
    let navigate = useNavigate();
    // const idorder = params.idorder

    const [idOrder, setidOrder] = useState(params.idorder);
    const [OrderItem, setOrderItem] = useState([]);
    const [ListProducts, setListProducts] = useState([]);
    const [listOption, setListOption] = useState([]);

    useEffect(() => {

        OrderService.getOne(idOrder).then((response) => {
            console.log(response)
            setListProducts(response.data.listProducts);
            // setListOption(response.data.options);
            setOrderItem(response.data);
        });
    }, [idOrder]);
    // useEffect(() => {

    //     OrderService.getOne(idorder).then((response) => {
    //     });
    // });
    // useEffect(() => {
    //     OptionService.getOptionByGroupProduct(id).then((response) => {
    //         setListOption(response.data);
    //     });
    // },[]);

    const changeStatus = () => {
        OrderService.updateStatusOrder(idOrder, OrderItem.idStatusOrdersNext);
        navigate(`/manageorder/${idOrder}/`);
        window.location.reload();
    }
    const cancelOrder = () => {
        if (window.confirm('debug')) {
            OrderService.updateStatusOrder(idOrder, 0);
            navigate(`/manageorder/${idOrder}/`);
            window.location.reload();
        }
    }
    return (
        <>
            <h1>Page product detail</h1>
            <h3>customer name: {OrderItem.customerName}</h3>
            <h3>phone number name: {OrderItem.customerNumberPhone}</h3>
            <h3>address: {OrderItem.customerAdress}</h3>
            <h3>status order: {OrderItem.statusOrdersCurrent}</h3>

            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">image</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col">subtotal</th>
                        <th scope="col">option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ListProducts.map((product, index) => {

                            return (
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{product.image.slice(0, 20)}</td>
                                    <td>{product.ProductName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.subtotal}</td>
                                    <td>
                                        <ul>

                                            {
                                                product.options.map((option, index) => {
                                                    return <li key={index}>  {Object.keys(option)}:{option[Object.keys(option)[0]]} </li>
                                                })
                                            }
                                        </ul>
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
            {OrderItem.statusOrdersNext ? (
                <>
                    <button type="button" className="btn btn-primary" onClick={changeStatus}>{OrderItem.statusOrdersNext}</button>
                    <button type="button" className="btn btn-danger" onClick={cancelOrder}>Cancel</button>
                </>
            ) : (<></>)
            }


        </>
    )
};

export default ManageProductDetail;
