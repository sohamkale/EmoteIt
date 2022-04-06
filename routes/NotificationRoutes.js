import {GetNotification, UpdateNotifications} from "../controllers/NotificationController.js";
import {GetNews} from "../controllers/NewsController.js";

//TODO:: FIX THIS NOTIFICATIONS HANDLED BY PROFILE!!!

export default function notificationRoutes(server){
    server.route('/api/notifications/:id')
        .put(UpdateNotifications)
    server.route('/api/notifications/:user')
        .post(GetNotification)

    server.route('/api/news')
        .get(GetNews)
}