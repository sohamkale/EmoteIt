import React from 'react'

export default function TopLeaderBoardCard(props){
    return (
        <div className="card text-white " style={{backgroundImage: `linear-gradient(-37deg, grey 0%, ${props.color} 100%)`}}>

            <div className="card-body m-2">
                <div className={"row"}>
                    <h4 className={'text-white'}>{props.name}</h4>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">
                        <h3 className="text-bold">{props.score}</h3>
                    </div>
                    <div className="col">
                        <span className="badge badge-light border-left ">{props.avgTime} seconds</span>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6><span>{props.accuracy}% Accurate {props.insights} Insights &nbsp;{props.emortions} Answers</span></h6>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h6>Last Answered {props.lastAnswered}</h6>
                </div>
            </div>
            <div className="flaks-img">
                <img src={require(`../../../assets/img/leaderboard/${props.color}.png`).default}
                     className="img-fluid blur-up lazyloaded" alt="snow" width={"80px"} style={{opacity: "60%"}}/>
            </div>
            <div className="snowflakes" aria-hidden="true">
                <div className="snowflake">
                    ❅
                </div>
                <div className="snowflake">
                    ❆
                </div>
                <div className="snowflake">
                    ❅
                </div>
                <div className="snowflake">
                    ❆
                </div>
                <div className="snowflake">
                    ❅
                </div>
                <div className="snowflake">
                    ❆
                </div>
                <div className="snowflake">
                    ❅
                </div>
                <div className="snowflake">
                    ❆
                </div>
                <div className="snowflake">
                    ❅
                </div>
                <div className="snowflake">
                    ❆
                </div>
                <div className="snowflake">
                    ❅
                </div>
                <div className="snowflake">
                    ❆
                </div>
            </div>
        </div>
    )
}