import {
    CreateEmortion,
    GetEmortion,
    StartInsight,
    ReactInsight,
    // TakeHint,
    ReactEmortion, SubmitInsight, GetInsights, TakeHintForInsight,GetDailyEmortion
    // Feed
} from "../controllers/EmortionController.js";

export default function EmortionRoutes(server) {

    server.route('/api/emortion/emortion')
        //create emortions
        .post(CreateEmortion);
    server.route('/api/emortion/emortion/:id')
        //get a specific emortion
        .get(GetEmortion)
        //react emortion
        .put(ReactEmortion);
    server.route('/api/emortion/daily')
        .get(GetDailyEmortion)


    server.route('/api/emortion/insight/:id')
        //start insight
        .post(StartInsight)
        //submit insight
        .patch(SubmitInsight)
        //get insights of an emortion
        .get(GetInsights)
        .put(ReactInsight)

    server.route('/api/insight/hint/:id')
        //take hint for an insight
        .get(TakeHintForInsight)

}