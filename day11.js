require('./newStdLib');
const advent = require('./advent');
const IntCodeMachine = require('./intcode');

/*
--- Day 11: Space Police ---
On the way to Jupiter, you're pulled over by the Space Police.

"Attention, unmarked spacecraft! You are in violation of Space Law! All spacecraft must have a clearly visible registration identifier! You have 24 hours to comply or be sent to Space Jail!"

Not wanting to be sent to Space Jail, you radio back to the Elves on Earth for help. Although it takes almost three hours for their reply signal to reach you, they send instructions for how to power up the emergency hull painting robot and even provide a small Intcode program (your puzzle input) that will cause it to paint your ship appropriately.

There's just one problem: you don't have an emergency hull painting robot.

You'll need to build a new emergency hull painting robot. The robot needs to be able to move around on the grid of square panels on the side of your ship, detect the color of its current panel, and paint its current panel black or white. (All of the panels are currently black.)

The Intcode program will serve as the brain of the robot. The program uses input instructions to access the robot's camera: provide 0 if the robot is over a black panel or 1 if the robot is over a white panel. Then, the program will output two values:

First, it will output a value indicating the color to paint the panel the robot is over: 0 means to paint the panel black, and 1 means to paint the panel white.
Second, it will output a value indicating the direction the robot should turn: 0 means it should turn left 90 degrees, and 1 means it should turn right 90 degrees.
After the robot turns, it should always move forward exactly one panel. The robot starts facing up.

The robot will continue running for a while like this and halt when it is finished drawing. Do not restart the Intcode computer inside the robot during this process.

For example, suppose the robot is about to start running. Drawing black panels as ., white panels as #, and the robot pointing the direction it is facing (< ^ > v), the initial state and region near the robot looks like this:

.....
.....
..^..
.....
.....
The panel under the robot (not visible here because a ^ is shown instead) is also black, and so any input instructions at this point should be provided 0. Suppose the robot eventually outputs 1 (paint white) and then 0 (turn left). After taking these actions and moving forward one panel, the region now looks like this:

.....
.....
.<#..
.....
.....
Input instructions should still be provided 0. Next, the robot might output 0 (paint black) and then 0 (turn left):

.....
.....
..#..
.v...
.....
After more outputs (1,0, 1,0):

.....
.....
..^..
.##..
.....
The robot is now back where it started, but because it is now on a white panel, input instructions should be provided 1. After several more outputs (0,1, 1,0, 1,0), the area looks like this:

.....
..<#.
...#.
.##..
.....
Before you deploy the robot, you should probably have an estimate of the area it will cover: specifically, you need to know the number of panels it paints at least once, regardless of color. In the example above, the robot painted 6 panels at least once. (It painted its starting panel twice, but that panel is still only counted once; it also never painted the panel it ended on.)

Build a new emergency hull painting robot and run the Intcode program on it. How many panels does it paint at least once?
*/

function part1(input, start = 1) {
    var x = 0;
    var y = 0;
    var dir = 0;
    var grid = {};
    var machine = new IntCodeMachine(input);
    var program = machine.run();
    var steps = 10;
    do {
        if (!grid[y]) grid[y] = {};
        grid[y][x] = grid[y][x] === undefined ? start : grid[y][x];
        machine.addInput(grid[y][x] ? 0 : 1);

        var out1 = program.next();
        grid[y][x] = out1.value ? 0 : 1;

        var out2 = program.next();
        switch (out2.value) {
            case 0: dir++; break
            case 1: dir--; break
        }
        dir = (dir + 4) % 4;
        switch (dir) {
            case 0: y--; break;
            case 1: x--; break;
            case 2: y++; break;
            case 3: x++; break;
        }
        steps--;
    } while (!out2.done && !out1.done);
    var min = Math.min(...[...grid.keys()].map(a => parseInt(a)));
    var max = Math.max(...[...grid.keys()].map(a => parseInt(a)));
    var rowMins = [];
    var rowMaxs = [];
    for (var i = min; i <= max; i++) {
        rowMins.push(Math.min(...[...grid[i].keys()].map(a => parseInt(a))));
        rowMaxs.push(Math.max(...[...grid[i].keys()].map(a => parseInt(a))));
    }
    var rowMin = Math.min(...rowMins);
    var rowMax = Math.max(...rowMaxs);
    var out = '';
    var count = 0;
    for (var i = min; i <= max; i++) {
        for (var j = rowMin; j <= rowMax; j++) {
            if (grid[i][j] !== undefined) {
                count++;
            }
            out += (grid[i][j] || 0) ? ' ' : '|';
        }
        out += "\n";
    }
    console.log(out);
    return count;
}

