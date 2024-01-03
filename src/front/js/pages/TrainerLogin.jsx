import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'


export const TrainerLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");


    const sendLoginForm = () => {
        if (password.length < 6 || !email.includes("@gmail.com") || email.length < 11) {
            setMsg("Please fill both inputs correctly")

        }
        else {
            actions.trainerLogIn(email, password)
        }
    }

    useEffect(() => {

        if (store.loginTrainerRes == "success" && store.role == "trainer") {
            navigate('/trainer')

        }

        if (store.loginTrainerRes == "Incorrect password"){
            setMsg("Incorrect password or email")
        }

    }, [store.loginTrainerRes])

    return (



        <div className='container-fluid'>
            {msg.length == 0 ? "" : <div class="alert alert-danger" role="alert">{msg}</div>}

            <div className='row'>
                <div className='col-md-3 m-auto mt-5 p-5 border border-danger-subtle'>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <button className="btn btn-dark" onClick={() => sendLoginForm()}>Submit</button>

                    <div className='m-3'>
                        <Link className='text-danger' to="/signup">Enter here to register!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}