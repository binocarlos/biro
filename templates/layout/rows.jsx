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
			<div className={ offsetClass }>
  			<span className="help-block">{ field.description }</span>
  		</div>
		}

		if(field.writable && field.error){
			error = 
			<div className={ "biro-error-padding " + offsetClass }>
	    	<span className="label label-danger">{ field.error }</span>
	    </div>
		}

    var t =
    	<div className={'form-group ' + field.error ? 'has-error' : '' }>
	  		<div className="row">
		    	<label for={ field.property } className={ "control-label " + labelClass }>
		    		{ utils.fieldTitle(field) }
		    	</label>
			    <div className={ guiClass }>{ gui }</div>
			    {description}
			    {error}
			  </div>
	  	</div>

	  return t
  })

  return fields
}
