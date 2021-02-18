const elevator = require('./main');

elevator.elevatorCall(4);
elevator.floorCall(2, 'DOWN');
elevator.elevatorCall(1);
elevator.floorCall(3, 'UP');

// direction: 'UP'
// current: 2
// elevator: 1D, 3U
// floor: 4D

// 