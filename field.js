var utils = require('./utils')

function Field($compile){

  function controller($scope){
    if(!$scope.field) $scope.field = {}
    $scope.type = $scope.field.type || 'text'
    $scope.val = utils.getValue($scope.field, $scope.model)
    $scope.flagDirty = function(){
      $scope.$emit('flagdirty', $scope.field.name)
    }
    $scope.$watch('val', function(newval){
      utils.setValue($scope.field, $scope.model, newval)
    })
  }

  function linker($scope, $elem, $attr) {
    var templateHTML = utils.fieldTemplate($scope.field)
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