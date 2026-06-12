const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;

    // 1. skontroluj header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. ak neexistuje token
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    // 3. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. uloz userId do requestu
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token is not valid",
    });
  }
};

module.exports = protect;