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

module.exports = {
  fieldTitle:function(field){
    var title = upperCase(field.title || field.name)
    return title
  },
  setValue:function(field, model, newValue){
  	dotty.put(model, field.name, newValue)
  },
  getValue:function(field, model){
  	return dotty.get(model, field.name)
  },
	/*

	  if the field has a template property - assume its a html string and use that

	  otherwise check if there is a template HTML file for the type
	  
	*/
  fieldTemplate:function(field){
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
}