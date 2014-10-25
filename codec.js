/*

  responsible for encoding a model value onto the form value
  and the form value back into the model value

  useful for things like number fields / csv split arrays etc

  encode = MODEL -> FORM
  decode = FORM -> MODEL
  
*/

var types = {
  url:{
    encode:function(val){
      return val ? val : 'http://'
    }
  },
  number:{
    encode:function(val){
      return val
    },
    decode:function(val){
      return parseFloat(val)
    }
  }
}

module.exports = {
  encode:function(field, value){
    if(field.encode) return field.encode(value)
    if((types[field.type] || {}).encode) return types[field.type].encode(value)
    return value
  },
  decode:function(field, value){
    if(field.decode) return field.decode(value)
    if((types[field.type] || {}).decode) return types[field.type].decode(value)
    return value
  }
}