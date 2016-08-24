myApp.controller('dashboardController',['$scope', '$routeParams', '$location','userFactory','topicFactory', function($scope, $routeParams, $location, userFactory,topicFactory){
	$scope.errors=[];
	userFactory.getUser(function(user_info){
		$scope.user = user_info;
		if(!$scope.user.loggedIn){
			$location.url('/');
		}else{
			$location.url('/dashboard');
		}
	})
	topicFactory.getTopics(function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.allTopics = response.topics;
		}
	})
	$scope.logoff= function(){
		userFactory.logoff(function(response){
			if(!response.status){
				console.log(response.errors);
				$scope.errors.push(response.errors)
			}else{
				$scope.user = response.sessionUser;
				$location.url('/');
			}
		})
	}
	$scope.createTopic= function(){
		// console.log($scope.newTopic);
		userFactory.getUser(function(user_info){
			$scope.poster= user_info;
		})
		topicFactory.createTopic($scope.newTopic, $scope.poster, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				// console.log(response);
				$scope.allTopics = response.topics;
			}
		})
	}




	
	






}])