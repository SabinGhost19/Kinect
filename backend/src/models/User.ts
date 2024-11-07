import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  description?: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  refreshToken: string[];
  //in case are more than one
  date: Date;
}

const userScheam: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  socialLinks: [
    {
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  refreshToken: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model<IUser>("User", userScheam);

export default UserModel;
