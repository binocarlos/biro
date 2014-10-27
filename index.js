var mercury = require('mercury')
var stylesheet = require('./stylesheet')

module.exports = function(elem, schema, model, opts){
	if(!elem) throw new Error('biro requires an element to be rendered to')
	schema = schema || []
	model = model || {}
	opts = opts || {}

	opts.schema = schema

	var state = Form(opts, model)
}