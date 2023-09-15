const login = require('../models/login');

module.exports.Signup = async (req, res, next) => {
    try {
        // Les données de l'utilisaateur sont obtenu grâce ai req.body
      const { email, password, username, createdAt } = req.body;
      // Ici on check si email n'a pas déjà été enregistré
      const existingUser = await login.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      // Puis on utilise la valeur de req.body pour créer un nouveau utilisateur
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