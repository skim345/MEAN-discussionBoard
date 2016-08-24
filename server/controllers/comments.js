var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');


module.exports=(function(){
	return{
	
	createComment: function(req, res){
		// console.log(req.body);
		var newComment = new Comment({
			name: req.body.posterUserName,
			comment: req.body.comment,
			voteUp: 0,
			voteDown: 0
		});
		newComment._topic = req.body.topicId;
		newComment._user = req.body.posterId;
		newComment.save(function(err, comment){
			if(err){
				console.log(err);
				var errorsArr = [];
					for(var i in err.errors){
						errorsArr.push(err.errors[i].message);
					}
					res.json({status: false, errors: errorsArr});
			}else{
				Topic.update({_id: req.body.topicId},{$push:{"_comment":newComment}}, function(err){
					if(err){
						console.log(err);
						var errorsArr = [];
						for(var i in err.errors){
							errorsArr.push(err.errors[i].message);
						}
						res.json({status: false, errors: errorsArr});
					}else{
						User.update({_id:req.body.posterId},{$push:{"_comment":newComment}}, function(err){
							if(err){
								console.log(err);
								var errorsArr = [];
								for(var i in err.errors){
									errorsArr.push(err.errors[i].message);
								}
								res.json({status: false, errors: errorsArr});
							}else{
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
		// console.log(req.body);
		Comment.update({_id: req.body.commentId}, {$inc:{voteUp: +1}},function(err){
			if(err){
				console.log(err);
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
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
		// console.log(req.body);
		Comment.update({_id: req.body.commentId}, {$inc:{voteDown: +1}},function(err){
			if(err){
				console.log(err);
				var errorsArr = [];
				for(var i in err.errors){
					errorsArr.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArr});
			}else{
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