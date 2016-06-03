var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	age: Number
});

mongoose.model('User', userSchema);


