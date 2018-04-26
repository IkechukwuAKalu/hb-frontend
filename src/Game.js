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
        let width, msg = 'Please enter board width';
        do {
            width = prompt(msg);
            try {
                width = Number(width);
                if (width < 1 || isNaN(width)) width = '';
            } catch(e) {
                width = '';
                msg = 'Width can only be a number greater than 0';
                console.log(e);
            }
        } while(width === '');
        return width;
    }

    getBoardHeight() {
        let height, msg = 'Please enter board height';
        do {
            height = prompt(msg);
            try {
                height = Number(height);
                if (height < 1 || isNaN(height)) height = '';
            } catch(e) {
                height = '';
                msg = 'Height can only be a number greater than 0';
                console.log(e);
            }
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
                            onGameCompleted={this.showMoves.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    showMoves(totalMoves) {
        alert(`Total moves: ${totalMoves}`);
    }
}