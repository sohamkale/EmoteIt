import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";

export const RoutesBar = (props) => {
    const {user} = useContext(AuthenticationContext);
    return (
        <>
            <div className="routes-bar-md bg-dark d-none d-md-block">
                {
                    user?.typeId === 0 &&  props.adminLinks?.map((item, index) =>
                        <Tippy key={index} content={item.name} placement={"right"}>
                            <Link to={item.link}>
                                <div className="routes-bar-md-item">
                                    <i data-feather="grid" className={item.icon + " icon-light"}></i>
                                    {/*{item.name}*/}
                                </div>
                            </Link>
                        </Tippy>
                    )
                }

                <div className="bg-light text-align-center">---</div>
                {
                    props.pageLinks?.map((item, index) =>
                        <Tippy key={index} content={item.name} placement={"right"}>
                            <Link to={item.link}>
                                <div className="routes-bar-md-item">
                                    <i data-feather="grid" className={item.icon + " icon-light"}></i>
                                    {/*{item.name}*/}
                                </div>
                            </Link>
                        </Tippy>
                    )
                }
            </div>

            <nav className="navbar fixed-bottom navbar-dark bg-dark routes-bar-sm d-md-none">
                {
                    props.pageLinks?.filter(x=>x.name!="Info").map((item, index) =>
                        // <Tippy content={item.name} placement={"right"}>
                            <Link key={index} to={item.link}>
                                <div className="routes-bar-md-item">
                                    <i data-feather="grid" className={item.icon + " icon-light"}></i>
                                    {/*{item.name}*/}
                                </div>
                            </Link>
                        // </Tippy>
                    )
                }
            </nav>

        </>

    )
}