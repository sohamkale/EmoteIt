import {UserSchema} from "../models/UserSchema.js";
import mongoose from "mongoose";
import firebase from "firebase-admin"

export const UserEngine = mongoose.model('User', UserSchema);


export function CreateUser(req, res){
    let _user = req.body;
    console.log(_user)
    UserEngine.findOne({uid:_user.uid}, (err, user)=>{
        if(err)
            res.status(500).send(err);
        else if(user)
            res.status(400).send("user exists!");
        else{
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
    })
}

export function UpdateUser(req, res){
    let _user = req.body;
    UserEngine.findOneAndUpdate({uid:_user.uid},_user,{new:true},
        (err,user)=>{
            if(err)
                res.send(err);
            else res.send(user);
        });
}

export function GetAllUsers(req, res){
    UserEngine.find().limit(req.query.limit).then((users)=>{
        res.send(users);
    })
}

export function GetLoggedInUser(req, res){
    firebase.auth().verifyIdToken("access-token").then((usr)=>{
        console.log(usr);
        res.send(usr);
    });
}

export function GetTokenUser(accessToken){

}

export function GetUser(req, res){
    UserEngine.findById(req.params.id, (err, user)=>{
        if(err)
            res.send(err);
        res.send(user);
    })
}