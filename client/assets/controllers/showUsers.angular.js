myApp.controller('showUserController',['$scope','$routeParams', '$location','userFactory','topicFactory', function($scope,$routeParams, $location, userFactory,topicFactory){

	$scope.errors=[];

	// console.log($routeParams.id);
	userFactory.showUser($routeParams.id, function(response){
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.singleUser = response.user;
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




	
	






}])