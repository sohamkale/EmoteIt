import React, {useContext, useEffect} from 'react'
import {LayoutContext} from "./MainLayout";

export default function Error(props) {
    const {setPageTitle} = useContext(LayoutContext);
    useEffect(()=>{setPageTitle("Worthless Emotions")})
    return (
        <>
            <div className="row">
                <div className="error-content">
                    <p>{props.msg}</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="error-img" style={{height: "60vh"}}>
                        <img src={require("../../assets/img/404/1.png").default} className="img-fluid first-img"
                             alt=""/>
                    </div>
                </div>
                <div className="col">
                    <div className="error-img" style={{height: "60vh"}}>
                        <img src={require("../../assets/img/404/2_0_dullface.png").default}
                             className="img-fluid second-img"
                             alt=""/>
                    </div>
                </div>
                <div className="col">
                    <div className="error-img" style={{height: "60vh"}}>
                        <img src={require("../../assets/img/404/3.png").default} className="img-fluid third-img"
                             alt=""/>
                    </div>
                </div>
            </div>
            <div className="row">
                <h3>The page you requested could not be found</h3>
            </div>
        </>
    );
}