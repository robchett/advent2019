'strict mode'
require('./newStdLib');
const advent = require('./advent');

/*
--- Day 10: Monitoring Station ---
You fly into the asteroid belt and reach the Ceres monitoring station. The Elves here have an emergency: they're having trouble tracking all of the asteroids and can't be sure they're safe.

The Elves would like to build a new monitoring station in a nearby area of space; they hand you a map of all of the asteroids in that region (your puzzle input).

The map indicates whether each position is empty (.) or contains an asteroid (#). The asteroids are much smaller than they appear on the map, and every asteroid is exactly in the center of its marked position. The asteroids can be described with X,Y coordinates where X is the distance from the left edge and Y is the distance from the top edge (so the top-left corner is 0,0 and the position immediately to its right is 1,0).

Your job is to figure out which asteroid would be the best place to build a new monitoring station. A monitoring station can detect any asteroid to which it has direct line of sight - that is, there cannot be another asteroid exactly between them. This line of sight can be at any angle, not just lines aligned to the grid or diagonally. The best location is the asteroid that can detect the largest number of other asteroids.

For example, consider the following map:

.#..#
.....
#####
....#
...##
The best location for a new monitoring station on this map is the highlighted asteroid at 3,4 because it can detect 8 asteroids, more than any other location. (The only asteroid it cannot detect is the one at 1,0; its view of this asteroid is blocked by the asteroid at 2,2.) All other asteroids are worse locations; they can detect 7 or fewer other asteroids. Here is the number of other asteroids a monitoring station on each asteroid could detect:

.7..7
.....
67775
....7
...87
Here is an asteroid (#) and some examples of the ways its line of sight might be blocked. If there were another asteroid at the location of a capital letter, the locations marked with the corresponding lowercase letter would be blocked and could not be detected:

#.........
...A......
...B..a...
.EDCG....a
..F.c.b...
.....c....
..efd.c.gb
.......c..
....f...c.
...e..d..c

Find the best location for a new monitoring station. How many other asteroids can be detected from that location?
*/

function part1(input) {
    var matches = [];
    var grid = input.split("\n").filter(a => a != "").map(a => a.split(""));
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '#') {
                var gradients = {};
                for (var x = 0; x < grid.length; x++) {
                    for (var y = 0; y < grid[0].length; y++) {
                        if (!(x == i && y == j) && grid[x][y] == '#') {
                            var deg = Math.atan2((y-j), (x-i)) / Math.PI * 360;
                                if (!gradients[deg]) {
                                    gradients[deg] = [];
                                }
                                gradients[deg].push(Math.abs(x-i) + Math.abs(y-j))
                        }
                    }
                }
                matches.push({
                    i,
                    j,
                    sum: gradients.toArray().length,
                    gradients,
                })
            }
        }
    }
    return matches.sort((a, b) => Math.sign(b.sum - a.sum))[0].sum;
}

function part2(input) {
    var matches = [];
    var grid = input.split("\n").filter(a => a != "").map(a => a.split(""));
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '#') {
                var gradients = {};
                for (var x = 0; x < grid.length; x++) {
                    for (var y = 0; y < grid[0].length; y++) {
                        if (!(x == i && y == j) && grid[x][y] == '#') {
                            var deg = -(Math.atan2((y-j), (x-i)) / Math.PI * 360) + 90;
                                if (!gradients[deg]) {
                                    gradients[deg] = [];
                                }
                                gradients[deg].push({
                                    dist: Math.abs(x-i) + Math.abs(y-j),
                                    x,
                                    y
                                })
                        }
                    }
                }
                matches.push({
                    i,
                    j,
                    sum: gradients.toArray().length,
                    gradients,
                })
            }
        }
    }
    var best = matches.sort((a, b) => Math.sign(b.sum - a.sum))[0];
    var gradients = best.gradients.map((k, a) => a.sort((x,y) => Math.sign(x.dist-y.dist)))
    var keys = gradients.keys().sort((a,b) => Math.sign(a-b));
    var kills = 0;
    var i = 0;
    while(kills < 200) {
        if (gradients[keys[i]].length) {
            var asteroid = gradients[keys[i]].shift();
            kills++;
        }
        i++;
    }
    return `${asteroid.y * 100 + asteroid.x}`;
}

const input = `
#..#.#.###.#...##.##....
.#.#####.#.#.##.....##.#
##..#.###..###..#####..#
####.#.#..#....#..##.##.
.#######.#####...#.###..
.##...#.#.###..###.#.#.#
.######.....#.###..#....
.##..##.#..#####...###.#
#######.#..#####..#.#.#.
.###.###...##.##....##.#
##.###.##.#.#..####.....
#.#..##..#..#.#..#####.#
#####.##.#.#.#.#.#.#..##
#...##.##.###.##.#.###..
####.##.#.#.####.#####.#
.#..##...##..##..#.#.##.
###...####.###.#.###.#.#
..####.#####..#####.#.##
..###..###..#..##...#.#.
##.####...##....####.##.
####..#..##.#.#....#..#.
.#..........#..#.#.####.
###..###.###.#.#.#....##
########.#######.#.##.##`;
advent.test(part1, [`
.#..#
.....
#####
....#
...##`], 8)

advent.test(part1, [`
......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`], 33)

advent.test(part1, [`
#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`], 35)

advent.test(part1, [`
.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`], 41);


advent.test(part1, [`
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`], 210);

advent.run(part1, input);

advent.test(part2, [`
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`], '802')

advent.run(part2, input);
