var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

var sessionUser= {loggedIn: false};

module.exports=(function(){
	return{
	index: function(req,res){
		// find all users
		User.find({}, function(err, users){
			if(err){
				res.json({status: false, errors:"Error Retrieving Users"})
			}else{
				res.json({status: true, users:users});
			}
		})
	},
	showUser: function(req, res){
		// show one specified user
		User.findOne({_id: req.params.id}, function(err, user){
			if(err){
				console.log(err);
				var errorsArray=[];
				for(var i in err.errors){
					errorsArray.push(err.errors[i].message);
				}
				res.json({status: false, errors: errorsArray}) ;
			}else{
				// if found, send JSON with info
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
		if(req.body.email){
			// get parameters from user input and find user by given email
			User.findOne({email: req.body.email}, function(err, user){
				if(user){
					// if theres a user, validate password
					if(user.validPassword(req.body.password)){
						// if password is valid, send JSON info back to front
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
						// user found, but password doesn't match
						res.json({status: false, errors: "Incorrect email or password"});
					}
				}else{
					// no user by that email, ask user to register
					res.json({status: false, errors: "User was not found. Please register"});
				}
			})
		}else{
			// no email, send JSON error
			req.json({status: false, errors: "Email is required"});
		}
	},
	register: function(req, res){
		// find user by email provided to see if the email is already in use
		User.findOne({email: req.body.email}, function(err, user){
				if(user){
					// emails already in use, send error
					res.json({status: false, errors: "Email already exists"});
				}else{
					// email not found, if passwords match, create user
					if(req.body.password == req.body.confPassword){
						// create user
						var newUser = new User({
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							userName: req.body.userName,
							email: req.body.email,
							password: req.body.password
						});
						// saving new user
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
						// user is not found, but password and confirm password inputs do not match
						res.json({status: false, errors: "Passwords do not match"});
					}
				}
			})

	}

		


	}



})()