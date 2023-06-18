// Import required modules
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware for authenticating the token
exports.auth = (req, res, next) => {
    try {
        // Extract the JWT token
        
        // console.log("body token ", req.body.token);
        // const token = req.body.token;

        console.log("cookie token : ", req.cookies.token);
        const token = req.cookies.token;

        // console.log("header token : ", req.header("Authorization"));
        // const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // Verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong in verifying the token",
        });
    }
};

// Middleware for checking if the user is a student
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student role",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role is not matching",
        });
    }
};

// Middleware for checking if the user is an admin
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin role",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role is not matching",
        });
    }
};
