var templates = require('./templates').layout
var utils = require('./utils')

function Form($compile){

  function controller($scope){
    $scope.layout = $scope.layout || 'basic'
    $scope.readonly = $scope.readonly=='true' ? true : false
    $scope.fieldTitle = utils.fieldTitle
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