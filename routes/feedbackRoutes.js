import {GetFeedbacks} from "../controllers/feedbackController.js";

export default function feedbackRoutes (server){
    server.route('/feedback')
        .get((req, res)=>{
            const data = GetFeedbacks(false);
            res.send(data);
        })
        .put((req,res)=>{
            console.log(`SERVER: a put request is received with body: ${req.body}!`);
            let recData = req.body;
            res.send(recData);
        })
    ;

    server.route('/feedback/completed')
        .get((req,res)=>{
            const data = GetFeedbacks(true);
            res.send(data);
        })
}