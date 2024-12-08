import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { createUser } from "../redux/slice/userDetails";

const Register = () => {

    const dispatch = useDispatch();
    //State for Register Form
    const [formData, setFormData] = useState({
        name: "NA",
        email: "NA",
        password: "NA",
        confirmPassword: "NA"
    });

    //State for Validation Errors
    const [errors, setErrors] = useState({});

    const getUserData = (e) => {
        //getting all the form values one-by-one
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.name.trim()) {
            validationErrors.name = "Name is required."
        } 

        if (!formData.email.trim()) {
            validationErrors.email = "Email-ID is required."
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Email-ID is not valid."
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required."
        } else if (formData.password.length < 8) {
            validationErrors.password = "Password should be at least 8 characters."
        }

        if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "Password not matched."
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            const data = {"userName":formData.name ,"emailId":formData.email, "password":formData.password, "profileDetails":[{"professionalStatus":"NA","currentCompany":"NA","companyAddress":"NA","skills":[],"avatarUrl":"NA","biography":"NA","twitterUrl":"NA","facebookUrl":"NA","youtubeUrl":"NA","linkedInUrl":"NA","instagramUrl":"NA"}],"exprienceDetails":[{"jobTitle":"NA","companyName":"NA","companyAddress":"NA","fromDate":"NA","toDate":"NA","jobDescription":"NA","isCurrentCompany":true}],"educationDetails":[{"schoolName":"NA","degree":"NA","fieldOfStudy":"NA","fromDateSchool":"NA","toDateSchool":"NA","programDescription":"NA"}]};
            console.log("form-data", data);
            // dispatch(createUser(data));
        }
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><FaUser /> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" onChange={getUserData} />
                    {errors.name && <span className="errors">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" onChange={getUserData} />
                    {errors.email && <span className="errors">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" onChange={getUserData} />
                    {errors.password && <span className="errors">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={getUserData} />
                    {errors.confirmPassword && <span className="errors">{errors.confirmPassword}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </section>
    )
}

export default Register;