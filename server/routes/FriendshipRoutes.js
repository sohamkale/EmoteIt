import {
    CancelFriendshipRequest, GetFriendships,
    RequestFriendship,
    RespondFriendship,
    HappyFriendships
} from "../controllers/FriendshipController.js";

export default function FriendshipRoutes (server){
    server.route('/api/friendship/request')
        .post(RequestFriendship)
        .put(RespondFriendship)
        //get a user's friendships
        .get(GetFriendships)
        .delete(CancelFriendshipRequest)

    server.route('/api/friendship/user/:userId')
        .get(HappyFriendships)
}