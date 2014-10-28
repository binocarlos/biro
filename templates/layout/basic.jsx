/**
 * @jsx h
 */
var Field = require('../../field')

function hasError(){
	return false
}

function fieldTitle(){
	return 'apples'
}

// <biro-field static="static" readonly="readonly" field="field" model="model" />

module.exports = function(fields){
	var rows = fields.map(function(field){
		var gui = Field.render(field)
    return <div 
	  	class="form-group { hasError ? 'has-error' : '' }">
	  		<div class="row">
		    	<label for="{ field.property }" class="control-label">{ fieldTitle(field) }</label>
			    <div>{ gui }</div>
			    {/*
			    <div ng-if="writable && field.description ? true : false" class="">
			    	<span class="help-block">{{ field.description }}</span>
			    </div>
			    <div ng-if="writable && fieldError(field) ? true : false" class="biro-error-padding">
			    	<span class="label label-danger">{{ fieldError(field) }}</span>
			    </div>
			  	*/}
			  </div>
	  </div>
  })

	return <form name="form" role="form">{rows}</form>
}
