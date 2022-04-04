import {UserSchema} from "../models/UserSchema.js";
import mongoose from "mongoose";
export const UserEngine = mongoose.model('User', UserSchema);

export function CreateUser(req, res){
    let _user = req.body;
    let newUser = new UserEngine(_user);
    newUser.save((err,addedUser)=>{
        if(err){
            console.log("Could not create user!:" + err)
            res.send(err);
        }
        console.log("User created");
        res.send(addedUser)
    })
}

export function GetUser(req, res){
    UserEngine.findById(req.params.id, (err, user)=>{
        if(err)
            res.send(err);
        res.send(user);
    })
}