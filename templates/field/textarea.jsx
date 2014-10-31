/**
 * @jsx h
 */

var h = require('mercury').h
var textTemplates = require('../../texttemplates')

module.exports = function(field){
	
	var value = field.value
	var height = field.def.height || 100
	var gui
	if(field.static){
		gui = <p class="form-control-static">{ value }</p>
	}
	else{
		gui = 
		<textarea 
			ev-blur={ mercury.event(field.events.blur) } 
			ev-change={ events.change } 
			class="form-control" 
			name={ field.def.property } 
			style={ "height:" + height + "px" } 
			id={ field.def.property } 
			placeholder={ field.def.placeholder }>
			{ value }
		</textarea>
	}

	return <div>{ gui }</div>
}
