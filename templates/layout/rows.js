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

		console.log('-------------------------------------------');
		console.log('error: ' + field.error)

		if(field.opts.writable && field.def.description){
			description = 
			h("div", {className: offsetClass }, [
  			h("span", {className:"help-block"}, [ field.def.description ])
  		])
		}

		if(field.opts.writable && field.error){
			error = 
			h("div", {className: "biro-error-padding " + offsetClass }, [
	    	h("span", {className:"label label-danger"}, [ field.error ])
	    ])
		}

		//<div className={'form-group ' + field.error ? 'has-error' : '' }>

    var t =
    	h("div", {className: 'form-group' }, [
	    	h("label", {for: field.property,  className: "control-label " + labelClass }, [
	    		 utils.fieldTitle(field.def) 
	    	]),
		    h("div", {className: guiClass }, [ gui ]),
		    description,
		    error
	  	])

	  return t
  })

  return fields
}
