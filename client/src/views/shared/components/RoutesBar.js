import React from 'react'
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";

export const RoutesBar = (props) => {
    return (
        <>
            <div className="routes-bar-md bg-dark d-none d-md-block">
                {
                    props.adminLinks?.map((item) =>
                        <Tippy content={item.name} placement={"right"}>
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
                    props.pageLinks?.map((item) =>
                        <Tippy content={item.name} placement={"right"}>
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
                    props.pageLinks?.map((item) =>
                        // <Tippy content={item.name} placement={"right"}>
                            <Link to={item.link}>
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