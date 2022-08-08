import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";

export const NotificationTray = () => {

    const [notifications, setNotifications] = useState([]);
    const {accessToken} = useContext(AuthenticationContext)

    function GetNotifications() {
        axios.get('/api/user/notification?limit=5', {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setNotifications(res.data);
        })
    }

    function MarkSeen(notification, timer=1000) {
        axios.put(`/api/user/notification`, notification, {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setTimeout(GetNotifications, timer)
        })
    }

    /*    function MarkAllSeen(){
            axios.put(`/api/user/notification`,null,{
                headers: {
                    "access-token": accessToken
                }
            }).then((res) => {
                setTimeout(GetNotifications, 8000)
            })
        }*/

    useEffect(() => {
        GetNotifications();
    }, [])

    return (
        <div className="dropdown m-3">
            <button className="btn btn-dark" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="fa fa-bell fa-lg text-white" aria-hidden="true"></span>
                <span className="badge badge-danger">{notifications.filter(x=>!x.seen).length}</span>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{minWidth: "60vw"}}>
                {
                    notifications.map((item, index) =>

                            <Link key={index} to={item.link}>
                                <div className={item.seen? "m-1 border-bottom  text-black-50": "m-1 border-bottom bg-light "} onMouseOver={()=>MarkSeen(item)}>
                                    <i className="fa-solid fa-arrow-right"></i>
                                    &nbsp; {item.message}
                                    <br/> {new Date(item.createdAt)?.toLocaleString()}
                                </div>
                            </Link>
                       /* <button className="dropdown-item">
                            <Link to={item.link} onClick={() => MarkSeen(item)}>
                                <i className="fa-solid fa-arrow-right"></i>
                                &nbsp; {item.message}
                            </Link>
                            <button className="btn btn-outline-secondary float-right" onClick={() => MarkSeen(item, 0)}>X</button>
                        </button>*/
                    )
                }
            </div>
        </div>
    )
}