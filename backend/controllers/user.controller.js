const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(401).send({ message: "All credentials are required!" });
    const existsUser = await userModel.findOne({ email });
    if (existsUser)
      return res.status(401).send({ message: "Email already exists!" });
    const user = await userModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    if (!user)
      return res.status(500).send({ message: "Internal server error..." });
    return res.status(201).send({
      message: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: createToken(user._id),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error..." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).send({ message: "All credentials are required!" });

    const userExists = await userModel.findOne({ email });
    if (!userExists || !(await bcrypt.compare(password, userExists.password)))
      return res.status(401).send({ message: "Email or password invalid!" });

    return res.status(200).send({
      message: {
        id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        token: createToken(userExists._id),
      },
    });
  } catch (error) {
    return res.status(500).send({ mesage: "Internal server error..." });
    console.log(error);
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, "process.env.JWT_SECRET", { expiresIn: "1d" });
};

module.exports = { signupUser, loginUser };
