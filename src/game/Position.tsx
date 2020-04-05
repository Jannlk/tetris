class Position {
    readonly line: number;
    readonly column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    down() {
        return new Position(this.line+1, this.column);
    }

    left() {
        return new Position(this.line, this.column-1);
    }

    right() {
        return new Position(this.line, this.column+1);
    }

    equals(position: Position) {
        return this.line === position.line && this.column === position.column;
    }

    toTheLeftOf(column: number) {
        return this.column < column;
    }

    toTheRightOf(column: number) {
        return this.column > column;
    }

    below(line: number) {
        return this.line > line;
    }

    onLine(line: number) {
        return this.line === line;
    }

    onColumn(column: number) {
        return this.column === column;
    }
}

export default Position