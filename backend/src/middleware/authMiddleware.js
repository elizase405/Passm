const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}

module.exports = authMiddleware;