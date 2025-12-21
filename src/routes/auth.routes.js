const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");
const {registerValidator, loginValidator} = require("../validators/user.validator.js")
const validate = require("../middlewares/validate.js");
const router = express.Router();

// REGISTER
router.post("/register", registerValidator, validate, registerUser);

// LOGIN
router.post("/login", loginValidator, validate, loginUser);

module.exports = router;
 