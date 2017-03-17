/**
 * Created by shennana on 2017/3/15.
 */
angular.module('app', ['components'])
 
.controller('coreController', function($scope, $locale) {
    $scope.dbs = [{
        name:'aaa',
        code:'1'
    },{
        name:'bbb',
        code:'2'
    },{
        name:'ccc',
        code:'3'
    },{
        name:'ddd',
        code:'4'
    }]

    $scope.personalMsg={
      "name":"amies",
      "email":"amies.shen@gmail.com"
    }
    $scope.format = "M/d/yy h:mm:ss a";
    $scope.names = "amies-outside";
    $scope.isHideDialog = false;
    $scope.closeDialog = function(message){
    	$scope.isHideDialog = true;
    	$scope.message = message;
    }
})
.controller('AdvancedDemoController', function($scope, $locale) {
   
    $scope.dragoverCallback = function(index, external, type, callback) {
        $scope.logListEvent('dragged over', index, external, type);
        // Invoke callback to origin for container types.
        if (type == 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 10; // Disallow dropping in the third row.
    };

    $scope.dropCallback = function(index, item, external, type) {
        $scope.logListEvent('dropped at', index, external, type);
        // Return false here to cancel drop. Return true if you insert the item yourself.
        return item;
    };

    $scope.logEvent = function(message) {
        console.log(message);
    };

    $scope.logListEvent = function(action, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        console.log(message);
    };

    // Initialize model
    $scope.model = [[], []];
    var id = 10;
    angular.forEach(['all', 'move', 'copy', 'link', 'copyLink', 'copyMove'], function(effect, i) {
      var container = {items: [], effectAllowed: effect};
      for (var k = 0; k < 7; ++k) {
        container.items.push({label: effect + ' ' + id++, effectAllowed: effect});
      }
      $scope.model[i % $scope.model.length].push(container);
    });

    $scope.$watch('model', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
})