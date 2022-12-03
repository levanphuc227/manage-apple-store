import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import styles from './ManageOrder.module.scss'
// import classNames from 'classnames/bind';


import OrderService from "../../services/order.service.js";



// let cx = classNames.bind(styles);



const Orders = () => {

    const [listOrders, setListOrders] = useState([]);

    useEffect(() => {
        OrderService.getAll().then((response) => {
            setListOrders(response.data);
        });
    }, []);
    console.log(listOrders)
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `addOrder`;
        navigate(path);
    }
    return (
        <>
            <h1>Manage Order</h1>
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name customer</th>
                        <th scope="col">Number phone</th>
                        <th scope="col">address</th>
                        <th scope="col">total</th>
                        <th scope="col">status_orders</th>
                        <th scope="col">Order date</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOrders.map((OrderItem, index) => {

                            return (
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td>{OrderItem.name}</td>
                                    <td>{OrderItem.numberPhone}</td>
                                    <td>{OrderItem.address}</td>
                                    <td>{OrderItem.total}</td>
                                    <td>{OrderItem.status_orders}</td>
                                    <td>{OrderItem.createdAt}</td>
                                    {/* <td>{OrderItem.description}</td> */}

                                    {/* <td >{OrderItem.services}</td> */}
                                    <td>
                                        <button type="button" class="btn btn-primary" onClick={() => { navigate(`${OrderItem.id}`) }}>More detail</button>

                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
        </>

    )
};

export default Orders;
