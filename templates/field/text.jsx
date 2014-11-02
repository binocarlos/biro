/**
 * @jsx h
 */

var mercury = require('mercury')
var h = mercury.h

module.exports = function(field){
	
	var value = field.value
	var gui
	if(field.static){
		gui = <p className="form-control-static">{ value }</p>
	}
	else{
		gui = 
		<input 
			type={ field.textType } 
			value={ value } 
			ev-blur={ mercury.event(field.events.blur) } 
			ev-event={ mercury.changeEvent(field.events.change) }
			className="form-control" 
			name={ field.def.property } 
			id={ field.def.property } 
			placeholder={ field.def.placeholder } />
	}

	return <div>{ gui }</div>
}
