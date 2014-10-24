var dotty = require('dotty')
var utils = require('./utils')

/*

	the validator studies the field and returns
	null for no error or a string for the first error
	encountered
	
*/
module.exports = function(model, originalModel){
	function isDirty(field){
    return utils.getValue(field, model)!==utils.getValue(field, originalModel)
  }

  return function(field){
  	console.log('-------------------------------------------');
  	console.log('get valid')
  	console.dir(field)
    return null
  }
}