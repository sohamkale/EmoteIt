import React from 'react'
import {Navbar} from "./components/Navbar";
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";
import {RoutesBar} from "./components/RoutesBar";

export const MainLayout = (props) => {
    return (
        <>
            <Navbar/>
            <div className="container-fluid emoteit-page"
                 /*onClick={ResetTabs}*/>
               <RoutesBar pageLinks={props.pageLinks} adminLinks={props.adminLinks}/>
                <div className="container">
                    Hello
                </div>
            </div>
        </>

    )
}