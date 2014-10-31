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
			h("div", {className: offsetClass }, [
  			h("span", {className:"help-block"}, [ field.description ])
  		])
		}

		if(field.writable && field.error){
			error = 
			h("div", {className: "biro-error-padding " + offsetClass }, [
	    	h("span", {className:"label label-danger"}, [ field.error ])
	    ])
		}

    var t =
    	h("div", {className:'form-group ' + field.error ? 'has-error' : '' }, [
	  		h("div", {className:"row"}, [
		    	h("label", {for: field.property,  className: "control-label " + labelClass }, [
		    		 utils.fieldTitle(field) 
		    	]),
			    h("div", {className: guiClass }, [ gui ]),
			    description,
			    error
			  ])
	  	])

	  return t
  })

  return fields
}
