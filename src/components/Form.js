import React, { Component, PropTypes } from 'react'
import FormRenderer from '../library/standard/layout/Form'
import RowRenderer from '../library/standard/layout/Row'
import Schema from '../schema'
import Library from '../library'

const defaultRenderers = {
  form:FormRenderer,
  row:RowRenderer
}

function getRenderer(type, value){
  return value || defaultRenderers[type]
}

export default class Form extends Component {

  componentWillReceiveProps(nextProps) {
    var formState = nextProps.formstate || {}

    if(formState.force_validate){
      this.forceValidateForm()
    }
  }

  forceValidateForm(){
    var formState = this.props.formstate || {}
    var formData = formState.data || {}
    var formMeta = formState.meta || {}

    var validateForm = this.props.validate || function(){}
    var validateupdate = this.props.validateupdate || function(){}

    var checkMeta = Object.assign({}, formMeta)
    Object.keys(checkMeta || {}).forEach(function(key){
      checkMeta[key].dirty = true
    })
    var allErrors = validateForm(formData, checkMeta)
    var fieldErrors = {}

    var schema = Schema(this.props.schema)

    schema.forEach(field => {
      if(typeof(field.validate)==='function'){
        var error = field.validate(formData[field.name])
        if(typeof(error) !== 'string') error = null
        if(error) fieldErrors[field.name] = error
      }
    })

    var finalErrors = Object.assign({}, fieldErrors, allErrors)

    validateupdate(finalErrors)
  }

  render() {
    
    // where in our state object are we writing this form's data
    var formName = this.props.name

    // from mapStateToProps
    var formState = this.props.formstate || {}

    // overall validate function
    var validateForm = this.props.validate || function(){}

    // from mapDispatchToProps
    var fieldUpdate = this.props.fieldupdate || function(){}
    

    var formData = formState.data || {}
    var formMeta = formState.meta || {}

    var formRenderer = getRenderer('form', this.props.formrenderer)
    var rowRenderer = getRenderer('row', this.props.rowrenderer)

    var schema = Schema(this.props.schema)
    var library = Library(this.props.library)

    // ensure meta for each field
    schema.forEach(field => {
      formMeta[field.name] = formMeta[field.name] || {}
    })

    var counter = 0

    function renderRow(field){

      counter++

      var name = field.name
      var title = (field.title || field.name).replace(/^\w/, function(c){
        return c.toUpperCase()
      })
      var fieldRenderer = library[field.type] || library.text
      var fieldMeta = formMeta[name] || {}
      var value = formData[name]
      var error = fieldMeta.error || ''
      var dirty = fieldMeta.dirty

      function runChange(isBlur, val){
        val = isBlur ? value : val
        var error = false
        var errors = {}
        if(isBlur){
          if(typeof(field.validate)==='function'){
            error = field.validate(val)
            if(typeof(error) !== 'string') error = null
          }
          
          var checkData = Object.assign({}, formData)
          checkData[name] = val
          var checkMeta = Object.assign({}, formMeta)
          checkMeta[name] = {
            dirty:true,
            error:error
          }
          errors = validateForm(checkData, checkMeta)
        }
        fieldUpdate({
          fieldname:name,
          formname:formName,
          value:val,
          error:error,
          errors:errors,
          dirty:isBlur
        })
      }

      function update(val){
        runChange(false, val)
      }

      function blur(val){
        runChange(true)
      }

      return React.createElement(rowRenderer, {
        title,
        key:'field' + counter
      }, React.createElement(fieldRenderer, {
        title,
        value,
        error,
        schema:field,
        update,
        blur
      }))
    }

    

    return React.createElement(formRenderer, {}, schema.map(renderRow))
  }
}