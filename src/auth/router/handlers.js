'use strict';
// require("dotenv").config();
const {
  users
} = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    // console.log('REQBODYYYYYYYY',req.body);
    // const output = {
    //   user: userRecord,
    //   token: userRecord.token
    // };
    // console.log('userRecord',userRecord.password);
    users.beforeCreate(req.body.password).then(async (hashedpassword) => {
        // console.log(hashedpassword);
        let userRecord = await users.create({
          username: req.body.username,
          password: hashedpassword,
        });
        res.status(200).json(userRecord);
      })
      .catch((e) => {
        console.log(e);
      })

  } catch (e) {
    console.error('Error inside handleSignup', e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error('Error inside handleSignin', e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    console.log(req.user);
    // const userRecords = await users.findAll();
    // const list = users.map(user => user.username);
    res.status(200).json(req.user);
  } catch (e) {
    console.error('Error inside handleGetUsers', e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).text("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}