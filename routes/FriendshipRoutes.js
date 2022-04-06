import {
    RequestFriendship,
    RespondFriendship,
    UserFriendships,
    UserHappyFriendships
} from "../controllers/FriendshipController.js";

export default function FriendshipRoutes (server){
    server.route('/api/friendship/request')
        .post(RequestFriendship)
        .put(RespondFriendship)
        .get(UserFriendships)

    server.route('/api/friendship/user/:userId')
        .get(UserHappyFriendships)
}