/*
--- Part Two ---
You're not sure what it's trying to paint, but it's definitely not a registration identifier. The Space Police are getting impatient.

Checking your external ship cameras again, you notice a white panel marked "emergency hull painting robot starting panel". The rest of the panels are still black, but it looks like the robot was expecting to start on a white panel, not a black one.

Based on the Space Law Space Brochure that the Space Police attached to one of your windows, a valid registration identifier is always eight capital letters. After starting the robot on a single white panel instead, what registration identifier does it paint on your hull?
*/

function part2(input) {
    return part1(input, 0);
}

const input = [3, 8, 1005, 8, 332, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 101, 0, 8, 28, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 101, 0, 8, 51, 1, 1103, 5, 10, 1, 1104, 9, 10, 2, 1003, 0, 10, 1, 5, 16, 10, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 88, 1006, 0, 2, 1006, 0, 62, 2, 8, 2, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 102, 1, 8, 121, 1006, 0, 91, 1006, 0, 22, 1006, 0, 23, 1006, 0, 1, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 101, 0, 8, 155, 1006, 0, 97, 1, 1004, 2, 10, 2, 1003, 6, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1002, 8, 1, 187, 1, 104, 15, 10, 2, 107, 9, 10, 1006, 0, 37, 1006, 0, 39, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 223, 2, 2, 17, 10, 1, 1102, 5, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 253, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 1002, 8, 1, 276, 1006, 0, 84, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1001, 8, 0, 301, 2, 1009, 9, 10, 1006, 0, 10, 2, 102, 15, 10, 101, 1, 9, 9, 1007, 9, 997, 10, 1005, 10, 15, 99, 109, 654, 104, 0, 104, 1, 21102, 1, 936995738516, 1, 21101, 0, 349, 0, 1105, 1, 453, 21102, 1, 825595015976, 1, 21102, 1, 360, 0, 1105, 1, 453, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21102, 46375541763, 1, 1, 21101, 0, 407, 0, 1105, 1, 453, 21102, 1, 179339005019, 1, 21101, 0, 418, 0, 1106, 0, 453, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21102, 825012036372, 1, 1, 21102, 441, 1, 0, 1105, 1, 453, 21101, 988648461076, 0, 1, 21101, 452, 0, 0, 1105, 1, 453, 99, 109, 2, 22102, 1, -1, 1, 21102, 40, 1, 2, 21102, 484, 1, 3, 21101, 0, 474, 0, 1106, 0, 517, 109, -2, 2105, 1, 0, 0, 1, 0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 479, 480, 495, 4, 0, 1001, 479, 1, 479, 108, 4, 479, 10, 1006, 10, 511, 1102, 1, 0, 479, 109, -2, 2105, 1, 0, 0, 109, 4, 2102, 1, -1, 516, 1207, -3, 0, 10, 1006, 10, 534, 21101, 0, 0, -3, 21202, -3, 1, 1, 22101, 0, -2, 2, 21102, 1, 1, 3, 21102, 553, 1, 0, 1106, 0, 558, 109, -4, 2106, 0, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 581, 2207, -4, -2, 10, 1006, 10, 581, 22102, 1, -4, -4, 1105, 1, 649, 21202, -4, 1, 1, 21201, -3, -1, 2, 21202, -2, 2, 3, 21101, 0, 600, 0, 1105, 1, 558, 21201, 1, 0, -4, 21101, 0, 1, -1, 2207, -4, -2, 10, 1006, 10, 619, 21101, 0, 0, -1, 22202, -2, -1, -2, 2107, 0, -3, 10, 1006, 10, 641, 22102, 1, -1, 1, 21102, 1, 641, 0, 106, 0, 516, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2105, 1, 0];
advent.run(part1, input);
advent.run(part2, input);