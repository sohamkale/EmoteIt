import mongoose from "mongoose";
import {SecretEmortionSchema} from "../models/SecretEmortionSchema.js";
import {GetTokenUser} from "./UserController.js";
import {SecretEmortionResponseSchema} from "../models/SecretEmortionResponseSchema.js";

const SecretEmortionEngine = new mongoose.model('Secret-Emortion', SecretEmortionSchema);
const SecretEmortionResponseEngine = new mongoose.model('Secret-Emortion-Response', SecretEmortionResponseSchema);


export function CreateSecretEmortion(req, res){
    const _secretEmortion = req.body;
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        _secretEmortion.createdBY = user._id;
        const newSecretEmortion = new SecretEmortionEngine(_secretEmortion);
        newSecretEmortion.save((err,added)=>{
            if(err){
                console.log("Could not create!:" + err)
                res.send(err);
            }
            res.send(added)
        })
    })
}

export function GetLatestSecretEmortion(req,res){
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        else{
            SecretEmortionEngine.findOne({}, (er, result)=>{
                if(er){
                    res.send(er);
                    return;
                }
                else res.send(result);
            },{sort:{expiresAt:-1}}).where('expiresAt').gt(new Date())
        }

    })
}

export function ResponseSecretEmortion(req,res){
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        else{
            const _response = req.body;
            _response.submittedAt = new Date();
            _response.createdBy = user._id;
            if(_response.secretEmortionId == null)
                res.status(400).send("emortion Id not provided");
           //get the secret emortion
            SecretEmortionEngine.findById(_response.secretEmortionId,(errr,secretEmortion)=>{
                //check if already answered!
                if(secretEmortion.responseUIds.includes(user._id))
                    res.status(409).send("already answered emortion!");
                else{
                    //Check if the secret response match
                    if(secretEmortion == null)
                        res.status(400).send("secret emortion not found!")
                    let correctAnswer = true;
                    const respondedEmortions = _response.response;
                    secretEmortion.secretEmortion?.forEach((x,index)=>{
                        if(respondedEmortions[index] != x)
                            correctAnswer = false;
                    });
                    if(correctAnswer){
                        //Save Response to database
                        const newSecretResponse = new SecretEmortionResponseEngine(_response);
                        //check if already answered
                        newSecretResponse.save((errrr,added)=>{
                            if(errrr){
                                console.log("Could not create response!:" + err)
                                res.send(errrr);
                            }
                            else{
                                // res.send(added)
                                SecretEmortionEngine.findByIdAndUpdate(secretEmortion.id,{$push:{responseUIds:user._id}}, {new: true},
                                    (errrrr, updated) => {
                                        if (errrrr) {
                                            res.send(errrrr);
                                        } else {
                                            console.log("answer granted!");
                                            res.send(updated)
                                        }
                                    })
                            }
                        })
                    }
                    else
                        res.send("incorrect response!")
                }
            })

        }

    })
}