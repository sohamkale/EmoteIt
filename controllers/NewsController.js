import mongoose from "mongoose";
import {NewsSchema} from "../models/NewsSchema.js";

const NewsEngine = mongoose.model('News', NewsSchema);

export function GetNews(req,res){
    NewsEngine.find({deprecated:false},(err,news)=>{
        res.send(news);
    })
}

export function CreateNews(req,res){
    const _news = req.body;
    const newNews = new NewsEngine(_news);
    newNews.save((err,addedNews)=>{
        if(err){
            console.log("Could not create news!:" + err)
            res.status(500).send("could not create news");
        }
        else
        res.send(addedNews)
    })
}