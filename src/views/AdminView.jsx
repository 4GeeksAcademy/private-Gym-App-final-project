import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"


export const AdminView = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
      

    }, [])

   

   


    return (
        <div className="text-center mt-5">

           {

           }
        </div>
    );
};
