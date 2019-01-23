import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectCell(this.props.row, this.props.column);
  }

  render() {
    return (
      <div
        className={"cell cell--" + this.props.aliveOrDead}
        onClick={this.handleClick}
      />
    );
  }
}

export default Cell;
