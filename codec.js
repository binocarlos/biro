/*

  responsible for encoding a model value onto the form value
  and the form value back into the model value

  useful for things like number fields / csv split arrays etc

  encode = MODEL -> FORM
  decode = FORM -> MODEL
  
*/

var types = {
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
    if(types[field.type]) return types[field.type].encode(value)
    return value
  },
  decode:function(field, value){
    if(field.decode) return field.decode(value)
    if(types[field.type]) return types[field.type].decode(value)
    return value
  }
}