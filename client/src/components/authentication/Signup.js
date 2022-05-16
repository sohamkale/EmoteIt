import React from 'react'



export default function Signup(props){
    return (
        <div className="left">
            <div className="content h-50" style={{maxHeight:"80%",overflowY:"scroll"}}>
                <h2>Sign Up</h2>

                <div className="form-element form-stack">
                    <label htmlFor="fullName-signup" className="form-label">Full Name</label>
                    <input id="lastname-signup" type="text" name="fullName"/>
                </div>
                <div className="form-element form-stack">
                    <label htmlFor="email-signup" className="form-label">Email</label>
                    <input id="email-signup" type="text" name="email"/>
                </div>

                <div className="form-element form-stack">
                    <label htmlFor="password-signup" className="form-label">Password</label>
                    <input id="password-signup" type="password" name="password"/>
                </div>
                <div className="form-element form-stack">
                    <label htmlFor="confirmPassword-signup" className="form-label">Confirm Password</label>
                    <input id="confirmPassword-signup" type="password" name="confirmPassword"/>
                </div>
                <div className="form-element form-stack">
                    <label htmlFor="dateOfBirth-signup" className="form-label">Date of Birth</label>
                    <input id="dateOfBirth-signup" type="date" name="dateOfBirth"/>
                </div>

                <div className="form-element form-checkbox">
                    <input id="confirm-terms" type="checkbox" name="confirm" value="yes"
                           className="checkbox"/>
                    <label htmlFor="confirm-terms">I agree to the <a href="#">Terms of
                        Service</a> and <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-element form-submit">
                    <button id="signUp" className="signup" name="signup">Sign up</button>
                    <button id="goLeft" className="signup off">Log In</button>
                </div>

                {/*</form>*/}
            </div>
        </div>

/*        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-lg-5 d-none d-lg-block">
                    <div className="login-welcome">
                        <div>
                            <img src="../assets/images/login/charcter.png" className="img-fluid blur-up lazyload"
                                 alt="charcter"/>
                                <h1>Welcome to EmoteIt!</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
                    <div className="login-form">
                        <div>
                            <div className="login-title">
                                <h2>Register</h2>
                            </div>
                            <div className="login-discription">
                                <h4>Welcome to Emotelt, create your account below to start eomji war!</h4>
                            </div>
                            <div className="form-sec">
                                <div>
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Your First Name"/>
                                                <i className="input-icon iw-20 ih-20" data-feather="user"></i>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Last Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Your Last Name"/>
                                            <i className="input-icon iw-20 ih-20" data-feather="user"></i>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                   placeholder="Enter email"/>
                                                <i className="input-icon iw-20 ih-20" data-feather="mail"></i>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                   placeholder="Password"/>
                                                <i className="input-icon iw-20 ih-20" data-feather="eye"></i>
                                            {/!*<i class="input-icon iw-20 ih-20" data-feather="eye-off"></i>*!/}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputMatchPassword1">Confirm Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                   placeholder="Password"/>
                                            <i className="input-icon iw-20 ih-20" data-feather="eye"></i>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/
    );
}