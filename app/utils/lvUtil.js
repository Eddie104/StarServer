"use strict";

const expList = [
	0,
	3,
	12,
	27,
	48,
	75,
	108,
	147,
	192,
	243,
	300,
	363,
	432,
	507,
	588,
	675,
	768,
	867,
	972,
	1083,
	1200,
	1323,
	1452,
	1587,
	1728,
	1875,
	2028,
	2187,
	2352,
	2523,
	2700,
	2883,
	3072,
	3267,
	3468,
	3675,
	3888,
	4107,
	4332,
	4563,
	3200,
	3362,
	3528,
	3698,
	3872,
	4050,
	4232,
	4418,
	4608,
	4802,
	5000,
	5202,
	5408,
	5618,
	5832,
	6050,
	6272,
	6498,
	6728,
	6962,
	7200,
	7442,
	7688,
	7938,
	8192,
	8450,
	8712,
	8978,
	9248,
	9522,
	9800,
	10082,
	10368,
	10658,
	10952,
	11250,
	11552,
	11858,
	12168,
	12482,
	12800,
	13122,
	13448,
	13778,
	14112,
	14450,
	14792,
	15138,
	15488,
	15842,
	16200,
	16562,
	16928,
	17298,
	17672,
	18050,
	18432,
	18818,
	19208,
	19602
];

exports.getLv = function (val) {
	if (typeof(val) === 'number') {
		if (val < 1) {
			return 1;
		}
		let leftIndex = 0, middleIndex = 0;
		let rightIndex = expList.length - 1;
		while (rightIndex >= leftIndex) {
			middleIndex = (rightIndex + leftIndex) >> 1;
			if (expList[middleIndex] > val) { 
				rightIndex = middleIndex - 1;
			} else {
				leftIndex = middleIndex + 1;
			}
		}
		return leftIndex;
	} else {
		return 1;
	}
};

exports.getNextLvExp = function(lv) {
	return expList[Math.min(expList.length - 1, lv)];
};
