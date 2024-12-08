import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUserCircle, FaBlackTie, FaGraduationCap, FaTimes, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showAllUser } from "../redux/slice/userDetails";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const dispatch = useDispatch();
    const [updateData, setUpdatedData] = useState();
    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));
    const { data, isLoading } = useSelector((state) => state.app);
    const navigate = useNavigate();

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
            setUpdatedData(userLoginDetails);
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
                Dashboard
            </h1>

            {updateData && updateData.map((elem) => (
                <p className="lead"><FaUser /> Welcome {elem.userName}</p>
            ))}
            <div className="dash-buttons">
                <nav>
                    <Link to="/dashboard/edit-profile" className="btn btn-light"><FaUserCircle className="text-primary" /> Edit Profile</Link>
                    <Link to="/dashboard/add-exprience" className="btn btn-light"><FaBlackTie className="text-primary" /> Add Experience</Link>
                    <Link to="/dashboard/add-education" className="btn btn-light"><FaGraduationCap className="text-primary" /> Add Education</Link>
                </nav>
            </div>

            <h2 className="my-2" style={{ fontSize: "1.5em", fontWeight: "bold" }}>Experience Credentials</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {updateData && updateData[0].exprienceDetails.map((element, index) => (
                        <tr key={index}>
                            <td>{element.companyName}</td>
                            <td className="hide-sm">{element.jobTitle}</td>
                            <td className="hide-sm">
                                {element.fromDate} - {element.toDate}
                            </td>
                            <td>
                                <button className="btn btn-primary" title="Edit">
                                    <FaEdit />
                                </button>
                                <button className="btn btn-danger" title="Delete">
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

            <h2 className="my-2" style={{ fontSize: "1.5em", fontWeight: "bold" }}>Education Credentials</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {updateData && updateData[0].educationDetails.map((element1, index) => (
                        <tr key={index}>
                            <td>{element1.schoolName}</td>
                            <td className="hide-sm">{element1.degree} - {element1.fieldOfStudy}</td>
                            <td className="hide-sm">
                                {element1.fromDateSchool} - {element1.toDateSchool}
                            </td>
                            <td>
                                <button className="btn btn-primary" title="Edit">
                                    <FaEdit />
                                </button>
                                <button className="btn btn-danger" title="delete">
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default Dashboard;