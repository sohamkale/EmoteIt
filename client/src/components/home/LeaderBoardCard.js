import React from 'react'


export default function LeaderBoardCard(props) {
    {
        return (
            <div className="col-sm-4 col-md-4 col-xl-2 col-6 leaderboard-card">

                <div className="row">
                    <div className="clash-card barbarian">
                        <div className="row">
                            <h3 className="clash-card__level">{props.name}</h3>
                        </div>
                        <div className="row">
                            <div className="clash-card__image clash-card__image--barbarian p-0"
                                 style={{border: "2px solid orange"}}>
                                <img src={props.imageUrl}
                                     alt="barbarian"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="p-0">Last Answered</div>
                            <div className="col-xl-12">2w</div>
                        </div>
                        <div className="clash-card__unit-stats clash-card__unit-stats--barbarian row">
                            <div className="col p-0 m-0">
                                <div className="one-third">
                                    <h3>1600</h3>
                                    <h6>Points</h6>
                                </div>
                            </div>


                            <div className="col p-0 m-0">
                                <div className="one-third no-border">
                                    <h3>20</h3>
                                    <h6>Insights</h6>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}