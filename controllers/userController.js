const User = require('../models/userModel');
const { createSecretToken } = require('../config/secretToken');
const { generateRefreshToken } = require('../config/refreshtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

/**  Create a User **/
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

/** Login a user **/
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    /*const refreshToken = await generateRefreshToken(findUser?._id);
     const updateuser = await User.findByIdAndUpdate(
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
      phoneNumber: findUser?.phoneNumber,
      token: createSecretToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

/** Update a user **/
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        phoneNumber: req?.body?.phoneNumber,
      },
      {
        new: true,
      }
  );
  res.json(updatedUser);
  } catch (error) { 
    throw new Error(error);
  }
});

// Get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

/** Get a single user **/
const getaUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

/** Get a single user (delete a user) **/
const deleteaUser = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
};