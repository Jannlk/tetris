import Position from "./Position";

class Zone {
    readonly positions: Position[];
    private bottomLimit: number = 0;
    private leftLimit: number = 0;
    private rightLimit: number = 0;

    constructor(positions: Position[]) {
        this.positions = positions;
        this.calculateLimits();
    }

    contains(position: Position) {
        return this.positions.some((zonePosition) => (zonePosition.equals(position)));
    }

    rotate() {
        // TODO
        this.calculateLimits();
    }

    private calculateLimits() {
        this.bottomLimit = 0;
        this.leftLimit = 0;
        this.rightLimit = 0;
        this.positions.forEach((position) => {
            if (position.below(this.bottomLimit)) this.bottomLimit = position.line;
            if (position.toTheLeftOf(this.leftLimit)) this.leftLimit = position.column;
            if (position.toTheRightOf(this.rightLimit)) this.rightLimit = position.column;
        })
    }

    down() {
        this.positions.forEach((position, index) => {
            this.positions[index] = position.down()
        });
        this.bottomLimit++;
    }

    left() {
        this.positions.forEach((position, index) => {
            this.positions[index] = position.left()
        });
        this.leftLimit--;
        this.rightLimit--;
    }

    right() {
        this.positions.forEach((position, index) => {
            this.positions[index] = position.right()
        });
        this.leftLimit++;
        this.rightLimit++;
    }

    onLine(line: number) {
        return this.positions.some(position => position.onLine(line));
    }

    onColumn(column: number) {
        return this.positions.some(position => position.onColumn(column));
    }

    onZone(zone: Zone) {
        return this.positions.every(position => zone.contains(position));
    }
}

export default Zone