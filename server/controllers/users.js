var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

var sessionUser= {loggedIn: false};

module.exports=(function(){
	return{
	index: function(req,res){
		User.find({}, function(err, users){
			if(err){
				res.json({status: false, errors:"Error Retrieving Users"})
			}else{
				res.json({status: true, users:users});
			}
		})
	},
	showUser: function(req, res){
		// console.log(req.params.id);
		User.findOne({_id: req.params.id}, function(err, user){
				// console.log(user);
			if(err){
				console.log(err);
				var errorsArray=[];
				for(var i in err.errors){
					errorsArray.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArray}) ;
			}else{
				// console.log(user._post.length);
				var singleUser= {
					_id: user._id,
					createdAt: user.createdAt,
					firstName: user.firstName,
					lastName: user.lastName,
					userName: user.userName,
					email: user.email,
					totalTopics: user._topic.length,
					totalComments: user._comment.length
				};
				res.json({status: true, user: singleUser});
			}
		})
	},
	logoff: function(req, res){
	sessionUser= {loggedIn: false};
	res.json({status: true, sessionUser:sessionUser});
	},
	login: function(req, res){
		// console.log(req.body);
		if(req.body.email){
			User.findOne({email: req.body.email}, function(err, user){
				if(user){
					if(user.validPassword(req.body.password)){
						sessionUser={
							loggedIn: true,
							_id: user._id,
							firstName: user.firstName,
							lastName: user.lastName,
							userName: user.userName,
							email: user.email
						}
						res.json({status: true, sessionUser: sessionUser});
					}else{
						res.json({status: false, errors: "Incorrect email or password"});
					}
				}else{
					res.json({status: false, errors: "User was not found. Please register"});
				}
			})
		}else{
			req.json({status: false, errors: "Email is required"});
		}
	},
	register: function(req, res){
		// console.log(req.body);
		User.findOne({email: req.body.email}, function(err, user){
				if(user){
					res.json({status: false, errors: "Email already exists"});
				}else{
					if(req.body.password == req.body.confPassword){
						var newUser = new User({
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							userName: req.body.userName,
							email: req.body.email,
							password: req.body.password
						});
						newUser.save(function(err, user){
							if(err){
								var errorsArray=[];
								for(var i in err.errors){
									errorsArray.push(err.errors[i].message);
								}
								res.json({status: false, errors: errorsArray}) ;
							}else{
								sessionUser = {
									loggedIn: true,
									_id: user._id,
									firstName: user.firstName,
									lastName: user.lastName,
									userName: user.userName,
									email: user.email
								}
								res.json({status: true, sessionUser: sessionUser});
							}
						})
					}else{
						res.json({status: false, errors: "Passwords do not match"});
					}
				}
			})

	}

		


	}



})()