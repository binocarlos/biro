/**
 * @jsx h
 */

var h = require('mercury').h

module.exports = function(field){
	
	var value = field.value
	var gui
	if(field.static){
		gui = h("p", {className:"form-control-static"}, [ value ])
	}
	else{
		gui = 
		h("input", 
			{type: field.textType,  
			value: value,  
			className:"form-control", 
			name: field.def.property,  
			id: field.def.property,  
			placeholder: field.def.placeholder } )
	}

	return h("div", [ gui ])
}
