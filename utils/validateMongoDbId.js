const mongoose = require('mongoose');
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Cette id n\'est pas valide ou est introuvable");
};
module.exports = validateMongoDbId;