import React, { Component } from 'react';
import Cell from './Cell';

class Plane extends Component {
  render() {
    const planeWidth = this.props.columns * 20;
    const cells = [];

    for (var r = 0; r < this.props.rows; r++) {
      for (var c = 0; c < this.props.columns; c++) {
        cells.push(
          <Cell
            key={r + " " + c}
            aliveOrDead={this.props.grid[r][c] ? "alive" : "dead"}
            row={r}
            column={c}
            selectCell={this.props.selectCell}
          />
        )
      }
    }
    return (
      <div className="plane" style={{width: planeWidth}}>
        {cells}
      </div>
    );
  }
}

export default Plane;
