/**
 * @jsx h
 */

var h = require('mercury').h
var templates = require('../../texttemplates')

module.exports = function(field){
	
	var value = field.value
	var gui
	if(field.static){
		gui = h("p", {class:"form-control-static"}, [ value ])
	}
	else{
		gui = 
		h("input", 
			{type: textTemplates.inputType(field.def.type),  
			value: value,  
			class:"form-control", 
			name: field.def.property,  
			id: field.def.property,  
			placeholder: field.def.placeholder } )
	}

	return h("div", [ gui ])
}
