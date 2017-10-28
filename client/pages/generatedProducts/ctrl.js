app.controller('GeneratedProductsCtrl', function($scope, $rootScope, $http, $mdDialog){
	function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}
	// Maybe redundant...
	$scope.arr = $rootScope.arr;

    console.log($rootScope.arr);


    var d = $mdDialog.show({
             template: '\
                <div class="sk-cube-grid">\
                  <div class="sk-cube sk-cube1"></div>\
                  <div class="sk-cube sk-cube2"></div>\
                  <div class="sk-cube sk-cube3"></div>\
                  <div class="sk-cube sk-cube4"></div>\
                  <div class="sk-cube sk-cube5"></div>\
                  <div class="sk-cube sk-cube6"></div>\
                  <div class="sk-cube sk-cube7"></div>\
                  <div class="sk-cube sk-cube8"></div>\
                  <div class="sk-cube sk-cube9"></div>\
                </div>  \
             ',
             controller: function($mdDialog) {
         		setTimeout(function() {
			    	$mdDialog.hide();
			    }, 500*$rootScope.results.length)
             }
        });



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


         //    if(getCookie('id') != null) {
	        //     $http.post('/api/products/obtainProduct', {
	        //     	quantity: categ.quantity,
	        //     	user_id: getCookie('id'),
	        //     	category_id: categ.id,
	        //     }).then((res) => {
	        //     	res.data[0].times = Math.ceil(categ.quantity/res.data[0].package)
	        //     	console.log(res.data);
	        //     	$rootScope.results[idx] = {
		       //          selected: smallers[0],
		       //          recommanded: res.data[0],
		       //          other: smallers2,
		       //      }
	        //     })
        	// } else {
        		var pref_idx = 0;
        		var pref_cookie = Number(getCookie("c" + categ.id));
        		smallers.forEach((p, i) => {
        			// console.log(p.
        			if(p.id== pref_cookie)
        				pref_idx = i;
        		})
        		$rootScope.results[idx] = {
	                selected: smallers[0],
	                recommanded: smallers[pref_idx],
	                other: smallers2,
	            }
        	// }


        	

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

    $scope.plaseazaComanda = function(res) {
    	if(getCookie('id') != null) {
    		console.log("Salveaza preferintele....");
	    	res.forEach((categ) => {
	    		var cookie_val = categ.selected.id;
	    		document.cookie = "c"+ categ.selected.categorie_id + "=" + cookie_val;
	    		$http.post('/api/users/createPreference', {
	    			user_id: getCookie('id'),
	    			category_id: categ.selected.categorie_id,
	    			product_id: categ.selected.id,
	    		})
	    	});
	    }
    }

});