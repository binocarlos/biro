import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FormComponent from '../components/Form'

export class Form extends Component {
  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    formstate:state.form.apples
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fieldupdate:function(){

    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
