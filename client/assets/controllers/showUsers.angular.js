myApp.controller('showUserController',['$scope','$routeParams', '$location','userFactory','topicFactory', function($scope,$routeParams, $location, userFactory,topicFactory){

	$scope.errors=[];

	// Get specific user information
	userFactory.showUser($routeParams.id, function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.singleUser = response.user;
		}
	})
	// logoff user
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




	
	






}])