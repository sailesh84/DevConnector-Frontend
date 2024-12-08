import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showAllUser } from "../redux/slice/userDetails";
import { useNavigate } from "react-router-dom";

const AddEducation = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.app);
    const [updateData, setUpdatedData] = useState();
    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));
    const navigate = useNavigate();

    //State for Education Form
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldOfStudy: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: ""
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
        if (!formData.school.trim()) {
            validationErrors.school = "School Name is required."
        }
        
        if (!formData.degree.trim()) {
            validationErrors.degree = "Degree is required."
        }
        
        if (!formData.fieldOfStudy.trim()) {
            validationErrors.fieldOfStudy = "Field of Study is required."
        }
        
        if (!formData.fromMonth.trim()) {
            validationErrors.fromMonth = "From Month is required."
        }
        
        if (!formData.fromYear.trim()) {
            validationErrors.fromYear = "From Year is required."
        }
        
        if (!formData.toMonth.trim()) {
            validationErrors.toMonth = "To Month is required."
        }
        
        if (!formData.toYear.trim()) {
            validationErrors.toYear = "To Year is required."
        }
        
        if (!formData.description.trim()) {
            validationErrors.description = "Description is required."
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
        <section className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <FaGraduationCap /> Add any school, bootcamp, etc that
                you have attended
            </p>

            <form className="form" onSubmit={handleSubmit}> 
                <div className="form-group">
                    <input type="text" placeholder="School or Bootcamp" name="school" className="form-control" onChange={getUserData} />
                    {errors.school && <span className="errors">{errors.school}</span>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Degree or Certificate" name="degree" className="form-control" onChange={getUserData} />
                    {errors.degree && <span className="errors">{errors.degree}</span>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldOfStudy" className="form-control" onChange={getUserData} />
                    {errors.fieldOfStudy && <span className="errors">{errors.fieldOfStudy}</span>}
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <select name="fromMonth" style={{ width: "50%", float: "left" }} size="6" className="form-control" onChange={getUserData}>
                        <option value="0">Select Month</option>
                        <option value="January">January</option>
                        <option value="Feburary">Feburary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select name="fromYear" style={{ width: "50%", float: "left" }} size="6" className="form-control" onChange={getUserData}>
                        <option value="0">* Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                    </select>
                    
                    <div style={{ width: "50%", float: "left", marginBottom: "1em" }}>
                        {errors.fromMonth && <span className="errors">{errors.fromMonth}</span>}
                    </div>
                    <div style={{ width: "50%", float: "left", marginBottom: "1em" }}>
                        {errors.fromYear && <span className="errors">{errors.fromYear}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <select name="toMonth" style={{ width: "50%", float: "left" }} size="6" className="form-control" onChange={getUserData}>
                        <option value="0">Select Month</option>
                        <option value="January">January</option>
                        <option value="Feburary">Feburary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select name="toYear" style={{ width: "50%", float: "left" }} size="6" className="form-control" onChange={getUserData}>
                        <option value="0">* Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                    </select>
                    
                    <div style={{ width: "50%", float: "left", marginBottom: "1em" }}>
                        {errors.toMonth && <span className="errors">{errors.toMonth}</span>}
                    </div>
                    <div style={{ width: "50%", float: "left", marginBottom: "1em" }}>
                        {errors.toYear && <span className="errors">{errors.toYear}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Program Description" className="form-control" onChange={getUserData}></textarea>
                    {errors.description && <span className="errors">{errors.description}</span>}
                </div>

                <button type="submit" className="btn btn-primary my-1">Submit</button>
                <Link to="/dashboard" className="btn btn-light ms-2">Go Back</Link>
            </form>
        </section>
    )
}

export default AddEducation;