import {GetStats, TopThree} from "../controllers/LeaderboardController.js";
export default function LeaderboardRoutes(server){
    server.route('/api/leaderboard/stats')
        .get(GetStats)
    server.route('/api/leaderboard/top3')
        .get(TopThree)
}