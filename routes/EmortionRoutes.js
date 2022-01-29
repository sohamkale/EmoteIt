import{CreateEmortion} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {
    server.route('/emortions/emortion')
        .post(CreateEmortion);
}