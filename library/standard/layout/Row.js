import React, { PropTypes, Component } from 'react'

class RowLayout extends Component {

  render() {
    return (
      <div>
        {this.props.title}:
        {this.props.children}
      </div>
    )
  }

}

export default RowLayout

