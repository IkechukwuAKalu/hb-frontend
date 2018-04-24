import React from 'react';
import Square from './Square';
import './index.css';

export default class Board extends React.Component {

    constructor() {
        super();
        this.state = {
            cells: null
        };
    }

    componentWillMount() {
        const { width, height } = this.props;
        this.setState({ cells: this.renderCells(width, height) })
    }

    render() {
        
        return (
            <div>
                {this.state.cells}
            </div>
        );
    }

    componentDidMount() {
        this.placeRandomImages();
    }

    renderCells(width, height) {
        let cells = [];
        for (let i = 0; i < height; i++) {
            cells.push(
                this.renderRow(width, i)
            );
        }
        return (
            cells
        );
    }

    renderRow(width, currentHeight) {
        let row = [];
        for (let i = 0; i < width; i++) {
            row.push(
                <Square key={`${i}${currentHeight}`} />
            );
        }
        return (
            <div className="board-row" key={currentHeight}>
                {row}
            </div>
        );
    }

    placeRandomImages() {
        let placeholderText = 'X';
        let total = 0;
        let { cells } = this.state;
        if (cells.length > 0) {
            total = cells.length * cells[0].props.children.length;
        }
        cells.map((cell, i) => {
            console.log(cell, i, total);
            return i;
        });
    }
}