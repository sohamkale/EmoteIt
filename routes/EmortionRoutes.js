import{CreateEmortion, GetEmortion, GetUserEmortions, StartInsight, SubmitEmortionInsight, GetInsightsOfEmortion, GetUserInsight, ReactInsight, TakeHint, ReactEmortion} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {
    server.route('/emortion/emortion')
        .post(CreateEmortion);
    server.route('/emortion/emortion/:id')
        .get(GetEmortion);
    server.route('/user/emortionById/:id')
        .get(GetUserEmortions);
    server.route('/insight/emortion/:id')
        .post(StartInsight);
    server.route('/emortion/insight/:emortionId')
        .patch(SubmitEmortionInsight);
    server.route('/insight/emortion/:emortionId')
        .get(GetInsightsOfEmortion);
    server.route('/insight/user/:userId')
        .get(GetUserInsight);
    server.route('/react/insight/:id')
        .put(ReactInsight)
    server.route('/react/emortion/:id')
        .put(ReactEmortion)
    server.route('/emortion/insight/:id')
        .put(TakeHint)
}