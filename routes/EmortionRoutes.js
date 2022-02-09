import{CreateEmortion, GetEmortion, GetUserEmortions, StartInsight} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {
    server.route('/emortions/emortion')
        .post(CreateEmortion);
    server.route('/emortions/emortion/:id')
        .get(GetEmortion);
    server.route('/user/emortionsById/:id')
        .get(GetUserEmortions);
    server.route('/emortions/insight/:id')
        .post(StartInsight);
}