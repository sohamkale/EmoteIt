import {
    CreateUser,
    GetAllUsers, GetFeed,
    GetLoggedInUser,
    GetNotifications, MarkAllNotificationSeen,
    MarkNotificationSeen
} from "../controllers/UserController.js";

export default function UserRoutes(server) {
    server.route('/api/user/authenticate')
        .post(CreateUser)
        .get(GetLoggedInUser);

    server.route('/api/user/index')
        .get(GetAllUsers);

    server.route('/api/user/notification')
        .get(GetNotifications)
        .put(MarkNotificationSeen)
        .patch(MarkAllNotificationSeen)

    server.route('/api/user/feed')
        .get(GetFeed)


}