leap = [100, 130, 170, 200, 230, 270, 300, 340, 380, 420, 460, 510, 560, 610, 660, 720, 780, 850, 920, 1000, 1080, 1170, 1260]
great_leap = [130, 170, 200, 240, 280, 310, 360, 400, 440, 490, 540, 600, 650, 710, 780, 850, 920, 1000, 1090, 1180, 1280, 1390, 1500]
shard_pouch = [500, 570, 650, 730, 820, 910, 1010, 1120, 1240, 1360, 1500, 1650, 1810, 1990, 2180, 2390, 2620, 2870, 3140]
destruction = [60, 90, 120, 140, 170, 200, 230, 260, 290, 330, 360, 400, 430, 470, 510, 560, 600, 650]
guardian = [10, 40, 60, 80, 100, 120, 140, 160, 190, 210, 230, 250, 280, 300, 320, 350, 370, 400, 420, 450]
powder = [1470, 1640, 1820, 2020, 2240, 2470]
solar_grace = [550, 630, 710, 800, 890, 990, 1100, 1220, 1340, 1480, 1630, 1790, 1970, 2160, 2370, 2600, 2850, 3120]
solar_blessing = [570, 650, 730, 820, 920, 1080, 1130, 1260, 1390, 1530, 1680, 1850, 2030, 2230, 2450, 2690, 2940]
solar_protection = [590, 670, 760, 850, 950, 1060, 1170, 1290, 1430, 1580, 1740, 1910, 2100, 2300, 2530, 2770, 3040]

kLeap = "Honor Leapstone";
kGreatLeap = "Great Honor Leapstone";
kShardPouch = "Shard Pouch (L)";
kDestruction = "Destruction Stone";
kGuardian = "Guardian Stone";
kPowder = "Powder of Sage";
kSolarGrace = "Solar Grace";
kSolarBlessing = "Solar Blessing";
kSolarProtection = "Solar Protection";

function insertWithPriority(array, element, element_price, element_cost) {
	element_priority = element_price / element_cost;

	// Solar blessing is sold in bundle of 2, and solar grace in bundle of 7
	if (element == kSolarBlessing) {
		element_priority *= 2;
	} else if (element == kSolarGrace) {
		element_priority *= 7;
	}

	// Struct definition for the recommended_element object
	var new_element = {name: element, priority: element_priority, cost: element_cost}

	var debug = "";
	for (var i = 0; i < array.length; i++) {
		if (new_element.priority > array[i].priority) {
			array.splice(i, 0, new_element);
			for (element of array) {
				debug += element.name + " " + element.priority + " " + element.cost + "\n";
			}
			console.log(debug);
			return array;
		}
	}
	array.push(new_element);
	for (element of array) {
		debug += element.name + " " + element.priority + " " + element.cost + "\n";
	}
	console.log(debug);
	return array;
}

