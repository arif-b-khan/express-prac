var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const User = require("../models/user");
var config = require('../config/secret');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

class UserController {
  controller() {

  }
  signUp(req, res, next) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
      var newUser = new User(
        req.body.username,
        req.body.password
      );
      // save the user
      newUser.save(function (err) {
        if (err) {
          return res.json({ success: false, msg: 'Username already exists.' });
        }
        res.json({ success: true, msg: 'Successful created new user.' });
      });
    }
  }

  signin(req, res, next) {
    let user = User.getUser(req.body.username);
    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches

      const jsonResult = JSON.stringify(user);
      try {
        var tokenObject = issueJWT(user);
        // return the information including token as JSON
        res.json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
      } catch (err) {
        res.json(err);
      }


    }
  }

  getUsers(req, res, next) {
    const users = User.getAllUsers();
    res.json([...users]);
  }
}

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports = new UserController();