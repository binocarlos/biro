var templates = require('./templates').field

function Field($compile){

  function controller($scope){
    if(!$scope.type) $scope.type = 'text'
  }

  function linker($scope, $elem, $attr) {
    console.log('-------------------------------------------');
    console.log('linker')
    console.dir($scope.field)
    $elem.html('apples')
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