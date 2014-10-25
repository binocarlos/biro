var templates = require('./templates').field
var upperCase = require('upper-case-first')
var dotty = require('dotty')

/*

  lots of field types use the text template
  also - a field might have a custom template associated with it
  
*/
var textTemplates = {
  text:true,
  email:true,
  number:true,
  url:true,
  date:true,
  time:true,
  dateTimeLocal:true,
  month:true,
  week:true
}

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

/*

  if the field has a template property - assume its a html string and use that

  otherwise check if there is a template HTML file for the type
  
*/
function fieldTemplate(field){
  var type = field.type || 'text'
  if(textTemplates[type]){
    return templates.text
  }
  else if(field.template){
    return field.template
  }
  else{
    if(templates[field.type]){
      return templates[field.type]
    }
    else{
      return templates.text
    }
  }
}

module.exports = {
  mapField:mapField,
  fieldTitle:fieldTitle,
  setValue:setValue,
  getValue:getValue,
  fieldTemplate:fieldTemplate
}