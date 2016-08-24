var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/login.html',
		controller: 'userController'
	})
	.when('/dashboard',{
		templateUrl: '/partials/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/show/:id',{
		templateUrl: '/partials/showUser.html',
		controller: 'showUserController'
	})
	.when('/topics/:id',{
		templateUrl: '/partials/topic.html',
		controller: 'topicController'
	})
	.otherwise({
		templateUrl: '/partials/login.html'
	})
})