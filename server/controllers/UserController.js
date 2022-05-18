import {UserSchema} from "../models/UserSchema.js";
import mongoose from "mongoose";

//firebase imports!
import admin from "firebase-admin"
import {initializeApp} from "firebase-admin/app";
import {firebasePrivateKey as serviceAccount} from "../config.js";
initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


export const UserEngine = mongoose.model('User', UserSchema);

export function CreateUser(req, res){
    let _user = req.body;
    UserEngine.findOne({uid:_user.uid}).then((user, err)=>{
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
    // idToken comes from the client app
    const idToken = req.get("access-token");
    GetTokenUser(idToken,(user, err)=>{
        if(err)
            res.status(500).send(err);
        else if (err == null && user == null)
            res.status(404).send("user not found!")
        else if(err == null)
            res.send(user);
    })

}

export function GetTokenUser(accessToken, outUser){
    admin.auth()
        .verifyIdToken(accessToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            if(uid){
                UserEngine.findOne({uid:uid}).then((user,err)=>{
                    if(user == null)
                        outUser(null,null);
                    else {
                        user["pictureUrl"] = decodedToken.picture;
                        outUser(user, null)
                    }
                }).catch((err)=>{
                    outUser(null,err);
                })
            }
        })
        .catch((err) => {
            // Handle error
            outUser(null,err);
        });
}
