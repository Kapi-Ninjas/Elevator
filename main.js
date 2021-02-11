// const { EventEmitter } = require('events');

class Elevator {
    constructor() {
        this.currentFloor = 0;
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
        const initialSize = this.callStack.length;

        setTimeout(() => {
            console.log('salve');
            console.log('this.callStack.length === initialSize', this.callStack.length === initialSize);
            if (this.callStack.length === initialSize) {
                this.processCallStack();
            }
        }, 5000);
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

        this.callTimeout();
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
        console.log('this', this);
        processCallStack();
    }
}

module.exports = new Elevator();
