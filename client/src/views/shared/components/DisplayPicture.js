import React from 'react'

export const DisplayPicture = (props)=>{
    return (
        <img src={require("../../../assets/img/brand/profile/default-dp.png").default}
             className="display-picture d-inline-block"
             style={{borderLeft: "5px solid purple",
            borderBottom: "4px solid purple"
        }} alt="profile" width={props.width}/>
    )
}