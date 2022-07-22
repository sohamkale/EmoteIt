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
                        <News key={item._id} news={item}/>
                    )}
                </div>
            </div>
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
        </div>
    );
}