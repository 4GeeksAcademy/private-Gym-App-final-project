import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'


export const AdminView = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
      

    }, [])



    return (
        
            <div className={style.services}>
            <h1>Admin</h1>
            <div className={style.services__container}>
                <div className={style.services__card}>
                    <Link to="/admin/users">
                        <h2>Your Clients</h2>
                        <p>Here you can delete users</p>
                    </Link>
                </div>
                <div className={style.services__card}>
                    <Link to="/admin/trainer">
                        <h2>Your Trainers</h2>
                        <p>Here you can delete users</p>
                    </Link>
                </div>
                <div className={style.services__card}>
                    <Link to="/user/progress">
                        <h2>Your Progress</h2>
                        <p></p>
                    </Link>
                </div>
            </div>
        </div>
         
    );
};
