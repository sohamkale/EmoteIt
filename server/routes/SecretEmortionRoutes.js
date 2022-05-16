import {
    CreateSecretEmortion,
    GetLatestSecretEmortion,
    ResponseSecretEmortion
} from "../controllers/SecretEmortionController.js";

export default function SecretEmortionRoutes (server){
    server.route('/api/daily/secretEmortion')
        .get(GetLatestSecretEmortion)
        .post(CreateSecretEmortion)
        .patch(ResponseSecretEmortion);
}