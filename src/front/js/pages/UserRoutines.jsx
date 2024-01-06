import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Routes, Route, useNavigate } from "react-router-dom"



export const UserRoutines = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getRoutine()

        if(store.privateRes === true){
            navigate('/')
        }

    
        
    }, [store.privateRes])

    
    return (

        <div className="container-fluid">
           
            {store.routineData.length == 0 ? <div className="spinner-border text-danger" role="status"></div> :
                store.routineData.msg != "success" ? <h1 className="m-5 text-center">No routine yet</h1> :

                    <div className="bg m-3 " >
                        <h1>trainer_first_name: {store.routineData.trainer_first_name}</h1>
                        <h1>trainer_last_name: {store.routineData.trainer_last_name}</h1>
                        <h1>Chest: {store.routineData.chest}</h1>
                        <h1>legs: {store.routineData.legs}</h1>
                        <h1>arms: {store.routineData.arms}</h1>
                        <h1>shoulders: {store.routineData.shoulders}</h1>


                    </div>
                    
            }
        </div>

    );
};
