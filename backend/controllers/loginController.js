const login = require('./models/login');
const { createSecretToken } = require('./config/secretToken');
const bcrypt = require('bcryptjs');

/* This function manages the registration of a user in an application
by first checking whether the user already exists, creating a new user if it doesn't,
generating a JWT token for authentication, setting a cookie containing this token,
and returning a JSON response to indicate successful registration. */
module.exports.Signup = async (req, res, next) => {
    try {
        // req.body recovers the data user
      const { email, password, username, createdAt } = req.body;
      // We check if the email is not already used 
      const existingUser = await login.findOne({ email });
      if (existingUser) {
        return res.json({ message: "L'utilisateur existe déjà" });
      }
      // Used the value of req.body to create a new user
      const user = await login.create({ email, password, username, createdAt });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "L'utilisateur s'est connecté avec succès", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
  };
