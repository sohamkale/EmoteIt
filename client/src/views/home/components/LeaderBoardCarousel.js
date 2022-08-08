import React, {useContext, useEffect, useRef, useState} from 'react'
import LeaderBoardCard from "./LeaderBoardCard";
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider.js";
export default function LeaderBoardCarousel(props) {
    const [friendLeaders, setFriendLeaders] = useState();
    const {user, accessToken} = useContext(AuthenticationContext);
    useEffect(() => {
        axios.get(`/api/leaderboard/friends`, {headers: {'access-token': accessToken}}).then((res) => {
            setFriendLeaders(res.data);
            console.log(res.data);
        })
    }, [])

    let pos = { left:0, x: 0};
    let scrolling = false;



    return(
        <div className="leaderboard-carousel p-3 w-100">
            {friendLeaders?.map((item)=>
                    <LeaderBoardCard user={item}/>
                )}
        </div>

    )
}