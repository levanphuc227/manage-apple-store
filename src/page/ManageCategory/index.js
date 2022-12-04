import React, { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CategoryService from "../../services/category.service";


const GroupProduct = () => {

    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {

        CategoryService.getAll().then((response) => {
            setListCategory(response.data);
        });
    }, []);
    console.log(listCategory)
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `add`;
        navigate(path);
    }
    return (
        <>
            <h1>Manage Category</h1>
            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">image</th>
                        <th scope="col">name</th>
                        <th scope="col">description</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCategory.map((category, index) => {

                            return (
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td>{category.image}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary">update</button>
                                        <button type="button" class="btn btn-danger">delete</button>

                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
            <button type="button" class="btn btn-primary" onClick={routeChange}>Create category</button>
            
        </>

    )
};

export default GroupProduct;
