import React from 'react'

const img = "https://nafizishtiaque.com/wp-content/uploads/2021/06/Nafiz_2757e-_screen_smaller-e1624454935407.jpg"

export default function UserTitle(props) {
    return (
        <>
            <div className="col-2">
                <div className="profile-img">
                    <div>
                        <img src={img} className="img-fluid usercard-img" style={{
                            borderLeft: "3px solid purple",
                            borderBottom: "2px solid purple",
                            width: "50%"
                        }} alt="profile"/>
                    </div>
                    {/*<span className="stats">
                                  <i className="fas fa-smile-beam" style={{color: "purple"}}/>
                                </span>*/}
                </div>
            </div>
            <div className="col-10 text-bold">
                <b>Kaniz Fatema</b>
                <h6>30 mins ago</h6>
            </div>
        </>);
    {/*<div className="setting-btn ms-auto setting-dropdown no-bg">
                <div className="btn-group custom-dropdown arrow-none dropdown-sm">
                    <div role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round"
                             className="feather feather-more-horizontal icon icon-font-color iw-14">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right custom-dropdown">
                        <ul>
                            <li>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                         stroke-linecap="round" stroke-linejoin="round"
                                         className="feather feather-bookmark icon-font-light iw-16 ih-16">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    save post</a>
                            </li>
                            <li>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                         stroke-linecap="round" stroke-linejoin="round"
                                         className="feather feather-edit icon-font-light iw-16 ih-16">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    edit post</a>
                            </li>
                            <li>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                         stroke-linecap="round" stroke-linejoin="round"
                                         className="feather feather-x-square icon-font-light iw-16 ih-16">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                    </svg>
                                    hide post</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>*/
    }
}