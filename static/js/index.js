/**
 * Created by shennana on 2017/3/15.
 */
angular.module('app', ['components'])
 
.controller('coreController', function($scope, $locale) {
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
});