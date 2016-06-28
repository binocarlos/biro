import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FormComponent from '../components/Form'

export class Form extends Component {
  render() {
    return (
      <div>this is a form</div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
