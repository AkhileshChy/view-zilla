import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-viewzilla"];
        if (!token) {
            console.log("Prob1");
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided"});
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            console.log("Prob2");
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("Prob3");
            return res.status(404).json({ success: false, message: "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}