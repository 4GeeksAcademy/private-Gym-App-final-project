import React, { useContext, useEffect, useState } from "react";
import { Context } from "../front/js/store/appContext.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom"
import style from '../../src/front/styles/User.module.css'


export const TrainerAssignRoutine = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [msg, setMsg] = useState("")
    const [chest, setChest] = useState("")
    const [arms, setArms] = useState("")
    const [legs, setLegs] = useState("")
    const [shoulders, setShoulders] = useState("")
    const [userId, setUserId] = useState("")


    useEffect(() => {

        actions.getAllUsers()
        if (store.privateRes === true) {
            navigate('/')
        }

    

    }, [store.privateRes])

    const sendRoutine = () => {
        if (chest.length == 0 || arms.length == 0 || legs.length == 0 || shoulders.length == 0) {
            setMsg("Please fill all inputs")
        } else {

            let routine = {
                chest: chest,
                arms: arms,
                legs: legs,
                shoulders: shoulders,
                id_user: userId
            }

            actions.assignRoutine(routine)
            setArms("")
            setChest("")
            setShoulders("")
            setLegs("")

        }

    }
    return (

        <div className="container ">
            {store.setRoutineRes.length == 0 ? "" : <div className="alert alert-success col-12" role="alert">routine added successfully!!</div>}
            {store.deleteRoutineMsg == "success" ? <div className="alert alert-success" role="alert">routine deleted!! </div> :
                store.deleteRoutineMsg == "this user not have routines" ? <div className="alert alert-danger " role="alert">this user not have routines </div> : ""}
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

                                <button onClick={() => setUserId(ele.id)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                                    Assign Routine
                                </button>
                                <button onClick={() => actions.deleteRoutine(ele.id)} type="button" className="btn btn-danger m-2" >
                                    Delete routine
                                </button>
                            </div>
                        </div>

                    )}
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
                                    <input type="text" className="form-control" placeholder="Last Name" value={chest} onChange={(e) => setChest(e.target.value)} ></input>
                                    <label >chest exercise</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={arms} onChange={(e) => setArms(e.target.value)} ></input>
                                    <label >Arms exercise</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={legs} onChange={(e) => setLegs(e.target.value)} ></input>
                                    <label >Legs exercise</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" value={shoulders} onChange={(e) => setShoulders(e.target.value)} ></input>
                                    <label >Shoulders exercises</label>
                                    <h1>{userId}</h1>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" onClick={() => sendRoutine()} >Assign routine</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
};
