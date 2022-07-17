import React from 'react'


export default function LeaderBoardCard(props) {
    {
        return (
              <div className="">
                  <div className="card leaderboard-card m-1">
                      <div className="card-title p-0 m-0 text-align-center text-bold bg-dark text-white rounded">
                          ASHIQUL ISLAM
                      </div>
                      <img className="card-img-top rounded" src={props.imageUrl} alt="Card image cap"/>
                      <div className="card-body m-0 p-1">
                          <div className="card-text text-align-center">Last Answered: 2w Something More</div>
                      </div>
                      <div className="bg-dark text-white rounded">
                          <div className="row text-align-center">
                              <div className="col border-right">
                                  <h5 className="m-0">1600</h5>
                                  <div className="small m-0">Score</div>
                              </div>
                              <div className="col border-right">
                                  <h5 className="m-0">25</h5>
                                  <div className="small m-0">Insights</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        )
    }
}