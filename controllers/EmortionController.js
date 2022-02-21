import {EmortionSchema} from "../models/EmortionSchema.js";
import {InsightSchema} from "../models/InsightSchema.js";
import mongoose from "mongoose";
const EmortionEngine = mongoose.model('Emortion', EmortionSchema);
const InsightEngine = mongoose.model('Insight', InsightSchema);
const LoggedInUserUID = "1BE2WmbnyGWETpIuunJ4USPCvLz2";

export function CreateEmortion(req, res){
    let _emortion = req.body;
    let newEmortion = new EmortionEngine(_emortion);
    newEmortion.save((err, addedEmortion)=>{
        if(err){
            console.log("Could not save to mongo!: "+err)
            res.send(err);
        }
        else{
            res.send(addedEmortion);
            console.log("Emortion saved to mongo!");
        }
    })
}

export function GetEmortion(req,res){
    EmortionEngine.findById({_id: req.params.id},
        (err,emortion)=>{
        if(err)
            res.send(err)
        res.send(emortion);
    })
}

export function GetUserEmortions(req, res){
    EmortionEngine.find({createdBy: req.params.id},
        (err,emortion)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            console.log("Emortions found!")
               res.send(emortion)
        }
    })
}

export function StartInsight(req, res){
    let exists = false;
    const InsightArray = [];
    EmortionEngine.findById({_id: req.params.id},
        (err, emortion)=> {
            if (err) {
                res.send(err);
            }
            else{
                for(var i = 0; i<emortion.insightUIDs.length;i++){
                    InsightArray.push(emortion.insightUIDs[i]);
                }
            }
            if(InsightArray.includes(LoggedInUserUID)){
                exists = true;
            }
            if(exists === true){
                // run insight engine return insight
                InsightEngine.find({emortionId: emortion._id, createdBy: LoggedInUserUID},
                    (err,insight)=>{
                    if(err){
                        res.send(err);
                    }
                    else{
                        console.log("Insight Already Answered!")
                        res.send(insight);
                    }
                })
            }
            else{
                // run insight engine create insight
                const sendInsight = {
                    createdBy: LoggedInUserUID,
                    secret: emortion.secret,
                    accuracy: 0,
                    score: 0,
                    response: "",
                    emortionId: emortion._id,
                }
                let newInsight = new InsightEngine(sendInsight)
                newInsight.save((err,addedInsight)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        EmortionEngine.findOneAndUpdate(emortion._id,{$push:{insightUIDs:LoggedInUserUID}},{new:true},
                            (err,updatedEmortion)=>{
                                if(err){
                                    res.send(err);
                                }
                                else{
                                    console.log("Emortion has been updated with Insight ID!")
                                }
                            }
                        )
                        console.log("Insight has been started!")
                        res.send(addedInsight)
                    }
                })
            }
        })
}
export function SubmitEmortionInsight(req,res){
    let matchCounter = 0;
    let answerNumber;
    let response = req.body.response.split(" ")
    let secret = req.body.secret.split(" ")
    for(let i =0; i<response.length;i++){
        if(response[i] === secret[i]){
            matchCounter++;
        }
    }
    // Get answer number
        EmortionEngine.findById(req.params.emortionId,(err, emortion)=>{
        answerNumber = emortion?.insightUIDs?.length;
        console.log(answerNumber);
    } )
}