import User from "../model/user.model.js";

export const users = async (req, res, next) => {
  const { role, organizationId } = req.query; // Retrieve role and organizationId from query parameters

  try {
    let filter = {};

    // If 'role' is provided in the query, add to filter
    if (role) {
      filter.role = role;
    }

    // If 'organizationId' is provided in the query, add to filter
    if (organizationId) {
      filter.organizationId = organizationId;
    }

    // Find users based on the filter criteria
    const users = await User.find(filter);

    // Return the users if found
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

export const showUserDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id === "undefined") {
      next("Invalid ID for show user details");
      return;
    } else {
      let user;

      user = await User.findById({ _id: id })?.populate({
        path: "cars",
        populate: { path: "images" },
      });

      if (user?.rent?.length > 0) {
        user = await User.findById({ _id: id })
          ?.populate({ path: "cars", populate: { path: "images" } })
          ?.populate({
            path: "rent",
            populate: { path: "car", populate: { path: "images" } },
          });
      }

      if (user) {
        res.status(200).json(user);
      }
    }
  } catch (error) {
    console.log(error, "Show user details errro");
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  const { id } = req.params; // "id" corresponds to _id in the database

  try {
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};






export const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const { email, username } = req.body;

  let coverPicture, profilePicture;

  if (req?.files?.coverPicture?.length > 0) {
    coverPicture = req?.files?.coverPicture[0]?.path;
  }
  if (req?.files?.profilePicture?.length > 0) {
    profilePicture = req?.files?.profilePicture[0]?.path;
  }

  try {
    if (id === "undefined") {
      next("Invalid ID for update profile");
    } else {
      await User.updateOne(
        { _id: id },
        {
          username,
          email,
          profilePicture,
          coverPicture,
        }
      );

      res.status(200).json("Profile Update Successfully");
    }
  } catch (error) {
    console.log(error, "User update error");
    next(error);
  }
};
