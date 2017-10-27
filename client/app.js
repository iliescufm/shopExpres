var app = angular.module('app', ['ngMaterial', 'ngMessages']);

app.controller("ListCtrl", function($scope, $timeout, $q, $log, $http, $mdDialog) {


	this.arr = [
		{
			searchText: 'Lapte (litri) 1',
		},

		{
			searchText: 'Pizza (bucata) 1'
		}
	]
	this.page = 'listOutput';

	var self = this;

	self.login = function() {
		self.page = 'buildList'
	}

    $http.get('/api/products/getCategories').then((res) => {
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
    	var description = "";
    	option.forEach((component) => {
    		description += component.package + " x " + component.name + ", "
    	});
    	return description.substring(0, description.length - 2);
    }

    self.total = function(results) {
    	var sum = 0;
    	results.forEach((res) => {
    		res.selected.forEach((component) => {
    			sum += component.package * component.price;
    		})
    	})
    	return sum
    }

    self.results = [

    	// result for first categ : lapte 1L
    	{
    		recommanded: [
    			{
    				name: "Lapte Napolact 1L",

    				package: 1,
    				price: "4",
    			}
    		],

    		other: [
    			[
    				{
	    				name: "Lapte LaDorna 0.7L",
	    				package: 1,
	    				price: "4",
	    			},
	    			{
	    				name: "Lapte Napolact 0.3L",
	    				package: 1,
	    				price: "4",
	    			}
    			],
    			[
    				{
	    				name: "Lapte Delaco 1L",
	    				package: 1,
	    				price: "4",
	    			}
    			],
    		]
    	}, 

    	// result for second categ: bere 2 L
    	{
    		recommanded: [
    			{
    				name: 'Pizza Giuseppe',
    				package: 1,
    				price: 9,
    			}
    		],
    		other: [
    			[
    				{
    					name: 'Pizza Margherita',
    					package: 1,
    					price: 7
    				}
    			]
    		]

    	}

    ];

    self.genereazaCosul = function() {
    	 $mdDialog.show({
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
				</div>	\
	         ',
	         controller: function() {

	         }
      	});

    	self.page = 'listOutput';
    	// self.arr.map((item) => {
    	// 	item.quantity = item.searchText.match(/\d+/)[0]
    	// 	self.states.forEach((categ) => {
    	// 		if(item.searchText.startsWith(categ.display))
    	// 			item.id = categ.value
    	// 	})
    	// })

    	// $http.post('/api/product/obtainProduct', self.arr).then((res) => {
    	// 	console.log(res.data);
    	// })
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