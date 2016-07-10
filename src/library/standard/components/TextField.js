import React, { PropTypes, Component } from 'react'

class TextField extends Component {

  handleChange(e) {
    this.props.update(e.target.value)
  }

  render() {
    return (
      <input 
        type={this.props.inputtype || 'text'} 
        value={this.props.value} 
        onBlur={this.props.blur}
        onChange={this.handleChange.bind(this)} />
    )
  }

}

export default TextField