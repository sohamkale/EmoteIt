import React from 'react';

export default function NewsCenter(props){
    return (
        <div className="sticky-top d-xl-block mb-4">
            {/*like page*/}
            <div className="page-list section-t-space">
                <div className="card-title">
                    <h3>New Center</h3>
                    <h5>{props.news?.count} headlines</h5>
                </div>
                <div className="list-content">
                    <ul>
                        {
                            props.news?.map((item)=>
                                <News news={item}/>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

function News({news}){
    return (
        <li>
            <div className="media">
                <div className="img-part" >
                    <img src={news.imageUrl}
                         className="img-fluid bg-img" style={{border:"1px solid "+news.color}} alt=""/>
                </div>
                <div className="media-body">
                    <h4>{news.title}</h4>
                    <h6>{news.subtitle}</h6>
                </div>
            </div>
        </li>
    );
}