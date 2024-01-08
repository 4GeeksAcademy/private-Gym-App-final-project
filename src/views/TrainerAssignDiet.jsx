import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'


export const TrainerAssignDiet = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [msg, setMsg] = useState("")
    const [breakfast, setBreakfast] = useState("")
    const [brunch, setBrunch] = useState("")
    const [lunch, setLunch] = useState("")
    const [dinner, setDinner] = useState("")
    const [supper, setSupper] = useState("")
    const [userId, setUserId] = useState("")


    useEffect(() => {

        actions.getAllUsers()
        if (store.privateRes === true) {
            navigate('/')
        }

    }, [store.privateRes])

    const sendDiet = () => {
        if (breakfast.length == 0 || brunch.length == 0 || lunch.length == 0 || dinner.length == 0 || supper.length == 0) {
            setMsg("Please fill all inputs")
        } else {

            let diet = {
                breakfast: breakfast,
                brunch: brunch,
                lunch: lunch,
                dinner: dinner,
                supper: supper,
                id_user: userId
            }

            actions.assignDiet(diet)
            setBreakfast("")
            setBrunch("")
            setLunch("")
            setDinner("")
            setSupper("")
            setUserId("")

        }

    }
    return (

        <div className="container ">
            {store.setDietRes.length == 0 ? "" : <div className="alert alert-success col-12" role="alert">Diet added successfully!!</div>}
            {store.deleteDietMsg == "success" ? <div className="alert alert-success" role="alert">diet deleted!! </div> :
                store.deleteDietMsg == "this user not have diet" ? <div className="alert alert-danger " role="alert">this user not have diet </div> : ""}

            <div className="d-flex">
                {store.adminUserData.length == 0 ?
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : store.adminUserData.map((ele, index) =>
                        <div className="bg m-3 card" id={ele.id}>
                            <div className="card-body " >
                                <h6 className="card-title"><b>First name</b> {ele.first_name}</h6>
                                <h6 className="card-text"><b>Last Name</b> {ele.last_name}</h6>
                                <h6 className="card-text"><b>Email:</b> {ele.email}</h6>
                                <h6 className="card-text"><b>Since :</b> {ele.create_at}</h6>

                                <button onClick={() => setUserId(ele.id)} type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                                    Assign Diet
                                </button>
                                <button onClick={() => actions.deleteDiet(ele.id)} type="button" className="btn btn-danger m-2" >
                                    Delete Diet
                                </button>

                                <button type="button" onClick={() => actions.getOneDiet(ele.id)} className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    See Diet
                                </button>

                            </div>
                        </div>

                    )}
            </div>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header text-center">
                            <h1 className=" fs-5 text-center" id="exampleModalLabel">Diet</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {store.dietData.length == 0 ? <div class="d-flex justify-content-center"><div className="spinner-border m-5" role="status"></div> </div> :
                            store.dietData.msg == "this user not have diet assigned" ? <div className="alert alert-warning m-3" role="alert">
                                This user not have diet assigned
                            </div>
                                : <div className="modal-body ">
                                    <h1>Diet assigned by: {store.dietData.trainer_first_name + " " + store.dietData.trainer_first_name}</h1>
                                    <h2>breakfast: {store.dietData.breakfast}</h2>
                                    <h2>brunch: {store.dietData.brunch}</h2>
                                    <h2>lunch: {store.dietData.lunch}</h2>
                                    <h2>dinner: {store.dietData.dinner}</h2>
                                    <h2>supper: {store.dietData.supper}</h2>

                                </div>
                        }
                        <div className="modal-footer">
                            <button type="button" className=" w-100 btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                {msg.length == 0 ? "" : <div class="alert alert-danger" role="alert">{msg}</div>}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} ></input>
                                    <label>Breakfast</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={brunch} onChange={(e) => setBrunch(e.target.value)} ></input>
                                    <label >Brunch</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={lunch} onChange={(e) => setLunch(e.target.value)} ></input>
                                    <label >Lunch</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={dinner} onChange={(e) => setDinner(e.target.value)} ></input>
                                    <label >Dinner</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={supper} onChange={(e) => setSupper(e.target.value)} ></input>
                                    <label >Supper</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" onClick={() => sendDiet()} >Assign Diet</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
};
