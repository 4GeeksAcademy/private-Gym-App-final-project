import React from "react";
import style from '/workspaces/private-Gym-App-final-project/src/front/styles/Footer.module.css'
import { Link } from "react-router-dom";

export const Footer = () => (

    <footer className="">
        <div className={style.footer__container}>
            <div className={style.footer__links}>
                <div className={style.footer__link__wrapper}>
                    <div className={style.footer__link__items}>
                        <h2>About Us</h2>
                        <Link to="/careers">
                        <a>Become a Trainer</a>
                        </Link>
                        <Link to="/policies">
                        <a>Terms and Conditions</a>
                        </Link>
                        {/* <Link to= "">
                        <a>How it works</a>
                        </Link>
                        <Link to= "">
                        <a>Testimonials</a>
                        </Link> */}
                        
                        {/* <Link to= "">
                        <a>Investments</a>
                        </Link> */}
                    </div>
                    <div className={style.footer__link__items}>
                        <h2>Contact Us</h2>
                        <Link to="/contact">
                        <a>Contact Us</a>
                        </Link>
                        <Link to="/support">
                        <a>Get Support</a>
                        </Link>
                        {/* <Link to= "">
                        <a>Destinations</a>
                        </Link>
                        <Link to= "">
                        <a>Sponsorship</a>
                        </Link> */}
                    </div>
                </div>
                <div className={style.footer__link__wrapper}>
                    {/* <div className={style.footer__link__items}>
                        <h2>Videos</h2>
                        <Link to= "">
                        <a>Submit Video</a>
                        </Link>
                        <Link to= "">
                        <a>Ambassadors</a>
                        </Link>
                        <Link to= "">
                        <a>Agency</a>
                        </Link>
                        <Link to= "">
                        <a>Influencer</a>
                        </Link>


                    </div> */}
                    <div className={style.footer__link__items}>
                        <h2>Social Media</h2>
                        <Link to= "instagram">
                        <a>Instagram</a>
                        </Link>
                        <Link to= "facebook">
                        <a>Facebook</a>
                        </Link>
                        <Link to= "youtube">
                        <a>Youtube</a>
                        </Link>
                        <Link to= "linkedin">
                        <a>LinkedIn</a></Link>
                    </div>
                </div>
            </div>
            <div className={style.social__media}>
                <div className={style.social__media__wrap}>
                    <div className={style.footer__logo}>
                    <Link to= "/home">
                        <a id={style.footer__logo}><i className="fa-solid fa-dumbbell"></i>__GYMApp</a>
                        </Link>
                    </div>
                    <p className={style.website__rights}><i class="fa-solid fa-copyright"></i>GYMApp 2024. All rights reserved</p>
                    <div className={style.social__icons}>
                     <Link to= "facebook">
                        <a className={style.social__icon__link} target="_blank">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        </Link>
                        <Link to= "instagram">
                        <a className={style.social__icon__link} target="_blank">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        </Link>
                        <Link to= "youtube">
                        <a className={style.social__icon__link} target="_blank">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        </Link>
                        <Link to= "linkedin">
                        <a className={style.social__icon__link} target="_blank">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);