import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthenticationContext} from "../contexts/AuthenticationProvider";

export default function NewsCenter(props){
    const {user,accessToken} = useContext(AuthenticationContext);
const [news, setNews] = useState([]);

    useEffect(()=>{
        if(user){
            axios.get('/api/news').then((res)=>{
                setNews(res.data);
            }).catch((err)=>{
                console.log(err.message)})
        }

    },[user])

    return (
        <div className=" d-xl-block mb-4">
            {/*like page*/}
            <div className="page-list section-t-space">
                <div className="card-title">
                    <h3>News Center</h3>
                    <h5>{news?.count} headlines</h5>
                </div>
                <div className="list-content">
                    <ul>
                        {
                            news?.map((item)=>
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
                    <h6>{news.text}</h6>
                    <div className={"text-muted"}>posted: {new Date(news.createdAt)?.toLocaleString()}</div>
                </div>
            </div>
        </li>
    );
}