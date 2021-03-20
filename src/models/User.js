import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

userSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.statics.comparePassword = async (
  receivedPassword,
  databasePassword
) => {
  return await bcrypt.compare(receivedPassword, databasePassword);
};

export default model("User", userSchema);
