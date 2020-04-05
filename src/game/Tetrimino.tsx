import Position from "./Position";
import Zone from "./Zone";

function randomIntBelow(number: number) {
    return Math.floor(Math.random() * Math.floor(number));
}

function randomType() {
    let types = ["I", "O", "T", "L", "J", "Z", "S"]; // TODO Enum?
    let randomIndex = randomIntBelow(types.length);
    return types[randomIndex];
}

export abstract class Tetrimino {
    zone: Zone;


    static newTetrimino(startingPosition: Position) {
        let type = randomType();
        switch (type) {
            case "I":
                return new TetriminoI(startingPosition);
            case "O":
                return new TetriminoO(startingPosition);
            case "T":
                return new TetriminoT(startingPosition);
            case "L":
                return new TetriminoL(startingPosition);
            case "J":
                return new TetriminoJ(startingPosition);
            case "Z":
                return new TetriminoZ(startingPosition);
            case "S":
                return new TetriminoS(startingPosition);
        }
    }

    protected constructor(squarePositions: Position[]) {
        this.zone = new Zone(squarePositions);
    }

    on(position: Position) {
        return this.zone.contains(position);
    }

    down() {
        this.zone.down();
    }

    left() {
        this.zone.left();
    }

    right() {
        this.zone.right();
    }

    rotate() {
        this.zone.rotate();
    }
}

export class TetriminoI extends Tetrimino {
    constructor(startingSquare: Position) {
        super([
            new Position(startingSquare.line, startingSquare.column-1),
            new Position(startingSquare.line, startingSquare.column),
            new Position(startingSquare.line, startingSquare.column+1),
            new Position(startingSquare.line, startingSquare.column+2)
        ]);
    }
}

export class TetriminoO extends Tetrimino {
    constructor(startingPosition: Position) {
        super([
            new Position(startingPosition.line, startingPosition.column),
            new Position(startingPosition.line, startingPosition.column+1),
            new Position(startingPosition.line+1, startingPosition.column),
            new Position(startingPosition.line+1, startingPosition.column+1)
        ]);
    }
}

export class TetriminoT extends Tetrimino {
    constructor(startingSquare: Position) {
        super([
            new Position(startingSquare.line+1, startingSquare.column),
            new Position(startingSquare.line, startingSquare.column+1),
            new Position(startingSquare.line+1, startingSquare.column+1),
            new Position(startingSquare.line+1, startingSquare.column+2)
        ]);
    }
}

export class TetriminoL extends Tetrimino {
    constructor(startingSquare: Position) {
        super([
            new Position(startingSquare.line+1, startingSquare.column),
            new Position(startingSquare.line+1, startingSquare.column+1),
            new Position(startingSquare.line, startingSquare.column+2),
            new Position(startingSquare.line+1, startingSquare.column+2)
        ]);
    }
}

export class TetriminoJ extends Tetrimino {
    constructor(startingSquare: Position) {
        super([
            new Position(startingSquare.line, startingSquare.column),
            new Position(startingSquare.line+1, startingSquare.column),
            new Position(startingSquare.line+1, startingSquare.column+1),
            new Position(startingSquare.line+1, startingSquare.column+2)
        ]);
    }
}

export class TetriminoZ extends Tetrimino {
    constructor(startingSquare: Position) {
        super([
            new Position(startingSquare.line, startingSquare.column),
            new Position(startingSquare.line, startingSquare.column+1),
            new Position(startingSquare.line+1, startingSquare.column+1),
            new Position(startingSquare.line+1, startingSquare.column+2)
        ]);
    }
}

export class TetriminoS extends Tetrimino {
    constructor(startingSquare: Position) {
        super([
            new Position(startingSquare.line+1, startingSquare.column),
            new Position(startingSquare.line, startingSquare.column+1),
            new Position(startingSquare.line+1, startingSquare.column+1),
            new Position(startingSquare.line, startingSquare.column+2)
        ]);
    }
}


