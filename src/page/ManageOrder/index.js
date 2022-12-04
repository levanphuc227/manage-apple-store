import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import styles from './ManageOrder.module.scss'
// import classNames from 'classnames/bind';


import OrderService from "../../services/order.service.js";



// let cx = classNames.bind(styles);



const Orders = () => {

    const [listOrders, setListOrders] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        OrderService.getAll(phoneNumber,status).then((response) => {
            setListOrders(response.data);
        });
    }, [phoneNumber,status]);
    console.log(listOrders)
    let navigate = useNavigate();

    const onChangePhoneNumber = (e) => {
        return setPhoneNumber(e.target.value)
    }
    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    };
    const listStatus = [
        { id: 0,orderStatusName: "cancel" },
        { id: 1, orderStatusName: "spendding" },
        { id: 2, orderStatusName: "confirm" },
        { id: 3,  orderStatusName: "send" },
        { id: 4,orderStatusName: "complete" },
    ]
    return (
        <>
            <h1>Manage Order</h1>
            <Form>
                <div className="form-group">
                    <label htmlFor="search by phone number">Phone number</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="numberphone"
                        value={phoneNumber}
                        onChange={onChangePhoneNumber}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Status order</label>
                    <select class="form-select" value={status} onChange={onChangeStatus}>
                        return <option value='' selected>alll </option>
                        {
                            listStatus.map(statusSelect => {

                                return <option value={statusSelect.orderStatusName}>{statusSelect.orderStatusName} </option>
                            })
                        }
                    </select>
                </div>

            </Form>
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
