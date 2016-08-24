myApp.controller('userController',['$scope', '$routeParams', '$location','userFactory', function($scope, $routeParams, $location, userFactory){

	$scope.errors=[];

	$scope.register= function(){
		// console.log($scope.newUser);
		userFactory.register($scope.newUser, function(response){
			if(!response.status){
				console.log(response.errors);
				$scope.errors.push(response.errors);
			}else{
				$scope.user = response.sessionUser;
				$location.url('/dashboard');
			}
		})
	}
	userFactory.getUser(function(user_info){
		$scope.user = user_info;
		if(!$scope.user.loggedIn){
			$location.url('/');
		}else{
			$location.url('/dashboard');
		}
	})
	if($scope.user.loggedIn){
		userFactory.index(function(response){
			if(response.status){
			$scope.allUsers = response.users;
			}
		})
	}
	$scope.login= function(){
		// console.log($scope.regUser);
		userFactory.login($scope.regUser, function(response){
			// console.log(response);
			if(!response.status){
				$scope.errors.push(response.errors);
				$scope.regUser = "";
			}else{
				$scope.user = response.sessionUser;
				$location.url('/dashboard');
			}
		})
	}

	
	






}])