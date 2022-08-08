import {
    GetProfile,
    GetUserEmortions, GetUserInsights, BestEmortion,
    SearchProfiles,
} from "../controllers/ProfileController.js";


export function ProfileRoutes(server) {
    //profile search
    server.route('/api/profile/search')
        .get(SearchProfiles)
    server.route('/api/profile/byId/:id')
        .get(GetProfile)


    //    emortions
    server.route('/api/profile/emortions/:id')
        // get a user's emortions
        .get(GetUserEmortions)

    server.route('/api/profile/emortion/:id')
        // get a user's emortion that has been answered most
        .get(BestEmortion)

//    insights
    server.route('/api/profile/insights/:id')
        //get all insights of a user
        .get(GetUserInsights);

}