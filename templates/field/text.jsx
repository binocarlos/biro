/**
 * @jsx h
 */

var h = require('mercury').h

module.exports = function(field){
	
	var value = field.value
	var gui
	if(field.static){
		gui = <p className="form-control-static">{ value }</p>
	}
	else{
		console.log('-------------------------------------------');
		console.log('-------------------------------------------');
		console.log('textfield')
		console.dir(field)
		gui = 
		<input 
			type={ field.textType } 
			value={ value } 
			className="form-control" 
			name={ field.def.property } 
			id={ field.def.property } 
			placeholder={ field.def.placeholder } />
	}

	return <div className="tester">{ gui }</div>
}
