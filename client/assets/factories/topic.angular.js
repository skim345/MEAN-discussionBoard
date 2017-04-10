console.log('topicFactory');

myApp.factory('topicFactory', function($http){
	var factory = {}

	factory.createTopic = function(topicInfo, posterInfo, callback){
		var topicAndPosterInfo={
			topic: topicInfo.topic,
			description: topicInfo.description,
			category: topicInfo.category,
			posterId: posterInfo._id,
			posterFirstName: posterInfo.firstName,
			posterLastName: posterInfo.lastName,
			posterUserName: posterInfo.userName
		};
		$http.post('/createTopic', topicAndPosterInfo).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	factory.getTopics= function(callback){
		$http.get('/getTopics').success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	factory.getSingleTopic= function(id, callback){
		$http.get('/getSingleTopic/'+id).success(function(response){
			if(!response.status){
				callback(response);
			}else{
				callback(response);
			}
		})
	}
	

	





	return factory;
})