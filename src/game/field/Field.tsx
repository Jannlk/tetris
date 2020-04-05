import React from "react";
import './Field.css'
import Square from '../square/Square'
import Position from "../Position";
import {Tetrimino} from "../Tetrimino";
import Zone from "../Zone";

interface FieldProps {
    height: number,
    width: number
}

interface FieldState {
    fallingTetrimino?: Tetrimino,
    squares: boolean[][]
}

class Field extends React.Component<FieldProps, FieldState> {
    private timerID?: NodeJS.Timeout;
    private bottomLimit: number;
    private leftLimit: number;
    private rightLimit: number;
    private startingZone: Zone;

    constructor({height, width}: FieldProps) {
        super({height: height, width: width});
        this.bottomLimit = height - 1;
        this.leftLimit = 0;
        this.rightLimit = width - 1;
        this.startingZone = new Zone([
            new Position(0,3),
            new Position(0,4),
            new Position(0,5),
            new Position(0, 6),
            new Position(1,3),
            new Position(1,4),
            new Position(1,5),
            new Position(1, 6),
        ]);
        let squares = Array(height).fill(null).map(() => (Array(width).fill(false)));
        this.state = {fallingTetrimino: Tetrimino.newTetrimino(new Position(0, 4)), squares: squares}
    }

    private putTetrimino() {
        this.setState(prevState => {
            let squares = prevState.squares;
            prevState.fallingTetrimino?.zone.positions.forEach(position => {
                squares[position.line][position.column] = true;
            });
            return {squares: squares}
        })
    }

    private removeTetrimino() {
        this.setState(prevState => {
            let squares = prevState.squares;
            prevState.fallingTetrimino?.zone.positions.forEach(position => {
                squares[position.line][position.column] = false;
            });
            return {squares: squares}
        })
    }

    private containsBlockAt(position: Position) {
        return this.state.squares[position.line][position.column]
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (event.code === "ArrowLeft") {
            this.onLeft();
        } else if (event.code === "ArrowRight") {
            this.onRight();
        } else if (event.code === "ArrowDown") {
            this.onDown();
        } else if (event.code === "ArrowUp") {
            this.onUp();
        } else if (event.code === "Space") {
            this.onSpace();
        }
    };

    private canMoveLeft() {
        let inFirstColumn = this.state.fallingTetrimino?.zone.onColumn(this.leftLimit);
        let blockBeside = !inFirstColumn &&
            this.state.fallingTetrimino?.zone.positions.some(position => {
                return !(this.state.fallingTetrimino?.on(position.left())) && this.containsBlockAt(position.left());
            });

        return !inFirstColumn && !blockBeside;
    }

    private moveLeft() {
        this.removeTetrimino();
        this.setState(prevState => (prevState.fallingTetrimino?.left()));
        this.putTetrimino();
    }

    private onLeft() {
        if(this.canMoveLeft()) {
            this.moveLeft();
        }
    }

    private canMoveRight() {
        let inLastColumn = this.state.fallingTetrimino?.zone.onColumn(this.rightLimit);
        let blockBeside = !inLastColumn &&
            this.state.fallingTetrimino?.zone.positions.some(position => {
                return !(this.state.fallingTetrimino?.on(position.right())) && this.containsBlockAt(position.right());
            });

        return !inLastColumn && !blockBeside;
    }

    private moveRight() {
        this.removeTetrimino();
        this.setState(prevState => (prevState.fallingTetrimino?.right()));
        this.putTetrimino();
    }

    private onRight() {
        if (this.canMoveRight()) {
            this.moveRight();
        }
    }

    private canMoveDown() {
        let inLastLine = this.state.fallingTetrimino?.zone.onLine(this.bottomLimit);
        let blockBelow = !inLastLine &&
            this.state.fallingTetrimino?.zone.positions.some(position => {
                return !(this.state.fallingTetrimino?.on(position.down())) && this.containsBlockAt(position.down());
            });
        return !inLastLine && !blockBelow;
    }

    private moveDown() {
        this.removeTetrimino();
        this.setState(prevState => (prevState.fallingTetrimino?.down()));
        this.putTetrimino();
    }


    private onDown() {
        if(this.canMoveDown()) {
            this.moveDown();

            if (!this.canMoveDown()) {
                this.setState({fallingTetrimino: undefined});
                this.removeFullLines();
            }
        }
    }

    private clearTimer() {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }

    private gameOver() {
        this.clearTimer();
        let squares = Array(this.props.height).fill(null).map(() => (Array(this.props.width).fill(false)));
        this.setState({fallingTetrimino: undefined, squares: squares});
    }

    private isEmpty(line: boolean[]) {
        return line.every(hasBlock => !hasBlock);
    }

    private isFull(line: boolean[]) {
        return line.every(hasBlock => hasBlock);
    }

    private findFullLines() {
        let lines = this.state.squares;
        return lines.map((_, line) => line).filter(number => this.isFull(lines[number]));
    }

    private fall() {

    }

    private emptyLines(lines: number[]) {
        this.setState((prevState) => {
            let squares = prevState.squares;
            squares.forEach((line, lineNumber) => {
                if (lines.includes(lineNumber)) {
                    squares[lineNumber] = line.fill(false);
                }
            });
            return {squares: squares}
        })
    }

    private removeFullLines() {
        let fullLines = this.findFullLines();
        this.emptyLines(fullLines);

    }

    private onUp() {
        // TODO can rotate? How the fuck to do this?
        this.removeTetrimino();
        this.setState(prevState => (prevState.fallingTetrimino?.rotate()));
        this.putTetrimino();
    }

    private newTetrimino() {
        this.setState({fallingTetrimino: Tetrimino.newTetrimino(new Position(0, 4))});
        this.putTetrimino();
    }

    private tic() {
        if (this.state.fallingTetrimino) {
            if (this.canMoveDown()) {
                this.moveDown();
            } else if (this.state.fallingTetrimino?.zone.onZone(this.startingZone)) {
                this.gameOver();
            } else {
                this.setState({fallingTetrimino: undefined});
                this.removeFullLines();
            }
        } else {
            this.newTetrimino();
        }
    }

    private start() {
        this.putTetrimino();
        this.timerID = setInterval(
            () => this.tic(),
            1000
        );
    }

    private onSpace() {
        if (!this.timerID) {
            this.start();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        let squares = this.state.squares.map((line) => (<div className="Line">{line.map((block) => (<Square containsBlock={block}/>))}</div>));
        return (
            <React.Fragment>{squares}</React.Fragment>
        )
    }
}

export default Field;