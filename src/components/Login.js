import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllUser } from "../redux/slice/userDetails";
import { toast } from 'react-toastify';

const Login = () => {

    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.app);
    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));

    //State for Login Form
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    //State for Validation Errors
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        //dispatching users values in "showAllUser" reducer
        dispatch(showAllUser());
    }, []);

    useEffect(() => {
        if (userLoginDetails) {
            navigate("/dashboard");
        }
    }, [userLoginDetails]);

    const getUserData = (e) => {
        //getting all the form values one-by-one
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = {};
        if (!formData.email.trim()) {
            validationErrors.email = "Email-ID is required."
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Email-ID is not valid."
        }

        if(!formData.password.trim()) {
            validationErrors.password = "Password is required."
        } else if(formData.password.length < 8){
            validationErrors.password = "Password should be at least 8 characters."
        }
        
        setErrors(validationErrors);

        if (data) {
            const singleUser = data.filter((elem) => elem.emailId === formData.email && elem.password === formData.password);
            console.log(singleUser);

            if (singleUser.length > 0) {
                localStorage.setItem("userDetails", JSON.stringify(singleUser));
                toast('Login Successfully.', {
                    type: 'success',
                });
                navigate("/dashboard");
            }
            else {
                toast('Invalid Credentials.', {
                    type: 'error',
                });
            }
        }
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Email Address" name="email" onChange={getUserData} />
                    {errors.email && <span className="errors">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" onChange={getUserData} />
                    {errors.password && <span className="errors">{errors.password}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </section>
    )
}

export default Login;