var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema ({
  title: {type: String, required: true},
  userEmail: {type: String, required: true}
});

module.exports = mongoose.model("Task", taskSchema);
