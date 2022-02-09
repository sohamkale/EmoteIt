import {GetNotification, UpdateNotifications} from "../controllers/NotificationController.js";

export default function notificationRoutes(server){
    server.route('/notifications/:id')
        .put(UpdateNotifications)
    server.route('/notifications/:user')
        .post(GetNotification)
}