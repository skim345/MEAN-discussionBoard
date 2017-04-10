myApp.controller('topicController',['$scope','topicFactory', '$routeParams', '$location','userFactory','commentFactory', function($scope, topicFactory, $routeParams, $location,userFactory, commentFactory){

	$scope.errors=[];

	// On page load, get a single topic selected by user
	topicFactory.getSingleTopic($routeParams.id, function(response){
		// console.log(response);
		if(!response.status){
			$scope.errors.push(response.errors);
		}else{
			$scope.singleTopic = response.topic;
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
	// create comment made by user
	$scope.createComment = function(commentInfo, topicId){
		userFactory.getUser(function(user_info){
			$scope.posterInfo = user_info;
		})
		commentFactory.createComment(commentInfo, topicId, $scope.posterInfo, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.singleTopic = response.topic;
			}
		})
	}
	// Upvote a comment a user likes
	$scope.voteUp= function(commentId, topicId){
		commentFactory.voteUp(commentId, topicId, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.singleTopic = response.topic;
			}
		})
	}
	// Downvote a comment a user dislikes
	$scope.voteDown= function(commentId, topicId){
		commentFactory.voteDown(commentId, topicId, function(response){
			if(!response.status){
				$scope.errors.push(response.errors);
			}else{
				$scope.singleTopic = response.topic;
			}
		})
	}

}])