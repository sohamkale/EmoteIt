import React from 'react'
import {SearchBox} from "./SearchBox";
import {NavAccountInfo} from "./NavAccountInfo";
import {NotificationTray} from "./NotificationTray";
import {Feedback} from "./Feedback";
import {Link} from "react-router-dom";

export const Navbar = (props) => {
    return (
        // <!-- Just an image -->
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="brand-logo col-4 col-md-2">
                <Link to={`/app/info`}>
                    <img src={require("../../../assets/img/brand/logo/logo-tpback.png").default}
                         className="img-fluid w-50"
                         alt=""/>
                </Link>
            </div>
            <NotificationTray/>


            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavAccountInfo/>
                    </li>
                </ul>

            </div>
        </nav>
       /* <nav className="navbar bg-dark navbar-light text-light">

                <div className="col-2 col-md-5 row align-self-center">


                </div>
                <div className={"col-4 col-md-5 row align-self-center"}>
                    <SearchBox/>
                </div>
                <div className="col-4 col-md-3 ml-auto order-md-last">
                </div>

        </nav>*/
    )
}