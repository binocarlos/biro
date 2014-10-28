var utils = require('./utils')
var templates = require('./templates').field
var codec = require('./codec')
var mercury = require('mercury')
var observify = require('observify')
var h = mercury.h

function Field(def, value){

  var fieldDef = observify(def)

  var events = mercury.input(['change', 'dirty'])

  var state = mercury.struct({
    def:observify(def),
    value:value,
    events:events
  })

  events.change(function(data){

    console.log('-------------------------------------------');
    console.log('new data')
    console.log(def.property)
    console.log(data)

  })

  events.dirty(function(){

  })

  return state
}

Field.render = function(state){
  return h('div', 'this is a field')
}

module.exports = Field

/*
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


function Field(definition){

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

    $scope.convertNewlines = utils.convertNewlines
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

*/