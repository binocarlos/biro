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
			<div class={ offsetClass }>
  			<span class="help-block">{ field.description }</span>
  		</div>
		}

		if(field.writable && field.error){
			error = 
			<div class={ "biro-error-padding " + offsetClass }>
	    	<span class="label label-danger">{ field.error }</span>
	    </div>
		}

    return 
    	<div class={'form-group ' + field.error ? 'has-error' : '' }>
	  		<div class="row">
		    	<label for={ field.property } class={ "control-label " + labelClass }>
		    		{ utils.fieldTitle(field) }
		    	</label>
			    <div class={ guiClass }>{ gui }</div>
			    {description}
			    {error}
			  </div>
	  	</div>
  })
}
