var mercury = require('mercury')
var observify = require('observify')
var deep = require('deep-access')
var utils = require('./utils')
var Field = require('./field')
var templates = require('./templates')
var h = mercury.h

function Form(opts){
  opts = opts || {}

  var schema = (opts.schema || []).map(utils.mapField)

  var model = {}
  schema.forEach(function(fieldDef){
    model[fieldDef.property] = null
  })

  var static = mercury.value(opts.static ? true : false)
  var readonly = mercury.value(opts.readonly ? true : false)

  // writable is if we are not readonly and not static
  var writable = mercury.computed([static, readonly], function(s, r){
    return !s && !r
  })

  var modelState = observify(model)
  var formOpts = mercury.struct({
    writable:writable,
    readonly:readonly,
    static:static
  })

  var schemaState = mercury.array(schema.map(function(fieldDef){
    return Field(fieldDef, formOpts)
  }))

  var state = mercury.struct({
    model:modelState,
    schema:schemaState,
    writeable:writable,
    readonly:readonly,
    static:static,
    layout:mercury.value(opts.layout || 'basic'),
    fns:{
      setData:function(data){
        for(var i=0; i<state.schema.length; i++){
          var field = state.schema[i]
          console.log('-------------------------------------------');
          console.log('set field value')
          // do encoding here
          console.dir(field)
          //field.value.set(deep(data, field.def.property))
          //field.dirty.set(false)
          
        }
      }
    }
  })

  return state
}

Form.Render = function(state){
  var layoutTemplate = templates.layout[state.layout] || templates.layout.basic
  return layoutTemplate(state.schema)
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