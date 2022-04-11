import mongoose from "mongoose"
import {UserSchema} from "../models/UserSchema.js";
const UserEngine = mongoose.model('User', UserSchema)


export function TopThree (req,res){
    
}
