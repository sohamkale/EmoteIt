import React, {useEffect, useRef} from 'react'
import LeaderBoardCard from "../../components/home/LeaderBoardCard";
import "./LeaderBoardCarousel.scss"




export default function LeaderBoardCarousel(props) {

    let pos = { left:0, x: 0};
    let scrolling = false;

    const mouseDownHandler = function (e) {
        const ele = e.target;
        scrolling = true;
        // Change the cursor and prevent user from selecting the text
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
        pos = {
            // The current scroll
            left: ele.scrollLeft,
            // Get the current mouse position
            x: e.clientX,
        };

    };

    const mouseMoveHandler = function (e) {
        if(!scrolling)
            return;
        const ele = e.target;
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;

        // Scroll the element
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function (e) {
        const ele = e.target;
        scrolling = false;
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };

    return(
        <div className="leaderboard-carousel p-3"
             /*onMouseDown={mouseDownHandler} onmousedr={mouseMoveHandler} onMouseUp={mouseUpHandler}*/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
            <LeaderBoardCard imageUrl={require("../../assets/img/extra/bg-ej.png").default} name="Ashiq Islam"/>
        </div>
        /*// <div style={parent}>
            {/!*<HorizontalScroll>*!/}

        <div className="row">


           {/!*<div style={child}>*!/}



            <LeaderBoardCard/>
           </div>
            <div style={child}>
            <LeaderBoardCard/>
                </div>
            <div style={child}>
            <LeaderBoardCard/>
                </div>
            <LeaderBoardCard/>
            <LeaderBoardCard/>
            <LeaderBoardCard/>
            <LeaderBoardCard/>

            </div>

    </HorizontalScroll>
            </div>*/
    )
}