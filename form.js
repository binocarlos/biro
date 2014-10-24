var templates = require('./templates').layout
var utils = require('./utils')
var validator = require('./validator')

function Form($compile){

  function controller($scope){
    
    $scope.originalModel = JSON.parse(JSON.stringify($scope.model))
    $scope.layout = $scope.layout || 'basic'
    $scope.readonly = $scope.readonly=='true' ? true : false
    $scope.fieldTitle = utils.fieldTitle
    
    var dirty = {}
    $scope.$on('flagdirty', function($e, fieldname){
      dirty[fieldname] = true
    })

    $scope.fieldError = validator($scope.model, function(fieldname){
      return dirty[fieldname]
    })
  }
  
  function linker($scope, $elem, $attr) {
    var templateHTML = templates[$scope.layout]
    var templateElem = $compile(templateHTML)($scope)
    $elem.replaceWith(templateElem)
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
}

module.exports = Form