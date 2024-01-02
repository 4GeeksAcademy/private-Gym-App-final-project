import React from "react";
import { Link } from "react-router-dom";
import style from "../../styles/Navbar.module.css"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();
    return (

        <div>
            <nav className={style.navbar}>
                <div className={style.navbar__container}>
                    <a href="/" id={style.navbar__logo}><i className="fa-solid fa-dumbbell"></i>_GYMApp</a>
                    <div className={style.navbar__toggle} id={style.mobile_menu}>
                        <span className={style.bar}></span>
                        <span className={style.bar}></span>
                        <span className={style.bar}></span>
                    </div>
                    <ul className={style.navbar__menu}>
                        <li className={style.nabvar__item}>
                            <a href="/routines.html" className={style.navbar__links}>Routines</a>
                        </li>
                        <li className={style.navbar__item}>
                            <a href="/diets.html" className={style.navbar__links}>Diets</a>
                        </li>
                        <li className={style.navbar__lgnBtn}>
                            <a href="/login" className={style.loginBtn}>Login</a>
                        </li>
                        <li className={style.nabvar__btn}>
                            <button href="/" className={style.button} onClick={()=> navigate('/signup')} >Sign Up</button>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar