myApp.controller('topicController',['$scope','topicFactory', '$routeParams', '$location','userFactory','commentFactory', function($scope, topicFactory, $routeParams, $location,userFactory, commentFactory){

	$scope.errors=[];


	topicFactory.getSingleTopic($routeParams.id, function(response){
		// console.log(response);
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.singleTopic = response.topic;
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
	$scope.createComment = function(commentInfo, topicId){
		// console.log(commentInfo);
		userFactory.getUser(function(user_info){
			$scope.posterInfo = user_info;
		})
		commentFactory.createComment(commentInfo, topicId, $scope.posterInfo, function(response){
			// console.log(response);
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.singleTopic = response.topic;
			}
		})
	}
	$scope.voteUp= function(commentId, topicId){
		// console.log(commentId);
		// console.log(topicId);
		commentFactory.voteUp(commentId, topicId, function(response){
			// console.log(response);
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.singleTopic = response.topic;
			}
		})
	}
	$scope.voteDown= function(commentId, topicId){
		// console.log(commentId);
		// console.log(topicId);
		commentFactory.voteDown(commentId, topicId, function(response){
			// console.log(response);
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.singleTopic = response.topic;
			}
		})
	}
	






}])