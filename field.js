var templates = require('./templates').field
var dotty = require('dotty')

/*

  lots of field types use the text template
  also - a field might have a custom template associated with it
  
*/

var textTemplates = {
  text:true,
  email:true,
  number:true,
  url:true,
  date:true,
  time:true,
  dateTimeLocal:true,
  month:true,
  week:true
}

function getFieldTemplate(field){
  var type = field.type || 'text'
  if(textTemplates[type]){
    return templates.text
  }
  else if(field.template){
    return field.template
  }
  else{
    if(templates[field.type]){
      return templates[field.type]
    }
    else{
      return templates.text
    }
  }
}

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
    var templateHTML = getFieldTemplate($scope.field)
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