import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaThumbsUp, FaThumbsDown, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showAllPost } from "../redux/slice/postDetails";
import { useNavigate } from "react-router-dom";

const Posts = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.post);
    const [updateData, setUpdatedData] = useState();
    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));
    const navigate = useNavigate();

    //State for Post Form
    const [formData, setFormData] = useState({
        post: "",
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
        if (!formData.post.trim()) {
            validationErrors.post = "Your Post is required."
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            //Code after validation removes...
            console.log("form-data", formData);
        }
    }

    useEffect(() => {
        //dispatching users values in "showAllPost" reducer
        dispatch(showAllPost());
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
            const singlePost = data.filter((elem) => elem.id === userLoginDetails[0].id);
            setUpdatedData(singlePost);
        }
    }, [data, isLoading]);


    if (isLoading) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <section className="container">
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><FaUser /> Welcome to the community!</p>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea name="text" cols="30" rows="5" placeholder="Create a post" name="post" className="form-control" onChange={getUserData}></textarea>
                        {errors.post && <span className="errors">{errors.post}</span>}
                    </div>
                    <button type="submit" className="btn btn-dark ms-1">Submit</button>
                </form>
            </div>

            <div className="posts my-2">
                {updateData && updateData.map((element) => (
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <Link to="/profile">
                                <img
                                    className="round-img"
                                    src={element.postUserAvatar}
                                    alt=""
                                />
                                <h4 style={{ fontFamily: "inherit", fontSize: "1rem", fontWeight: "600", marginTop: "0.8rem" }}>{element.userName}</h4>
                            </Link>
                            <Link to="/profile"></Link>
                        </div>
                        <div>
                            <p className="my-1">
                                {element.details}
                            </p>
                            <p className="post-date">
                                Posted on {element.postedOn}
                            </p>

                            <div className="my-1">
                                <Link to={`/dashboard/comment/${element.id}`} className="btn btn-primary">
                                    Comments <span className='comment-count'>{element.comments.length}</span>
                                </Link>
                                <button type="button" className="btn btn-danger">
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Posts;