function calculate() {
	var leap_cost = document.getElementById("leap-cost").value;
	var great_leap_cost = document.getElementById("great-leap-cost").value;
	var shard_pouch_cost = document.getElementById("shard-pouch-cost").value;
	var destruction_cost = document.getElementById("destruction-cost").value;
	var guardian_cost = document.getElementById("guardian-cost").value;
	var powder_cost = document.getElementById("powder-cost").value;
	var solar_grace_cost = document.getElementById("solar-grace-cost").value;
	var solar_blessing_cost = document.getElementById("solar-blessing-cost").value;
	var solar_protection_cost = document.getElementById("solar-protection-cost").value;

	var leap_cost_index = leap.findIndex((element) => element == leap_cost);
	var great_leap_cost_index = great_leap.findIndex((element) => element == great_leap_cost);
	var shard_pouch_cost_index = shard_pouch.findIndex((element) => element == shard_pouch_cost);
	var destruction_cost_index = destruction.findIndex((element) => element == destruction_cost);
	var guardian_cost_index = guardian.findIndex((element) => element == guardian_cost);
	var powder_cost_index = powder.findIndex((element) => element == powder_cost);
	var solar_grace_cost_index = solar_grace.findIndex((element) => element == solar_grace_cost);
	var solar_blessing_cost_index = solar_blessing.findIndex((element) => element == solar_blessing_cost);
	var solar_protection_cost_index = solar_protection.findIndex((element) => element == solar_protection_cost);

	var leap_price = document.getElementById("leap-price").value;
	var great_leap_price = document.getElementById("great-leap-price").value;
	var shard_pouch_price = document.getElementById("shard-pouch-price").value;
	var destruction_price = document.getElementById("destruction-price").value;
	var guardian_price = document.getElementById("guardian-price").value;
	var powder_price = document.getElementById("powder-price").value;
	var solar_grace_price = document.getElementById("solar-grace-price").value;
	var solar_blessing_price = document.getElementById("solar-blessing-price").value;
	var solar_protection_price = document.getElementById("solar-protection-price").value;

	// Handle errors if the given cost does not match database
	var error = "";
	if (leap_cost_index == -1) {
		error = kLeap;
	}
	if (great_leap_cost_index == -1) {
		error = kGreatLeap;
	}
	if (shard_pouch_cost_index == -1) {
		error = kShardPouch;
	}
	if (destruction_cost_index == -1) {
		error = kDestruction;
	}
	if (guardian_cost_index == -1) {
		error = kGuardian;
	}
	if (powder_cost_index == -1) {
		error = kPowder;
	}

	if (solar_grace_cost_index == -1) {
		error = kSolarGrace;
	}

	if (solar_blessing_cost_index == -1) {
		error = kSolarBlessing;
	}

	if (solar_protection_cost_index == -1) {
		error = kSolarProtection;
	}
	if (error != "") {
		alert(error + "'s shard cost does not exist in database.");
		return;
	}

	
	// Initialize first buy sequence
	var leap_trimmed = leap.slice(leap_cost_index);
	var great_leap_trimmed = great_leap.slice(great_leap_cost_index);
	var shard_pouch_trimmed = shard_pouch.slice(shard_pouch_cost_index);
	var destruction_trimmed = destruction.slice(destruction_cost_index);
	var guardian_trimmed = guardian.slice(guardian_cost_index);
	var powder_trimmed = powder.slice(powder_cost_index);
	var solar_grace_trimmed = solar_grace.slice(solar_grace_cost_index);
	var solar_blessing_trimmed = solar_blessing.slice(solar_blessing_cost_index);
	var solar_protection_trimmed = solar_protection.slice(solar_protection_cost_index);
	
	var buy_priority = [];
	buy_priority = insertWithPriority(buy_priority, kLeap, leap_price, leap_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kGreatLeap, great_leap_price, great_leap_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kShardPouch, shard_pouch_price, shard_pouch_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kDestruction, destruction_price, destruction_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kGuardian, guardian_price, guardian_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kPowder, powder_price, powder_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kSolarGrace, solar_grace_price, solar_grace_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kSolarBlessing, solar_blessing_price, solar_blessing_trimmed[0]);
	buy_priority = insertWithPriority(buy_priority, kSolarProtection, solar_protection_price, solar_protection_trimmed[0]);

	// Start looping to find optimized buy sequence
	var shard_count = document.getElementById("shard-count").value;
	var leap_recommended = great_leap_recommended = shard_pouch_recommended = 0;
	var destruction_recommended = guardian_recommended = powder_recommended = 0;
	var solar_grace_recommended = solar_blessing_recommended = solar_protection_recommended = 0;
	while (shard_count >= buy_priority[0].cost) {
		recommended = buy_priority.shift();
		shard_count -= recommended.cost;
		switch(recommended.name) {
			case kLeap:
				leap_recommended++;
				leap_trimmed = leap_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kLeap, leap_price, leap_trimmed[0]);				
				break;
			case kGreatLeap:
				great_leap_recommended++;
				great_leap_trimmed = great_leap_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kGreatLeap, great_leap_price, great_leap_trimmed[0]);				
				break;
			case kShardPouch:
				shard_pouch_recommended++;
				shard_pouch_trimmed = shard_pouch_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kShardPouch, shard_pouch_price, shard_pouch_trimmed[0]);				
				break;
			case kDestruction:
				destruction_recommended++;
				destruction_trimmed = destruction_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kDestruction, destruction_price, destruction_trimmed[0]);				
				break;
			case kGuardian:
				guardian_recommended++;
				guardian_trimmed = guardian_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kGuardian, guardian_price, guardian_trimmed[0]);				
				break;
			case kPowder:
				powder_recommended++;
				powder_trimmed = powder_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kPowder, powder_price, powder_trimmed[0]);				
				break;
			case kSolarGrace:
				solar_grace_recommended++;
				solar_grace_trimmed = solar_grace_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kSolarGrace, solar_grace_price, solar_grace_trimmed[0]);
				console.log(solar_grace_trimmed);
				break;
			case kSolarBlessing:
				solar_blessing_recommended++;
				solar_blessing_trimmed = solar_blessing_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kSolarBlessing, solar_blessing_price, solar_blessing_trimmed[0]);				
				break;
			case kSolarProtection:
				solar_protection_recommended++;
				solar_protection_trimmed = solar_protection_trimmed.slice(1);
				buy_priority = insertWithPriority(buy_priority, kSolarProtection, solar_protection_price, solar_protection_trimmed[0]);				
				break;
			default:
				break;
		}
	}

	document.getElementById("leap-recommended").textContent = leap_recommended;
	document.getElementById("great-leap-recommended").textContent = great_leap_recommended;
	document.getElementById("shard-pouch-recommended").textContent = shard_pouch_recommended;
	document.getElementById("destruction-recommended").textContent = destruction_recommended;
	document.getElementById("guardian-recommended").textContent = guardian_recommended;
	document.getElementById("powder-recommended").textContent = powder_recommended;
	document.getElementById("solar-grace-recommended").textContent = solar_grace_recommended;
	document.getElementById("solar-blessing-recommended").textContent = solar_blessing_recommended;	
	document.getElementById("solar-protection-recommended").textContent = solar_protection_recommended;
}
