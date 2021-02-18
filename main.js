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
                this.sort();
                this.processCallStack();
            } else { console.log('PN'); }
        }, 5000);
    }

    isSameFloor(floor) {
        return this.currentFloor === floor;
    }

    sort(calls = this.callStack) {
        return calls.sort((a, b) => {
            return a.floor > b.floor
                ? a.direction === 'DOWN' ? 1 : -1
                : b.direction === 'UP' ? -1 : 1;
        })
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

        this.callStack.push({
            type: 'ELEVATOR',
            floor,
            direction
        });

        this.callTimeout();
    }

    floorCall(floor, destinyDirection) {
        if (this.isSameFloor(floor)) {
            return;
        }

        const direction = this.calculateDirection(floor);

        this.callStack.push({
            floor,
            direction,
            destinyDirection,
            type: 'FLOOR',
        });
    }

    processCallStack() {
        if (!this.callStack.length) return;

        // direction: 'UP'
        // current: 2
        // elevator: 1D 4D
        // floor: 3D
        // 2-4 4-3 3-1

        // [4, 1, 3]
        // this.sort();

        // const call = this.callStack.find(call => {
        //     call.direction === this.currentDirection
        // });

        const call = this.callStack.shift();

        this.currentDirection = this.calculateDirection(call.floor);

        this.currentFloor = call.floor;

        console.log('this', this);
        this.processCallStack();
    }
}

module.exports = new Elevator();
