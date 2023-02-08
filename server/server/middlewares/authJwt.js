import jwt from "jsonwebtoken";
import db from "../models";

const config = require("../config");
const User = db.user;

const verify = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret_private_key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: "Server Error!" });
    }
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).send({ message: "Require Admin Role!" });
    }
  });
};

const authJwt = {
  verify,
  isAdmin,
};

export default authJwt;
