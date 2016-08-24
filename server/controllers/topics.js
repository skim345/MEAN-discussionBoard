var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');


module.exports=(function(){
	return{
	
	getTopics: function(req, res){
		Topic.find({}).populate('_comment _user').exec(function(err, topics){
			if(err){
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
				res.json({status: true, topics:topics});
				// console.log(topics);
			}
		})
	},
	getSingleTopic: function(req, res){
		// console.log(req.params.id);
		Topic.find({_id: req.params.id}).populate('_comment _user').exec(function(err, topic){
			if(err){
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
				res.json({status: true, topic:topic});
				// console.log(topic);
			}
		})
	},
	createTopic: function(req, res){
		// console.log(req.body);
		var newTopic = new Topic({
			name: req.body.posterUserName,
			topic: req.body.topic,
			category: req.body.category,
			description: req.body.description
		})
		// console.log(newTopic);
		newTopic._user = req.body.posterId;
		newTopic.save(function(err, topic){
			// console.log(topic);
			if(err){
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});	
			}else{
				Topic.findOneAndUpdate({_id: topic._id},{$set:{"_user":req.body.posterId}}, function(err, topic){
					// console.log(topic);
					if(err){
						var errorsArr = [];
						for(var i in err.errors){
							errorsArr.push(err.errors[i].message);
						}
						res.json({status: false, errors: errorsArr});
					}else{
						// console.log(topic);
						User.findOneAndUpdate({_id:req.body.posterId},{$push:{"_topic": topic._id}, $inc:{posts: 1}}, function(err, user){
							if(err){
								console.log(err);
								var errorsArr = [];
								for(var i in err.errors){
									errorsArr.push(err.errors[i].message);
								}
								res.json({status: false, errors: errorsArr});
							}else{
								// console.log(user);
								Topic.find({}).populate('_comment _user').exec(function(err, topics){
									if(err){
										var errorsArr = [];
										for(var i in err.errors){
											errorsArr.push(err.errors[i].message);
										}
										res.json({status: false, errors: errorsArr});
									}else{
										res.json({status: true, topics:topics});
										// console.log(topics);
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