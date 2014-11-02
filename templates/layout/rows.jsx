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
			<div className={ offsetClass }>
  			<span className="help-block">{ field.def.description }</span>
  		</div>
		}

		if(field.opts.writable && field.error && field.dirty){
			errorClass = ' has-error'
			errorDiv = 
			<div className={ "biro-error-padding " + offsetClass }>
	    	<span className="label label-danger">{ field.error }</span>
	    </div>
		}

    var t =
    	<div className={ 'form-group' + errorClass }>
	    	<label for={ field.property } className={ "control-label " + labelClass }>
	    		{ utils.fieldTitle(field.def) }
	    	</label>
		    <div className={ guiClass }>{ gui }</div>
		    { descriptionDiv }
		    { errorDiv }
	  	</div>

	  return t
  })

  return fields
}
