import {
    CreateEmortion,
    GetEmortion,
    GetUserEmortions,
    StartInsight,
    SubmitEmortionInsight,
    GetInsightsOfEmortion,
    GetUserInsight,
    ReactInsight,
    TakeHint,
    ReactEmortion,
    CheckEmortionVisibility,
    GetEmortionReacts,
    GetInsightReacts
} from "../controllers/EmortionController.js";

export default function EmortionRoutes (server) {

    server.route('/api/emortion/emortion')
        //create emortions
        .post(CreateEmortion);
    server.route('/api/emortion/emortion/:id')
        //get a specific emortion
        .get(GetEmortion);

    server.route('/api/emortion/visibility/:id')
        .get(CheckEmortionVisibility);

    server.route('/api/emortion/user/:id')
        // get a user's emortions
        .get(GetUserEmortions);

    server.route('api/emortion/reacts/:id')
        .get(GetEmortionReacts)

    server.route('/api/emortion/insight/:id')
        //start insight
        .post(StartInsight)
        //submit insight
        .patch(SubmitEmortionInsight)
        //get insights of an emortion
        .get(GetInsightsOfEmortion)
        //take hint for an insight
        .put(TakeHint)

    server.route('/api/insight/user/:userId')
        //get all insights of a user
        .get(GetUserInsight);

    server.route('/api/emortion/react/:id')
        .put(ReactEmortion)

    server.route('/api/insight/react/:id')
        .put(ReactInsight)

    server.route('/api/insight/react/:id')
        // get a user's emortions
        .get(GetInsightReacts);
}