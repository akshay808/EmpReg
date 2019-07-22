const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  empid: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  mobno: {
    type: Number,
    required: true,
    unique: true,
    maxlength: 10,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  aadhar: {
    type: Number,
    required: true,
    unique: true,
    maxlength: 12,
    trim: true
  },
  pan: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  Marital: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  project: {
    type: String,
    trim: true,
    default: 'Yet Not Assigned'
  },
  reportlead: {
    type: String,
    trim: true,
    default: 'Yet Not Assigned'
  },
  projectMan: {
    type: String,
    trim: true,
    default: 'Yet Not Assigned'
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.generateAuthToken = async function() {
  const emp = this;
  const token = jwt.sign({ _id: emp._id.toString() }, 'thisismynewcourse');

  emp.tokens = emp.tokens.concat({ token });
  await emp.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const emp = await Emp.findOne({ email });

  if (!emp) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, emp.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return emp;
};

userSchema.pre('save', async function(next) {
  const emp = this;

  if (emp.isModified('password')) {
    emp.password = await bcrypt.hash(emp.password, 8);
  }

  next();
});

const Emp = mongoose.model('emp', userSchema);

module.exports = Emp;
