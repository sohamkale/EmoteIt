import {GetNotifications, GetProfile, SearchProfiles, UpdateNotifications} from "../controllers/ProfileController.js";


//TODO:: FIX THIS NOTIFICATIONS HANDLED BY PROFILE!!!

export function ProfileRoutes(server){
    server.route('/api/profile/search')
        .get(SearchProfiles)
    server.route('/api/profile/byId/:id')
        .get(GetProfile)


        //notification routes
    server.route('/api/profile/notifications')
        .get(GetNotifications)
        .put(UpdateNotifications)

}