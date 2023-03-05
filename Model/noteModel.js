const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must Provide A Name'],
    trim: true,
    maxLength: [50, 'Name Cannot Be More Than 50 Characters'],
    minLength: [6, 'Name Cannot Be Less Than 6 Characters '],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
