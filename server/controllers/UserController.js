//firebase imports!
import admin from "firebase-admin"
import {initializeApp} from "firebase-admin/app";
import {firebasePrivateKey as serviceAccount, ObjectId} from "../config.js";
import {UserEngine} from "../models/UserSchema.js";
import {NotificationEngine} from "../models/NotificationSchema.js";
import {EmortionEngine} from "../models/EmortionSchema.js";
import {IsEmortionRevealed} from "./EmortionController.js";

initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


export function CreateUser(req, res) {
    let _user = req.body;
    var _birthday = new Date(_user.DOB);
    var _age = new Date(new Date() - _birthday);
    _age = Math.abs(_age.getUTCFullYear() - 1970); //epoch year is from 1970!

    if (_age < 18) {
        res.status(400).send({message: `must be atleast 18 years old. Provided age: ${_age}`});
        return;
    }

    const accessToken = req.get("access-token");

    admin.auth()
        .verifyIdToken(accessToken)
        .then((googleUser) => {
            const uid = googleUser.uid;
            if (uid) {
                UserEngine.findOne({uid: uid}).then((user) => {
                    if (user == null) {
                        //groom user from google user
                        _user.email = googleUser.email;
                        _user.typeId = 2;
                        _user.uid = googleUser.uid;
                        _user.pictureUrl = googleUser.picture;

                        let newUser = new UserEngine(_user);
                        newUser.save((err, addedUser) => {
                            if (err) {
                                console.log("Could not create user!:" + err)
                                res.error(err);
                            }
                            console.log("User created");
                            res.send(addedUser)
                        })
                    } else {
                        res.status(400).send("user exists!");
                    }
                }).catch((err) => {
                    res.error(err)
                })
            }
        })
        .catch((err) => {
            // Handle error
            res.error(err);
        });
}

export function GetAllUsers(req, res) {
    UserEngine.find().limit(req.query.limit).then((users) => {
        res.send(users);
    })
}

export function GetLoggedInUser(req, res) {
    // idToken comes from the client app
    const token = req.get("access-token");
    GetUserFromToken(token).then((loggedInUser) => {
        if (!loggedInUser) {
            res.status(204).send('logged in user not retrieved');
            return;
        }
        res.send(loggedInUser);
    })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        );
}

export async function GetUserFromToken(accessToken) {

    let _user = null;
    try {
        // console.log(`token request for: ${accessToken}`)
        let _googleUser = await admin.auth()
            .verifyIdToken(accessToken);

        const _uid = _googleUser.uid;
        if (_uid) {
            _user = await UserEngine.findOne({uid: _uid});
            if (_user) {
                  _user.pictureUrl = _googleUser.picture;
                  // outUser(user, null);
                  UserEngine.findByIdAndUpdate(_user._id, _user, {new: true});
                return _user;
            }
        }//
    } catch (e) {
        console.log(e)
        return null;
    }


}

//Notifications for a user
export function GetNotifications(req, res) {

    const token = req.get("access-token");
    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }

            NotificationEngine.find({owner: loggedInUser._id}).sort([['seen','ascending'], ['createdAt','descending']])
                .then((notifications) => {
                    let pushed = 0;
                    if(!notifications)
                    {
                        res.send([]);
                        return;
                    }
                    let notificationList = [];
                    for (let i = 0; i < notifications.length; i++) {
                        if(!notifications[i].seen)
                        {
                            notificationList.push(notifications[i]);
                            pushed++;
                        }
                        else if (pushed>=req.query.limit){
                            res.send(notificationList);
                            return;
                        }
                        else {
                            notificationList.push(notifications[i]);
                            pushed++;
                        }


                    }
                    res.send(notificationList);
                })

        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        );

}

export function CreateNotification(msg, ownerUserId, subject) {
    let notificationObject = {
        message: msg,
        owner: ownerUserId,
        link: `/app/${subject}`
    }

    let newNotification = new NotificationEngine(notificationObject);
    newNotification.save({new: true})
        .then((addNotification) => {
            return addNotification;
        })
        .catch((err) => {
                console.log(`error adding emortion: ${err}`);
                return err;
            }
        )
}

export function MarkNotificationSeen(req, res) {
    NotificationEngine.findByIdAndUpdate(req.body._id, {seen: true}, {new: true},
        (err, updatedNotification) => {
            if (err)
                res.send(err);
            res.send(updatedNotification);
        })
}

export function MarkAllNotificationSeen(req, res) {
    const token = req.get('access-token');
    GetUserFromToken(token)
        .then((loggedInUser) => {
            NotificationEngine.updateMany({owner: loggedInUser._id}, {seen: true}, {new: true},
                (err, updatedNotification) => {
                    if (err)
                        res.send(err);
                    res.send(updatedNotification);
                })
        }).catch((err) => {
            console.log(`token user error: ${err}`);
            res.status(500).send(err);
        }
    );


}

//USER's FEED
export function GetFeed(req, res) {
    const token = req.get('access-token');
    GetUserFromToken(token)
        .then(async (loggedInUser) => {
/*            FriendshipEngine.find({$and: [{$or: [{requesterUserId: loggedInUser._id}, {requesteeUserId: loggedInUser._id}]}, {statusId: 1}, {typeId: 1}]})
                .then(async (friendships) => {
                    let friendEmortions = []
                    for (let i = 0; i < friendships.length; i++) {
                        let friend;
                        if (friendships[i].requesteeUserId.toString() === loggedInUser?._id.toString())
                            friend = friendships[i].requesterUserId;
                        else if (friendships[i].requesterUserId.toString() === loggedInUser?._id.toString())
                            friend = friendships[i].requesteeUserId;*/

                        //Sort createdAt:-1, limit: req.query.limit, for items get profile,
                        let finalEmortions = [];
                        const all_emortions = await EmortionEngine.find({createdBy: {$ne: new ObjectId("62ef72a49ce46d98e5cf3602")}})
                            .populate(['createdBy', 'reactionIds']).sort({createdAt: -1}).limit(req.query.limit).exec();
                        for (let j = 0; j < all_emortions.length; j++) {
                            const isRevealed = await IsEmortionRevealed(all_emortions[j]._id, loggedInUser?._id);
                            if (!isRevealed) {
                                all_emortions[j].secret = null;
                            }
                            finalEmortions.push(all_emortions[j]);
                        }
                        res.send(finalEmortions);

                        /*//my emortions
                        const my_emortions = await EmortionEngine.find({createdBy: loggedInUser._id})
                            .populate(['createdBy', 'reactionIds']).sort({createdAt: -1}).limit(req.query.limit).exec();
                        for (let j = 0; j < my_emortions.length; j++) {
                            const isRevealed = await IsEmortionRevealed(my_emortions[j]._id, loggedInUser?._id);
                            if (!isRevealed) {
                                my_emortions[j].secret = null;
                            }
                            friendEmortions.push(my_emortions[j]);
                        }
                    }
                    friendEmortions = friendEmortions.sort((x,y)=>y.createdAt-x.createdAt)
                    res.send(friendEmortions);
                })*/
        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        );

}
