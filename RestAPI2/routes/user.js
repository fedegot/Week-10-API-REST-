const express = require(`express`);
const router = express.Router();
const User = require(`../models/userModel`);
const bcrypt = require(`bcrypt`);

const saltRounds = parseInt(process.env.SALT_ROUNDS);

//list of users
router.get(`/`, async (req, res) => {
  try {
    const listofuser = await User.find();
    res.status(201).json(listofuser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add user
router.post(`/`, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hp = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hp);
    const newuser2 = new User({ username: req.body.username, password: hp });
    const newUser = await newuser2.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete user
router.delete(`/:id`, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///MIDDLEWARE
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(400).json({ message: `cannot find the User` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
