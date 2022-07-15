import React from 'react'
import {SearchBox} from "./SearchBox";
import {NavAccountInfo} from "./NavAccountInfo";
import {NotificationTray} from "./NotificationTray";
import Feedbacks from "../../admin/Feedbacks";
import {Feedback} from "./Feedback";
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";

export const Navbar = (props) => {
    return (
        // <!-- Just an image -->
        <nav class="navbar fixed-top bg-dark navbar-light text-light">

            <div className="row w-100 m-0">
                <div className="brand-logo col-4 col-md-2">
                    <a className="navbar-brand" href="/">
                        <img src={require("../../../assets/img/brand/logo/logo-tpback.png").default}
                             className="img-fluid w-50"
                             alt=""/>
                    </a>
                </div>
                <div className="col-4 col-md-3 ml-auto order-md-last">
                    <NavAccountInfo/>
                </div>
                <div className="col-12 col-md-5 row align-self-center">
                    <SearchBox/>
                    <Feedback/>
                    <NotificationTray/>
                </div>


            </div>
        </nav>
    )
}