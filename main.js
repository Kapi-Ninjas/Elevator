// const { EventEmitter } = require('events');

class Elevator {
    constructor() {
        this.currentFloor = 2;
        this.currentDirection = 'UP';
        this.isDoorOpen = true;
        this.callStack = [];
        this.canProccessCallStack = true;
    }

    // async callTimeout() {
    //     return new Promise((resolve) => {
    //         this.on('call', () => {
    //             resolve();
    //         });

    //         setTimeout(() => {
    //             this.processCallStack();
    //         }, timeout);
    //     });
    // }

    callTimeout() {
        const initialElevatorCallsLength = this.callStack.filter(call => call.type === 'ELEVATOR').length

        setTimeout(() => {
            const currentElevatorCallsLength = this.callStack.filter(call => call.type === 'ELEVATOR').length

            if (currentElevatorCallsLength === initialElevatorCallsLength) {
                console.log('Vai executar');
                this.processCallStack();
            } else { console.log('PN'); }
        }, 5000);
    }

    isSameFloor(floor) {
        return this.currentFloor === floor;
    }

    sort(calls) {
        return calls.sort((a, b) => {
            const aDistance = this.currentFloor - a.floor;
            const bDistance = this.currentFloor - b.floor;

            return aDistance < bDistance && this.currentDirection === 'DOWN' ? 1 : -1;
        })
    }

    enqueueCallStack(call) {
        this.callStack.push(call);

        const { priorityCalls, calls } = this.callStack.reduce((acc, curr) => {
            acc[this.currentDirection === curr.direction ? 'priorityCalls' : 'calls'].push(curr);
            return acc;
        }, { priorityCalls: [], calls: [] });

        this.callStack = [];

        console.log({ priorityCalls, calls });

        this.callStack.push(...this.sort(priorityCalls));
        this.callStack.push(...this.sort(calls));
    }

    calculateDirection(floor) {
        console.log(this.currentFloor, floor);
        return this.currentFloor > floor ? 'DOWN' : 'UP';
    }

    elevatorCall(floor) {
        if (this.isSameFloor(floor)) {
            return;
        }

        const direction = this.calculateDirection(floor);

        this.enqueueCallStack({
            type: 'ELEVATOR',
            floor,
            direction
        });

        this.callTimeout();
    }

    floorCall(floor, direction) {
        if (this.isSameFloor(floor)) {
            return;
        }

        this.enqueueCallStack({
            type: 'FLOOR',
            floor,
            direction
        });
    }

    processCallStack() {
        if (!this.callStack.length) return;

        // this.sort(this.callStack);

        const call = this.callStack.shift();

        this.currentDirection = this.calculateDirection(call.floor);

        this.currentFloor = call.floor;

        console.log('this', this);
        this.processCallStack();
    }
}

module.exports = new Elevator();
