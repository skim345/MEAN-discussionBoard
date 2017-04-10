var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');


module.exports=(function(){
	return{
	
	getTopics: function(req, res){
		// get all topics currently in database
		Topic.find({}).populate('_comment _user').exec(function(err, topics){
			if(err){
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
				res.json({status: true, topics:topics});
			}
		})
	},
	getSingleTopic: function(req, res){
		// get single topic as specified by user
		Topic.find({_id: req.params.id}).populate('_comment _user').exec(function(err, topic){
			if(err){
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
				res.json({status: true, topic:topic});
			}
		})
	},
	createTopic: function(req, res){
		// creating new topic
		var newTopic = new Topic({
			name: req.body.posterUserName,
			topic: req.body.topic,
			category: req.body.category,
			description: req.body.description
		})
		newTopic._user = req.body.posterId;
		// saving new topic
		newTopic.save(function(err, topic){
			if(err){
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});	
			}else{
				// finding the specific topic and updating
				Topic.findOneAndUpdate({_id: topic._id},{$set:{"_user":req.body.posterId}}, function(err, topic){
					if(err){
						var errorsArr = [];
						for(var i in err.errors){
							errorsArr.push(err.errors[i].message);
						}
						res.json({status: false, errors: errorsArr});
					}else{
						// finding user and updating the topic for user
						User.findOneAndUpdate({_id:req.body.posterId},{$push:{"_topic": topic._id}, $inc:{posts: 1}}, function(err, user){
							if(err){
								console.log(err);
								var errorsArr = [];
								for(var i in err.errors){
									errorsArr.push(err.errors[i].message);
								}
								res.json({status: false, errors: errorsArr});
							}else{
								// getting all topics and sending it back to front end
								Topic.find({}).populate('_comment _user').exec(function(err, topics){
									if(err){
										var errorsArr = [];
										for(var i in err.errors){
											errorsArr.push(err.errors[i].message);
										}
										res.json({status: false, errors: errorsArr});
									}else{
										res.json({status: true, topics:topics});
									}
								})
							}
						})
					}

				})
			}
		})
	}


	}



})()