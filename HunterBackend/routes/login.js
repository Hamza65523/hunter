const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const generateAuthToken = require("../utils/generateAuthToken");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send({message:error.details[0].message,status:false});


  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({message:"Invalid email or password...",status:false});


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({message:"Invalid email or password...",status:false});

  const token = generateAuthToken(user);

  res.status(200).send({token:token,status:true});

});

module.exports = router;
