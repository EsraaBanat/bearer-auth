'use strict';

const base64 = require('base-64');
const {users} = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  // console.log("BASICCCCCCCCCCCCCCCC");
  // let basicHeaderParts = req.headers.authorization.split(" ");
  // let encodedValue = basicHeaderParts.pop();
  // let decodedValue = base64.decode(encodedValue);

  let basic = req.headers.authorization.split(" ").pop();
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass).then((user) => {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaa",user);
      req.user = user;
      next();
    })
      .catch((e) => {
      console.log(e);
    })
  } catch (e) {
    console.error('Erorr inside basic middleware', e);
    res.status(403).send('Invalid Login');
  }

}