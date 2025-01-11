import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: "user"
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
      default:  "https://res.cloudinary.com/dghcj3f6d/image/upload/v1708699426/car-rental/magc7nk73agkcj41mnvw.jpg"
    },
    coverPicture: {
      type: String,
      required: false,
      default: "https://res.cloudinary.com/dghcj3f6d/image/upload/v1708699426/car-rental/pd6kuvk2cixrgbxs9103.jpg"
    },
    role: {
      type: String,
      default: "user"
    },
    organizationId: {
      type: String, // Define the type as String (or ObjectId if necessary)
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;