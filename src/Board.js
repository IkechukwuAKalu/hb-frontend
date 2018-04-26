import React from 'react';
import Square from './Square';
import './index.css';

let counter,
    mainChar = 'O',
    otherChars = 'X';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        const { width, height } = props;
        const cellPositons = this.getCellsToOccupy(width, height);
        let totalCells = width * height;
        let cells = Array(totalCells).fill(null);

        for (let i = 0; i < totalCells; i++) {
            if (cellPositons.cellsToOccupy.includes(`${i}`)) cells[i] = otherChars;
            else if (cellPositons.mainCharPosition === `${i}`) cells[i] = mainChar;
        }

        this.state = {
            cells: cells,
            cellPositons: cellPositons,
            height: height,
            width: width,
            totalMoves: 0
        };
    }

    getCellsToOccupy(w, h) {
        const { height, width } = {width: w, height: h};
        const numPositions = Math.max(height, width);
        const totalCells = height * width;
        let mainCharPosition = this.generateRandomNumber(totalCells - 1);
        let cellsToOccupy = [];

        do {
            let newPosition = this.generateRandomNumber(totalCells - 1);
            if (!cellsToOccupy.includes(newPosition) && newPosition !== mainCharPosition ) {
                cellsToOccupy.push(newPosition);
            }
        } while (cellsToOccupy.length !== numPositions);

        return {
            mainCharPosition,
            cellsToOccupy
        };
    }

    generateRandomNumber(size) {
        return (Math.random() * size).toFixed();
    }

    render() {
        return (
            <div>
                {this.renderCells()}
            </div>
        );
    }

    renderCells() {
        let { width, height, cellPositons } = this.state;
        let cells = [];
        counter = 0;
        for (let i = 0; i < height; i++) {
            cells.push(
                this.renderRow(width, i, cellPositons)
            );
        }
        return cells;
    }

    renderRow(width, currentHeight, cellPositons) {
        let row = [];
        for (let i = 0; i < width; i++) {
            let c = `${counter}`;
            row.push(
                <Square
                    key={c}
                    value={this.state.cells[c]}
                    name={c}
                    onClick={(e) => {this.handleClick(e)}}
                />
            );
            counter++;
        }
        return (
            <div className="board-row" key={currentHeight}>
                {row}
            </div>
        );
    }

    handleClick(e) {
        if (e.target.innerHTML === 'O') this.savePrincess();
        else console.log('only main character can be clicked')
    }

    savePrincess() {
        let {cells, cellPositons, totalMoves} = this.state;
        let previousCell = Number(cellPositons.mainCharPosition) - 1;
        this.trackLeft(previousCell, cells, cellPositons, totalMoves);
    }

    trackLeft(previousCell, cells, cellPositons, totalMoves) {
        setTimeout(() => {
            if (previousCell > -1) {
                totalMoves += 1;
                cells[`${previousCell + 1}`] = null;
                cells[`${previousCell}`] = mainChar;
                cellPositons.mainCharPosition = previousCell;
                previousCell -= 1;
                this.setState({ cells, cellPositons, totalMoves });
                this.trackLeft(previousCell, cells, cellPositons, totalMoves);
            } else {
                this.props.onGameCompleted(this.state.totalMoves);
            }
        }, 1000);
    }
}