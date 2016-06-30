import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fieldUpdate, validateUpdate } from '../actions/form'
import FormComponent from '../components/Form'
import { getFormState } from '../tools'

export class Form extends Component {
  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    formstate:getFormState(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fieldupdate:function(props){
      dispatch(fieldUpdate(props))
    },
    validateupdate:function(errors){
      dispatch(validateUpdate(ownProps.name, errors))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
