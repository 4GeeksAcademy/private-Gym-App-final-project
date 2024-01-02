import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom'


export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const handleClick = () => {
        actions.logIn(userEmail, password)        
    }
    
    useEffect(() => {
        if (store.loginRes == "success" && store.role == "admin") {
            navigate('/admin')            
            
        }
        if (store.loginRes == "success" && store.role == "user") {
            navigate('/user')            
            
        }
        if (store.loginRes == "success" && store.role == "trainer") {
            navigate('/trainer')            
            
        }


    }, [store.loginRes])

    return (    
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3 m-auto mt-5 p-5 border border-danger-subtle'>
                    
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} />
                            <label>Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="Password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <label>Password</label>
                        </div>
                        <button className="btn btn-dark" onClick={()=> handleClick()}>Submit</button>
                    
                    <div className='m-3'>
                        <Link className='text-danger' to="/signup">Enter here to register!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}