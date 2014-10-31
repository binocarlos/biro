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

    var t =
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

	  return t
  })

  return fields
}
