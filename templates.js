var textTemplates = {
  text:'text',
  number:'text',
  date:'date',
  time:'time',
  datetimelocal:'dateTimeLocal',
  datetime:'dateTimeLocal',
  month:'month',
  week:'week'
}

var layoutTemplates = {
  basic:require('./templates/layout/basic'),
  horizontal:require('./templates/layout/horizontal'),
  inline:require('./templates/layout/inline')
}

var fieldTemplates = {/*
  text:fs.readFileSync(__dirname + '/templates/field/text.html', 'utf8'),
  radio:fs.readFileSync(__dirname + '/templates/field/radio.html', 'utf8'),
  checkbox:fs.readFileSync(__dirname + '/templates/field/checkbox.html', 'utf8'),
  select:fs.readFileSync(__dirname + '/templates/field/select.html', 'utf8'),
  textarea:fs.readFileSync(__dirname + '/templates/field/textarea.html', 'utf8')*/
}

function textInputType(type){
  type = type || 'text'
  return textTemplates[type.toLowerCase()]
}

function fieldTemplate(field){
  var type = field.type || 'text'
  if(textTemplates[type.toLowerCase()]){
    return fieldTemplates.text
  }
  else if(field.template){
    return field.template
  }
  else{
    if(fieldTemplates[field.type]){
      return fieldTemplates[field.type]
    }
    else{
      return fieldTemplates.text
    }
  }
}

var templates = {
  layout:layoutTemplates,
  field:fieldTemplates,
  textTemplates:textTemplates,
  textInputType:textInputType,
  fieldTemplate:fieldTemplate
}

module.exports = templates