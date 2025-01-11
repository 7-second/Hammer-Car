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
      default: "default-profile-pic-url"
    },
    coverPicture: {
      type: String,
      required: false,
      default: "default-cover-pic-url"
    },
    role: {
      type: String,
      default: "user"
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Organization collection
      required: true, // Ensure it's required
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;