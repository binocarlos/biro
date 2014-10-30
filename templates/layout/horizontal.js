/**
 * @jsx h
 */

var h = require('mercury').h
var Rows = require('./rows')

module.exports = function(fields){
	var rows = Rows(fields, {
		offsetClass:"col-sm-offset-3 biro-horizontal-padding",
		labelClass:"col-sm-3",
		guiClass:"col-sm-9"
	})

	return h("form", {name:"biroForm", class:"form-horizontal", role:"form"}, [rows])
}
