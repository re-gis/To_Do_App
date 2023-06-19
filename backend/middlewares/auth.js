const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "process.env.JWT_SECRET");

      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error..." });
    }
  } else {
    return res.status(403).send({ message: "Not authorised!" });
  }

  if (!token) {
    res.status(403).send({ message: "Not authorised!" });
  }
};

module.exports = { protect };
