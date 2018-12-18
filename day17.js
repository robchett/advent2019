'strict mode'
require('./newStdLib');
const advent = require('./advent');

function drawGrid(grid, bounds) {
	var out = '';
	for(var j = bounds.y0; j <= bounds.y1; j++) {
		for(var i = bounds.x0; i <= bounds.x1; i++) {
			out += grid[j][i] || ' '
		}
		out += "\n";
	}

	console.log(out)
}

function parseGrid(input) {
	var bounds = {x0: 99999, x1:0, y0: 0, y1: 0};
	var check = -1;
	var grid = input
		.split("\n")
		.map(a => a.match(/(.)=([\d\.]*), .=([\d\.]*)/))
		.reduce((a, c) => {
			var x = 0;
			var y = 0;
			if (c[1] == 'x') {
				x = [c[2], c[2]].map(a => parseInt(a))
				y = c[3].split('..').map(a => parseInt(a))
			} else {
				x = c[3].split('..').map(a => parseInt(a))
				y = [c[2], c[2]].map(a => parseInt(a))
			}
			for(var j = y[0]; j <= y[1]; j++) {
				a[j] = a[j] || [];
				for(var i = x[0]; i <= x[1]; i++) {
					a[j][i] = '#'
					bounds.x0 = Math.min(bounds.x0, i);
					bounds.x1 = Math.max(bounds.x1, i);
					bounds.y0 = Math.min(bounds.y0, j);
					bounds.y1 = Math.max(bounds.y1, j);
				}
			}
			return a;
		}, [])

	for(var j = bounds.y0; j <= bounds.y1; j++) {
		grid[j] = grid[j] || []
	}
	bounds.x0--;
	bounds.x1++

	grid[0][500] = 'X';

	var streams = [[500, 0]];

	var seen = ["500,0"]
	while(stream = streams.shift()) {
		var x = stream[0]
		for (var y = stream[1]; y <= bounds.y1; y++) {
			grid[y+1] = grid[y+1] || []
			grid[y] = grid[y] || []
			if ('#~'.indexOf(grid[y+1][x]) != -1) {

				var walls = {l: 0, r: 0, lf: false, rf: false};

				for (var i = x; i >= bounds.x0; i--) {
					walls.l = i;
					if (!grid[y+1][i] || grid[y+1][i] == '|') {
						seen.indexOf(`${i},${y+1}`) == -1 && streams.push([i, y+1]) && seen.push(`${i},${y+1}`);
						break;
					} else if (grid[y][i-1] == '#') { 
						walls.lf = true;
						break;
					}
				}
				for (var i = x; i <= bounds.x1; i++) {
					walls.r = i
					if (!grid[y+1][i] || grid[y+1][i] == '|') {
						seen.indexOf(`${i},${y+1}`) == -1 && streams.push([i, y+1]) && seen.push(`${i},${y+1}`);
						break;
					} else if (grid[y][i+1] == '#') { 
						walls.rf = true;
						break;
					}
				}
				for (var i = walls.l; i <= walls.r; i++) {
					grid[y][i] = walls.lf && walls.rf ? '~' : '|'
				}
				if (walls.lf && walls.rf) {
					y-=2;
					continue;
				}
				break
			}
			grid[y][x] = '|'
		}
	}

	drawGrid(grid, bounds)

	return {
		all: grid.reduce((a, c) => a += c.filter(a => "~|".indexOf(a) != -1).length , 0) - 1,
		persistant: grid.reduce((a, c) => a += c.filter(a => "~".indexOf(a) != -1).length , 0),
	};

}

function part1(input) {
	return parseGrid(input).all
}

function part2(input) {
	return parseGrid(input).persistant
}

