import React, { PropTypes, Component } from 'react'

class FormLayout extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

export default FormLayout

