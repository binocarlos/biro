var fs = require('fs')
var angular = require('angular-bsfy')

var templates = {
  
}

module.exports = angular
	.module('biro', [
    
  ])

  .directive('biroForm', function(){

    function controller($scope){
      $scope.layout = $scope.layout || 'basic'
      $scope.readonly = $scope.readonly=='true' ? true : false
    }

    function linker($scope, $elem, $attr) {
      
    }

    return {
      restrict:'EA',
      scope:{
        schema:'=',
        model:'=',
        readonly:'@',
        layout:'@'
      },
      replace:true,
      controller:controller,
      link:linker
    }
  })
