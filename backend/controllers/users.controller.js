require('dotenv').config()

const config = require("../configs/auth.config");
const users = require('../models/users.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = (req, res) => {

  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Find user
  const user = new users({
    name: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  console.log(user);
  user.save().then((savedUser) => {
    console.log(savedUser);
    res.json({ savedUser });
  });

};

exports.login = async (req, res) => {

  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await users.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token - require('crypto').randomBytes(64).toString('Hex')
      const token = jwt.sign({ user }, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.jwtExpiration
      });

      user.token = token;
      res.status(200).json({ 'token': token });
    } else {

      res.send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

// Retrieve all Venders from the database.
exports.findAll = (req, res) => {

  users.find().then((result) => {
    res.json(result)
  })

};