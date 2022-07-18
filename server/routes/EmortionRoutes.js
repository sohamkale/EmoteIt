import{CreateEmortion, GetEmortion, GetUserEmortions, StartInsight, SubmitEmortionInsight, GetInsightsOfEmortion, GetUserInsight, ReactInsight, TakeHint, ReactEmortion} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {

    server.route('/emortions/emortion')
        //create emortions
        .post(CreateEmortion);
    server.route('/emortions/emortion/:id')
        //get a specific emortion
        .get(GetEmortion);

    server.route('/user/emortionById/:id')
        // get a user's emortion
        .get(GetUserEmortions);
    server.route('/insight/emortion/:emortionId')
        //start answering an emortion
        .post(StartInsight)
        //complete answering emortion
        .patch(SubmitEmortionInsight)
        .get(GetInsightsOfEmortion)
    server.route('/insight/user/:userId')
        .get(GetUserInsight);
    server.route('/react/insight/:id')
        .put(ReactInsight)
    server.route('/react/emortion/:id')
        .put(ReactEmortion)
    server.route('/emortion/insight/:id')
        .put(TakeHint)
}