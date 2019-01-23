import React, { Component } from 'react';
import Plane from './Plane';

class App extends Component {
  constructor() {
    super();

    this.intervalLength = 10;
    this.currentInterval = null;
    this.rows = 70;
    this.columns = 100;
    this.originalState = Array(this.rows).fill().map(() => Array(this.columns).fill(false));

    this.state = {
      generation: 0,
      grid: this.originalState
    }

    this.seedLife = this.seedLife.bind(this);
    this.selectCell = this.selectCell.bind(this);
    this.live = this.live.bind(this);
    this.liveButton = this.liveButton.bind(this);
    this.seedButton = this.seedButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
  }

  componentDidMount() {
    this.seedLife();
  }

  selectCell(row, column) {
    const gridClone = JSON.parse(JSON.stringify(this.state.grid));
    gridClone[row][column] = !gridClone[row][column];

    this.setState({
      grid: gridClone
    });
  }

  seedLife() {
    const gridClone = JSON.parse(JSON.stringify(this.state.grid));

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let toLive = Math.floor(Math.random() * 8) === 0;
        gridClone[r][c] = toLive;
      }
    }

    this.setState({
      grid: gridClone
    });
  }

  live() {
    const currentGrid = this.state.grid;
    const gridClone = JSON.parse(JSON.stringify(this.state.grid));
    const generation = this.state.generation += 1;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let nearbyLife = 0;

        // For reference:
        // upperLeft = currentGrid[r-1][c-1]
        // above = currentGrid[r-1][c]
        // upperRight = currentGrid[r-1][c+1]
        // left = currentGrid[r][c-1]
        // right = currentGrid[r][c+1]
        // lowerLeft = currentGrid[r+1][c-1]
        // below = currentGrid[r+1][c]
        // lowerRight = currentGrid[r+1][c+1]

        if (r > 0) {
          if (currentGrid[r - 1][c]) {
            nearbyLife++
          }
          if (c > 0 && currentGrid[r - 1][c - 1]) {
            nearbyLife++
          }
          if (c < this.columns - 1 && currentGrid[r - 1][c + 1]) {
            nearbyLife++
          }
        }

        if (r < this.rows - 1) {
          if (currentGrid[r + 1][c]) {
            nearbyLife++
          }
          if (c > 0 && currentGrid[r + 1][c - 1]) {
            nearbyLife++
          }
          if (c < this.columns - 1 && currentGrid[r + 1][c + 1]) {
            nearbyLife++
          }
        }

        if (c > 0 && currentGrid[r][c - 1]) {
          nearbyLife++
        }

        if (c < this.columns - 1 && currentGrid[r][c + 1]) {
          nearbyLife++
        }

        if (currentGrid[r][c]) {
          if (nearbyLife < 2 || nearbyLife > 3) {
            // dies of loneliness or overpopulation
            gridClone[r][c] = false;
          }
        }

        if (!currentGrid[r][c] && nearbyLife === 3) {
          // revived by three parents
          gridClone[r][c] = true;
        }
      }
    }

    this.setState({
      grid: gridClone,
      generation: generation
    })
  }

  liveButton() {
    clearInterval(this.currentInterval);
    this.currentInterval = setInterval(this.live, this.intervalLength);
  }

  seedButton() {
    clearInterval(this.currentInterval);

    this.setState({
      generation: 0,
      grid: this.originalState
    });

    this.seedLife();
  }

  pauseButton() {
    clearInterval(this.currentInterval);
  }

  render() {
    return (
      <div className="app-container">
        <h1>game of life</h1>
        <h2>generation: {this.state.generation}</h2>
        <Plane
          grid={this.state.grid}
          rows={this.rows}
          columns={this.columns}
          selectCell={this.selectCell}
        />
        <div className="button-container">
          <button className="button button--live" onClick={this.liveButton}>live</button>
          <button className="button button--pause" onClick={this.pauseButton}>pause</button>
          <button className="button button--seed" onClick={this.seedButton}>seed</button>
        </div>
      </div>
    );
  }
}

export default App;
