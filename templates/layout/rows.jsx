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
			<div className={ offsetClass }>
  			<span className="help-block">{ field.def.description }</span>
  		</div>
		}

		if(field.opts.writable && field.error){
			error = 
			<div className={ "biro-error-padding " + offsetClass }>
	    	<span className="label label-danger">{ field.error }</span>
	    </div>
		}

		//<div className={'form-group ' + field.error ? 'has-error' : '' }>

    var t =
    	<div className={ 'form-group' }>
	    	<label for={ field.property } className={ "control-label " + labelClass }>
	    		{ utils.fieldTitle(field.def) }
	    	</label>
		    <div className={ guiClass }>{ gui }</div>
		    {description}
		    {error}
	  	</div>

	  return t
  })

  return fields
}
