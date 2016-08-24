var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
	name: {type: String},
	comment: {type: String, required: true},
	voteUp:{type: Number},
	voteDown:{type:Number},
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	_topic: {type: Schema.Types.ObjectId, ref:'Topic'},
},{timestamps:true});

mongoose.model('Comment',commentSchema);