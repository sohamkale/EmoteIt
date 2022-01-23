import{ UpdateTranslation, CreateTranslation, GetTranslation} from "../controllers/TranslationController.js";



export default function TranslationRoutes(server){
    server.route('/translation/:tableIdntfr')


        .post(CreateTranslation)
        .get(GetTranslation)
        // .get(GetNewTranslation)
        // .put(UpdateTranslation)


    // server.route('/translation/:tableIdntfr/?rid=:rid')
    //     .get(GetTranslation)


    }

