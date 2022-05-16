import React from 'react'

export default function TopLeaderBoardCard(props){
    return (
        <div className="weather-section" style={{backgroundImage: `linear-gradient(-37deg, grey 0%, ${props.color} 100%)`}}>
            <div className="card-title">
                <h3 className={'text-white'}>{props.name}</h3>
            </div>
            <div className="weather-content">
                <div className="top-title">
                    <h2>{props.score}</h2>
                    <h5>{props.avgTime} seconds</h5>
                </div>
                <h6><span>{props.accuracy}% Accurate {props.insights} Insights &nbsp;{props.emortions} Answers</span></h6>
                <hr/>
                <h3 className="text-white"></h3>
                <h6>Last Answered {props.lastAnswered}</h6>
            </div>
            <div className="flaks-img">
                <img src={require(`../../assets/images/leaderboard/${props.color}.png`).default}
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