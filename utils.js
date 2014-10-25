var upperCase = require('upper-case-first')
var dotty = require('dotty')

/*

  convert the source schema into the one the be used
  
*/
function mapField(field){
  if(typeof(field)==='string') field = {name:field}
  if(!field.type) field.type = 'text'
  field.title = fieldTitle(field)
  return field
}

function fieldTitle(field){
  var title = upperCase(field.title || field.name)
  return title
}

function setValue(field, model, newValue){
  dotty.put(model, field.name, newValue)
}

function getValue(field, model){
  return dotty.get(model, field.name)
}

function optionValue(opt){
  if(!opt) return null
  if(typeof(opt)==='function') return opt()
  if(typeof(opt)==='object') return opt.value
  return opt
}

function optionTitle(opt){
  if(!opt) return ''
  if(typeof(opt)==='function') return upperCase(opt())
  if(typeof(opt)==='object') return upperCase(opt.title)
  return upperCase(opt)
}

module.exports = {
  mapField:mapField,
  fieldTitle:fieldTitle,
  setValue:setValue,
  getValue:getValue,
  optionValue:optionValue,
  optionTitle:optionTitle
}