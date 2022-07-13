import React, {useEffect, useState} from 'react'

export default function Notifications(props) {


    return props.showNotifications ? (
            <div className="dropdown-menu dropdown-menu-right show"
                 style={{
                     position: "absolute",
                     inset: "0px auto auto 0px",
                     margin: "0px",
                     transform: "translate(-310px, 20px)"
                 }}>
                <div className="dropdown-header">
                    <span>Notification</span>
                    <div className="mobile-close" onClick={props.ResetTabs}>
                        <h5>close</h5>
                    </div>
                </div>
                <div className="dropdown-content">
                    <ul className="friend-list">
                      {/*  <li className="d-block">
                            <div>
                                <div className="media">
                                    <img src="../assets/images/user-sm/5.jpg" alt="user"/>
                                    <div className="media-body">
                                        <div>
                                            <h5 className="mt-0">
                                                <span>Paige Turner</span> send you a friend
                                                request
                                            </h5>
                                            <h6> 1 mutual friend</h6>
                                            <div className="action-btns">
                                                <button type="button"
                                                        className="btn btn-solid"><i
                                                    data-feather="check"></i></button>
                                                <button type="button"
                                                        className="btn btn-solid ms-1"><i
                                                    data-feather="x"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>*/}
                        {/*TODO:: Map All Notifications for this props.appUser*/}
                        {
                            props.notifications.map((item)=>
                                <Notification notification={item} />
                            )
                        }
                    </ul>
                </div>
            </div>)
        : (<></>)
}

function Notification({notification}){

    console.log(notification)
    //TODO:: Get the actual about user from details of item
    const [aboutUser,setAboutUser] = useState({
        name: "Loading...",
        profileImageUri: require("../../assets/images/shared/default-dp.png").default
    });

    function _elapsedTime(){
        if(!notification)
            return "..."
        let t = (new Date() - new Date(notification.createdAt))/60000;

        if(t>525600)
            return Math.floor(t/525600) + " year ago";
        if(t>43200)
            return Math.floor(t/43200) + " month ago";
        if(t>1440)
            return Math.floor(t/1440) + " day ago";
        if(t>60)
            return Math.floor(t/60) + " hour ago";
        return "...";
    }

    return (<li>
        <a href="#">
            <div className="media">
                <img src={aboutUser.profileImageUri} alt="user"/>
                <div className="media-body">
                    <div>
                        <h5 className="mt-0">
                            <span>{aboutUser.name}</span> {notification.message}
                        </h5>
                        <h6>{_elapsedTime()}</h6>
                    </div>
                </div>
            </div>
        </a>
    </li>)
}