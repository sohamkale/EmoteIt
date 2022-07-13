import React, {useContext} from 'react'
import UserCard from "../../components/shared/UserCard";
import LeaderBoardCarousel from "../../components/home/LeaderBoardCarousel";
import EmortionView from "../../components/emortion/EmortionView";
import NewsCenter from "../../components/home/NewsCenter";
import EmortionCreate from "../../components/emortion/EmortionCreate";
import FeedbackModal from "../shared/FeedbackModal";
import {AuthenticationContext} from "../../components/contexts/AuthenticationProvider";


export default function Home(props) {
    const {user} = useContext(AuthenticationContext);
    //TODO:: Get news
    const news = [
        {
            title: "Emote It Arrival Date",
            subtitle: "Coming Soon!",
            imageUrl: require("../../assets/images/game/3.jpg").default,
            color: "green"
        }
    ];
    return (
        <>

            <div className="row">
                <div className="col-xl-4 col-sm-12">
                    <UserCard user={user}/>
                </div>
                <div className="col-xl-8 col-sm-12">
                    <LeaderBoardCarousel/>
                </div>
            </div>

            <hr/>

            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-4 d-xl-block">
                    <NewsCenter/>
                    <EmortionCreate/>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-8 col-sm-12 post-panel">
                    <EmortionView/>
                    <EmortionView/>
                    <EmortionView/>
                    <EmortionView/>
                    <EmortionView/>
                </div>

            </div>
        </>
    )
}