var fs = require('fs')
var angular = require('angular-bsfy')

var templates = {
  
}

module.exports = angular
	.module('biro', [
    
  ])

  .directive('biroForm', function(){

    return {
      restrict:'EA',
      scope:{
        schema:'=',
        model:'=',
        layout:'@'
      },
      replace:true,
      controller:function($scope){
        
      },
      link: function($scope, $elem, $attr) {
        console.log('-------------------------------------------');
        console.dir($scope.layout)
        console.dir($scope.model)
        console.dir($scope.schema)
      }
    }
  })
