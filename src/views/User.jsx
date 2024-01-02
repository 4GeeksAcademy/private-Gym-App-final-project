import React, { useContext, useEffect, useState } from "react";
import style from '../../src/front/styles/User.module.css'
import { Link } from 'react-router-dom';
import { Navbar_User } from '../front/js/component/Navbar_User.jsx'
import { Context } from "../front/js/store/appContext.js";
import { useNavigate } from 'react-router-dom'


const User = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.privateViewRequest()
        if (!sessionStorage.access_token || sessionStorage.access_token.length == 0 ) {
            navigate('/')
        }

    }, [])

    return (
        <div>
            <Navbar_User />
            <user className="">
                <div className={style.main}>
                    <div className={style.main__container}>

                        <div className={style.main__content}>
                            <h1>Get In Action Now</h1>
                            <h2></h2>
                            <p>Checkout your daily routines and diet.</p>

                        </div>
                        <div className={style.main__img__container}>
                            <video autoPlay loop muted playsInline className={style.main__video__container}>
                                <source src="https://player.vimeo.com/external/456109483.sd.mp4?s=d7a63dff668ee01dc30fff844811fc751df40e5f&profile_id=165&oauth2_token_id=57447761" />
                            </video>
                        </div>

                    </div>
                </div>
                <div className={style.services}>
                    <h1>Get Your Best Results Now</h1>
                    <div className={style.services__container}>
                        <div className={style.services__card}>
                            <Link to="/user/routines">
                                <h2>Your Routines</h2>
                                <p></p>
                            </Link>
                        </div>
                        <div className={style.services__card}>
                            <Link to="/user/diets">
                                <h2>Your Diets</h2>
                                <p></p>
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
            </user >
        </div>
    )
}

export default User