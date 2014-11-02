/**
 * @jsx h
 */

var h = require('mercury').h
var utils = require('../../utils')

module.exports = function(fields, opts){
	opts = opts || {}
	var offsetClass = opts.offsetClass || ''
	var labelClass = opts.labelClass || ''
	var guiClass = opts.guiClass || ''

	var fields = fields.map(function(field){

		var gui = field.fns.template(field)
		var descriptionDiv
		var errorDiv
		var errorClass = ''

		if(field.opts.writable && field.def.description){
			descriptionDiv = 
			h("div", {className: offsetClass }, [
  			h("span", {className:"help-block"}, [ field.def.description ])
  		])
		}

		if(field.opts.writable && field.error && field.dirty){
			errorClass = ' has-error'
			errorDiv = 
			h("div", {className: "biro-error-padding " + offsetClass }, [
	    	h("span", {className:"label label-danger"}, [ field.error ])
	    ])
		}

    var t =
    	h("div", {className: 'form-group' + errorClass }, [
	    	h("label", {for: field.property,  className: "control-label " + labelClass }, [
	    		 utils.fieldTitle(field.def) 
	    	]),
		    h("div", {className: guiClass }, [ gui ]),
		     descriptionDiv, 
		     errorDiv 
	  	])

	  return t
  })

  return fields
}
