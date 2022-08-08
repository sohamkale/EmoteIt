import React, {useContext, useEffect, useState} from 'react'
import UserCard from "../shared/components/UserCard";
import LeaderBoardCarousel from "./components/LeaderBoardCarousel";
import EmortionView from "../emortion/components/EmortionView";
import EmortionForm from "../emortion/components/EmortionForm";
import {AuthenticationContext} from "../../contexts/AuthenticationProvider";
import axios from "axios";


export default function Home(props) {
    const {user, accessToken} = useContext(AuthenticationContext);
    const [emortions, setEmortions] = useState();
    const [news, setNews] = useState();
    const [friendLeaders, setFriendLeaders] = useState();
    // const [profile, setProfile] = useState();

    useEffect(() => {
    /*    axios.get(`/api/profile/byId/${user?._id}`, {
            headers: {
                "access-token": accessToken
            }
        }).then((res) => {
            setProfile(res.data);
        });*/

        axios.get(`/api/user/news`, {headers: {'access-token': accessToken}}).then((res) => {
            setNews(res.data);
        })
       GetFeed();


    }, [])

    function GetFeed(){
        axios.get(`/api/user/feed?limit=5`, {headers: {'access-token': accessToken}}).then((res) => {
            setEmortions(res.data);
            console.log(res.data)
        })
    }

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
                <div className="col-12 col-md-4">
                    <EmortionForm/>
                </div>
                <div className="col-12 col-md-8">
                    {
                        (emortions === undefined || emortions === null)?<center><div className="text-center spinner-border"/></center>:
                        emortions?.map((item, index) =>
                                // <div className="col-12 col-md-8">
                                <EmortionView key={index} emortion={item} GetEmortion={GetFeed}/>
                            // </div>
                        )
                    }
                </div>
            </div>

        </>
    )
}