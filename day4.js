'strict mode'
require('./newStdLib');
const advent = require('./advent');

/*
--- Day 4: Secure Container ---
You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?
*/
function part1(input, allow_triples = true) {
    var count = 0;
    loop: for (var i = input[0]; i <= input[1]; i++) {
        var digits = (i + "").split("");
        for (var j = 1; j < 6; j++) {
            if (digits[j] < digits[j - 1]) {
                var old = i;
                i += (10 ** (5 - j)) * (digits[j - 1] - digits[j]);
                for (var k = j + 1; k < 6; k++) {
                    i -= (10 ** (5 - k)) * digits[k];
                }
                i -= 1;
                continue loop;
            }
        }
        for (var j = 1; j < 6; j++) {
            if (allow_triples && digits[j] == digits[j - 1]) {
                count++;
                continue loop;
            }
            if (!allow_triples) {
                if (j == 1) {
                    if (digits[j] == digits[j - 1] && digits[j] != digits[j + 1]) {
                        count++;
                        continue loop;
                    }
                } else if (j == 5) {
                    if (digits[j] == digits[j - 1] && digits[j] != digits[j - 2]) {
                        count++;
                        continue loop;
                    }
                } else if (digits[j] == digits[j - 1] && digits[j] != digits[j - 2] && digits[j] != digits[j + 1]) {
                    count++;
                    continue loop;
                }
            }
        }
    }
    return count;
}

/*
--- Part Two ---
An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
How many different passwords within the range given in your puzzle input meet all of the criteria?
*/

function part2(input) {
    return part1(input, false)
}

advent.tests(part1, [[111111, 111111], 1], [[223450, 223450], 0], [[123789, 123789], 0])
advent.run(part1, [124075, 580769]);

advent.tests(part2, [[112233, 112233], 1], [[123444, 123444], 0], [[111122, 111122], 1])
advent.run(part2, [124075, 580769]);
