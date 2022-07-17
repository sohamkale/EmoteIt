import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthenticationContext} from "../../../contexts/AuthenticationProvider";

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
        <>
            <h2>News Center</h2>
            <div className="bg-light mb-2 p-3">
                <div className="row overflow-auto" style={{height:"400px"}}>
                    {news?.map((item)=>
                        <News news={item}/>
                    )}
                </div>
            </div>
     {/*       <div className=" d-xl-block mb-4">
            {/!*like page*!/}
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
        </div>*/}
        </>

    );
}

function News({news}){
    return (
        <div className="col-6 mb-2">
            <div className="card" style={{minHeight: "200px"}}>
                <img className="card-img-top" src={news.imageUrl??require("../../../assets/img/extra/news.jpg").default} alt="Card image cap"/>
                    <div className="card-body p-1">
                        <div className="card-title text-bold">{news.title}</div>
                        <div className="card-text text-truncate"m style={{height:"20px"}}>{news.text}</div>
                    </div>
                <a href="#" className="btn btn-sm btn-link">Go somewhere</a>
            </div>
        {/*    <div className="media">
                <div className="img-part" >
                    <img src={news.imageUrl}
                         className="img-fluid bg-img" style={{border:"1px solid "+news.color}} alt=""/>
                </div>
                <div className="media-body">
                    <h4></h4>
                    <h6></h6>
                    <div className={"text-muted"}>posted: {new Date(news.createdAt)?.toLocaleString()}</div>
                </div>
            </div>*/}
        </div>
    );
}