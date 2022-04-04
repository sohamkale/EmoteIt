import {CreateUser, GetAllUsers, GetLoggedInUser, UpdateUser} from "../controllers/UserController.js";

export default function UserRoutes(server){
    server.route('/api/user/authenticate')
        .post(CreateUser);
    server.route('/api/user/authenticate')
        .put(UpdateUser);
    server.route('/api/user/authenticate')
        .get(GetLoggedInUser);
    server.route('/api/user/index')
        .get(GetAllUsers);
}