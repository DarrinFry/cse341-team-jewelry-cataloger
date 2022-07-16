const mongoose = require('mongoose');
const validator = require('validator');

const User_Insurance_Info_Schema = new mongoose.Schema({
  insurance_company: {
    type: String,
    required: true,
  },
  insurance_agent: {
    type: String,
    required: false,
    validate: [
      validator.isAlpha,
      'Insurance agent should only contain letters',
    ],
  },
  insurance_policy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  'user_insurance_info',
  User_Insurance_Info_Schema
);
