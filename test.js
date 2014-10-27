var biro = require('./')
var tape = require('tape')
var utils = require('./utils')

tape('biro should be a function', function(t){
	t.equal(typeof(biro), 'function', 'biro is a function')
	t.end()
})

tape('utils map field', function(t){
	var field = utils.mapField('color')

	t.equal(field.property, 'color')
	t.end()
})