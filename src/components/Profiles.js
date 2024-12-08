import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaConnectdevelop, FaArrowCircleRight } from "react-icons/fa";
import { TiArrowRightThick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { showAllUser } from "../redux/slice/userDetails";

const Profiles = () => {

    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.app);

    useEffect(() => {
        //dispatching user values in "showAllUser" reducer
        dispatch(showAllUser());
    }, []);

    if (isLoading) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <FaConnectdevelop /> Browse and connect with developers
            </p>

            {data && data.map((element) => (
                <div className="profiles" key={element.id}>
                    <div className="profile bg-light">
                        <img className="round-img" src={element.profileDetails[0].avatarUrl} alt="" />
                        <div>
                            <h2>{element.userName}</h2>
                            <p>{element.profileDetails[0].professionalStatus}</p>
                            <p>{element.profileDetails[0].companyAddress}</p>
                            <Link to={`/profile/${element.id}`} className="btn btn-primary" >View Profile <FaArrowCircleRight /></Link>
                        </div>

                        <ul>
                            {element.profileDetails[0].skills.map((element1) => (
                                <li className="text-primary">
                                    <TiArrowRightThick /> {element1}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Profiles;