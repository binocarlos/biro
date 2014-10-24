var templates = require('./templates').field
var dotty = require('dotty')

function Field($compile){

  function controller($scope){
    if(!$scope.field) $scope.field = {}
    $scope.type = $scope.field.type || 'text'
    $scope.val = dotty.get($scope.model, $scope.field.name)
    $scope.$watch('val', function(newval){
      dotty.put($scope.model, $scope.field.name, newval)
    })
  }

  function linker($scope, $elem, $attr) {
    var templateHTML = templates[$scope.type]
    var templateElem = $compile(templateHTML)($scope)
    $elem.replaceWith(templateElem)
  }

  return {
    restrict:'EA',
    scope:{
      field:'=',
      model:'=',
      readonly:'@'
    },
    replace:true,
    controller:controller,
    link:linker
  }
}

module.exports = Field