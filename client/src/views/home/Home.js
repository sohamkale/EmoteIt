import React, {useContext} from 'react'
import UserCard from "../shared/components/UserCard";
import LeaderBoardCarousel from "./components/LeaderBoardCarousel";
import EmortionView from "../emortion/components/EmortionView";
import NewsCenter from "./components/NewsCenter";
import EmortionForm from "../emortion/components/EmortionForm";
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";


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
                <div className="col-12 col-md-4">
                    <UserCard user={user}/>
                </div>
                <div className="col-12 col-md-8">
                    <LeaderBoardCarousel/>
                </div>
            </div>

            <hr/>

            <div className="row">
                <div className="col">
                    <NewsCenter/>
                </div>
                <div className="col">
                    <EmortionForm/>
                </div>
            </div>
            <div className="row">
                    <EmortionView/>
            </div>
        </>
    )
}