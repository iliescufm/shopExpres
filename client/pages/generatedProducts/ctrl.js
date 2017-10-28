app.controller('GeneratedProductsCtrl', function($scope, $rootScope, $http){

	// Maybe redundant...
	$scope.arr = $rootScope.arr;

    console.log($rootScope.arr);

    $rootScope.results = Array($rootScope.arr.length);

    var arr_of_promise = [];

    $rootScope.arr.forEach((categ, idx) => {
        console.log(categ)
        var one_promise = $http.post('/api/products/obtainOptionalProducts', {
            // id: categ.id,
            // quantity: categ.quantity
            ids: [],
            category: categ.id
        }).then((res) => {
            var smallers = res.data.filter((prduct) =>{
                return prduct.package <= categ.quantity
            });

            smallers.map((prduct) => {
            	if(prduct.package != 0) {
                	prduct.times = Math.ceil(categ.quantity/prduct.package);
            	} else {
            		prduct.times = 1;
            		prduct.package = categ.quantity;
            	}
            })

            var smallers2 = smallers.slice();
            smallers2.splice(0, 1);

            $rootScope.results[idx] = {
                selected: smallers[0],
                recommanded: smallers[0],
                other: smallers2,
            }
        });


    });


    $scope.optionToDescription = function(option) {
    	return option.times + " x " + option.name;
    }

    $scope.total = function(results) {
    	var sum = 0;
    	results.forEach((res) => {
    		sum += res.selected.times * res.selected.price;
    	});
    	return sum;
    }

});