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

app.controller("ListCtrlOld", function($scope, $timeout, $q, $log, $http, $mdDialog) {


	this.arr = [
		{
			searchText: 'Lapte (litru) 2',
		},
	]
	this.page = 'buildList';

	var self = this;

	self.login = function() {
		self.page = 'buildList'
	}

    $http.get('/api/products/getCategories').then((res) => {
    	alert("Got states");
    	self.states = res.data.map((categ)=>{
    		return {
    			value: categ.id,
    			display: categ.keyword + " (" + categ.unit + ") "
    		}
    	})
    });

    self.add_new = function() {
    	this.arr.push({
			selectedItem: '',
			searchText: '',
		})
    }

    self.optionToDescription = function(option) {
    	return option.times + " x " + option.name;
    }

    self.total = function(results) {
    	var sum = 0;
    	results.forEach((res) => {
    		sum += res.selected.times * res.selected.price;
    	});
    	return sum;
    }

    self.genereazaCosul = function() {
    // 	 $mdDialog.show({
	   //       template: '\
				// <div class="sk-cube-grid">\
				//   <div class="sk-cube sk-cube1"></div>\
				//   <div class="sk-cube sk-cube2"></div>\
				//   <div class="sk-cube sk-cube3"></div>\
				//   <div class="sk-cube sk-cube4"></div>\
				//   <div class="sk-cube sk-cube5"></div>\
				//   <div class="sk-cube sk-cube6"></div>\
				//   <div class="sk-cube sk-cube7"></div>\
				//   <div class="sk-cube sk-cube8"></div>\
				//   <div class="sk-cube sk-cube9"></div>\
				// </div>	\
	   //       ',
	   //       controller: function() {

	   //       }
    //   	});

    	self.page = 'listOutput';

    	self.arr.map((item) => {
    		item.quantity = item.searchText.match(/\d+/)[0];
    		self.states.forEach((categ) => {
    			console.log('>', item.searchText.startsWith(categ.display))
    			if(item.searchText.startsWith(categ.display))
    				item.id = categ.value
    		})
    	})

    	console.log(self.arr);

    	self.results = Array(self.arr.length);

    	self.arr.forEach((categ, idx) => {
    		console.log(categ)
    		$http.post('/api/products/obtainOptionalProducts', {
    			// id: categ.id,
    			// quantity: categ.quantity
    			ids: [],
    			category: categ.id
    		}).then((res) => {
	    		var smallers = res.data.filter((prduct) =>{
	    			return prduct.package <= categ.quantity
	    		});

	    		smallers.map((prduct) => {
	    			prduct.times = Math.ceil(categ.quantity/prduct.package);
	    		})

	    		var smallers2 = smallers.slice();
	    		smallers2.splice(0, 1);

	    		self.results[idx] = {
	    			selected: smallers[0],
	    			recommanded: smallers[0],
	    			other: smallers2,
	    		}


	    	})

    	});

    }

    self.sterge = function(idx) {
    	self.arr.splice(idx, 1);
    }

    self.querySearch = function(query) {
		return self.states.filter((state) => {
			return state.display.startsWith(query)
		});
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

});