import{CreateEmortion, GetEmortion, GetUserEmortions, StartInsight, SubmitEmortionInsight, GetInsightsOfEmortion, GetUserInsight} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {
    server.route('/emortion/emortion')
        .post(CreateEmortion);
    server.route('/emortion/emortion/:id')
        .get(GetEmortion);
    server.route('/user/emortionById/:id')
        .get(GetUserEmortions);
    server.route('/emortion/insight/:id')
        .post(StartInsight);
    server.route('/emortion/insight/:emortionId')
        .patch(SubmitEmortionInsight);
    server.route('/insight/emortion/:emortionId')
        .get(GetInsightsOfEmortion);
    server.route('/insight/user/:userId')
        .get(GetUserInsight);
}