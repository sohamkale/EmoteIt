import {
    UpdateTranslation,
    CreateTranslation,
    GetTranslation,
    GetAll,
    DeleteTranslation
} from "../controllers/TranslationController.js";



export default function TranslationRoutes(server){
    server.route('/api/translation/:tableIdntfr')
        .post(CreateTranslation)
        .get(GetTranslation)
        .put(UpdateTranslation)
        // .get(GetNewTranslation
    server.route('/api/translation')
        .delete(DeleteTranslation)
    server.route('/api/translations')
        .get(GetAll)
    }

