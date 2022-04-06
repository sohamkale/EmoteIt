import {GetNewFeedbacks, GetFeedbacks, CreateFeedback, UpdateFeedback} from "../controllers/FeedbackController.js";


function CreateBalance(money, date) {

}

export default function FeedbackRoutes(server) {
    server.route('/api/feedback')
        .post(CreateFeedback)
        .get(GetNewFeedbacks)
        .put(UpdateFeedback)


    server.route('/api/feedback/completed')
        .get(GetFeedbacks);
}