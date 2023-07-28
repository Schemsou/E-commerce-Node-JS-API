const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(newUser);
  } catch {
    (err) => res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json({ message: "Wrong infos" });
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(400).json({ message: "Wrong infos" });

    const accesToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "30d",
      }
    );
    const { password, ...others } = user._doc;
    res.status(201).json({ ...others, accesToken });
  } catch {
    (err) => res.status(500).json(err);
  }
});
module.exports = router;
