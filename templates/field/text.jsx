/**
 * @jsx h
 */

var h = require('mercury').h
var textTemplates = require('../../texttemplates')

module.exports = function(field){
	
	var value = field.value
	var gui
	if(field.static){
		gui = <p class="form-control-static">{ value }</p>
	}
	else{
		gui = 
		<input 
			type={ textTemplates.inputType(field.def.type) } 
			value={ value } 
			class="form-control" 
			name={ field.def.property } 
			id={ field.def.property } 
			placeholder={ field.def.placeholder } />
	}

	return <div>{ gui }</div>
}
