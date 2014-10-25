var isEmpty = require('is-empty')
var utils = require('./utils')

var regExps = {
  email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  url:/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i
}

var typeValidators = {
  email:email,
  url:url,
  number:number
}

function number(val){
  return !isNaN(val) && typeof(val)=='number' ? null : 'must be number'
}

function email(val){
  return (val || '').toString().match(regExps.email) ? null : 'not valid email'
}

function url(val){
  return (val || '').toString().match(regExps.url) ? null : 'not valid url'
}

function required(val){
  if(typeof(val)==='boolean') return null
  return isEmpty(val) ? 'required' : null
}

function regexp(regexpString){
  var r = new RegExp(regexpString, 'i')
  return function(val){
    return (val || '').toString().match(r) ? null : 'must match ' + regexpString
  }
}

/*

	the validator studies the field and returns
	null for no error or a string for the first error
	encountered
	
*/
module.exports = function(model, isDirty){
  return function(field){
    if(!isDirty(field.name)) return null
    var value = utils.getValue(field, model)

    var validators = []

    if(field.required) validators.push(required)      
    if(typeValidators[field.type]) validators.push(typeValidators[field.type])
    if(typeof(field.validate)=='string') validators.push(regexp(field.validate))
    if(typeof(field.validate)=='function') validators.push(field.validate)

    var hasError = null
    while(!hasError && validators.length>0){
      var validator = validators.shift()
      hasError = validator(value)
    }
    return hasError
  }
}