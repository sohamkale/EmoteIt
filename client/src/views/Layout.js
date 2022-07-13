import React, {useContext, useEffect, useState} from 'react'
import './Layout.scss'
import {Link} from "react-router-dom";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import Notifications from "../components/shared/Notifications";
import {AuthenticationContext} from "../components/contexts/AuthenticationProvider";
import Feedback from "./shared/FeedbackModal";
import FeedbackModal from "./shared/FeedbackModal";
import axios from "axios"; // optional

export default function Layout(props) {

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const {user, accessToken, SignOut} = useContext(AuthenticationContext);

    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [notifications, setNotifications] = useState([]);

    function ResetTabs() {
        setShowNotifications(false);
        setShowProfile(false);
    }

    function SearchProfile(){
        axios.get(`/api/profile/search?key=${searchValue}&limit=5`,
            {headers:{
                "access_token":accessToken
                }}).then((res)=>{
                    console.log(res.data)
                    setSearchSuggestions(res.data);
        })
    }

    function OnSearchValueChange(e){
        const newValue = e.target.value;
        setSearchValue(newValue);
        if(newValue.length>3)
            SearchProfile();
        if(newValue.length == 0)
            setSearchSuggestions([]);
    }

    useEffect(() => {
        setTimeout(() => {
            props.setLoading(false)
        }, 1000);

        axios.get('/api/profile/notifications?limit=3',{headers:{
            "access-token":accessToken
            }}).then((res)=>{
                setNotifications(res.data);
        })
    }, []);

    return (
        <>

            <header>
                <div className="mobile-fix-menu"></div>
                <div className="container-fluid">
                    <div className="header-section">
                        <div className="header-left">
                            <div className="brand-logo">
                                <a href="index.html">
                                    <img src={require('../assets/images/logo/logo-no-bg.png').default} alt="logo"
                                         className="img-fluid {/*blur-up lazyload*/}"/>
                                </a>
                                {/*<span className="title text-light">EmoteIt</span>*/}
                            </div>
                            <div className="search-box">
                                <i data-feather="search" className="icon fas fa-search icon-light"></i>
                                <input type="text" className="form-control search-type" placeholder="find friends..."
                                    value={searchValue} onChange={OnSearchValueChange}
                                />

                                <div className="icon-close">
                                    <i data-feather="x" className="iw-16 icon-light"></i>
                                </div>
                                <div className="search-suggestion">
                                    {/*<span className="recent">recent search</span>*/}
                                    <ul className="friend-list">
                                        {searchSuggestions.map((item) =>
                                            <li>
                                                <a href={`/app/profile/${item._id}`} className="media">
                                                    <img src={user?.pictureUrl ??
                                                    require('../assets/images/shared/default-dp.png').default} alt="user"/>
                                                    <div className="media-body">
                                                        <div>
                                                            <h5 className="mt-0">{item.name}</h5>
                                                            <h6>to be implemented</h6>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                            </div>

                            <div className="m-2 btn " title={"Provide Feedback"} onClick={() => {
                            }}>

                                <button type="button" className="" data-toggle="modal"
                                        data-target="#exampleModal">
                                    <i className="fa-solid fa-comment"></i>
                                </button>
                            </div>
                            {/*        <ul className="btn-group">
                                <li className="header-btn home-btn">
                                    <a className="main-link" href="index.html">
                                        <i className="icon-light stroke-width-3 iw-16 ih-16" data-feather="home"></i>
                                    </a>
                                </li>
                                add friend
                                <li className="header-btn custom-dropdown dropdown-lg add-friend">
                                    <a className="main-link" href="javascript:void(0)" data-bs-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="false">
                                        <i className="icon-light stroke-width-3 iw-16 ih-16" data-feather="user-plus"></i>
                                    </a>
                                    <div className="dropdown-menu">
                                        <div className="dropdown-header">
                                            <span>friend request</span>
                                            <div className="mobile-close">
                                                <h5>close</h5>
                                            </div>
                                        </div>
                                        <div className="dropdown-content">
                                            <ul className="friend-list">
                                                <li>
                                                    <div className="media">
                                                        <img src="../assets/images/user-sm/5.jpg" alt="user"/>
                                                            <div className="media-body">
                                                                <div>
                                                                    <h5 className="mt-0">Paige Turner</h5>
                                                                    <h6> 1 mutual friend</h6>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div className="action-btns">
                                                        <button type="button" className="btn btn-solid">confirm</button>
                                                        <button type="button" className="btn btn-outline ms-1">delete</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media">
                                                        <img src="../assets/images/user-sm/6.jpg" alt="user"/>
                                                            <div className="media-body">
                                                                <div>
                                                                    <h5 className="mt-0">Paige Turner</h5>
                                                                    <h6> 1 mutual friend</h6>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div className="action-btns">
                                                        <button type="button" className="btn btn-solid">confirm</button>
                                                        <button type="button" className="btn btn-outline ms-1">delete</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media">
                                                        <img src="../assets/images/user-sm/7.jpg" alt="user"/>
                                                            <div className="media-body">
                                                                <div>
                                                                    <h5 className="mt-0">Paige Turner</h5>
                                                                    <h6> 1 mutual friend</h6>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div className="action-btns">
                                                        <button type="button" className="btn btn-solid">confirm</button>
                                                        <button type="button" className="btn btn-outline ms-1">delete</button>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media">
                                                        <img src="../assets/images/user-sm/2.jpg" alt="user"/>
                                                            <div className="media-body">
                                                                <div>
                                                                    <h5 className="mt-0">Paige Turner</h5>
                                                                    <h6> 1 mutual friend</h6>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div className="action-btns">
                                                        <button type="button" className="btn btn-solid">confirm</button>
                                                        <button type="button" className="btn btn-outline ms-1">delete</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>*/}
                        </div>
                        <div className="header-right">
                            <div className="post-stats">
                                <ul>
                                    <li>
                                        <h3>{props.appUser?.score}</h3>
                                        <span>Lifetime Score</span>
                                    </li>
                                </ul>
                            </div>
                            <ul className="option-list">

                                {/*notification*/}
                                <li className="header-btn custom-dropdown dropdown-lg btn-group notification-btn">
                                    <a className="main-link" data-bs-toggle="dropdown"
                                       aria-haspopup="true"
                                       aria-expanded="false"
                                       onClick={() => {
                                           setShowNotifications(!showNotifications)
                                       }}
                                    >
                                        <i className="fas fa-bell icon-light"></i>
                                        <span className="count warning">2</span>
                                    </a>
                                    <Notifications showNotifications={showNotifications}
                                                   setShowNotifications={setShowNotifications} notifications={notifications}/>
                                </li>
                                {/*profile*/}
                                <li className="header-btn custom-dropdown profile-btn btn-group">
                                    <a className="main-link" data-bs-toggle="dropdown"
                                       aria-haspopup="true"
                                       aria-expanded="false"
                                       onClick={() => {
                                           setShowProfile(!showProfile)
                                       }}
                                    >
                                        <i className="icon-light stroke-width-3 d-sm-none d-block iw-16 ih-16"
                                           data-feather="user"></i>
                                        <div className="media d-none d-sm-flex">
                                            <div className="user-img usercard-img">
                                                <img src={user?.pictureUrl ??
                                                require('../assets/images/shared/default-dp.png').default}
                                                     className="img-fluid bg-img" alt="user"/>
                                                {/*  <span className="available-stats online"></span>*/}
                                            </div>
                                            <div className="media-body d-none d-md-block">
                                                <h4>{user?.name}</h4>
                                                <span>Level: {user?.level}</span>
                                            </div>
                                        </div>
                                    </a>
                                    {
                                        showProfile ?
                                            <div className="dropdown-menu dropdown-menu-right show"
                                                 style={{
                                                     position: "absolute",
                                                     inset: "0px auto auto 0px",
                                                     margin: "0px",
                                                     transform: "translate(-100px, 60px)"
                                                 }}>
                                                <div className="dropdown-header">
                                                    <span>profile</span>
                                                    <div className="mobile-close" onClick={ResetTabs}>
                                                        <h5>close</h5>
                                                    </div>
                                                </div>
                                                <div className="dropdown-content">
                                                    <ul className="friend-list">
                                                        <li>
                                                            <a href="profile.html">
                                                                <div className="media">
                                                                    <i data-feather="user"></i>
                                                                    <div className="media-body">
                                                                        <div>
                                                                            <h5 className="mt-0">Profile</h5>
                                                                            <h6>Profile preview & settings</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="settings.html">
                                                                <div className="media">
                                                                    <i data-feather="settings"></i>
                                                                    <div className="media-body">
                                                                        <div>
                                                                            <h5 className="mt-0">setting & privacy</h5>
                                                                            <h6>all settings & privacy</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="help-support.html">
                                                                <div className="media">
                                                                    <i data-feather="help-circle"></i>
                                                                    <div className="media-body">
                                                                        <div>
                                                                            <h5 className="mt-0">help & support</h5>
                                                                            <h6>browse help here</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <div className="media">
                                                                <i data-feather="log-out"></i>
                                                                <div className="media-body btn">
                                                                    <div>
                                                                        <h5 className="mt-0" onClick={SignOut}>log
                                                                            out</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : <></>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <div className="page-body container-fluid mt-5 emoteit-page" style={{minHeight: "100vh"}}
                 onClick={ResetTabs}>
                <div className="sidebar-panel">
                    <div className="main-icon">
                        <Link to="/app/home">
                            <i data-feather="grid" className="fas fa-home icon-light"></i>
                        </Link>
                    </div>
                    <ul className="sidebar-icon">
                        {
                            props.pageLinks.map((item) =>
                                <Tippy content={item.name} placement={"right"}>
                                    <li>
                                        <Link to={item.link}>
                                            <i data-feather="file" className={item.icon + " icon-light"}></i>
                                            {
                                                item.count > 0 ? <span style={{backgroundColor: "darkgoldenrod"}}
                                                                       className="badge count">2</span> : <></>
                                            }
                                        </Link>
                                    </li>
                                </Tippy>
                            )
                        }
                    </ul>
                    <ul className="sidebar-icon">
                        {
                            props.adminLinks.map((item) =>
                                <Tippy content={item.name} placement={"right"}>
                                    <li>
                                        <Link to={item.link}>
                                            <i data-feather="file" className={item.icon + " icon-light"}></i>
                                            {
                                                item.count > 0 ? <span style={{backgroundColor: "darkgoldenrod"}}
                                                                       className="badge count">2</span> : <></>
                                            }
                                        </Link>
                                    </li>
                                </Tippy>
                            )
                        }
                    </ul>
                </div>
                <div className="main-page col-xl-11">
                    {props.children}
                </div>

            </div>
        </>
    );
}