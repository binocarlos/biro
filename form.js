var mercury = require('mercury')
var observify = require('observify')
var deep = require('deep-access')
var utils = require('./utils')
var Field = require('./field')
var templates = require('./templates')
var h = mercury.h

function Form(opts){
  opts = opts || {}

  var model = opts.model || {}
  var schema = (opts.schema || []).map(utils.mapField)

  schema.forEach(function(fieldDef){
    if(!model[fieldDef.property]) model[fieldDef.property] = null
  })

  var static = mercury.value(opts.static ? true : false)
  var readonly = mercury.value(opts.readonly ? true : false)

  // writable is if we are not readonly and not static
  var writable = mercury.computed([static, readonly], function(s, r){
    return !s && !r
  })

  var modelState = observify(model)

  var schemaState = mercury.array(schema.map(function(fieldDef){
    return Field(fieldDef, deep(modelState, fieldDef.property), {
      writable:writable
    })
  }))

  var state = mercury.struct({
    model:modelState,
    schema:schemaState,
    writeable:writable,
    readonly:readonly,
    static:static,
    layout:mercury.value(opts.layout || 'basic')
  })

  return state
}

Form.Render = function(state){
  return templates.layout[state.layout](state.schema)
}

module.exports = Form

/*
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
*/