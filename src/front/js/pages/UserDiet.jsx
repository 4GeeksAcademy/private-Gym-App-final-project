import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"



export const UserDiet = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getDiet()

        if(store.privateRes === true){
            navigate('/')
        }
        
    }, [store.privateRes])

    return (

        <div className="container-fluid">
            {store.dietDataUser.length == 0 ? <div className="spinner-border text-danger" role="status"></div> :
                store.dietDataUser.msg != "success" ? <div className="alert alert-warning m-5" role="alert">No routine yet</div> :
                
                    <div className="bg m-3 " >
                        <h1>trainer_first_name: {store.dietDataUser.trainer_first_name}</h1>
                        <h1>trainer_last_name: {store.dietDataUser.trainer_last_name}</h1>
                        <h1>breakfast: {store.routineData.breakfast}</h1>
                        <h1>brunch: {store.routineData.brunch}</h1>
                        <h1>lunch: {store.routineData.lunch}</h1>
                        <h1>dinner: {store.routineData.dinner}</h1>
                        <h1>supper: {store.routineData.supper}</h1>
                    </div>           
            }
        </div>

    );
};
