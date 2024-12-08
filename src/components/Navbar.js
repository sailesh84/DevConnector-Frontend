import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCode, FaUser, FaSignOutAlt, FaBlogger } from "react-icons/fa";
import { toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate();
    const logOff = (e) => {
        e.preventDefault();
        localStorage.removeItem("userDetails");
        localStorage.clear();
        toast('Logout Successfully.', {
            type: 'success',
        });
        navigate("/login");
    }

    const userLoginDetails = JSON.parse(localStorage.getItem("userDetails"));

    return (
        <div>
            {userLoginDetails ? (
                <nav className="navbar bg-dark">
                    <h1>
                        <Link to="/"><FaCode /> DevConnector</Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/dashboard/posts"><FaBlogger />  Posts</Link>
                        </li>
                        <li>
                            <Link to="/dashboard"><FaUser /> Dashboard</Link>
                        </li>
                        <li>
                            <Link onClick={logOff}><FaSignOutAlt /> Logout</Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="navbar bg-dark">
                    <h1>
                        <Link to="/"><FaCode /> DevConnector</Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/profiles">Developers</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    )
}

export default Navbar;