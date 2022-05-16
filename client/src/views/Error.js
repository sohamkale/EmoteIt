import React from 'react'
import {Link} from "react-router-dom";

export default function Error(props){
    return (
        <section className="error-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="error-img"  style={{height: "60vh"}}>
                            <img src={require("../assets/images/404/1.png").default} className="img-fluid first-img"
                                 alt=""/>
                                <img src={require("../assets/images/404/2_0_dullface.png").default} className="img-fluid second-img"
                                     alt="" style={{width:"30%"}}/>
                                    <img src={require("../assets/images/404/3.png").default} className="img-fluid third-img" alt=""/>
                        </div>
                        <div className="error-content">
                            <p>{props.msg}</p>
                            <p>Worthless Emotions</p>
                            <p>the page you requested could not be found</p>
                            <Link to={"/app/home"}>
                                <div className="btn btn-solid btn-lg">back to home</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}