import expect from 'expect'
import reducer from '../reducer'
import { fieldUpdate, resetForm } from '../lib/actions/form'

describe('reducer', () => {

  it('initial value', () => {
    
    var state = reducer()

    expect(state).toEqual({})


  })

  it('should process an initial action', () => {
    
    var action = fieldUpdate({
      formname:'contact',
      fieldname:'surname',
      value:'apples'
    })
    var state = reducer(undefined, action)

    expect(state).toEqual({
      "contact": {
        "data": {
          "surname": "apples"
        },
        "meta": {
          "surname": {
            "error": false,
            "dirty": true
          }
        }
      }
    })

  })

  it('should reset a form', () => {
    
    var action = resetForm('contact', {
      fruit:'apples'
    })
    var state = reducer(undefined, action)

    expect(state).toEqual({
      "contact": {
        "data": {
          "fruit": "apples"
        },
        "meta": {}
      }
    })

  })




})