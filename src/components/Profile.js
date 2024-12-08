import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaYoutubeSquare, FaInstagramSquare, FaChevronCircleRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

const Profile = () => {
    const { profileId } = useParams();
    const { data, isLoading } = useSelector((state) => state.app);
    const [updateData, setUpdatedData] = useState();

    useEffect(() => {
        if (profileId && data) {
            const singleUser = data.filter((elem) => elem.id === profileId);
            setUpdatedData(singleUser);
        }
    }, []);

    // console.log("user-data", data, updateData);


    return (
        <section className="container">
            <Link to="/profiles" className="btn btn-light"><FaArrowLeft /> Back To Profiles</Link>

            {updateData && updateData.map((element) => (
                <div className="profile-grid my-1">
                    <div className="profile-top bg-primary p-2">
                        <img
                            className="round-img my-1"
                            src={element.profileDetails[0].avatarUrl}
                            alt=""
                        />
                        <h1 className="large">{element.userName}</h1>
                        <p className="lead">Developer at {element.profileDetails[0].currentCompany}</p>
                        <p style={{ marginBottom: "0px" }}>{element.profileDetails[0].companyAddress}</p>
                        <div className="icons my-1">
                            <Link to={element.profileDetails[0].facebookUrl}><FaFacebookSquare /></Link>
                            <Link to={element.profileDetails[0].twitterUrl}><FaTwitterSquare /></Link>
                            <Link to={element.profileDetails[0].linkedInUrl}><FaLinkedin /></Link>
                            <Link to={element.profileDetails[0].youtubeUrl}><FaYoutubeSquare /></Link>
                            <Link to={element.profileDetails[0].instagramUrl}><FaInstagramSquare /></Link>
                        </div>
                    </div>

                    <div className="profile-about bg-light p-2">
                        <h2 className="text-primary">{element.userName}'s Bio</h2>
                        <p>
                            {element.profileDetails[0].biography}
                        </p>
                        <div className="line"></div>
                        <h2 className="text-primary">Skill Set</h2>
                        <div className="skills">
                            {element.profileDetails[0].skills.map((element2) => (
                                <div className="p-1"><FaChevronCircleRight /> {element2}</div>
                            ))}
                        </div>
                    </div>

                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {element.exprienceDetails.map((element3) => (
                            <div>
                                <h3 className="text-dark">{element3.companyName} - {element3.companyAddress}</h3>
                                <p>{element3.fromDate} - {element3.toDate}</p>
                                <p><strong>Position: </strong>{element3.jobTitle}</p>
                                <p>
                                    <strong>Description: </strong>{element3.jobDescription}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {element.educationDetails.map((element4) => (
                            <div>
                                <h3>{element4.schoolName}</h3>
                                <p>{element4.fromDateSchool} - {element4.toDateSchool}</p>
                                <p><strong>Degree: </strong>{element4.degree}</p>
                                <p><strong>Field Of Study: </strong>{element4.fieldOfStudy}</p>
                                <p>
                                    <strong>Description: </strong>{element4.programDescription}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            ))}
        </section>
    )
}

export default Profile;