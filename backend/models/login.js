const mongoose = require('mongoose');
// Helped to hash passwords user's
const bcrypt = require('bcryptjs');

const loginSchema = mongoose.Schema ({
    email: { type: String, required: [true, "Votre addresse email est requise"], unique: true, },
    password: { type: String, required: [true, "Votre mot de passe est requise"], },
    phoneNumber: { type: String, required: true } // in case of forgotten password maybe 
});

// This code hash the password and save it before to send on BDD
loginSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('login', loginSchema);