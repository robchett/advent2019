'strict mode'
require('./newStdLib');
const advent = require('./advent');

function part1(input, fuel = 1) {
    let reactions = {
        ORE: { ele: 'ORE', qty: 1, inputs: [] }
    };
    let eles = {
        ORE: { ele: "ORE", creates: [], required: 0, depth: 1 }
    };
    input.split("\n").forEach(a => {
        let [i, o] = a.split(" => ");
        let [qty, ele] = o.split(' ');
        eles[ele] = eles[ele] || { ele, creates: [], required: 0, depth: 0 };
        reactions[ele] = {
            ele,
            qty: parseInt(qty),
            inputs: []
        };
        i.split(", ").forEach(a => {
            let [_qty, _ele] = a.split(' ');
            reactions[ele].inputs.push({
                ele: _ele,
                qty: parseInt(_qty)
            })
        })
    })
    while (Object.values(eles).filter(a => a.depth == 0).length) {
        Object.values(eles).filter(a => a.depth == 0).forEach(a => {
            if (reactions[a.ele].inputs.filter(b => eles[b.ele].depth == 0).length == 0) {
                a.depth = Math.max(...reactions[a.ele].inputs.map(b => eles[b.ele].depth)) + 1
            }
        })
    }
    eles.FUEL.required = fuel;
    let depth = Math.max(...Object.values(eles).map(a => a.depth));
    do {
        Object.values(eles).filter(a => a.depth == depth).forEach(a => {
            let multi = Math.ceil(a.required / reactions[a.ele].qty)
            reactions[a.ele].inputs.forEach(r => {
                eles[r.ele].required += r.qty * multi
            })
        })
    } while (depth--);


    return eles.ORE.required;
}

function part2(input) {
    let bounds = { min: 0, max: 1000000000000 }
    while (bounds.max - bounds.min > 1) {
        let middle = bounds.min + Math.ceil((bounds.max - bounds.min) / 2)
        let diff = part1(input, middle) - 1000000000000;
        if (diff > 0) {
            bounds.max = middle
        } else {
            bounds.min = middle
        }
    }
    return bounds.min;
}

const input = `7 FQPX => 7 GTJFL
4 PZFS, 1 PRZTG => 5 RZSK
2 DMBCB => 7 PMBWS
1 VLPSJ, 3 KVCJV, 5 FLKD => 8 RWJC
26 PMBWS, 7 RZSK => 9 BZRDP
1 NGDFS => 3 MJFN
1 RZSK, 1 PZFS => 4 DMBCB
7 FLKD => 2 GHKNL
3 PQXG, 4 TQLVN, 25 QBMH => 9 XLKT
2 NGDFS => 2 HSBGQ
5 GZHT => 3 KMJG
15 JKFDL, 8 QZCMZ, 11 CMRGJ, 5 GZHT, 1 GBWRP, 22 LNLK, 6 KMJG => 9 DMTFB
1 RZSK, 4 QBMH => 4 DQNSB
1 RVFS, 9 RBCNF => 6 ZBTS
4 ZBTS => 4 PZFS
5 VZWX, 1 PRZTG => 7 KVCJV
18 QBMH => 2 VHDR
28 GTJFL, 1 KVCJV => 5 VLPSJ
6 KVCJV, 9 SFRH => 4 QFDR
1 LNLK => 8 TQLVN
1 QCDVW, 9 JXFRT, 2 SFRH => 8 QZCMZ
5 VBJM, 3 LNLK => 6 PRZTG
127 ORE => 4 RVFS
3 XBMFG => 1 GBWRP
1 VBJM, 7 QBMH => 8 JKFDL
5 GDSXB, 27 KMJG, 32 PMBWS, 1 QSLP, 46 DMTFB, 1 VHDR, 1 WDFD, 7 GHKNL => 1 FUEL
1 RPXDF => 6 QCDVW
16 CMRGJ, 1 FQPX, 2 KMJG, 9 HSBGQ, 2 JXFRT, 5 GBWRP => 8 QSLP
6 TQLVN, 3 BZRDP => 5 GNFB
1 FNZRZ, 1 VZWX, 1 BZRDP => 9 GQWP
3 ZWJFT, 2 HSBGQ => 8 JXFRT
4 PQXG, 11 JKFDL, 6 DQNSB => 9 RPXDF
41 GCPK => 8 VQXV
18 DQNSB => 7 FLKD
5 LNLK => 4 NGDFS
29 RZCPW, 3 VXSLT => 9 CMRGJ
1 LNLK, 2 VBJM, 5 ZBTS => 8 VZWX
2 QFDR => 4 RZCPW
3 MJFN, 23 VHDR, 17 FLKD => 5 GZHT
8 TQLVN, 2 JKFDL => 7 FNZRZ
1 ZWJFT => 1 RJCQP
1 KVCJV => 2 SFRH
102 ORE => 3 RBCNF
174 ORE => 8 GCPK
24 VLPSJ, 4 FLKD => 4 XBMFG
2 JKFDL => 7 PQXG
1 VZWX, 10 PZFS => 3 FQPX
4 QZCMZ, 1 GZHT, 1 DQNSB, 12 RJCQP, 1 ZKTW, 1 GQWP, 6 SFRH, 10 VHDR => 1 WDFD
3 KVCJV, 27 DMBCB => 3 ZKTW
14 GNFB => 9 ZWJFT
4 RCKBT, 2 GCPK => 2 VBJM
1 RVFS, 16 RBCNF => 9 LNLK
7 HSBGQ, 8 RWJC, 2 JXFRT => 3 VXSLT
1 RBCNF, 2 RZSK, 1 VQXV => 9 QBMH
12 KMJG, 3 XLKT => 8 GDSXB
194 ORE => 9 RCKBT`;
advent.test(part1, [`10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`], 31);
advent.test(part1, [`9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`], 165);
advent.test(part1, [`157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`], 13312);
advent.test(part1, [`171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`], 2210736)
advent.run(part1, input);

advent.test(part2, [`157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`], 82892753);
advent.test(part2, [`171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`], 460664)
advent.run(part2, input);
