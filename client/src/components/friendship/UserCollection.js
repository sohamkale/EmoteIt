import React from 'react'
import UserCard from "../shared/UserCard";
export default function UserCollection(props){
    const scroll = {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '600px'
    };
    return(
        <div className="friend-list-box section-b-space">
            <div className="card-title">
                {props.friendBox?<h3>Friends</h3>:null}
                {props.relationBox?<h3>Relationship</h3>:null}
                {props.allUserBox?<h3>All Users</h3>:null}
                <div className="right-setting">
                    <div className="search-input input-style icon-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-search icon-dark icon iw-16">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" className="form-control" placeholder="find friends..."/>
                    </div>
                    <div className="ms-2 setting-dropdown">
                        <div className="btn-group custom-dropdown arrow-none dropdown-sm">
                            <a href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                filter
                            </a>
                            <div className="dropdown-menu dropdown-menu-right custom-dropdown">
                                <ul>
                                    <li className="active">
                                        <a href="">all friends</a>
                                    </li>
                                    <li>
                                        <a href="">close friends</a>
                                    </li>
                                    <li>
                                        <a href="">office friends</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={scroll}>
                <div className="friend-list friend-page-list">
                    <div className={"row"}>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>
                        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                            <UserCard friendReq={props.friendBox} others={props.relationBox | props.allUserBox}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}