var utils = require('./utils')
var templates = require('./templates').field
var codec = require('./codec')

/*

  lots of field types use the text template
  also - a field might have a custom template associated with it
  
*/
var textTemplates = {
  text:'text',
  number:'text',
  date:'date',
  time:'time',
  datetimelocal:'dateTimeLocal',
  datetime:'dateTimeLocal',
  month:'month',
  week:'week'
}


/*

  if the field has a template property - assume its a html string and use that

  otherwise check if there is a template HTML file for the type
  
*/
function fieldTemplate(field){
  var type = field.type || 'text'
  if(textTemplates[type.toLowerCase()]){
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
    $scope.val = codec.encode($scope.field, utils.getValue($scope.field, $scope.model))

    // the template runs this to indicate the value has been
    // messed with - normally a blur or click
    $scope.flagDirty = function(){
      $scope.$emit('flagdirty', $scope.field.name)
    }

    // get the type to be used in a text field (e.g. number)
    $scope.textFieldType = function(field){
      var type = field.type || 'text'
      return textTemplates[type.toLowerCase()] || 'text'
    }

    $scope.optionValue = utils.optionValue
    $scope.optionTitle = utils.optionTitle
    $scope.optionSet = function(val){
      $scope.val = val
    }

    $scope.$watch('val', function(newval){
      newval = codec.decode($scope.field, newval)
      utils.setValue($scope.field, $scope.model, newval)
    })
  }

  function linker($scope, $elem, $attr, ctrl) {
    var templateHTML = fieldTemplate($scope.field)
    var templateElem = $compile(templateHTML)($scope)
    $elem.replaceWith(templateElem)
  }

  return {
    restrict:'EA',
    scope:{
      field:'=',
      model:'=',
      readonly:'=',
      static:'='
    },
    replace:true,
    controller:controller,
    link:linker
  }
}

module.exports = Field