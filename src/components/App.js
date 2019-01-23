import React, { Component } from 'react';
import Plane from './Plane';

class App extends Component {
  constructor() {
    super();

    this.speed = 100;
    this.rows = 15;
    this.columns = 40;

    this.state = {
      generation: 0,
      grid: Array(this.rows).fill().map(() => Array(this.columns).fill(false))
    }

    this.selectCell = this.selectCell.bind(this);
  }

  selectCell(row, column) {
    const gridClone = JSON.parse(JSON.stringify(this.state.grid));
    gridClone[row][column] = !gridClone[row][column];

    this.setState({
      grid: gridClone
    });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Game of Life</h1>
        <Plane
          grid={this.state.grid}
          rows={this.rows}
          columns={this.columns}
          selectCell={this.selectCell}
        />
      </div>
    );
  }
}

export default App;
