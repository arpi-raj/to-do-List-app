require("dotenv").config();
const key = process.env.key;
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  //console.log(req.headers);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  const [bearer, token] = authorizationHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  try {
    const user = await jwt.verify(token, key);
    console.log("Decoded user:", user);

    if (user) {
      req.user = user; // making the sender the verified user
      console.log("Middleware checks passed, going next");
      return next();
    }

    res.status(401).json({ msg: "User not found" });
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Token expired" });
    } else {
      console.error("Token verification error:", e.message);
      console.log(token);
      res.status(401).json({ msg: "Token verification failed" });
    }
  }
}

module.exports = {
  userMiddleware,
};
