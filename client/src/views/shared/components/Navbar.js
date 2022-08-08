import React from 'react'
import {SearchBox} from "./SearchBox";
import {NavAccountInfo} from "./NavAccountInfo";
import {NotificationTray} from "./NotificationTray";
import {Feedback} from "./Feedback";
import {Link} from "react-router-dom";

export const Navbar = (props) => {
    return (
        // <!-- Just an image -->
        <nav className="navbar bg-dark navbar-light text-light">
            <div className="row w-100 m-0">
                <div className="brand-logo col-4 col-md-2">
                    <Link to={`/app/info`}>
                        <img src={require("../../../assets/img/brand/logo/logo-tpback.png").default}
                             className="img-fluid w-50"
                             alt=""/>
                    </Link>
                </div>
                <div className="col-4 col-md-3 ml-auto order-md-last">
                    <NavAccountInfo/>
                </div>
                <div className="col-12 col-md-5 row align-self-center">
                    <NotificationTray/>
                    <SearchBox/>
                    <Feedback/>
                </div>


            </div>
        </nav>
    )
}