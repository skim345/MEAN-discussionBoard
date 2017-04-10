var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');


module.exports=(function(){
	return{
	
	createComment: function(req, res){
		// creating new comment
		var newComment = new Comment({
			name: req.body.posterUserName,
			comment: req.body.comment,
			voteUp: 0,
			voteDown: 0
		});
		newComment._topic = req.body.topicId;
		newComment._user = req.body.posterId;

		// saving new comment
		newComment.save(function(err, comment){
			if(err){
				console.log(err);
				var errorsArr = [];
					for(var i in err.errors){
						errorsArr.push(err.errors[i].message);
					}
					res.json({status: false, errors: errorsArr});
			}else{
				// Searching for topic ID and updating the topic with new comment
				Topic.update({_id: req.body.topicId},{$push:{"_comment":newComment}}, function(err){
					if(err){
						console.log(err);
						var errorsArr = [];
						for(var i in err.errors){
							errorsArr.push(err.errors[i].message);
						}
						res.json({status: false, errors: errorsArr});
					}else{
						// Searching for user who posted comment and updating User database
						User.update({_id:req.body.posterId},{$push:{"_comment":newComment}}, function(err){
							if(err){
								console.log(err);
								var errorsArr = [];
								for(var i in err.errors){
									errorsArr.push(err.errors[i].message);
								}
								res.json({status: false, errors: errorsArr});
							}else{
								// Finding the topic and comment and sending it back to the front
								Topic.find({_id: req.body.topicId}).populate('_comment _user').exec(function(err, topic){
									if(err){
										console.log(err);
										var errorsArr = [];
										for(var i in err.errors){
											errorsArr.push(err.errors[i].message);
										}
										res.json({status: false, errors: errorsArr});
									}else{
										res.json({status: true, topic: topic});
										console.log(topic);
									}
								})
							}
						})
					}
				})
			}
		})
	},
	voteUp: function(req, res){
		// finding comment and updating voteUp section to reflect change
		Comment.update({_id: req.body.commentId}, {$inc:{voteUp: +1}},function(err){
			if(err){
				console.log(err);
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
				// Finding the topic and comment and sending it back to the front
				Topic.find({_id: req.body.topicId}).populate('_comment _user').exec(function(err, topic){
					if(err){
						var errorsArr = [];
						console.log(err);
						for(var i in err.errors){
							errorsArr.push(err.errors[i].message);
						}
						res.json({status: false, errors: errorsArr});
					}else{
						res.json({status: true, topic:topic});
					}
				})
			}
		})
	},
	voteDown: function(req, res){
		// finding comment and updating voteDown section to reflect change
		Comment.update({_id: req.body.commentId}, {$inc:{voteDown: +1}},function(err){
			if(err){
				console.log(err);
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
				// Finding the topic and comment and sending it back to the front
				Topic.find({_id: req.body.topicId}).populate('_comment _user').exec(function(err, topic){
					if(err){
						var errorsArr = [];
						console.log(err);
						for(var i in err.errors){
							errorsArr.push(err.errors[i].message);
						}
						res.json({status: false, errors: errorsArr});
					}else{
						res.json({status: true, topic:topic});
					}
				})
			}
		})
	}


		


	}



})()