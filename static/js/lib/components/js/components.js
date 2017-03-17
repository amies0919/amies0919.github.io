/**
 * Created by shennana on 2017/3/15.
 */
angular.module('components', [])
  .directive('amiesAbout', function() {
    return {
      restrict: 'AEC',
      scope:{
      	info:'=msg'
      },
      templateUrl:function(elem,attr){
      	return '../static/js/lib/components/template/amies-about/amies-about-'+attr.type+'.html'
      }      
    };
  })
    .directive('amiesClock', ['$interval','dateFilter',function($interval,dateFilter) {
    return {
      restrict: 'AEC',
      scope:{
      	format:'=format'
      },
      templateUrl:function(elem,attr){
      	attr.type = attr.type || 'normal';
      	return '../static/js/lib/components/template/amies-clock/amies-clock-'+attr.type+'.html'
      },
      link:function(scope,elem,attr){
      		var format,timeoutId;
      		function updateTime(){
      			scope.currentTime = dateFilter(new Date(),format);
      		}
      		scope.$watch('format',function(value){
      				format =  value;
      				updateTime();
      		})
      		elem.on('$destroy',function(){
      			$interval.cancel(timeoutId);
      		})
      		timeoutId = $interval(function(){
      			updateTime();
      		},1000)
      }      
    };
  }])
  .directive('amiesDialog', function() {
    return {
      restrict: 'AEC',
      transclude:true,
      scope:{
        close:'&onClose'
      },
      templateUrl:function(elem,attr){
        return '../static/js/lib/components/template/amies-dialog/amies-dialog-'+attr.type+'.html'
      }

    };
  })
  .directive('amiesTabs', function() {
    return {
      restrict: 'AEC',
      transclude:true,
      scope:{
      },
      controller:['$scope',function($scope){
          var panes = $scope.panes = [];
          $scope.select = function(pane){
            angular.forEach(panes,function(pane){
                pane.selected = false;
            })
            pane.selected = true;
          }
          this.addPane = function(pane){
            if (panes.length === 0) {
              $scope.select(pane);
            }
            panes.push(pane);
          }
      }],
      templateUrl:function(elem,attr){
         attr.type = attr.type || 'normal';
        return '../static/js/lib/components/template/amies-tabs/amies-tabs-'+attr.type+'.html'
      }

    };
  })
   .directive('amiesPane', function() {
    return {
      require: ['^^amiesTabs'],
      restrict: 'AEC',
      transclude:true,
      scope:{
        title:'@'
      },
      link:function(scope,elem,attr,controllers){
          var tabsCtrl = controllers[0];
          tabsCtrl.addPane(scope);
      },
      templateUrl:function(elem,attr){
        attr.type = attr.type || 'normal';
        return '../static/js/lib/components/template/amies-pane/amies-pane-'+attr.type+'.html'
      }

    };
  })

  .directive('amiesDb',function(){
    return{
      restrict: 'AEC',
      scope:{
        lists:'=list'
      },
      templateUrl:function(elem,attr){
        return '../static/js/lib/components/template/amies-db/amies-db.html'
      },
      replace:false,
      link:function(scope,elem,attr,controllers){
        scope.newList = [];
        scope.getDbTarget = function(list){
            console.log(list);
            if(list){
              scope.newList.push(list);
            }
        }
        scope.$watch('newList',function(value){
            if(value){
              console.log(value);
            }
        },true)
      }
    }
  });

 