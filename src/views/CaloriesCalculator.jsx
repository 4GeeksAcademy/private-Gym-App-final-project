import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"


export const CaloriesCalculator = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [height, setHeight] = useState("")
    const [weight, setweight] = useState("")
    const [age, setage] = useState("")
    const [result, setResult] = useState(0)
    const [genderValue, setGenderValue] = useState(0)
    const [activityValue, setActivityValue] = useState(0)
    const [loseWeightValue, setLoseWeightValue] = useState(0)
    const [gainWeightValue, setGainWeightValue] = useState(0)
    const [message, setMessage] = useState("")

    useEffect(() => {
        actions.privateViewRequest()
        if (store.privateRes === true) {
            navigate('/')
        }

        if (result > 0) {
            setGainWeightValue(result + 300)
            setLoseWeightValue(result - 300)
        }

    }, [result, store.privateRes])




    const calculate = () => {

        if (height == "" || weight == "" || age == "" || genderValue == 0 || activityValue == 0) {
            setMessage('select and fill all inputs')
            console.log(height, weight, age, genderValue, activityValue)
        }

        if (genderValue == "male" ) {
            setResult(Math.round((((Number(weight) * 10) + (Number(height) * 6.25) - (Number(age) * 5) + 5) * activityValue)))
            setMessage("")
        }

        if (genderValue == "female") {
            setResult(Math.round((((Number(weight) * 10) + (Number(height) * 6.25) - (Number(age) * 5) - 161) * activityValue)))
            setMessage("")
        }


    }



    return (
        <div className="text-center mt-5">

            <div className="p-5">
                <h1><b>calculate your calories!</b></h1>

                { message.length == 0 ? "" : <div class="alert alert-danger" role="alert">{message}</div> }

                <select className="form-select form-select-lg mb-3" onChange={(e) => setGenderValue(e.target.value)}>
                    <option selected value={0}>Select your gender</option>
                    <option value={"male"} >Male</option>
                    <option value={"female"} >Female</option>
                </select>

                <select className="form-select form-select-lg mb-3" onChange={(e) => setActivityValue(e.target.value)}>
                    <option selected value={0} >Select your physical activity</option>
                    <option value={1.2}  >Sedentary</option>
                    <option value={1.375}  >Exercise 1-3 times/week</option>
                    <option value={1.55} >Exercise 4-5 times/week</option>
                    <option value={1.725} >Daily exercise</option>
                    <option value={1.9} >Intense exercise 6-7 times/week</option>
                </select>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" placeholder="First Name" value={height} onChange={(e) => setHeight(e.target.value)} ></input>
                    <label for="floatingPassword">Height (centimeters)</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" placeholder="First Name" value={weight} onChange={(e) => setweight(e.target.value)} ></input>
                    <label for="floatingPassword">Weight (KG)</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" placeholder="First Name" value={age} onChange={(e) => setage(e.target.value)} ></input>
                    <label for="floatingPassword">Age</label>
                </div>

                <button type="button" className="btn btn-secondary m-3 p-2 w-25" onClick={() => calculate()} ><b>Calculate</b></button>


                {result == 0 ? "" :
                    <div className="alert alert-success" role="alert">

                        <h1> Calories for maintain your weight: {result}</h1>
                        <h1> Calories for lose weight: {loseWeightValue}</h1>
                        <h1> Calories for gain weight: {gainWeightValue}</h1>

                    </div>

                }



            </div>
        </div>
    );
};
