import User from "../model/user.model.js";

export const users = async (req, res, next) => {
  const { role, organizationId } = req.query; // Retrieve role and organizationId from query parameters

  try {
    let filter = {};

    // Log the incoming request query to check if role and organizationId are passed
    console.log("Query Parameters:", req.query);

    // If 'role' is provided in the query, add it to the filter
    if (role) {
      filter.role = role;
    }

    // If 'organizationId' is provided in the query, add it to the filter
    if (organizationId) {
      filter.organizationId = organizationId;
    }

    // Log the filter object to check if it's being built correctly
    console.log("Filter:", filter);

    // Find users based on the filter criteria
    const users = await User.find(filter);

    // Log the found users to ensure they match the filter
    // console.log('Found Users:', users);

    // Return the users if found
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};





export const getUserByID = async (req, res, next) => {
  const { id } = req.params; // Retrieve the user ID from the request parameters
  // coverPicture,username,cars
  // profilePicture
  try {
    const users = await User.findById(id).populate({
      path: "cars",
      populate: { path: "images" }, // Populate car images in rent
    });

    if (users) {
      res.json({
        profilePicture: users.profilePicture,
        coverPicture: users.coverPicture,
        username: users.username,
        cars: users.cars,
      });
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    next(error);
  }
};




// Show User Details Function
export const showUserDetail = async (req, res, next) => {
  const { id } = req.params; // Retrieve the user ID from the request parameters

  try {
    console.log(`Request received for user ID: ${id}`); // Log the user ID

    if (!id || id === "undefined") {
      return res.status(400).json({ error: "Invalid user ID" }); // Return error if no ID provided
    }

    // Find the user and populate cars, rent, and followedOrganizations
    let user = await User.findById(id)
      .populate({
        path: "cars",
        populate: { path: "images" }, // Populate car images
      })
      // .populate({
      //   path: "rent",
      //   populate: { path: "car", populate: { path: "images" } }, // Populate car images in rent
      // })
      .populate({
        path: "sell",
        populate: { path: "car", populate: { path: "images" } }, // Populate car images in rent
      })
      .populate("followedOrganizations"); // Populate the followedOrganizations field

    if (user) {
      return res.status(200).json(user); // Send user data as response
    } else {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" }); // Handle case where user is not found
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handling middleware
  }
};






export const deleteUser = async (req, res, next) => {
  const { id } = req.params;  // "id" corresponds to _id in the database

  try {
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Correct usage of findByIdAndDelete without the curly braces
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);  // Pass error to the error handler
  }
};





export const updateProfile = async (req, res, next) => {
  const { id } = req.params;  // Extract user ID from URL parameters
  const { email, username: newUsername } = req.body;  // Extract email and newUsername from the request body
  
  // Initialize the update data with the provided fields
  let updatedData = {};

  // If new username is provided, add it to the update data
  if (newUsername) {
    updatedData.username = newUsername;
  }
  
  // If new email is provided, add it to the update data
  if (email) {
    updatedData.email = email;
  }

  // Handle file uploads if provided
  let coverPicture;
  let profilePicture;
  if (req?.files?.coverPicture?.length > 0) {
    coverPicture = req.files.coverPicture[0].path;
    updatedData.coverPicture = coverPicture;
  }
  if (req?.files?.profilePicture?.length > 0) {
    profilePicture = req.files.profilePicture[0].path;
    updatedData.profilePicture = profilePicture;
  }

  try {
    // Validate the provided ID
    if (!id || id === "undefined") {
      return res.status(400).json({ error: "Invalid or missing user ID." });
    }

    // Find the user by _id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user with the new data
    await User.updateOne({ _id: id }, { $set: updatedData });

    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    return next(error);  // Pass the error to the error-handling middleware
  }
};








export const followOrganization = async (req, res, next) => {
  const { userId } = req.params; // Get userId from params
  const {
    organizationId,
    organizationName,
    organizationUsername,
    organizationProfilePicture,
  } = req.body; // Get the organization data from the request body

  try {
    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the organization is already followed
    if (user.followedOrganizations.includes(organizationId)) {
      return res
        .status(400)
        .json({ message: "Already following this organization" });
    }

    // Add the organization to the followedOrganizations array
    user.followedOrganizations.push(organizationId);

    // Optionally, add the organization details
    user.organizationDetails.push({
      name: organizationName,
      username: organizationUsername,
      profilePicture: organizationProfilePicture,
    });

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ message: "Organization followed successfully" });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware for error handling
  }
};





// Unfollow organization
export const unfollowOrganization = async (req, res) => {
  const { userId } = req.params;
  const { organizationId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the organization from the followed list
    const updatedFollowedOrganizations = user.followedOrganizations.filter(
      (org) => org.organizationId.toString() !== organizationId
    );

    user.followedOrganizations = updatedFollowedOrganizations;

    // Save the updated user document
    await user.save();
    res.status(200).json({ message: "Organization unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
