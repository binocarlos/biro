/**
 * @jsx h
 */

var h = require('mercury').h
var Field = require('../../field')
var utils = require('../../utils')

module.exports = function(fields, opts){
	opts = opts || {}
	var offsetClass = opts.offsetClass || ''
	var labelClass = opts.labelClass || ''
	var guiClass = opts.guiClass || ''

	return fields.map(function(field){
		var gui = Field.render(field)
		var description
		var error

		if(field.writable && field.description){
			description = 
			h("div", {class: offsetClass }, [
  			h("span", {class:"help-block"}, [ field.description ])
  		])
		}

		if(field.writable && field.error){
			error = 
			h("div", {class: "biro-error-padding " + offsetClass }, [
	    	h("span", {class:"label label-danger"}, [ field.error ])
	    ])
		}

    return 
    	h("div", {class:'form-group ' + field.error ? 'has-error' : '' }, [
	  		h("div", {class:"row"}, [
		    	h("label", {for: field.property,  class: "control-label " + labelClass }, [
		    		 utils.fieldTitle(field) 
		    	]),
			    h("div", {class: guiClass }, [ gui ]),
			    description,
			    error
			  ])
	  	])
  })
}