var test = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`

var input = `x=480, y=133..143
x=499, y=1196..1209
y=744, x=430..450
y=635, x=483..489
x=611, y=320..333
x=506, y=1335..1344
x=573, y=522..540
x=478, y=629..640
x=524, y=1392..1396
y=822, x=548..559
x=615, y=380..401
y=570, x=607..616
y=1085, x=399..415
x=530, y=608..620
x=584, y=192..211
x=531, y=719..744
x=382, y=1455..1458
y=1458, x=382..397
y=1167, x=476..482
y=1195, x=443..462
x=528, y=656..659
y=1732, x=381..403
x=626, y=1296..1320
y=732, x=388..412
x=405, y=949..953
x=460, y=646..647
x=505, y=1565..1586
x=434, y=548..561
x=594, y=936..950
x=554, y=26..30
x=552, y=1131..1145
x=433, y=1578..1582
y=1767, x=422..424
x=569, y=1066..1088
x=413, y=658..676
x=592, y=1133..1156
y=75, x=490..493
x=516, y=722..730
x=458, y=493..504
x=509, y=342..368
y=1691, x=506..509
y=1230, x=534..558
x=527, y=966..994
x=479, y=1729..1748
y=1226, x=483..499
x=602, y=50..62
y=1156, x=592..601
x=431, y=172..176
y=599, x=468..478
x=472, y=720..748
x=499, y=935..939
y=939, x=499..501
x=602, y=1228..1234
x=430, y=731..744
x=402, y=1090..1093
y=817, x=412..414
x=609, y=102..128
x=451, y=977..986
y=729, x=394..400
y=1183, x=553..567
x=435, y=1236..1253
y=1575, x=594..596
x=509, y=1142..1144
y=788, x=428..455
x=534, y=923..934
y=1681, x=579..583
x=430, y=1556..1558
x=542, y=1101..1106
x=618, y=1576..1581
x=403, y=221..241
x=391, y=1750..1773
x=448, y=1557..1558
x=480, y=1426..1448
x=450, y=490..499
x=532, y=1483..1485
x=445, y=1269..1274
y=205, x=452..454
x=508, y=894..901
x=624, y=1045..1055
y=1672, x=486..510
x=549, y=86..92
x=418, y=1034..1051
y=1544, x=450..475
x=483, y=689..699
y=658, x=463..489
y=1327, x=531..538
y=1586, x=496..505
x=429, y=936..948
y=692, x=447..471
x=582, y=1692..1703
x=525, y=1369..1374
x=445, y=364..374
x=467, y=514..531
x=525, y=830..839
y=1271, x=559..561
x=585, y=1657..1659
x=425, y=1036..1054
x=468, y=1095..1114
y=1004, x=454..457
y=161, x=432..448
x=451, y=236..247
x=493, y=85..94
x=409, y=186..207
x=597, y=1203..1210
x=544, y=1292..1303
x=494, y=1545..1547
y=840, x=394..412
x=501, y=329..331
y=802, x=462..467
x=507, y=1098..1107
x=438, y=457..459
x=522, y=1101..1111
x=437, y=1307..1329
y=1093, x=402..427
x=444, y=1155..1158
x=561, y=1369..1380
x=544, y=1196..1209
x=614, y=320..333
x=450, y=710..722
y=593, x=616..626
x=578, y=76..77
x=560, y=243..245
y=56, x=435..456
x=558, y=953..960
x=535, y=453..464
x=448, y=321..323
x=426, y=419..421
x=403, y=1499..1502
x=505, y=209..237
x=538, y=952..960
x=440, y=136..140
x=600, y=778..784
x=499, y=1748..1750
x=610, y=1639..1661
x=524, y=59..64
y=861, x=386..442
x=469, y=392..405
x=611, y=406..432
x=471, y=1427..1448
x=419, y=1498..1504
x=555, y=657..659
y=909, x=398..400
y=241, x=381..403
x=539, y=1456..1469
x=424, y=811..821
y=1296, x=573..579
x=610, y=1330..1348
y=901, x=508..512
x=515, y=1256..1259
y=225, x=467..470
x=471, y=1585..1610
x=480, y=823..829
x=568, y=1749..1755
y=44, x=541..555
y=1763, x=601..620
x=549, y=1224..1226
y=320, x=611..614
x=551, y=868..871
x=406, y=314..315
x=386, y=847..861
x=461, y=1308..1329
x=596, y=268..279
x=577, y=674..690
x=536, y=1633..1650
y=1467, x=473..490
x=515, y=842..847
x=573, y=1286..1296
x=503, y=1391..1407
x=614, y=775..787
y=59, x=479..483
y=1050, x=563..573
x=475, y=965..977
y=897, x=442..460
y=870, x=618..626
x=543, y=727..749
y=423, x=580..595
x=565, y=1137..1147
x=443, y=783..785
x=467, y=872..883
y=84, x=382..405
x=400, y=900..909
y=529, x=511..515
x=564, y=577..603
y=1292, x=398..414
x=508, y=1719..1740
y=94, x=493..496
x=482, y=872..875
x=552, y=1559..1566
x=558, y=1220..1230
x=551, y=293..308
y=262, x=576..591
y=234, x=595..619
x=395, y=411..413
y=968, x=582..591
x=531, y=1322..1327
x=432, y=155..161
y=1329, x=437..461
y=1368, x=383..386
x=425, y=172..176
x=606, y=1591..1603
x=564, y=1333..1337
x=515, y=506..529
x=606, y=450..459
x=398, y=1339..1359
y=686, x=534..554
x=518, y=1367..1380
y=1704, x=482..484
y=1169, x=388..396
x=499, y=26..37
x=511, y=9..18
y=977, x=598..600
y=414, x=419..444
x=538, y=1323..1327
y=171, x=461..465
x=410, y=878..885
y=66, x=562..587
x=539, y=1671..1677
x=581, y=1346..1357
x=475, y=425..430
x=496, y=628..640
y=1091, x=520..523
x=447, y=692..696
y=476, x=384..391
y=281, x=540..560
x=422, y=1740..1767
y=459, x=435..438
x=429, y=1264..1279
x=381, y=1507..1516
y=247, x=451..468
y=1360, x=570..587
y=1488, x=383..391
y=1719, x=580..586
x=603, y=1336..1362
x=451, y=1335..1337
x=563, y=743..753
x=430, y=1398..1415
y=1695, x=431..445
x=436, y=1577..1599
x=413, y=1750..1773
x=481, y=739..744
x=393, y=674..695
y=1133, x=431..444
y=1415, x=413..430
y=558, x=549..557
x=447, y=194..208
x=467, y=793..802
y=280, x=442..445
x=490, y=66..75
x=479, y=44..59
x=569, y=1443..1445
x=444, y=1760..1762
y=287, x=590..594
y=1067, x=476..479
x=468, y=575..599
x=474, y=629..633
x=605, y=406..432
x=468, y=237..247
y=180, x=558..578
y=432, x=605..611
x=406, y=1594..1600
x=453, y=296..309
x=385, y=673..695
x=439, y=1038..1050
x=620, y=102..128
y=847, x=493..515
x=594, y=284..287
x=549, y=364..387
y=1488, x=526..551
x=450, y=730..744
x=462, y=1186..1195
y=155, x=535..552
y=1579, x=588..606
x=483, y=626..635
y=1448, x=471..480
x=478, y=574..599
x=514, y=1332..1341
x=554, y=680..686
x=476, y=707..718
x=396, y=1338..1359
y=504, x=440..458
y=809, x=455..474
x=534, y=579..581
x=409, y=1075..1077
y=1111, x=502..522
x=421, y=1235..1253
x=606, y=1711..1722
y=341, x=404..408
y=1075, x=407..409
x=488, y=1235..1245
x=393, y=620..646
y=531, x=464..467
y=577, x=497..512
y=1449, x=495..508
y=1695, x=388..397
x=451, y=572..577
y=1623, x=461..488
y=605, x=611..627
y=474, x=553..563
y=512, x=441..443
x=435, y=500..518
x=481, y=609..623
x=531, y=424..430
x=515, y=984..993
y=839, x=525..547
x=584, y=253..258
x=478, y=611..621
x=515, y=1684..1698
x=403, y=1724..1732
x=559, y=1266..1271
y=653, x=476..479
y=1516, x=381..393
y=1402, x=549..568
y=707, x=562..564
y=1566, x=552..566
x=559, y=815..822
x=454, y=1084..1087
x=464, y=424..451
x=581, y=1436..1449
x=443, y=1187..1195
x=399, y=452..454
x=542, y=483..491
x=528, y=1311..1325
x=444, y=1036..1045
x=460, y=234..243
y=522, x=394..414
x=620, y=313..337
x=529, y=1558..1567
x=582, y=1368..1380
y=1362, x=603..607
x=528, y=608..620
x=426, y=1520..1547
x=412, y=809..817
y=898, x=605..621
x=555, y=16..20
x=402, y=271..275
x=411, y=936..948
y=893, x=395..420
x=442, y=293..304
x=502, y=592..609
x=625, y=954..981
x=440, y=293..304
x=574, y=1618..1637
x=404, y=453..454
y=1128, x=501..504
y=121, x=469..492
y=1430, x=389..391
y=1773, x=391..413
y=430, x=507..531
y=308, x=527..551
x=412, y=1045..1048
y=803, x=576..598
x=421, y=16..24
x=601, y=270..290
x=537, y=135..141
y=1762, x=444..463
y=323, x=448..459
y=174, x=600..617
y=197, x=527..540
x=542, y=297..304
y=222, x=529..543
x=385, y=1651..1666
x=528, y=484..494
x=590, y=285..287
y=1466, x=516..520
x=617, y=172..174
x=422, y=363..374
x=501, y=1125..1128
x=503, y=668..682
x=412, y=1198..1209
y=1742, x=408..410
y=1267, x=573..596
x=574, y=1308..1322
y=454, x=399..404
x=508, y=1011..1021
x=480, y=1016..1029
y=1581, x=618..625
x=459, y=321..323
y=135, x=497..503
y=744, x=504..531
y=603, x=429..447
y=1502, x=401..403
x=502, y=546..552
y=1094, x=508..529
y=1444, x=434..438
x=396, y=956..969
x=511, y=1034..1041
x=439, y=169..181
x=432, y=1390..1392
x=590, y=306..332
x=562, y=690..707
y=787, x=608..614
x=398, y=320..327
x=508, y=1068..1094
y=1049, x=485..495
x=562, y=1543..1546
y=1610, x=468..471
x=438, y=783..785
x=598, y=797..803
x=526, y=1478..1488
x=433, y=108..111
y=883, x=435..467
y=374, x=422..445
x=482, y=297..305
x=614, y=1434..1445
y=875, x=546..562
y=1277, x=550..568
y=401, x=615..623
y=1485, x=532..541
y=143, x=455..480
x=524, y=1217..1239
x=512, y=895..901
y=1421, x=442..452
x=463, y=648..658
x=451, y=388..391
y=438, x=543..570
y=640, x=478..496
y=430, x=475..482
x=482, y=426..430
x=427, y=1221..1229
y=1285, x=483..533
y=695, x=385..393
x=460, y=893..897
x=590, y=1672..1684
x=516, y=328..331
y=527, x=553..566
x=381, y=148..168
x=425, y=1465..1492
y=1009, x=442..466
x=542, y=613..637
x=457, y=383..395
x=413, y=1397..1415
x=452, y=424..438
x=588, y=233..240
x=559, y=623..629
x=450, y=814..826
x=520, y=1391..1396
x=476, y=216..229
y=1359, x=396..398
x=489, y=626..635
y=1256, x=515..518
x=560, y=1309..1322
x=386, y=1350..1368
x=476, y=177..187
x=454, y=1578..1599
x=484, y=1749..1750
x=568, y=1390..1402
x=601, y=1630..1639
x=558, y=1575..1584
x=443, y=511..512
x=393, y=492..502
x=399, y=1181..1207
y=1552, x=525..535
x=518, y=813..833
x=494, y=1685..1698
y=1423, x=576..580
y=953, x=405..407
y=395, x=433..457
x=625, y=678..680
y=738, x=439..442
x=572, y=1443..1445
x=568, y=186..194
y=1697, x=573..576
y=1144, x=509..511
x=415, y=1064..1085
y=1210, x=595..597
y=624, x=405..414
x=516, y=1332..1341
x=428, y=1025..1028
x=567, y=770..773
x=579, y=1483..1506
y=78, x=485..501
x=512, y=1121..1131
y=744, x=594..596
x=403, y=1762..1764
x=575, y=1652..1663
x=576, y=1483..1506
x=405, y=69..84
y=1558, x=430..448
x=401, y=1498..1502
y=258, x=581..584
y=1371, x=570..576
y=623, x=521..536
x=482, y=1164..1167
y=203, x=452..454
y=388, x=449..451
x=584, y=777..784
x=417, y=553..577
y=1229, x=415..427
y=1599, x=436..454
x=431, y=198..199
x=507, y=425..430
x=512, y=570..577
x=458, y=261..264
y=749, x=543..557
x=386, y=411..413
x=412, y=470..483
x=468, y=559..564
y=595, x=515..524
x=581, y=700..721
x=615, y=1045..1055
y=1703, x=559..582
x=384, y=1545..1547
y=1369, x=523..525
x=606, y=1273..1278
y=878, x=456..461
x=413, y=878..885
x=492, y=1120..1131
y=784, x=584..600
x=412, y=715..732
x=612, y=836..852
x=504, y=1515..1541
x=386, y=313..315
x=483, y=87..100
x=481, y=547..552
x=483, y=1275..1285
x=455, y=91..105
x=585, y=1067..1088
x=568, y=758..762
x=546, y=1329..1341
y=699, x=440..483
x=521, y=603..623
x=456, y=875..878
x=420, y=185..207
x=435, y=39..56
y=1209, x=412..439
x=435, y=1035..1054
x=598, y=975..977
y=1142, x=509..511
x=495, y=1026..1049
y=382, x=578..591
y=1682, x=518..522
x=433, y=1610..1636
x=598, y=1652..1663
y=1279, x=429..452
y=498, x=612..626
x=535, y=1541..1552
x=455, y=572..577
x=403, y=1033..1051
x=403, y=489..496
x=529, y=1677..1681
y=1322, x=560..574
x=412, y=828..840
x=601, y=1133..1156
x=464, y=1169..1179
x=442, y=995..1009
x=488, y=8..18
x=603, y=954..981
y=846, x=563..588
y=618, x=461..464
y=621, x=417..478
y=1743, x=588..608
x=486, y=1668..1672
y=533, x=439..442
x=483, y=1217..1226
x=420, y=867..893
x=572, y=406..410
x=427, y=246..262
y=24, x=421..447
x=464, y=255..269
x=589, y=1632..1643
x=447, y=1036..1045
x=399, y=1063..1085
x=590, y=911..923
x=560, y=1138..1147
y=519, x=400..402
y=1740, x=508..528
x=546, y=863..875
x=533, y=1275..1285
y=878, x=410..413
x=546, y=1464..1466
y=1341, x=514..516
y=655, x=476..479
x=460, y=1136..1145
x=453, y=1359..1368
y=1376, x=570..576
x=586, y=294..299
x=445, y=1693..1695
x=546, y=1224..1226
x=627, y=601..605
x=491, y=740..744
y=1163, x=519..528
y=1700, x=573..576
y=1030, x=517..535
x=444, y=448..462
y=878, x=470..490
y=1337, x=433..451
x=450, y=3..28
x=382, y=69..84
x=547, y=831..839
y=1245, x=488..510
x=422, y=1351..1360
y=666, x=595..616
y=744, x=481..491
x=563, y=1027..1050
x=608, y=1186..1192
y=1730, x=442..450
x=441, y=755..768
x=542, y=980..1003
x=620, y=24..43
y=1637, x=563..574
x=581, y=452..474
y=286, x=523..534
y=299, x=583..586
y=637, x=542..566
x=553, y=451..474
x=496, y=1566..1586
x=491, y=1214..1222
x=553, y=880..884
x=406, y=1348..1373
x=589, y=1259..1261
y=1269, x=442..445
x=394, y=828..840
y=1778, x=613..622
y=682, x=476..503
x=570, y=1348..1360
y=1106, x=573..581
y=829, x=468..480
y=229, x=453..476
x=440, y=1520..1547
y=207, x=409..420
x=448, y=750..759
y=577, x=451..455
x=486, y=964..977
x=405, y=577..579
x=549, y=1389..1402
y=1010, x=563..585
x=454, y=999..1004
y=1209, x=499..544
y=208, x=447..463
y=1755, x=568..592
y=1234, x=575..602
y=1722, x=545..606
x=591, y=962..968
x=451, y=946..951
x=552, y=146..155
x=543, y=414..438
x=629, y=1772..1781
y=387, x=540..549
x=456, y=1016..1029
x=578, y=376..382
x=440, y=470..483
x=588, y=1589..1598
x=506, y=1687..1691
x=432, y=711..722
x=621, y=890..898
x=595, y=1455..1466
x=450, y=1096..1114
x=403, y=1256..1258
x=618, y=862..870
x=573, y=1673..1684
x=523, y=1089..1091
x=508, y=1423..1449
y=944, x=384..391
y=925, x=422..473
x=624, y=196..210
y=1492, x=415..425
y=609, x=502..512
y=1059, x=580..602
x=504, y=718..744
x=559, y=1693..1703
x=392, y=1651..1666
x=534, y=898..904
x=527, y=294..308
x=473, y=912..925
x=546, y=759..762
x=458, y=630..633
x=595, y=640..666
y=680, x=614..625
x=495, y=1423..1449
x=464, y=92..105
x=522, y=1661..1682
y=948, x=411..429
x=607, y=644..663
y=1274, x=442..445
y=264, x=450..458
y=462, x=427..444
x=540, y=279..281
x=455, y=795..809
x=493, y=841..847
x=499, y=1139..1149
x=447, y=1580..1593
y=515, x=612..622
x=560, y=1241..1253
y=821, x=405..424
x=557, y=623..629
x=455, y=1685..1700
x=429, y=793..804
x=517, y=1735..1737
y=1392, x=432..451
x=408, y=1045..1048
x=570, y=566..586
y=1026, x=593..608
x=435, y=872..883
x=579, y=770..773
x=591, y=246..262
x=456, y=178..187
x=395, y=867..893
x=476, y=653..655
x=599, y=271..290
x=566, y=526..527
x=510, y=1669..1672
y=1547, x=426..440
x=612, y=1541..1549
y=690, x=575..577
x=525, y=1541..1552
x=515, y=579..595
x=506, y=774..783
x=613, y=1774..1778
x=508, y=1157..1168
x=469, y=1194..1213
y=993, x=507..515
x=585, y=1289..1300
y=572, x=451..455
y=128, x=609..620
y=1165, x=519..528
x=504, y=383..388
x=616, y=584..593
y=1088, x=569..585
x=405, y=489..496
x=466, y=1156..1158
x=416, y=1134..1140
x=408, y=529..541
y=237, x=505..512
y=1641, x=381..404
x=452, y=1403..1421
x=462, y=37..59
x=561, y=1333..1337
x=544, y=1634..1650
x=408, y=1729..1742
x=594, y=744..753
y=1065, x=382..389
x=402, y=507..519
x=494, y=858..870
x=393, y=268..279
x=548, y=815..822
y=1610, x=381..384
x=547, y=979..1003
x=561, y=1753..1779
y=168, x=517..532
x=405, y=812..821
x=581, y=25..30
y=623, x=481..493
x=472, y=391..405
x=398, y=900..909
x=482, y=1698..1704
x=523, y=1369..1374
y=551, x=515..524
x=450, y=549..561
y=374, x=515..524
x=475, y=1521..1544
y=261, x=450..458
y=110, x=397..412
x=576, y=267..279
x=467, y=892..905
y=1698, x=494..515
x=477, y=1728..1748
x=427, y=1090..1093
y=1560, x=468..470
x=407, y=793..804
y=987, x=463..467
y=1666, x=385..392
x=419, y=1159..1167
y=918, x=576..587
x=561, y=1498..1512
y=1645, x=452..468
x=515, y=365..374
x=439, y=368..371
x=443, y=1580..1593
x=430, y=313..341
y=773, x=567..579
y=1320, x=615..626
y=946, x=603..607
y=646, x=393..401
x=521, y=25..37
x=444, y=1122..1133
x=412, y=1698..1706
x=622, y=504..515
x=508, y=857..870
x=399, y=157..180
x=469, y=110..121
x=436, y=1455..1466
y=1341, x=546..570
y=341, x=425..430
x=520, y=1089..1091
x=424, y=91..106
x=402, y=95..99
y=391, x=449..451
x=462, y=1373..1395
x=462, y=234..243
y=871, x=551..556
x=607, y=1337..1362
x=425, y=314..341
y=543, x=381..391
x=585, y=1259..1261
x=528, y=1163..1165
x=411, y=269..279
x=523, y=268..286
x=384, y=925..944
y=199, x=423..431
x=579, y=881..884
y=1750, x=484..499
x=543, y=578..581
x=600, y=171..174
y=176, x=425..431
x=553, y=191..202
x=396, y=1143..1169
x=434, y=1438..1444
x=550, y=1263..1277
x=575, y=1227..1234
y=330, x=442..465
x=615, y=197..210
y=187, x=456..476
x=435, y=457..459
y=1149, x=499..520
y=768, x=417..441
y=459, x=594..606
x=569, y=325..352
y=904, x=534..557
y=167, x=468..504
y=1300, x=568..585
x=558, y=161..180
x=601, y=136..139
x=410, y=1728..1742
y=139, x=601..611
y=1684, x=573..590
x=611, y=193..211
y=1186, x=520..536
y=1321, x=413..418
x=440, y=492..504
x=474, y=1480..1485
x=618, y=279..289
x=433, y=340..352
y=541, x=408..448
x=393, y=1508..1516
y=1532, x=526..606
y=1600, x=406..416
y=758, x=588..604
y=579, x=397..405
x=433, y=1334..1337
y=608, x=528..530
x=520, y=19..22
x=615, y=1296..1320
y=945, x=421..423
x=573, y=1590..1598
x=524, y=545..551
x=497, y=126..135
x=579, y=1670..1681
y=332, x=590..600
x=536, y=1175..1186
x=563, y=988..1010
y=483, x=412..440
x=610, y=1082..1092
y=1639, x=597..601
x=412, y=491..502
y=1158, x=444..466
x=389, y=1430..1432
x=582, y=1195..1203
x=562, y=88..100
y=92, x=525..549
x=382, y=1038..1065
y=944, x=581..584
x=612, y=1610..1624
x=557, y=1370..1382
y=44, x=443..445
y=676, x=413..423
x=496, y=298..305
x=464, y=904..907
y=1357, x=579..581
x=461, y=1622..1623
x=436, y=855..858
x=615, y=1541..1549
x=439, y=533..535
y=583, x=597..604
x=484, y=872..875
y=1062, x=476..479
y=870, x=494..508
x=543, y=217..222
y=1003, x=542..547
y=305, x=482..496
x=458, y=946..951
x=451, y=339..352
x=580, y=1411..1423
x=594, y=1563..1575
y=1549, x=612..615
x=470, y=223..225
y=1167, x=403..419
x=536, y=602..623
y=77, x=578..591
x=505, y=1178..1187
y=1133, x=394..397
x=434, y=596..600
x=447, y=591..603
x=484, y=560..564
x=513, y=459..478
x=581, y=651..653
x=573, y=1103..1106
x=404, y=1627..1641
x=388, y=1674..1695
x=529, y=1067..1094
x=439, y=1198..1209
y=269, x=439..464
x=516, y=1439..1466
x=457, y=1137..1145
x=394, y=510..522
x=583, y=270..272
x=456, y=38..56
x=599, y=216..224
x=508, y=913..922
x=442, y=533..535
x=594, y=450..459
x=496, y=85..94
y=1380, x=561..582
x=576, y=1697..1700
y=211, x=584..611
x=540, y=365..387
x=570, y=103..106
y=1506, x=576..579
x=412, y=90..110
y=450, x=476..498
x=397, y=1674..1695
x=567, y=1101..1106
y=1567, x=529..532
x=546, y=19..22
x=561, y=1671..1677
x=616, y=545..570
y=106, x=419..424
y=1435, x=384..401
y=1504, x=419..442
x=506, y=813..833
x=561, y=1266..1271
x=414, y=609..624
x=586, y=1714..1719
y=1090, x=441..502
y=762, x=546..568
x=534, y=1157..1168
x=406, y=95..99
y=1140, x=416..426
x=389, y=1181..1207
x=442, y=728..738
x=576, y=1371..1376
x=490, y=857..878
y=1584, x=558..574
y=18, x=488..511
x=585, y=987..1010
y=1714, x=580..586
x=596, y=1563..1575
x=608, y=1024..1026
y=1266, x=475..495
x=403, y=831..836
x=476, y=441..450
y=1095, x=593..619
x=587, y=135..139
y=875, x=456..461
y=712, x=586..593
x=476, y=1062..1067
y=391, x=494..511
x=446, y=751..759
x=485, y=1027..1049
x=611, y=601..605
x=511, y=1098..1107
x=429, y=135..140
x=626, y=584..593
x=571, y=373..399
x=408, y=1546..1547
x=398, y=1286..1292
x=559, y=1542..1546
y=759, x=446..448
x=384, y=462..476
x=426, y=1133..1140
x=504, y=1125..1128
x=587, y=60..66
y=1029, x=456..480
x=462, y=793..802
x=455, y=779..788
x=397, y=1123..1133
x=501, y=383..388
x=521, y=1545..1547
y=275, x=400..402
x=457, y=999..1004
x=606, y=1566..1579
x=553, y=525..527
y=30, x=554..581
y=100, x=556..562
x=492, y=932..945
x=593, y=496..507
x=557, y=727..749
x=415, y=321..327
x=556, y=89..100
x=600, y=307..332
x=515, y=545..551
x=562, y=863..875
x=535, y=1026..1030
y=1597, x=613..616
x=591, y=377..382
y=331, x=501..516
y=405, x=469..472
x=516, y=1391..1407
y=494, x=520..528
x=588, y=1414..1427
x=580, y=1714..1719
x=584, y=931..944
y=1380, x=518..533
x=501, y=69..78
x=473, y=1718..1727
y=327, x=398..415
x=397, y=578..579
x=468, y=1585..1610
x=579, y=1286..1296
x=405, y=610..624
x=601, y=644..663
y=1738, x=598..601
x=481, y=343..368
y=168, x=381..391
y=722, x=432..450
x=464, y=1717..1727
x=557, y=556..558
y=1774, x=613..622
x=482, y=1515..1541
x=522, y=235..261
x=450, y=667..681
x=494, y=380..391
x=502, y=1100..1111
x=528, y=1720..1740
x=415, y=1221..1229
y=1593, x=443..447
x=549, y=556..558
y=474, x=581..585
y=1131, x=492..512
x=384, y=1609..1610
x=449, y=388..391
x=410, y=855..858
x=546, y=1367..1376
y=22, x=520..546
x=574, y=1575..1584
y=1669, x=465..475
y=951, x=451..458
x=490, y=1463..1467
x=426, y=1632..1655
x=562, y=61..66
x=487, y=48..59
y=1373, x=406..428
x=451, y=1391..1392
x=613, y=1186..1192
y=977, x=475..486
x=448, y=1479..1485
y=290, x=599..601
x=422, y=913..925
x=507, y=931..945
x=468, y=824..829
y=1325, x=508..528
x=459, y=1686..1700
x=510, y=722..730
y=499, x=450..452
x=414, y=246..262
x=611, y=137..139
x=513, y=913..922
x=436, y=815..826
y=1226, x=546..549
x=591, y=1611..1624
x=445, y=280..284
x=623, y=1590..1603
x=452, y=490..499
y=502, x=393..412
x=381, y=1627..1641
x=595, y=1204..1210
x=619, y=1079..1095
x=606, y=1544..1555
x=520, y=1140..1149
x=601, y=1752..1763
x=381, y=539..543
x=555, y=136..141
x=549, y=1367..1376
x=616, y=1588..1597
y=1407, x=503..516
y=783, x=493..506
y=581, x=534..543
y=748, x=470..472
x=423, y=657..676
x=394, y=727..729
x=524, y=1253..1263
x=563, y=820..846
y=95, x=402..406
x=391, y=461..476
y=245, x=560..570
x=502, y=1479..1486
x=524, y=578..595
x=517, y=922..934
y=1351, x=419..422
x=601, y=1730..1738
x=576, y=901..918
x=475, y=1130..1139
y=1742, x=484..489
y=478, x=490..513
x=509, y=1687..1691
x=419, y=170..181
x=615, y=278..289
y=994, x=524..527
y=564, x=468..484
y=1764, x=403..407
y=905, x=467..485
x=593, y=712..715
y=1084, x=454..467
x=613, y=1082..1092
y=1466, x=436..460
y=59, x=462..473
y=600, x=434..439
y=647, x=457..460
x=556, y=868..871
x=583, y=17..20
x=598, y=11..15
x=588, y=819..846
x=399, y=831..836
x=521, y=1292..1303
x=391, y=540..543
y=1253, x=542..560
x=595, y=416..423
y=1253, x=421..435
x=534, y=1219..1230
x=540, y=187..197
x=605, y=889..898
x=423, y=197..199
x=528, y=1173..1181
y=1700, x=455..459
x=566, y=612..637
y=1681, x=529..532
x=391, y=148..168
x=419, y=92..106
y=1376, x=546..549
x=472, y=667..681
y=1427, x=568..588
y=981, x=603..625
x=479, y=653..655
y=1360, x=470..555
x=616, y=640..666
x=444, y=403..414
x=415, y=1465..1492
x=450, y=1057..1070
x=381, y=221..241
x=591, y=1546..1552
y=561, x=434..450
y=558, x=439..442
x=599, y=1456..1466
x=532, y=1678..1681
x=442, y=546..558
x=551, y=787..809
x=484, y=1715..1742
y=1070, x=450..492
x=622, y=1774..1778
y=535, x=439..442
x=441, y=510..512
x=489, y=1714..1742
x=606, y=1523..1532
x=604, y=741..758
x=555, y=34..44
x=492, y=110..121
y=899, x=474..478
y=421, x=414..426
y=620, x=528..530
x=465, y=170..171
x=593, y=1078..1095
y=907, x=456..464
y=858, x=410..436
x=550, y=577..603
x=468, y=1372..1395
y=496, x=403..405
x=457, y=645..647
x=508, y=1312..1325
y=304, x=440..442
x=451, y=277..288
x=517, y=59..64
x=452, y=1641..1645
x=413, y=1314..1321
x=578, y=187..194
x=602, y=495..507
x=383, y=1467..1488
y=1603, x=606..623
x=563, y=1619..1637
x=587, y=1349..1360
x=443, y=42..44
y=1203, x=582..590
y=180, x=399..415
y=42, x=401..409
x=463, y=971..987
x=506, y=47..59
x=499, y=1216..1226
x=463, y=195..208
x=552, y=1238..1250
x=613, y=1588..1597
x=584, y=566..586
x=450, y=1520..1544
y=388, x=501..504
y=1250, x=552..554
y=262, x=414..427
x=414, y=1285..1292
x=619, y=1640..1661
x=616, y=935..950
x=428, y=1347..1373
x=477, y=1647..1652
x=415, y=156..180
x=472, y=137..140
x=414, y=419..421
y=1432, x=389..391
x=557, y=324..352
y=1263, x=498..524
y=1546, x=559..562
x=397, y=792..804
x=413, y=1579..1582
x=566, y=1559..1566
y=1261, x=585..589
y=1092, x=610..613
y=945, x=492..507
x=442, y=1609..1636
y=1466, x=595..599
x=476, y=1164..1167
x=419, y=1351..1360
x=603, y=312..337
x=442, y=1497..1504
y=934, x=517..534
y=804, x=407..429
y=804, x=383..397
x=608, y=1733..1743
x=492, y=128..139
y=1396, x=520..524
x=453, y=217..229
x=541, y=34..44
x=573, y=1697..1700
x=427, y=449..462
y=1624, x=591..612
y=279, x=576..596
y=399, x=562..571
y=1051, x=403..418
x=626, y=11..15
x=403, y=1160..1167
y=884, x=553..579
x=550, y=1753..1779
x=439, y=728..738
x=597, y=1630..1639
x=442, y=894..897
x=540, y=1369..1382
y=271, x=400..402
x=587, y=900..918
x=421, y=942..945
x=439, y=596..600
x=408, y=335..341
x=556, y=190..202
y=304, x=542..545
y=1469, x=539..592
x=461, y=616..618
x=590, y=1195..1203
x=567, y=1161..1183
y=479, x=621..625
y=309, x=434..453
y=1213, x=469..479
x=539, y=1033..1041
y=1045, x=444..447
y=1598, x=573..588
x=417, y=755..768
x=595, y=231..234
x=442, y=319..330
y=64, x=517..524
x=493, y=609..623
y=1187, x=477..505
y=1348, x=610..613
x=500, y=1648..1652
x=607, y=545..570
x=573, y=1256..1267
x=401, y=29..42
x=570, y=413..438
y=1179, x=464..468
x=560, y=278..281
y=410, x=560..572
x=460, y=137..140
x=511, y=129..139
x=568, y=1264..1277
x=439, y=569..580
x=572, y=134..139
x=431, y=1694..1695
x=588, y=740..758
x=401, y=621..646
x=566, y=1547..1552
x=569, y=652..653
x=391, y=1430..1432
y=1077, x=407..409
x=555, y=1350..1360
y=261, x=522..549
x=474, y=796..809
y=580, x=439..463
x=554, y=1238..1250
x=468, y=1169..1179
x=520, y=485..494
x=545, y=297..304
x=526, y=1522..1532
x=485, y=68..78
x=598, y=1730..1738
x=493, y=66..75
y=280, x=494..498
y=172, x=425..431
x=501, y=935..939
x=520, y=1176..1186
y=106, x=542..570
y=1259, x=515..518
x=625, y=1543..1555
x=465, y=1659..1669
y=1449, x=553..581
x=455, y=3..28
x=592, y=1750..1755
x=467, y=223..225
y=464, x=516..535
x=512, y=592..609
y=1192, x=608..613
x=541, y=1483..1485
x=400, y=507..519
y=809, x=528..551
y=603, x=550..564
x=590, y=270..272
y=352, x=433..451
y=224, x=581..599
y=1168, x=508..534
y=1382, x=540..557
x=619, y=230..234
x=481, y=1480..1486
x=503, y=126..135
y=1779, x=550..561
x=400, y=727..729
x=484, y=1699..1704
x=520, y=1438..1466
x=495, y=1256..1266
x=436, y=425..438
y=181, x=419..439
y=577, x=410..417
y=1145, x=526..552
x=542, y=1240..1253
x=416, y=1593..1600
x=404, y=335..341
x=528, y=787..809
y=969, x=396..437
x=602, y=1055..1059
x=524, y=966..994
y=1139, x=475..487
x=447, y=16..24
y=141, x=537..555
x=475, y=1659..1669
x=488, y=1621..1623
y=288, x=424..451
y=696, x=447..471
x=487, y=1130..1139
y=1258, x=403..411
x=518, y=1662..1682
x=579, y=1346..1357
x=447, y=109..111
x=389, y=1038..1065
x=466, y=996..1009
y=718, x=476..486
x=568, y=1413..1427
x=478, y=889..899
x=423, y=942..945
y=518, x=418..435
y=28, x=450..455
y=922, x=508..513
y=1054, x=425..435
x=410, y=552..577
x=439, y=256..269
x=534, y=268..286
x=440, y=690..699
x=511, y=379..391
x=461, y=875..878
y=753, x=594..596
x=471, y=692..696
y=836, x=399..403
x=480, y=458..466
y=62, x=602..623
y=1466, x=546..548
y=270, x=583..590
y=100, x=483..503
x=468, y=1550..1560
x=581, y=253..258
y=1652, x=477..500
x=424, y=1632..1655
x=580, y=1055..1059
y=1748, x=477..479
x=549, y=236..261
x=548, y=1464..1466
x=434, y=1323..1330
y=466, x=462..480
x=479, y=1193..1213
y=1050, x=439..456
y=1555, x=606..625
y=105, x=455..464
x=562, y=482..491
x=578, y=161..180
y=1582, x=413..433
x=594, y=1433..1445
y=333, x=611..614
y=1087, x=454..467
y=721, x=581..602
x=570, y=1371..1376
y=1330, x=426..434
y=1041, x=511..539
x=434, y=295..309
y=37, x=499..521
x=407, y=948..953
y=1222, x=491..493
x=386, y=1698..1706
y=111, x=433..447
x=600, y=975..977
x=381, y=1608..1610
x=439, y=546..558
x=627, y=1272..1278
x=517, y=1027..1030
x=562, y=232..240
x=532, y=162..168
x=532, y=1557..1567
x=473, y=38..59
x=418, y=500..518
x=613, y=1329..1348
y=1636, x=433..442
x=620, y=1752..1763
x=474, y=889..899
x=562, y=372..399
y=117, x=499..518
x=397, y=1455..1458
y=586, x=570..584
y=1374, x=523..525
x=623, y=50..62
x=467, y=1084..1087
x=426, y=1324..1330
x=626, y=493..498
y=383, x=501..504
x=607, y=938..946
x=456, y=1039..1050
y=681, x=450..472
x=527, y=186..197
x=391, y=926..944
x=407, y=1075..1077
x=418, y=1313..1321
x=494, y=272..280
x=398, y=1301..1322
x=465, y=318..330
x=428, y=778..788
y=1650, x=536..544
y=629, x=557..559
x=479, y=1062..1067
y=371, x=436..439
x=464, y=514..531
x=452, y=1265..1279
y=833, x=506..518
x=511, y=1142..1144
x=483, y=45..59
y=1541, x=482..504
x=492, y=1057..1070
x=452, y=626..632
y=644, x=601..607
x=411, y=1256..1258
x=581, y=1104..1106
x=468, y=1641..1645
x=596, y=744..753
x=522, y=1334..1344
y=368, x=481..509
x=603, y=938..946
x=419, y=402..414
y=352, x=557..569
x=436, y=368..371
y=1661, x=610..619
x=581, y=216..224
y=1055, x=615..624
y=253, x=581..584
y=875, x=482..484
x=564, y=689..707
x=460, y=1454..1466
y=623, x=557..559
x=576, y=245..262
x=438, y=1437..1444
y=272, x=583..590
y=243, x=460..462
x=462, y=457..466
y=507, x=593..602
y=20, x=555..583
y=1322, x=398..408
x=489, y=648..658
x=464, y=616..618
y=1303, x=521..544
y=633, x=458..474
x=585, y=451..474
x=517, y=163..168
x=570, y=1329..1341
x=503, y=1012..1021
y=1028, x=428..448
y=1445, x=594..614
x=502, y=1078..1090
y=715, x=586..593
x=409, y=29..42
x=604, y=570..583
x=529, y=218..222
x=433, y=384..395
x=573, y=742..753
x=383, y=1350..1368
x=470, y=858..878
y=1643, x=589..607
x=545, y=1711..1722
x=486, y=708..718
x=468, y=155..167
x=442, y=1404..1421
y=451, x=464..471
y=1181, x=525..528
x=612, y=492..498
x=470, y=1349..1360
x=381, y=1723..1732
x=519, y=1163..1165
x=424, y=1740..1767
x=442, y=1359..1368
y=1368, x=442..453
x=600, y=522..540
y=1114, x=450..468
y=1360, x=419..422
x=534, y=680..686
y=15, x=598..626
y=1659, x=585..588
x=576, y=1411..1423
x=507, y=983..993
x=593, y=1024..1026
y=337, x=603..620
x=497, y=569..577
y=540, x=573..600
y=1706, x=386..412
x=581, y=931..944
y=552, x=481..502
x=524, y=365..374
y=1552, x=566..591
x=431, y=1122..1133
x=407, y=1762..1764
x=397, y=90..110
x=470, y=1551..1560
x=401, y=1420..1435
y=1207, x=389..399
x=583, y=295..299
y=1147, x=560..565
x=463, y=1759..1762
y=960, x=538..558
x=560, y=406..410
x=570, y=244..245
y=1486, x=481..502
x=414, y=809..817
x=452, y=203..205
x=592, y=1456..1469
y=279, x=393..411
y=935, x=499..501
x=607, y=1633..1643
y=289, x=615..618
x=445, y=42..44
y=730, x=510..516
x=408, y=1302..1322
x=504, y=154..167
x=383, y=791..804
x=535, y=147..155
x=439, y=627..632
x=476, y=669..682
x=388, y=1143..1169
x=477, y=1178..1187
x=625, y=1575..1581
y=1344, x=506..522
x=525, y=1173..1181
x=437, y=956..969
x=394, y=1123..1133
x=573, y=1028..1050
y=315, x=386..406
y=1445, x=569..572
x=493, y=775..783
x=518, y=106..117
x=563, y=450..474
x=450, y=1716..1730
x=588, y=1732..1743
x=626, y=863..870
x=557, y=897..904
x=442, y=848..861
x=602, y=700..721
y=785, x=438..443
x=582, y=962..968
y=852, x=612..617
y=1655, x=424..426
x=580, y=416..423
y=663, x=601..607
y=986, x=381..451
y=194, x=568..578
y=491, x=542..562
x=424, y=276..288
x=576, y=798..803
y=438, x=436..452
x=448, y=156..161
x=450, y=261..264
x=525, y=87..92
y=321, x=448..459
y=1663, x=575..598
x=511, y=507..529
x=429, y=592..603
x=467, y=971..987
x=485, y=891..905
x=625, y=460..479
y=99, x=402..406
y=826, x=436..450
y=1048, x=408..412
x=625, y=24..43
y=139, x=572..587
y=1781, x=607..629
y=653, x=569..581
x=454, y=203..205
x=498, y=272..280
x=448, y=530..541
x=518, y=1256..1259
x=623, y=381..401
y=43, x=620..625
x=596, y=1256..1267
x=553, y=1160..1183
x=517, y=1216..1239
x=597, y=569..583
y=1278, x=606..627
y=140, x=429..440
x=591, y=75..77
y=753, x=563..573
y=1737, x=517..522
y=1547, x=494..521
y=1337, x=561..564
x=612, y=504..515
x=588, y=1565..1579
y=223, x=467..470
y=240, x=562..588
x=442, y=280..284
x=526, y=1130..1145
y=139, x=492..511
x=512, y=209..237
y=1512, x=538..561
y=1485, x=448..474
x=381, y=976..986
x=388, y=714..732
x=448, y=1026..1028
y=885, x=410..413
x=575, y=674..690
x=470, y=721..748
x=442, y=1715..1730
x=442, y=1269..1274
x=583, y=1670..1681
y=1239, x=517..524
y=284, x=442..445
y=1395, x=462..468
x=553, y=1436..1449
y=632, x=439..452
x=568, y=1288..1300
x=538, y=1499..1512
x=617, y=836..852
x=510, y=1235..1245
x=588, y=1657..1659
y=1677, x=539..561
x=490, y=459..478
x=441, y=1077..1090
x=461, y=169..171
x=551, y=1479..1488
x=473, y=1464..1467
x=471, y=425..451
y=1106, x=542..567
y=659, x=528..555
y=1021, x=503..508
x=542, y=104..106
y=202, x=553..556
x=414, y=509..522
x=499, y=105..117
x=608, y=776..787
y=1259, x=585..589
x=493, y=1214..1222
x=456, y=903..907
x=400, y=271..275
x=516, y=452..464
x=614, y=679..680
x=475, y=1255..1266
x=586, y=712..715
x=463, y=569..580
x=503, y=88..100
x=533, y=1366..1380
y=942, x=421..423
x=498, y=1252..1263
y=59, x=487..506
y=1145, x=457..460
y=1107, x=507..511
x=621, y=461..479
y=950, x=594..616
y=210, x=615..624
x=596, y=912..923
x=417, y=610..621
x=498, y=441..450
x=384, y=1421..1435
x=455, y=132..143
x=522, y=1735..1737
x=607, y=1771..1781
y=923, x=590..596
y=413, x=386..395
y=1727, x=464..473
y=140, x=460..472
x=391, y=1468..1488
y=1547, x=384..408`


//advent.test(part1, test, 57)
advent.run(part1, input);

// advent.test(part2, test, 29);
// advent.run(part2, input);