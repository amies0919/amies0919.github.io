/**
 * Created by shennana on 2017/3/15.
 */
angular.module('components', [])
 
  .directive('amiesAbout', function() {
    return {
      templateUrl:function(elem,attr){
          return '../template/amies-about/amies-about-'+attr.type+'.html'
      }
    };
  })
 