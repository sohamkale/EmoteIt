import {CreateUser, GetAllUsers, GetUser, UpdateUser} from "../controllers/UserController.js";

export default function UserRoutes(server){
    server.route('/api/user/authenticate')
        .post(CreateUser)
        .put(UpdateUser)
        .get(GetUser);

    server.route('/api/user/index')
        .get(GetAllUsers);
}