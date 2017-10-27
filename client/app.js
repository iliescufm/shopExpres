var app = angular.module('app', ['ngMaterial']);

app.controller("ListCtrl", function($scope, $timeout, $q, $log, $http) {

	this.arr = [
		{
			selectedItem: '',
			searchText: '',
		},
	]

	var self = this;

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

    self.genereazaCosul = function() {
    	self.arr.map((item) => {
    		delte 
    		item.quantity = item.searchText.match(/\d+/)[0]
    		self.states.forEach((categ) => {
    			if(item.searchText.startsWith(categ.display))
    				item.id = categ.value
    		})
    	})

    	$http.post('/api/product/obtainProduct', self.arr).then((res) => {
    		console.log(res.data);
    	})
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