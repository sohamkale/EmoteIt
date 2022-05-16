import React from 'react'
export default function LeaderboardTable(props){
    return(
        <div className="content-center">
            <div className="leaderboard-table section-b-space">
                <div className="card-title">
                    <h3>{props.tableName}</h3>
                    <div className="settings">
                        <div className="setting-btn">
                            <a href="#" className="d-flex">
                                <i className="icon icon-theme stroke-width-3 iw-11 ih-11"
                                   data-feather="rotate-cw"/>
                            </a>
                        </div>
                        <div className="setting-btn ms-2 setting-dropdown">
                            <div className="btn-group custom-dropdown arrow-none dropdown-sm">
                                <a className="d-flex" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="false">
                                    <i className="icon-dark stroke-width-3 iw-12 ih-12" data-feather="sun"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right custom-dropdown">
                                    <ul>
                                        <li>
                                            <a href=""><i className="icon-font-light iw-16 ih-16"
                                                          data-feather="edit"/>change city</a>
                                        </li>
                                        <li>
                                            <a href=""><i className="icon-font-light iw-16 ih-16"
                                                          data-feather="settings"/>setting</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="table-sec">
                    <table className="table table-hover table-responsive-md">
                        <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Level</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Leaders rank={"1"} name={"Likhon"} level={"120"} score={"900,412"}/>
                        <Leaders rank={"2"} name={"Jeem"} level={"110"} score={"400,412"}/>
                        <Leaders rank={"3"} name={"Angkon"} level={"90"} score={"100,412"}/>
                        <Leaders rank={"3"} name={"Angkon"} level={"90"} score={"100,412"}/>
                        <Leaders rank={"3"} name={"Angkon"} level={"90"} score={"100,412"}/>
                        <Leaders rank={"3"} name={"Angkon"} level={"90"} score={"100,412"}/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Leaders(props){
    return(
        <tr>
            <td>{props.rank}</td>
            <td>{props.name}</td>
            <td>{props.level}</td>
            <td>{props.score}</td>
        </tr>
    )
}