import React, {useEffect} from 'react'
import './Authentication.scss'
import $ from 'jquery'
import FlyingEmojis from "../../components/authentication/FlyingEmojis";
import Signup from "../../components/authentication/Signup";
import Login from "../../components/authentication/Login";
import GoogleLogin from "../../components/authentication/GoogleLogin";


export default function Authentication(props){

    // useEffect(()=>{
    //     setTimeout(()=>{props.setLoading(false)},1000);
    //     $('#goRight').on('click', function(){
    //         $('#slideBox').animate({
    //             'marginLeft' : '0'
    //         });
    //         $('.topLayer').animate({
    //             'marginLeft' : '100%'
    //         });
    //     });
    //     $('#goLeft').on('click', function(){
    //         if (window.innerWidth > 769){
    //             $('#slideBox').animate({
    //                 'marginLeft' : '50%'
    //             });
    //         }
    //         else {
    //             $('#slideBox').animate({
    //                 'marginLeft' : '20%'
    //             });
    //         }
    //         $('.topLayer').animate({
    //             'marginLeft': '0'
    //         });
    //     });
    // },[])

    // useEffect(()=>{
    //     if(!props.appUser)
    //         props.setLoading(false);
    // },[props.appUser]);

    return (
        <>
            <GoogleLogin/>
            {/*<div id="back">
                <canvas id="canvas" className="canvas-back"></canvas>

                <div className="backRight">
                </div>
                <div className="backLeft">
                    <FlyingEmojis count={12}/>

                </div>
            </div>*/}

            {/*<div id="slideBox">*/}
            {/*    <div className="topLayer">*/}
            {/*        /!*<Signup/>*!/*/}
            {/*        /!*<LeaderBoardCard/>*!/*/}
            {/*        <Login/>*/}
            {/*        /!*<UserCard/>*!/*/}

            {/*    </div>*/}
            {/*</div>*/}
            {/*<UserCard/>*/}
        </>
    );
}