var dotty = require('dotty')
var isEmpty = require('is-empty')
var utils = require('./utils')

/*

	the validator studies the field and returns
	null for no error or a string for the first error
	encountered
	
*/
module.exports = function(model, originalModel){
	function isDirty(field){
    var currentValue = utils.getValue(field, model)
    var originalValue = utils.getValue(field, originalModel)

    if(isEmpty(currentValue) && isEmpty(originalValue)){
      return false
    }
    else{
      return currentValue!==originalValue
    }
  }

  return function(field){
    if(!isDirty(field)) return null
    return 'problem'
  }
}