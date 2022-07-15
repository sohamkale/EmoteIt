import React, {useState} from 'react'
import {DisplayPicture} from "./DisplayPicture";

export const NotificationTray = ()=>{

    const [notifications, setNotifications] = useState([]);

    return (
        <div className="dropdown m-3">
            <button className="btn btn-dark" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <button type="button" className="btn btn-default" aria-label="Left Align">
                    <span className="fa fa-bell fa-lg text-white" aria-hidden="true"></span>
                    <span className="badge badge-danger">9</span>
                </button>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                    notifications.map((notif)=>

                        <button className="dropdown-item" >{notif}</button>
                    )
                }
            </div>
        </div>
    )
}