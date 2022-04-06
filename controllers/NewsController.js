import mongoose from "mongoose";
import {NewsSchema} from "../models/NewsSchema.js";

const NewsEngine = mongoose.model('News', NewsSchema);

export function GetNews(req,res){
    NewsEngine.find({deprecated:false},(err,news)=>{
        res.send(news);
    })
}