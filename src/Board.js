import React from 'react';
import Square from './Square';
import './index.css';
import cowboy from './images/cowboy.svg';
import soldier from './images/soldier.svg';

let counter, // the moves counter
    mainChar = soldier, // the main character image
    otherChars = cowboy; // the other characters' image

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

    /**
     * This calculates random positions to place the characters on the board
     * @param {Number} w - the width of the grid
     * @param {Number} h - the heigt of the grid 
     * @returns an object containing the main character postion and positions for other characters
     */
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

    /**
     * This generates a random number
     * @param {Number} size - the upper boundary for the random number 
     * @returns a random number
     */
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

    /**
     * This builds cells in a grid to be rendered based on the input
     * width and height supplied by the user
     * @returns the cells to be displayed
     */
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

    /**
     * This builds a row on the grid
     * @param {Number} width - the width of the board
     * @param {Number} currentHeight - the current height on the board for the particular row
     * @param {Object} cellPositons - the object containing the positions for the characters
     */
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

    /**
     * This handles a click on a cell/suqare
     * @param {Object} e - the click event
     */
    handleClick(e) {
        if (Boolean((e.target.currentSrc.match(/\/soldier.*.svg$/)))) this.savePrincess();
        else console.log('only main character can be clicked');
    }

    /**
     * This start the main character movement to find all characters on the board
     */
    savePrincess() {
        let { cellPositons } = this.state;
        
        let left = [],
            right = [];
        cellPositons.cellsToOccupy.forEach((cell) => {
            cell = Number(cell);
            if (cell < Number(cellPositons.mainCharPosition)) left.push(cell);
            else right.push(cell);
        });

        left = left.sort((a, b) => a - b);
        right = right.sort((a, b) => a - b);

        this.trackLeft(cellPositons, left);
        //this.determineSideToMove(left, right);
    }

    /**
     * Determines the next place for the main character to move to
     * @param {Array} left - the characters to the left of the main character's position
     * @param {Array} right - the characters to the right of the main character's position 
     */
    determineSideToMove(left, right) {
        let totalCells = this.state.width * this.state.height;
        let mainCharRow = totalCells % this.state.cellPositons.mainCharPosition;
        let mainCharCol = this.state.cellPositons.mainCharPosition % this.state.width;
        console.log(mainCharRow, mainCharCol);
    }

    /**
     * Moves the main character left of its current position
     * @param {Object} cellPositons - the object containing the positions of the characters
     * @param {Array} left - the characters to the left of the main character 
     */
    trackLeft(cellPositons, left) {
        let { cells, totalMoves } = this.state;
        let previousCell = Number(cellPositons.mainCharPosition) - 1;
        setTimeout(() => {
            if (previousCell > -1) {
                totalMoves += 1;
                cells[`${previousCell + 1}`] = null;
                cells[`${previousCell}`] = mainChar;
                cellPositons.mainCharPosition = previousCell;
                previousCell -= 1;
                this.setState({ cells, cellPositons, totalMoves });
                if (left.length > 0 && previousCell < left[0]) this.endGame();
                else this.trackLeft(cellPositons, left);
            } else {
                this.endGame();
            }
        }, 500);
    }

    /**
     * This informs the Game component to show the end of the game
     */
    endGame() {
        this.props.onGameCompleted(this.state.totalMoves);
    }
}