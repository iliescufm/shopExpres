var app = angular.module('app', ['ngMaterial']);

app.controller("ListCtrl", function($scope, $timeout, $q, $log) {

	this.arr = [
		{
			selectedItem: '',
			searchText: '',
		},
	]
	var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    self.add_new = function() {
    	this.arr.push({
			selectedItem: '',
			searchText: '',
		})
    }

    self.cumpara = function() {
    	self.arr.map((item) => {
    		console.log(item)
    		item.cantiate = item.searchText.match(/\d+/)[0]
    	})
    	console.log(self.arr);
    }

    self.sterge = function(idx) {
    	self.arr.splice(idx, 1);
    }

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Lapte, Miere, Oua, Bere, Mere_bucata, Mere_KG, \
      Sare, Zagar, Rosii';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }


});