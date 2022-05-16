import React from 'react'
import UserCollection from "../../components/friendship/UserCollection";
export default function Friends(props){
    return(
        <>
       <UserCollection friendBox={true}/>
       <UserCollection relationBox={true}/>
       <UserCollection allUserBox={true}/>
        </>
    )
}