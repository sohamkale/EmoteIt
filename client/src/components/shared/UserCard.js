import React from 'react'
const img = "https://nafizishtiaque.com/wp-content/uploads/2021/06/Nafiz_2757e-_screen_smaller-e1624454935407.jpg"
export default function UserCard(props){
    return(
        <div className="profile-box friend-box">
            <div className="profile-content">
                <div className="image-section">
                    <div className="profile-img">
                        <div>
                            <img src={props.    user?.pictureUrl ?? img} className="img-fluid lazyload usercard-img" style={{
                                borderLeft: "3px solid purple",
                                borderBottom: "2px solid purple"
                            }} alt="profile"/>
                        </div>
                        <span className="stats">
                                  <i className="fas fa-smile-beam" style={{color: "purple"}}/>
                                </span>
                    </div>
                </div>
                <div className="profile-detail">
                    <h2>{props.user.name}&nbsp;<span>❤</span></h2>
                    <div className="counter-stats">
                        <ul>
                            <li>
                                <h3 className="counter-value" data-count="546">546</h3>
                                <h5>score</h5>
                            </li>
                            <li>
                                <h3 className="counter-value" data-count="26335">26335</h3>
                                <h5>happy friends</h5>
                            </li>
                            <li>
                                <h3 className="counter-value" data-count="6845">6845</h3>
                                <h5>mutual friends</h5>
                            </li>
                        </ul>
                    </div>
                    {props.self? <a data-bs-toggle="modal" data-bs-target="#editProfile" className="btn btn-solid">edit profile</a>:null}
                    {props.others? <a data-bs-toggle="modal" data-bs-target="#editProfile" className="btn btn-solid">View Profile</a>:null}
                    {props.friendReq? <a><a data-bs-toggle="modal" data-bs-target="#editProfile" className="btn btn-success">Accept</a> <a data-bs-toggle="modal" data-bs-target="#editProfile" className="btn btn-danger">Decline</a></a>:null}
                </div>
            </div>
        </div>
    )
}