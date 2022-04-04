import{CreateUser, GetUser} from "../controllers/UserController.js";

export default function UserRoutes(server){
    server.route('/auth/signup')
        .post(CreateUser);
    server.route('/user/:id')
        .get(GetUser);
}