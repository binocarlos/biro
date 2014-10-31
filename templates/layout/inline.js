/**
 * @jsx h
 */

var h = require('mercury').h
var utils = require('../../utils')

module.exports = function(fields){
	var rows = fields.map(function(field){
		var gui = field.fns.template(field)
		
    return 
    	h("div", {class:'form-group ' + field.error ? 'has-error' : '' }, [
	    	h("label", {for: field.property,  class:"control-label"}, [ utils.fieldTitle(field) ]),
		    h("div", [ gui ])
	  	])
  })

	return h("form", {name:"biroForm", class:"form-inline", role:"form"}, [rows])
}
