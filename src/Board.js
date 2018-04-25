import React from 'react';
import Square from './Square';
import './index.css';

let counter = 0;

export default class Board extends React.Component {

    constructor() {
        super();
        this.state = {
            cells: null,
            height: null,
            width: null
        };
    }

    componentWillMount() {
        const { width, height } = this.props;
        this.setState({
            cells: this.renderCells(width, height),
            height: height,
            width: width
        });
    }

    renderCells(width, height) {
        const cellPositons = this.getCellsToOccupy(width, height);
        console.log(cellPositons);
        let cells = [];
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
            let val = '';
            if (cellPositons.cellsToOccupy.includes(c)) val = 'X';
            else if (cellPositons.mainCharPosition === c) val = 'O';
            row.push(
                <Square
                    key={c}
                    value={val}
                    name={c}
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

    render() {        
        return (
            <div>
                {this.state.cells}
            </div>
        );
    }

    componentDidMount() {
        //this.getCellsToOccupy();
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
}