const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

const Project = mongoose.model('project', userSchema);

module.exports = Project;
