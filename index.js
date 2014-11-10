var mercury = require('mercury')
var stylesheet = require('./stylesheet')
var observify = require('observify')
var Form = require('./form')

function biro(opts){
	opts = opts || {}

	var state = Form({
		schema:opts.schema || [],
		layout:opts.layout || 'basic'
	})

	if(opts.model){
		state.fns.setModel(opts.model)
	}

	return {
		state:function(){
			return state
		},
		render:function(elem){
			if(!elem) throw new Error('biro.render requires DOM element')
			mercury.app(elem, state, Form.Render);
		},
		change:function(fn){
			if(!fn) throw new Error('biro.change requires a listener function')
			state.model(fn)
		},
		errors:function(){
			//return state.errors()
		},
		setData:function(data){
			return state.fns.setData(data)
		},
		getData:function(data){
			return state.model()
		}
	}
	
}

module.exports = biro
module.exports.view = Form.Render