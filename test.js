const elevator = require('./main');

elevator.elevatorCall(1);
elevator.floorCall(4, 'DOWN');
elevator.elevatorCall(3);

// direction: 'UP'
// current: 2
// elevator: 1D, 3U
// floor: 4D

// 