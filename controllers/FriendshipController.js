import {UserSchema} from "../models/UserSchema.js";
import mongoose from "mongoose";
import {FriendshipSchema} from "../models/FriendshipSchema.js";
import {GetTokenUser} from "./UserController.js";

const FriendshipEngine = mongoose.model('Friendship', FriendshipSchema);

export function RequestFriendship(req,res){
    const _friendship = req.body;
    //need requesterId
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        _friendship.requesterUserId = user.uid;
        _friendship.statusId = 0;
        FriendshipEngine.findOne({requesterUserId:_friendship.requesterUserId, requesteeUserId:_friendship.requesteeUserId})
            .then((existingFriendship, err)=>{
                if(err)
                    res.status(500).send(err);
                else if(existingFriendship)
                    res.status(400).send("connection request exists!");
                else{
                    let newFriendship = new FriendshipEngine(_friendship);
                    newFriendship.save((err,addedFriendship)=>{
                        if(err){
                            console.log("Could not create user!:" + err)
                            res.send(err);
                        }
                        res.send(addedFriendship)
                    })
                }
            })

    })

}

export function RespondFriendship(req,res){
    const _friendship = req.body;
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        if(_friendship.requesterUserId != user.uid.toString() && _friendship.requesteeUserId != user.uid.toString())
            res.status(401).send("only respond to your requests! "+user.uid)
        else{
            FriendshipEngine.findByIdAndUpdate(_friendship._id,_friendship,{new:true}, (err, updated)=>{
                if(err){
                    res.send(err)
                }
                res.send(updated)
            })
        }


    })
}

export function UserFriendships(req,res){
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        else{
            FriendshipEngine.find({$or: [{requesterUserId: user.uid},{requesteeUserId: user.uid}]}, (err, updated)=>{
                if(err){
                    res.send(err)
                }
                res.send(updated)
            })
        }


    })
}

export function UserHappyFriendships(req,res){
    FriendshipEngine.find({$and:[{$or: [{requesterUserId: req.params.userId},{requesteeUserId: req.params.userId}]},{statusId:1},{typeId:1}]}, (err, updated)=>{
        if(err){
            res.send(err)
        }
        res.send(updated)
    })
}

export function CancelFriendshipRequest(req,res){
    const _friendship = req.body;
    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        else{
            FriendshipEngine.findOneAndRemove({$and: [{requesterUserId: user.uid},{_id:_friendship._id}]}, (err, deleted)=>{
                if(err){
                    res.send(err)
                }
                if(deleted)
                    res.send("deleted");
                else
                    res.status(204).send()
            })
        }


    })
}