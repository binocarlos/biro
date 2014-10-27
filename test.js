var biro = require('./')
var tape = require('tape')

tape('biro should be a function', function(t){
	t.equal(typeof(biro), 'function', 'biro is a function')
	t.end()
})

