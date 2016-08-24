var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new mongoose.Schema({
	name:{type: String, required: true},
	topic:{type: String, required: true, minlength:2},
	category:{type: String, required: true},
	description: {type: String},
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	_comment:[{type: Schema.Types.ObjectId, ref:'Comment'}],
},{timestamps:true});

mongoose.model('Topic',topicSchema);