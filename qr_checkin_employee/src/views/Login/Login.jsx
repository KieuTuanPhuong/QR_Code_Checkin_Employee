import { useRef, userRef, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

import './Login.css';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [credentials, setCredentials] = useState({
        name: undefined,
        password: undefined,
    });
    
    const { loading, error, dispatch } = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        console.log(e);
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post(
                "https://qr-code-checkin.vercel.app/api/auth/manage-employee/login-employee",
                credentials,
                { withCredentials: true }
            );
            console.log(res);
            if (res?.data?.details?.name) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        
            dispatch({ type: "LOGIN_FAILURE", payload: "errr" });
        }
    };

    return (
        <>
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            id="name"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            id="password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button 
                            disabled={loading}
                            onClick={ handleLogin } 
                            type="submit" className="btn btn-primary"
                        >
                        Login
                        </button>
                    </div>
                    {error && <span>{error.message}</span>}
                    {/* <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </div>
            </form>
        </div>
        </>
    );
}

export default Login;
