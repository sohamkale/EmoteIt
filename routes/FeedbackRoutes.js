import {GetNewFeedbacks, GetFeedbacks, CreateFeedback, UpdateFeedback} from "../controllers/FeedbackController.js";


function CreateBalance(money,date){

}




export default function FeedbackRoutes (server){
    server.route('/feedback')
        .post(CreateFeedback)
        .get(GetNewFeedbacks)
        .put(UpdateFeedback)
    ;

    server.route('/feedback/completed')
        .get(GetFeedbacks);
}