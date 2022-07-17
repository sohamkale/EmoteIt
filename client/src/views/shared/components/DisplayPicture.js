import React from 'react'

export const DisplayPicture = (props)=>{
    return (
        <img src={props.user?.pictureUrl??require("../../../assets/img/brand/profile/default-dp.png").default}
             className="display-picture d-inline-block m-auto"
             style={{borderLeft: "5px solid purple",
            borderBottom: "4px solid purple"
        }} alt="profile" width={props.width}/>
    )
}