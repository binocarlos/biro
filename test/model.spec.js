import expect from 'expect'
import model from '../lib/model'
const FORM_SCHEMA = [
  'name',
  'color'
]

describe('reducer', () => {

  it('will process a schema', () => {
    
    var schema = model.process_schema(FORM_SCHEMA)

    expect(schema).toEqual([
      {
        "name": "name",
        "type": "text",
        "title": "Name"
      },
      {
        "name": "color",
        "type": "text",
        "title": "Color"
      }
    ])

  })

  it('will genetate some meta data', () => {

    var schema = [{
      name:'color',
      validate:function(v){
        return v.indexOf('r')==0 ? null : 'color must start with r'
      }
    },{
      name:'height'
    }]

    var validate = function(data, meta){
      var ret = {}
      if(data.color=='red' && data.height<10){
        ret.height = 'red things must be more than 10 tall'
      }
      return ret
    }

    var data1 = {
      color:'red',
      height:5
    }

    var meta = model.generate_meta(null, data1, schema, validate)

    expect(meta).toEqual({
      "valid": false,
      "dirty": false,
      "fields": {
        "color": {
          "valid": true,
          "dirty": false
        },
        "height": {
          "valid": false,
          "dirty": false,
          "error": "red things must be more than 10 tall"
        }
      }
    })

    
  })

})
