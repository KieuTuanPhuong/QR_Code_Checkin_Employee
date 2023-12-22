import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import './Login.css';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { setAuth } = useAuth();


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [name, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    let loginUrl = "https://qr-code-checkin.vercel.app/api/auth/manage-employee/login-employee";

    useEffect(() => {
        setErrMsg('');
    }, [name, password]);

    // Organize for clean code
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                loginUrl, 
                JSON.stringify({ name, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }, 
            );
            console.log(res);
            const role = res?.data?.details?.role;
            setAuth({ name, password, role });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (err?.response?.data?.message) {
                alert(err?.response?.data?.message);
            } else {
                alert('Login Failed');
            }
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
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={name}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button onClick={ handleLogin } 
                            type="submit" className="btn btn-primary"
                        >
                        Login
                        </button>
                    </div>
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
