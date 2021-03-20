import { Schema, model } from "mongoose";

export const allRoles = ["user", "moderator", "admin"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
