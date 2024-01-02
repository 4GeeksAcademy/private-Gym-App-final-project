import React from 'react'
import style from '../../src/front/styles/Home.module.css'
import { Navbar } from '../front/js/component/Navbar.jsx'


const Home = () => {
    return (

        <div>
            <Navbar />

            <home className="">
                <div className={style.main}>
                    <div className={style.main__container}>
                        <div className={style.main__content}>
                            <h1>NEXT GENERATION GYM</h1>
                            <h2>TECHNOLOGY</h2>
                            <p>See what makes us different.</p>
                            <button className={style.main__btn}><a href="/">Get Started</a></button>
                        </div>
                        <div className={style.main__img__container}>
                            <img src="https://images.pexels.com/photos/5384000/pexels-photo-5384000.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" id={style.main__img} />
                        </div>
                    </div>
                </div>


                <div className={style.services}>
                    <h1>See what the hype is about</h1>
                    <div className={style.services__container}>
                        <div className={style.services__card}>
                            <h2>Experience Fitness</h2>
                            <p>Best Technology Gym</p>
                            <button>Get Started</button>
                        </div>
                        <div className={style.services__card}>

                            <h2>Are You Ready</h2>
                            <p>Take The Challenge</p>
                            <button>Get Started</button>
                        </div>
                        <div className={style.services__card}>

                            <h2>Transform Yourself</h2>
                            <p>Get Motivated</p>
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>
            </home>
        </div>
    )
}

export default Home