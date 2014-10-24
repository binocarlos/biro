var templates = require('./templates').layout

function Form($compile){

  function controller($scope){
    $scope.layout = $scope.layout || 'basic'
    $scope.readonly = $scope.readonly=='true' ? true : false
  }

  function linker($scope, $elem, $attr) {
    var templateHTML = templates[$scope.layout]
    console.log('-------------------------------------------');
    console.dir(templateHTML)
    $elem.replaceWith($compile(templateHTML)($scope))
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