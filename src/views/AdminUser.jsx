import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'


export const AdminUser = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllUsers()

    }, [])



    return (

        <div className="container-fluid d-flex ">
            {store.adminUserData.length == 0 ?
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> : store.adminUserData.map((ele, index) =>
                <div className="bg m-3 card" id={index}>
                    

                        <div className="card-body " >
                            <h6 className="card-title"><b>First name</b> {ele.first_name}</h6>
                            <h6 className="card-text"><b>Last Name</b> {ele.last_name}</h6>
                            <h6 className="card-text"><b>Email:</b> {ele.email}</h6>
                            <h6 className="card-text"><b>Since :</b> {ele.create_at}</h6>
                        </div>
                        
                        <div className="card-body text-center">
                            <button className="btn btn-danger" onClick={()=> actions.deleteUser(ele.id)}>Delete</button>
                        </div>
                    </div>
                    
                )}
        </div>

    );
};
