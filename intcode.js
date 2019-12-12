class IntCodeMachine {
    input;
    index = 0;
    base = 0;
    parameters = [];
    name;
    constructor(input, name = 'Machine') {
        this.input = input.slice();
        this.name = name;
    }
    addInput(param) {
        this.parameters.push(param);
        return this;
    }
    *run() {
        var input = this.input;
        while (1) {
            var opcode = input[this.index] % 100;
            var params = (input[this.index] + 100000 + '').split("");
            params.shift();
            var codes = [];
            var indexies = [];
            var num;
            switch (opcode) {
                case 2:
                case 7:
                case 1:
                case 8: num = 4; break;
                case 3:
                case 4:
                case 9:
                case 99: num = 2; break;
                case 5:
                case 6: num = 3; break;
            }
            for (var i = 1; i < num; i++) {
                indexies.push(this.input[this.index + i]);
                var code;
                switch (params[3 - i]) {
                    case "0": code = input[input[this.index + i]]; break;
                    case "1": code = input[this.index + i]; break;
                    case "2": code = input[this.base + input[this.index + i]]; break;
                }
                if (code === undefined) {
                    1 == 1;
                }
                codes.push(code);
            }
            if (params[4 - i] == 2) {
                var writeTo = input[this.index + num - 1] + this.base;
            } else {
                writeTo = input[this.index + num - 1];
            }

            switch (opcode) {
                case 1: { input[writeTo] = codes[0] + codes[1]; this.index += num; break; }
                case 2: { input[writeTo] = codes[0] * codes[1]; this.index += num; break; }
                case 3: { input[writeTo] = this.parameters.shift(); this.index += num; break; }
                case 4: { yield codes[0]; this.index += num; break; }
                case 5: { if (codes[0] != 0) this.index = codes[1]; else this.index += num; break; }
                case 6: { if (codes[0] == 0) this.index = codes[1]; else this.index += num; break; }
                case 7: { input[writeTo] = codes[0] < codes[1] ? 1 : 0; this.index += num; break; }
                case 8: { input[writeTo] = codes[0] == codes[1] ? 1 : 0; this.index += num; break; }
                case 9: { this.base += codes[0]; this.index += num; break; }
                case 99: { return input[0]; }
                default: { return false; }
            }
        }
    }
}
module.exports = IntCodeMachine
