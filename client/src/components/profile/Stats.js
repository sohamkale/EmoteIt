import React from 'react'

export default function Stats(props){
    return (
     /*   <div className=" section-t-space px-0">
            <div className="row">
                <div className="content-left col-4 res-full-width order-1">

                    <div className="profile-about sticky-top">
                        <div className="card-title">
                            <h3>about</h3>
                            <h5>intro my self</h5>
                            <div className="settings">
                                <div className="setting-btn">
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#editProfile">
                                        <i className="icon icon-dark stroke-width-3 iw-11 ih-11"
                                           data-feather="edit-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="about-content">
                            <ul>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="user"></i>
                                    </div>
                                    <div className="details">
                                        <h5>About</h5>
                                        <h6>Hello, I’m a kelin jasen, web-developer based on Paris. I have rich
                                            experience in web site design.</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        {/!*<svg className="iw-18 ih-18">*!/}
                                        {/!*    <use xlink:href="../assets/svg/icons.svg#cake"></use>*!/}
                                        {/!*</svg>*!/}
                                    </div>
                                    <div className="details">
                                        <h5>Birthday</h5>
                                        <h6>27th Aug, 1994</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="phone"></i>
                                    </div>
                                    <div className="details">
                                        <h5>Phone</h5>
                                        <h6>041 985 245 210</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="user"></i>
                                    </div>
                                    <div className="details">
                                        <h5>gender</h5>
                                        <h6>men</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="heart"></i>
                                    </div>
                                    <div className="details">
                                        <h5>relationship status</h5>
                                        <h6>single</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="map-pin"></i>
                                    </div>
                                    <div className="details">
                                        <h5>lived in london</h5>
                                        <h6>last 5 year</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        {/!*<svg>*!/}
                                        {/!*    <use className="fill-color" xlink:href="../assets/svg/icons.svg#blood-drop">*!/}
                                        {/!*    </use>*!/}
                                        {/!*</svg>*!/}
                                    </div>
                                    <div className="details">
                                        <h5>blood group</h5>
                                        <h6>A+ positive</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="mail"></i>
                                    </div>
                                    <div className="details">
                                        <h5>email address</h5>
                                        <h6>billyerds@gmail.com</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="at-sign"></i>
                                    </div>
                                    <div className="details">
                                        <h5>website</h5>
                                        <h6>friendbook.com</h6>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="iw-18 ih-18" data-feather="link"></i>
                                    </div>
                                    <div className="details">
                                        <h5>join</h5>
                                        <h6>june 20, 2010</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="about-footer">
                            <ul>
                                <li className="fb">
                                    <a href="#">
                                        {/!*<svg>*!/}
                                        {/!*    <use xlink:href="../assets/svg/icons.svg#facebook"></use>*!/}
                                        {/!*</svg>*!/}
                                    </a>
                                </li>
                                <li className="tw">
                                    <a href="#">
                                        {/!*<svg>*!/}
                                        {/!*    <use xlink:href="../assets/svg/icons.svg#twitter"></use>*!/}
                                        {/!*</svg>*!/}
                                    </a>
                                </li>
                                <li className="wa">
                                    <a href="#">
                                        {/!*<svg>*!/}
                                        {/!*    <use xlink:href="../assets/svg/icons.svg#whatsapp"></use>*!/}
                                        {/!*</svg>*!/}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>*/

        <div className="content-center">
            <div className="about-profile section-b-space">
                <div className="card-title">
                    <h3>User Statistics</h3>
                </div>
                <ul className="about-list row">
                    <Item name={"Post Likes"} value={20032}/>
                    <Item name={"Answer Likes"} value={20032}/>
                    <Item name={"Level"} value={"HEmotional"}/>
                    <Item name={"EmoteIt Rank"} value={432}/>
                    <Item name={"Posts"} value={293}/>
                    <Item name={"Answers"} value={18}/>
                    <Item name={"Accuracy"} value={200}/>
                    <Item name={"Happy Friends"} value={16}/>
                    <Item name={"Avg Answer Time(s)"} value={200}/>
                    <Item name={"Latest Active"} value={"2020/02/2010 10:00 PM"}/>
                </ul>
            </div>
        </div>
    )
}


function Item(iProps){
    return (
        <div className="col-12">
            <li>
                <div className="col-6"><h5 className="title">{iProps.name}</h5></div>
                <div className="col-6"><h6 className="content">{iProps.value}</h6></div>
            </li>
        </div>
    )
}