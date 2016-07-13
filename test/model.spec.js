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

    var meta1 = model.generate_meta(null, data1, schema, validate)

    expect(meta1).toEqual({
      "valid": false,
      "dirty": false,
      "olddata": {
        "color": "red",
        "height": 5
      },
      "fields": {
        "color": {
          "changed": false,
          "valid": true,
          "dirty": false
        },
        "height": {
          "changed": false,
          "valid": false,
          "dirty": false,
          "error": "red things must be more than 10 tall"
        }
      }
    })

    var data2 = {
      color:'blue'
    }

    var meta2 = model.generate_meta(null, data2, schema, validate)

    expect(meta2).toEqual({
      "valid": false,
      "dirty": false,
      "olddata": {
        "color": "blue"
      },
      "fields": {
        "color": {
          "changed": false,
          "error": "color must start with r",
          "valid": false,
          "dirty": false
        },
        "height": {
          "changed": false,
          "valid": true,
          "dirty": false
        }
      }
    })

    var data3 = {
      color:'red',
      height:20
    }

    var meta3 = model.generate_meta({
      dirty:true,
      valid:true,
      "olddata": {
        color:'red',
        height:20
      },
      fields:{
        color:{
          "changed": false,
          valid:true,
          dirty:true
        },
        height:{
          "changed": false,
          valid:false,
          dirty:true
        }
      }
    }, data3, schema, validate)

    expect(meta3).toEqual({
      "dirty": true,
      "valid": true,
      "olddata": {
        color:'red',
        height:20
      },
      "fields": {
        "color": {
          "changed": false,
          "valid": true,
          "dirty": true
        },
        "height": {
          "changed": false,
          "valid": true,
          "dirty": true
        }
      }
    })

  })

})
