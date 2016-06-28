import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fieldUpdate } from '../actions/form'
import FormComponent from '../components/Form'

export class Form extends Component {
  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {

  var allFormState = state.biro
  var formState = allFormState[ownProps.name]

  return {
    formstate:formState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fieldupdate:function(props){
      dispatch(fieldUpdate(props))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
