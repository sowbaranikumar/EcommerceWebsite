import type { Request, Response, NextFunction } from "express";
import jwt, { type Secret } from "jsonwebtoken";

interface JwtPayload {
    id: number;
    email:string;
    role: "ADMIN" | "CUSTOMER";
}
declare module "express-serve-static-core"
{
    interface Request { user?: JwtPayload; }
}
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorize" });
        }
        console.log("Authorization Header:", req.headers.authorization);
        const token = authHeader.split(" ")[1];
        // const jwtSecret: Secret = process.env.JWT_SECRET as string;
        const jwtSecret: Secret = process.env.ACCESS_TOKEN_SECRET as string;
        const decoded=jwt.verify(token, jwtSecret) as JwtPayload;
        console.log("Decoded JWT:",decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Message: ",error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
export const authorize =
    (roles: Array<"ADMIN" | "CUSTOMER">) =>
        (req: Request, res: Response, next: NextFunction) => {
            console.log("User in authorize:", req.user);
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
};