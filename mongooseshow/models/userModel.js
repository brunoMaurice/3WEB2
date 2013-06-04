var mongoose = require('./getMongoose.js').mongoose;

var UserSchema  = mongoose.Schema({
  username    : String,
  password    : String
});   

var UserModel = mongoose.model('User', UserSchema);

exports.User = UserModel;
