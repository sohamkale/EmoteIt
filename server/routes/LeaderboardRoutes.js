import {
    GetStats,
    GlobalLeaderboard,
    FriendshipLeaderboard
} from "../controllers/LeaderboardController.js";
export default function LeaderboardRoutes(server){
    server.route('/api/leaderboard/stats')
        .get(GetStats)
    server.route('/api/leaderboard/top10')
        .get(GlobalLeaderboard)
    server.route('/api/leaderboard/friends')
        .get(FriendshipLeaderboard)
}