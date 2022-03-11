import{CreateEmortion, GetEmortion, GetUserEmortions, StartInsight, SubmitEmortionInsight, GetInsightsOfEmortion} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {
    server.route('/emortions/emortion')
        .post(CreateEmortion);
    server.route('/emortions/emortion/:id')
        .get(GetEmortion);
    server.route('/user/emortionsById/:id')
        .get(GetUserEmortions);
    server.route('/emortions/insight/:id')
        .post(StartInsight);
    server.route('/emortions/insight/:emortionId')
        .patch(SubmitEmortionInsight);
    server.route('/emortions/insight/:emortionId')
        .get(GetInsightsOfEmortion);
}