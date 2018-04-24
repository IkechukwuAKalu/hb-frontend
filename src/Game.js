import React from 'react';
import Board from './Board';
import './index.css';

export default class Game extends React.Component {

    constructor() {
        super();
        const [width, height] = this.getBoardParams();
        this.state = { width, height };
    }

    getBoardParams() {
        return [
            this.getBoardWidth(),
            this.getBoardHeight()
        ];
    }

    getBoardWidth() {
        let width;
        do {
            width = prompt('Please enter board width');
        } while(width === '');
        return width;
    }

    getBoardHeight() {
        let height;
        do {
            height = prompt('Please enter board height', '');
        } while(height === '');
        return height;
    }

    render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            width={this.state.width}
                            height={this.state.height}
                        />
                    </div>
                </div>
            </div>
        );
    }
}