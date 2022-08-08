import mongoose from "mongoose";
export const mongoConnectionString =
    'mongoConnectionString'
export var ObjectId = mongoose.Types.ObjectId;

export const firebaseConfig =  {
    apiKey: "{firebaseKey}",
    authDomain: "emoteit-96e60.firebaseapp.com",
    projectId: "emoteit-96e60",
    storageBucket: "emoteit-96e60.appspot.com",
    messagingSenderId: "{yourKey}",
    appId: "{yourKey}",
    measurementId: "{yourKey}"
};

export const firebasePrivateKey = {
    "type": "service_account",
    "project_id": "emoteit-96e60",
    "private_key_id": "{yourKey}",
    "private_key": "-----BEGIN PRIVATE KEY-----\n{yourKey}-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-1jqxy@emoteit-96e60.iam.gserviceaccount.com",
    "client_id": "{yourKey}",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1jqxy%40emoteit-96e60.iam.gserviceaccount.com"
}