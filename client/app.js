var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	var loginState = {
		name: 'login',
		url: '/login',
		templateUrl: '/client/pages/login/index.html',
		controller: 'LoginCtrl'
	}

	var buildListState = {
		name: 'buildList',
		url: '/list',
		templateUrl: 'client/pages/buildList/index.html',
		controller: 'BuildListCtrl'
	}

	var generatedProductsState = {
		name: 'generatedProducts',
		url: '/products',
		controller: 'GeneratedProductsCtrl',
		templateUrl: 'client/pages/generatedProducts/index.html'
	}

	$stateProvider.state(loginState);
	$stateProvider.state(buildListState);
	$stateProvider.state(generatedProductsState);

	$urlRouterProvider.otherwise("/list"); 
	$locationProvider.html5Mode(true);
});
