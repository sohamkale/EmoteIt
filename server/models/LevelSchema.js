import mongoose from "mongoose";
import {ObjectId} from "../config.js";
import {UserTableName} from "./UserSchema.js";

const Schema = mongoose.Schema;
const LevelTableName = "Level";

export const LevelScehema = new Schema(
    {
        createdBy: {type: ObjectId, ref: UserTableName},
        minScore: {type: Number, required: true},
        levelIndex: {type: Number, required: true},
        Color: {type: String, required: true},
        name: {type: String, required: true}
    }, {id: true, timestamps: true}
);

export const LevelEngine = mongoose.model(LevelTableName, LevelScehema);