console.log('commentFactory');

myApp.factory('commentFactory', function($http){
	var factory = {}

	factory.createComment = function(commentInfo, topicId, posterInfo, callback){
		// console.log(commentInfo);
		// console.log(topicId);
		// console.log(posterInfo);
		var info = {
			comment: commentInfo.comment,
			topicId: topicId,
			posterId: posterInfo._id,
			posterFirstName: posterInfo.firstName,
			posterLastName: posterInfo.lastName,
			posterUserName: posterInfo.userName
		};
		$http.post('/createComment',info).success(function(response){
			// console.log(response);
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	factory.voteUp= function(commentId, topicId, callback){
		var idList={
			commentId: commentId,
			topicId:topicId
		};
		$http.post('/voteUp',idList).success(function(response){
			// console.log(response);
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	factory.voteDown= function(commentId, topicId, callback){
		var idList={
			commentId: commentId,
			topicId:topicId
		};
		$http.post('/voteDown',idList).success(function(response){
			// console.log(response);
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}

	return factory;
})