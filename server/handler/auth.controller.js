import User from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    const { username, password, email, organizationId } = req.body;
  
    try {
      if (!organizationId) {
        return res.status(400).json({ message: 'Organization ID is required' });
      }
  
      // Check if the organization exists in the database
      const organization = await Organization.findById(organizationId);
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      // Create a new user and associate the organizationId
      const user = new User({
        username,
        password,
        email,
        organizationId, // Store the organizationId in the user document
      });
  
      // Save the user to the database
      await user.save();
      res.status(201).json(user); // Respond with the created user
    } catch (error) {
      console.log(error, "Register Err");
      next(error); // Handle errors
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