var utils = require('./utils')
var templates = require('./templates').field
var mercury = require('mercury')
var h = mercury.h

function RenderField(state){
  return h('div', 'this is a field')
}

module.exports = RenderField