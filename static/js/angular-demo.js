var app = angular.module('demo',[]);
// app.controller('demoCtrl',function($scope,$rootScope){
// 	console.log($rootScope.test);
// 	$rootScope.test = "aaaaa";
// });
// app.config(['$compileProvider',function($compileProvider){
// 	$compileProvider.directive('myDirective',function(){
// 		return {
// 			restrict: 'AE',
// 			replace: true,
// 			scope: true,
// 			template: '<span>Hello</span>',
// 			compile: function(tElement){
// 				console.log('compile:'+tElement);
// 				return function(scope,ele){
// 					console.log('link:'+ele);
// 				}
// 			}
// 		};
// 	})
// }]);
// app.directive('myDirective',function(){
// 	return {
// 		restrict: 'AE',
// 		replace: true,
// 		scope: true,
// 		template: '<span>Hello</span>',
// 		compile: function(tElement){
// 			console.log('compile:'+tElement);
// 			return function(scope,ele){
// 				console.log('link:'+ele);
// 			}
// 		}

// 	}
// });
// app.run(['$injector','$rootScope',function($injector,$rootScope){
// 	$rootScope.test = '1111';
// 	console.log($injector.get('ngIf' + 'Directive'));
// }]);
// angular.element(document).ready(function() {
//     angular.bootstrap(document,['demo']);
// });
app.controller('myController', function () {
   
    this.name = 'maxin'; // 给controller实例赋值
});

app.directive('myDirective', function () {
   return {
       controller: 'myController',
       link: function (scope, elem, attrs, ctrl) {
           console.log(ctrl, scope);
       }
   } 
});
var injector = angular.injector(['ng']);
injector.invoke(['$rootScope',function(rootScope,scope){
	console.log(rootScope);
}])