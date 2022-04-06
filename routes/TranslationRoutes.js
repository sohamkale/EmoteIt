import{ UpdateTranslation, CreateTranslation, GetTranslation} from "../controllers/TranslationController.js";



export default function TranslationRoutes(server){
    server.route('/api/translation/:tableIdntfr')


        .post(CreateTranslation)
        .get(GetTranslation)
        .put(UpdateTranslation)
        // .get(GetNewTranslation)





    }

