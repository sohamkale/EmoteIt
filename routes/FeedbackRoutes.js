import {GetNewFeedbacks, GetFeedbacks, CreateFeedback, UpdateFeedback} from "../controllers/FeedbackController.js";
import {CreateNews, GetNews} from "../controllers/NewsController.js";


function CreateBalance(money, date) {

}

export default function FeedbackRoutes(server) {
    server.route('/api/feedback')
        .post(CreateFeedback)
        .get(GetNewFeedbacks)
        .put(UpdateFeedback)


    server.route('/api/feedback/completed')
        .get(GetFeedbacks);

    server.route('/api/news')
        .get(GetNews)
        .post(CreateNews);
}