'strict mode'
require('./newStdLib');
const advent = require('./advent');

/*

--- Day 1: The Tyranny of the Rocket Equation ---
Santa has become stranded at the edge of the Solar System while delivering presents to other planets! To accurately calculate his position in space, safely align his warp drive, and return to Earth in time to save Christmas, he needs you to bring him measurements from fifty stars.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

The Elves quickly load you into a spacecraft and prepare to launch.

At the first Go / No Go poll, every Elf is Go until the Fuel Counter-Upper. They haven't determined the amount of fuel required yet.

Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

For example:

For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
For a mass of 1969, the fuel required is 654.
For a mass of 100756, the fuel required is 33583.
The Fuel Counter-Upper needs to know the total fuel requirement. To find it, individually calculate the fuel needed for the mass of each module (your puzzle input), then add together all the fuel values.

What is the sum of the fuel requirements for all of the modules on your spacecraft?

*/

function part1(input) {
	return input.map(a => Math.floor(a/3) - 2).reduce((a,c) => a+c, 0);
}

/*

--- Part Two ---
During the second Go / No Go poll, the Elf in charge of the Rocket Equation Double-Checker stops the launch sequence. Apparently, you forgot to include additional fuel for the fuel you just added.

Fuel itself requires fuel just like a module - take its mass, divide by three, round down, and subtract 2. However, that fuel also requires fuel, and that fuel requires fuel, and so on. Any mass that would require negative fuel should instead be treated as if it requires zero fuel; the remaining mass, if any, is instead handled by wishing really hard, which has no mass and is outside the scope of this calculation.

So, for each module mass, calculate its fuel and add it to the total. Then, treat the fuel amount you just calculated as the input mass and repeat the process, continuing until a fuel requirement is zero or negative. For example:

A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2 divided by 3 and rounded down is 0, which would call for a negative fuel), so the total fuel required is still just 2.
At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires 216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires 21 fuel, which requires 5 fuel, which requires no further fuel. So, the total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 = 966.
The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.
What is the sum of the fuel requirements for all of the modules on your spacecraft when also taking into account the mass of the added fuel? (Calculate the fuel requirements for each module separately, then add them all up at the end.)

*/

function part2(input) {
	return input.map(a => {
		var res = 0;
		while((a = (Math.floor(a/3) - 2)) > 0) {
			res += a;
		}
		return res;
	}).reduce((a,c) => a+c, 0);
}

const input = [106404,140515,142745,120767,79665,54235,127391,72207,70799,79485,103994,129583,132791,95135,121194,129425,64861,123233,132805,87916,111395,126625,113045,61704,65413,145820,75988,74717,115137,85331,86833,86063,85464,139738,103372,101942,52741,77660,112745,103109,106301,141714,74546,55474,106747,140234,60426,145867,144810,94179,101606,77763,139291,104246,148513,126828,64624,139058,85839,86636,62198,137358,76711,87848,141711,114079,71639,95896,104522,61929,72199,142790,137736,123437,91872,127661,111179,51548,83452,91196,117798,84484,75517,83820,97407,89181,71428,72758,73076,109957,50601,74571,65556,129765,80626,126995,73480,71360,103288,85670];
advent.tests(part1, [[12], 2], [[14], 2], [[1969], 654], [[100756], 33583])
advent.run(part1, input);

advent.tests(part2, [[12], 2], [[14], 2], [[1969], 966], [[100756], 50346])
advent.run(part2, input);
