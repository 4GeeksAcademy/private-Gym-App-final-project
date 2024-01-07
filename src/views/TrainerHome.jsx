import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'


export const TrainerHome = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

        actions.privateViewRequest()
        if(store.privateRes === true){
            navigate('/')
        }

    }, [store.privateRes])


    return (
        
        <div className={style.services}>
        <h1>Assign Routine</h1>
        <div className={style.services__container}>
            <div className={style.services__card}>
                <Link to="/trainer/assignroutine">
                    <h2>Assign Routine</h2>
                    <p></p>
                </Link>
            </div>
            <div className={style.services__card}>
                <Link to="/trainer/assigndiet">
                    <h2>Assign Diet</h2>
                    <p></p>
                </Link>
            </div>
           
        </div>
    </div>
     
);
};
