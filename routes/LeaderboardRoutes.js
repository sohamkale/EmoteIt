import {TopThree} from "../controllers/LeaderboardController.js";
export default function LeaderboardRoutes(server){
    server.route('/leaderboard/stats')
        .get(TopThree)
}