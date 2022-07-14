import React from 'react'
import {SearchBox} from "./SearchBox";
import {NavAccountInfo} from "./NavAccountInfo";
import {NotificationTray} from "./NotificationTray";
import Feedbacks from "../../admin/Feedbacks";
import {Feedback} from "./Feedback";

export const Navbar = (props) => {
    return (
        // <!-- Just an image -->
        <nav class="navbar bg-dark navbar-light text-light">

            <div className="row w-100 m-0">
                <div className="brand-logo col-6 col-md-2">
                    <a className="navbar-brand" href="/">
                        <img src={require("../../../assets/img/brand/logo/logo-tpback.png").default} className="img-fluid w-50"
                             alt=""/>
                    </a>
                </div>
                <div className="col-6 col-md-4 row align-self-center">
                    <SearchBox/>
                    <div className="d-inline-block">
                        <Feedback/>

                    </div>
                </div>
                <div className="col-10 col-md-4 col-lg-3 row">
                    <NavAccountInfo/>
                </div>
                <div className="col-2 col-md-2 col-lg-3 text-align-right">
                    <NotificationTray/>
                </div>
            </div>
        </nav>
    )
}