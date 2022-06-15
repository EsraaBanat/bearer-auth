'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
// console.log("HIIIIIIIIIIIIIIIIIIIIIIIIII");
  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();
    // console.log('>>>>>>>>>>>>>>>>>>',token);
    const validUser = await users.authenticateToken(token).then((e) => {
      // console.log("VVVVVVVVVVVV", e);
          req.user = e;
          // req.token = validUser.token;
    next();
    })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.error('Erorr inside bearer middleware',e);
    res.status(403).send('Invalid Login');
  }
}
