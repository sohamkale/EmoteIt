import {FriendshipEngine} from "../models/FriendshipSchema.js";
import {ObjectId} from "../config.js";
import {GetUserFromToken} from "./UserController.js";


export function RequestFriendship(req, res) {
    const _friendship = req.body;
    //need requesterId
    const token = req.get("access-token");
    GetUserFromToken(token).then((user) => {
        if (!user) {
            res.status(401).send({message: "user not retrieved!"});
            return;
        }
        _friendship.requesterUserId = user._id;
        _friendship.statusId = 0;
        FriendshipEngine.findOne({
            requesterUserId: _friendship.requesterUserId, requesteeUserId: _friendship.requesteeUserId
        })
            .then((existingFriendship) => {
                if (existingFriendship) res.status(400).send("connection request exists!"); else {
                    _friendship.requesteeUserId = new ObjectId(_friendship.requesteeUserId);
                    let newFriendship = new FriendshipEngine(_friendship);
                    newFriendship.save((err, addedFriendship) => {
                        if (err) {
                            console.log("Could not create user!:" + err)
                            res.send(err);
                        }
                        res.send(addedFriendship)
                    })
                }
            }).catch((err) => {
            console.log(`error adding emortion: ${err}`);
            res.status(500).send(err);
        })

    })

}

export function RespondFriendship(req, res) {
    // const _friendship = req.body;
    const accessToken = req.get("access-token");
    GetUserFromToken(accessToken)
        .then(async (user) => {
            if (!user) res.status(401).send("user not retrieved!")

            const _friendship = await FriendshipEngine.findById(req.body._id);
            _friendship.statusId = req.body.statusId;

            if (_friendship.requesteeUserId.toString() != user._id.toString()) {
                res.status(401).send("only respond to your requests! " + user._id);
                return;
            } else {
                FriendshipEngine.findByIdAndUpdate(_friendship._id, _friendship, {new: true}, (err, updated) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(updated)
                })
            }


        })
}

export function GetFriendships(req, res) {
    const token = req.get("access-token");
    GetUserFromToken(token).then((loggedInUser) => {
        if (!loggedInUser) {
            res.status(401).send('logged in user not retrieved');
            return;
        }
        FriendshipEngine.find({$or: [{requesterUserId: loggedInUser._id}, {requesteeUserId: loggedInUser._id}]})
            .populate(['requesterUserId', 'requesteeUserId'])
            .then((friends) => {
                res.send(friends);
            })

    })
}

export function HappyFriendships(req, res) {
    FriendshipEngine.find({$and: [{$or: [{requesterUserId: req.params.userId}, {requesteeUserId: req.params.userId}]}, {statusId: 1}, {typeId: 1}]})
        .populate(['requesterUserId', 'requesteeUserId'])
        .then((updated) => {
            res.send(updated)
        })
}


export function CancelFriendshipRequest(req, res) {
    const _friendship = req.body;
    const accessToken = req.get("access-token");
    GetUserFromToken(accessToken)
        .then((user) => {
            if (!user) {
                res.status(401).send("user not retrieved!");
                return;
            }
                FriendshipEngine.findOneAndRemove({$and: [{requesterUserId: user._id}, {_id: _friendship._id}]}, (err, deleted) => {
                    if (err) {
                        res.send(err)
                    }
                    if (deleted) res.send("deleted"); else res.status(204).send()
                })


        })
}