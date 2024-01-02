import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import style from "../../styles/Navbar_User.module.css"
import { useNavigate } from "react-router-dom";

export const Navbar_User = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    return (

        <div>
            <nav className={style.navbar}>
                <div className={style.navbar__container}>
                    <Link to="/user" className={style.link}>
                        <a id={style.navbar__logo}><i className="fa-solid fa-dumbbell"></i>_GYMApp</a>
                    </Link>
                    <div className={style.navbar__toggle} id={style.mobile_menu}>
                        <span className={style.bar}></span>
                        <span className={style.bar}></span>
                        <span className={style.bar}></span>
                    </div>
                    <ul className={style.navbar__menu}>
                        <li className={style.nabvar__item}>
                            <Link to="/user/routines" className={style.link}>
                                <a className={style.navbar__links}>Routines</a>
                            </Link>
                        </li>
                        
                        <li className={style.navbar__item}>
                            <Link to="/user/diets" className={style.link}>
                                <a className={style.navbar__links}>Diets</a>
                            </Link>
                        </li>
                        <li className={style.item}>
                            <Link to="/user/progress" className={style.link}>
                                <a className={style.navbar__links}>Progress</a>
                            </Link>
                        </li>
                        <Link to="/home" className={style.link}>
                            <li className={style.nabvar__btn}>
                                <button className={style.button} onClick={()=> actions.logout()} >Logout</button>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

