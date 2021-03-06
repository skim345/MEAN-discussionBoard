console.log('userFactory');

myApp.factory('userFactory', function($http){
	var factory = {}

	var sessionUser = {loggedIn: false};

	factory.getUser = function(callback){
		callback(sessionUser);
	}

	factory.index = function(callback){
		$http.get('/users').success(function(response){
			if(response.status){
				callback(response);
			}else{
				console.log('Error Getting Users');
			}
		})
	}
	factory.showUser = function(userId, callback){
		$http.get('/showUser/'+userId).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

	factory.register= function(newUserInfo, callback){
		$http.post('/register', newUserInfo).success(function(response){
			if(response.status){
				sessionUser = response.sessionUser;
			}
			callback(response);
		})
	}
	factory.logoff= function(callback){
		$http.get('/logoff').success(function(response){
			if(response.status){
				sessionUser=response.sessionUser;
			}
			callback(response);
		})
	}
	factory.login = function(user_info, callback){
		$http.post('/login', user_info).success(function(response){
			if(response.status){
				sessionUser = response.sessionUser;
			}
			callback(response);
		})
	}

	return factory;
})