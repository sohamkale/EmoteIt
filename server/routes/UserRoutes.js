import {CreateUser, GetAllUsers, GetLoggedInUser, UpdateUser} from "../controllers/UserController.js";

export default function UserRoutes(server){
    server.route('/api/user/authenticate')
        .post(CreateUser)
        .put(UpdateUser)
        .get(GetLoggedInUser);

    server.route('/api/user/index')
        .get(GetAllUsers);
}