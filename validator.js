var dotty = require('dotty')
var isEmpty = require('is-empty')
var utils = require('./utils')

/*

	the validator studies the field and returns
	null for no error or a string for the first error
	encountered
	
*/
module.exports = function(model, isDirty){
  return function(field){
    if(!isDirty(field.name)) return null
    var value = utils.getValue(field, model)
    if(field.required && isEmpty(value)){
      return 'required'
    }
    return null
  }
}