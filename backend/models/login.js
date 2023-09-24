const mongoose = require('mongoose');
// Helped to hash passwords user's
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

const loginSchema = mongoose.Schema ({
    email: { type: String, required: [true, "Votre addresse email est requise"], unique: true, },
    password: { type: String, required: [true, "Votre mot de passe est requise"], },
    createdAt: { type: Date, default: new Date(), },
    //phoneNumber: { type: String, required: true } // in case of forgotten password maybe 
});

// This code hash the password and save it before to send on BDD
loginSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
loginSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
loginSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

module.exports = mongoose.model('login', loginSchema);