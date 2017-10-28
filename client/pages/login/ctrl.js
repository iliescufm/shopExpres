app.controller('LoginCtrl', function($scope, $http, $state, $rootScope){

	$scope.user = {
		email: '',
		password: '',
	}

	$scope.login = function() {
		$http.post('/api/users/login', $scope.user)
		.then((res) => {
			alert(1);
			document.cookie = "id="+res.data.id;
			$state.go('buildList');
		})
		.catch((res) => {
			alert(2);
			alert("Login failed");
		})
	}
	
});