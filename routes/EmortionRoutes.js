import{CreateEmortion, GetEmortion, GetUserEmortions} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {
    server.route('/emortions/emortion')
        .post(CreateEmortion);
    server.route('/emortions/emortion/:id')
        .get(GetEmortion);
    server.route('/user/emortionsById/:id')
        .get(GetUserEmortions);
}