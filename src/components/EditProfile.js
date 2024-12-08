import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaTwitter, FaFacebookSquare, FaYoutube, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showAllUser } from "../redux/slice/userDetails";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.app);
    const [updateData, setUpdatedData] = useState();
    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));
    const navigate = useNavigate();

    //State for Profile Form
    const [formData, setFormData] = useState({
        companyName: "",
        professionalStatus: "",
        skills: "",
        avatar: "",
        bio: "",
        twitter: "",
        facebook: "",
        youtube: "",
        linkedIn: "",
        instagram: "",
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
        if (!formData.companyName.trim()) {
            validationErrors.companyName = "Company Name is required."
        }

        if (!formData.professionalStatus.trim()) {
            validationErrors.professionalStatus = "ProfessionaL Status is required."
        }

        if (!formData.skills.trim()) {
            validationErrors.skills = "Skills is required."
        }

        if (!formData.avatar.trim()) {
            validationErrors.avatar = "User Avatar link is required."
        }

        if (!formData.bio.trim()) {
            validationErrors.bio = "Biography is required."
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            //Code after validation removes...
            console.log("form-data", formData);
        }
    }

    useEffect(() => {
        //dispatching users values in "showAllUser" reducer
        dispatch(showAllUser());
    }, []);

    useEffect(() => {
        if (!userLoginDetails) {
            navigate("/login");
        }
    }, [userLoginDetails]);

    useEffect(() => {
        if (isLoading) {
            console.log('show loading page');
        }
        else if (data) {
            const singleUserPost = data.filter((elem) => elem.id === userLoginDetails[0].id);
            setUpdatedData(singleUserPost);
        }
    }, [data, isLoading]);


    if (isLoading) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <div>
            <section className="container">
                <h1 className="large text-primary">
                    Create / Edit Profile
                </h1>
                <p className="lead">
                    <FaUser /> Let's get some information to make your profile stand out
                </p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Company Name" name="companyName" onChange={getUserData} />
                        {errors.companyName && <span className="errors">{errors.companyName}</span>}
                    </div>
                    <div className="form-group">
                        <select name="professionalStatus" className="form-control" onChange={getUserData}>
                            <option value="0">Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.professionalStatus && <span className="errors">{errors.professionalStatus}</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Skills" name="skills" className="form-control" onChange={getUserData} />
                        {errors.skills && <span className="errors">{errors.skills}</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Avatar URL" name="avatar" className="form-control" onChange={getUserData} />
                        {errors.avatar && <span className="errors">{errors.avatar}</span>}
                    </div>
                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio" className="form-control" onChange={getUserData}></textarea>
                        {errors.bio && <span className="errors">{errors.bio}</span>}
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light">
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    <div className="form-group social-input">
                        <FaTwitter className="fa-twitter" />
                        <input type="text" placeholder="Twitter URL" name="twitter" className="form-control" onChange={getUserData} />
                    </div>

                    <div className="form-group social-input">
                        <FaFacebookSquare className="fa-facebook" />
                        <input type="text" placeholder="Facebook URL" name="facebook" className="form-control" onChange={getUserData} />
                    </div>

                    <div className="form-group social-input">
                        <FaYoutube className="fa-youtube" />
                        <input type="text" placeholder="YouTube URL" name="youtube" className="form-control" onChange={getUserData} />
                    </div>

                    <div className="form-group social-input">
                        <FaLinkedin className="fa-linkedin" />
                        <input type="text" placeholder="Linkedin URL" name="linkedIn" className="form-control" onChange={getUserData} />
                    </div>

                    <div className="form-group social-input">
                        <FaInstagramSquare className="fa-instagram" />
                        <input type="text" placeholder="Instagram URL" name="instagram" className="form-control" onChange={getUserData} />
                    </div>

                    <button type="submit" className="btn btn-primary my-1">Submit</button>
                    <Link to="/dashboard" className="btn btn-light ms-2">Go Back</Link>
                </form>
            </section>
        </div>
    )
}

export default EditProfile;