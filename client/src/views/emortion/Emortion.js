import React from 'react'
import EmortionView from "../../components/emortion/EmortionView";

export default function Emortion(props){
    return(
        <div>
            <div className="col-xl-7 col-lg-3 col-md-8 col-sm-12 post-panel">
                <EmortionView expanded={true}/>
            </div>
        </div>
    )
}