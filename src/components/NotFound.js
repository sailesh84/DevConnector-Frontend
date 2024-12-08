import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="container">
            <h1 style={{fontFamily: "fantasy", textShadow: "2px 2px 4px #9f9d9d", fontSize: "4.5rem"}}>404 Not Found</h1>
            <h4 style={{fontFamily: "monospace"}}>Looks like the page you were looking for does not exist...</h4>
            <Link to="/" className="btn btn-light ms-2"><FaArrowLeft /> Go Back</Link>
        </div>
    )
}

export default NotFound;