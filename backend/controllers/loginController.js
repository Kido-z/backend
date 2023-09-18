const login = require('../models/login');

module.exports.Signup = async (req, res, next) => {
    try {
        // req.body recovers the data user
      const { email, password, username, createdAt } = req.body;
      // We check if the email is not already used 
      const existingUser = await login.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
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
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
  };
