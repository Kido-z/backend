const user = require('../models/userModel');
const { createSecretToken } = require('../config/secretToken');
const { generateRefreshToken } = require('../config/refreshtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    const newUser = await user.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("Cette utilisateur existe déjà");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await user.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    /*const refreshToken = await generateRefreshToken(findUser?._id);
     const updateuser = await user.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    }); */
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      token: createSecretToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
};