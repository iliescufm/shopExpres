app.controller("BuildListCtrl", function($scope, $http, $rootScope, $state, $q, $mdDialog){


    $rootScope.arr = [
        {
            searchText: 'Lapte (litru) 2',
        },
    ]


    $http.get('/api/products/getCategories').then((res) => {
        $scope.states = res.data.map((categ)=>{
            return {
                value: categ.id,
                display: categ.keyword + " (" + categ.unit + ") "
            }
        })
    });

    $scope.add_new = function() {
        $rootScope.arr.push({
            selectedItem: '',
            searchText: '',
        })
    }

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

    $scope.genereazaCosul = function() {
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
             controller: function() {

             }
        });

        $rootScope.arr.map((item) => {
            item.quantity = item.searchText.match(/\d+/)[0];
            $scope.states.forEach((categ) => {
                console.log('>', item.searchText.startsWith(categ.display))
                if(item.searchText.startsWith(categ.display))
                    item.id = categ.value
            })
        })
        
        $state.go('generatedProducts')

    }

    $scope.sterge = function(idx) {
        $rootScope.arr.splice(idx, 1);
    }

    $scope.querySearch = function(query) {
        return $scope.states.filter((state) => {
            return state.display.startsWith(query)
        });
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    
});