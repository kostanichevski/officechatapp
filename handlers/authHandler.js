const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please provide valid email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send("A user with this email does not exist in our database");
    }
    const isPasswordValid = bcrypt.compareSync(password, userPassword);
    if (!isPasswordValid) {
      return res.status(500).send("Email or password is invalid");
    }
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    console.log(token);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      secure: false,
      httpOnly: true,
    });
    res.status(200).json({
      status: "Success",
      token,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};
