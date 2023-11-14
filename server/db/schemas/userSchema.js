import { Schema } from "mongoose";

export const UserSchema = new Schema({
  userEmail: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  userName: { type: String, required: true },
  userNickname: { type: String, required: true },
  userImg: { type: String, required: true },
  userDescription: { type: String, default: "" },
  likeSong: {
    type: [{ type: Schema.Types.ObjectId, ref: "Songs" }],
    default: [],
  },
  likePlayList: {
    type: [{ type: Schema.Types.ObjectId, ref: "PlayLists" }],
    default: [],
  },
  userSong: {
    type: [{ type: Schema.Types.ObjectId, ref: "Songs" }],
    default: [],
  },
  userPlayList: {
    type: [{ type: Schema.Types.ObjectId, ref: "PlayLists" }],
    default: [],
  },
  userPreference: { type: [String], default: [] },
});
