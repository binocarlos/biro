/**
 * @jsx h
 */

var h = require('mercury').h
var Rows = require('./rows')

module.exports = function(fields){
	var rows = Rows(fields)
	console.log('-------------------------------------------');
	console.log(rows)
	return h("form", {name:"biroForm", role:"form"}, [rows])
}
