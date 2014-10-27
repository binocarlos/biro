var mercury = require('mercury')
var stylesheet = require('./stylesheet')
var Form = require('./form')

function biro(opts){
	opts = opts || {}
	
	var state = Form({
		schema:opts.schema || [],
		model:opts.model || {},
		layout:opts.layout || 'basic'
	})

	return {
		state:function(){
			return state
		},
		render:function(elem){
			if(!elem) throw new Error('biro.render requires DOM element')
		},
		change:function(fn){
			if(!fn) throw new Error('biro.change requires a listener function')
		},
		errors:function(){
			//return state.errors()
		},
		model:function(){
			//return state.model()
		}
	}
	
}

function view(state){

}

module.exports = biro
module.exports.view = view