var templates = require('./templates').layout
var utils = require('./utils')
var validator = require('./validator')

function Form($compile){

  function controller($scope){
    $scope.schema = ($scope.srcschema || []).map(utils.mapField)
    $scope.originalModelValues = JSON.parse(JSON.stringify($scope.model))
    $scope.layout = $scope.layout || 'basic'
    $scope.readonly = $scope.readonly=='true' ? true : false
    $scope.static = $scope.static=='true' ? true : false
    $scope.writable = !$scope.readonly && !$scope.static
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
      srcschema:'=schema',
      model:'=',
      readonly:'@',
      static:'@',
      layout:'@'
    },
    replace:true,
    controller:controller,
    link:linker
  }
}

module.exports = Form