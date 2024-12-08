import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showAllPost } from "../redux/slice/postDetails";

const Comment = () => {
    // const { postId } = useParams();
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.post);
    const [updateData, setUpdatedData] = useState();
    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));
    const navigate = useNavigate();

    //State for Comments Form
    const [formData, setFormData] = useState({
        comment: "",
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
        if (!formData.comment.trim()) {
            validationErrors.comment = "Your Comment is required."
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
        <section className="container">
            <Link to="/dashboard/posts" className="btn"><FaArrowLeft /> Back To Posts</Link>

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
                    </div>
                </div>
            ))}


            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea name="comment" cols="30" rows="5" placeholder="Comment on this post" className="form-control" onChange={getUserData}></textarea>
                        {errors.comment && <span className="errors">{errors.comment}</span>}
                    </div>
                    <button type="submit" className="btn btn-dark ms-1">Submit</button>
                </form>
            </div>


            <div className="comments my-2">
                <div className="col-md-12 col-lg-12">
                    <div className="card text-body">
                        <div className="card-body p-4">
                            <h4 className="mb-0" style={{ fontWeight: "bold" }}>Recent Comments</h4>
                            <p className="fw-light mb-4 pb-2">Latest Comments section by users</p>

                            {updateData && updateData[0].comments.map((element2, index) => (
                                <div title="latest-comments">
                                    <div className="d-flex flex-start">
                                        <img className="rounded-circle shadow-1-strong me-3" src={element2.userAvatar} alt="avatar" />

                                        <div>
                                            <h6 className="fw-bold mb-1">{element2.userName}</h6>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="mb-0" style={{ color: "#aaa" }}>
                                                    <small>{element2.commentOn}</small>
                                                </p>
                                                <a href="#!" className="link-muted"><i className="fas fa-pencil-alt ms-2"></i></a>
                                                <a href="#!" className="link-muted"><i className="fas fa-redo-alt ms-2"></i></a>
                                                <a href="#!" className="link-muted"><i className="fas fa-heart ms-2"></i></a>
                                            </div>
                                            <p className="mb-0">
                                                <em>
                                                    "{element2.comment}".
                                                </em>
                                            </p>
                                        </div>
                                    </div>
                                    {/* On the last loop of the div, the <hr> is hidden */}
                                    {index !== updateData[0].comments.length - 1 ? (
                                        <hr class="my-2"></hr>
                                    ) : <div className="my-1"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Comment;