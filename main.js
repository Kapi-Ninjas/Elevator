class Elevator {
    constructor() {
        this.currentFloor = 0;
        this.currentDirection = 'UP';
        this.isDoorOpen = true;
        this.callStack = [];
        this.canProccessCallStack = true;
    }

    isSameFloor(floor) {
        return this.currentFloor === floor;
    }

    enqueueCallStack(call) {
        this.callStack.push(call);

        // lógica de ordenação
    }

    calculateDirection(floor) {
        return this.currentFloor > floor ? 'DOWN' : 'UP';
    }

    elevatorCall(floor) {
        if (this.isSameFloor(floor)) {
            return;
        }

        const direction = this.calculateDirection(floor);

        this.enqueueCallStack({
            floor,
            direction
        });
    }

    floorCall(floor, direction) {
        if (this.isSameFloor(floor)) {
            return;
        }

        this.enqueueCallStack({
            floor,
            direction
        });
    }

    processCallStack() {
        if (!this.callStack.length) return;

        const call = this.callStack.shift();

        this.currentFloor = call.floor;

        this.currentDirection = this.calculateDirection(call.floor);

        processCallStack();
    }
}
