import React, { PropTypes, Component } from 'react'

class TextField extends Component {

  handleChange(e) {
    this.props.update(e.target.value)
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange.bind(this)} />
    )
  }

}

export default TextField

