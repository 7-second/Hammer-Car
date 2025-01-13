import User from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  const { username, password, email, phone, organizationId, role } = req.body; // Make sure to include `phone`

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists. Please choose a different one." });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already in use. Please use a different one." });
    }

    // Validate phone number for roles other than "user"
    // if (role !== "user") {
    //   const phoneRegex = /^\+251\d{9}$/; // Example for Ethiopian phone number format
    //   if (!phone || !phoneRegex.test(phone)) {
    //     return res.status(400).json({ message: "Invalid phone number format. Please use the correct format." });
    //   }
    // }

    // Conditional validation for organizationId
    if ((role === "organization" || role === "mechanic") && !organizationId) {
      return res.status(400).json({
        message: "Organization ID is required for roles 'organization' and 'mechanic'.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,// Only set phone for other roles
      organizationId: role === "user" ? undefined : organizationId, // Only set organizationId for roles that require it
    });

    // Save the user to the database
    await user.save();

    // Send the response with the created user (omit sensitive info)
    res.status(201).json({
      username: user.username,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId, // Only send organizationId if it's available
    });

  } catch (error) {
    console.error("Register Error:", error);
    next(error); // Pass error to the error handler
  }
};





export const login = async (req, res, next) => {
    const { username, password,  } = req.body

    try {
        const user = await User.findOne({ username: username.toLowerCase() })

        if (!user) {
            console.log("Wrong Credentials")

            return res.status(400).json("Wrong Credentials")
        }
        // check Password
        const comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) return res.status(409).json("Wrong credential")

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");

        const cookieOptions = {
            maxAge: 60 * 60 * 1000, // 1 hour 
            httpOnly: true,
        }
        res
            .cookie("access_token", token, cookieOptions)
            .status(200)
            .json(user)

    } catch (error) {
        console.log(error, "Login Err")
        next(error)
    }
}


export const logout = async (req, res, next) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: false
    }).status(200).json("User has been logged out.")
}