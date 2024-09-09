import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});
    res.cookie("jwt-viewzilla", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV !== "development"
    })
}