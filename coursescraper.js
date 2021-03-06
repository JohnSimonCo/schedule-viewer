//http://www.skolverket.se/laroplaner-amnen-och-kurser/gymnasieutbildning/gymnasieskola/sok-amnen-kurser-och-program/search.htm?alphaSearchString=&searchType=FREETEXT&searchRange=COURSE&subjectCategory=&searchString=

var thElements = document.querySelectorAll('.searchresult > tbody th');
var tdElements = document.querySelectorAll('.searchresult > tbody td');

var subjects = {
'DAODAO'	: 'Datakunskap',
'MENTORSRÅD': 'Mentorsråd',
'GYARTE'	: 'Gymnasiearbete',
'GYAREK'	: 'Gymnasiearbete',
'GYARES'	: 'Gymnasiearbete',
'GYARNA'	: 'Gymnasiearbete',
'GYARSA'	: 'Gymnasiearbete',
'TISDAG'	: 'Tisdagslektion',
'MUSINS01'  : 'Instrument/Sång 1',
'MUSINS02'  : 'Instrument/Sång 2',
'MUSENS02'  : 'Ensemble 2'
};

var languages = [
	['SPA', 'Spanska'],
	['FRA', 'Franska'],
	['DEU', 'Tyska'],
	['ITA', 'Italenska']
];

for (var i = 0; i < thElements.length; i++) {
	if (tdElements[i].innerText.indexOf('XXX') > -1) {
		for (var k = 0; k < languages.length; k++) {
			subjects[tdElements[i].innerText.replace('XXX', languages[k][0])] = thElements[i].innerText + ' (' + languages[k][1] + ')';
		}
	} else {
		subjects[tdElements[i].innerText] = thElements[i].innerText;
	}
}

var res = '';
var keys = Object.keys(subjects);
for (var i = 0; i < keys.length; i++) {
	res += '"';
	res += keys[i];
	res += '":"';
	res += subjects[keys[i]];
	res += '"'
	if (i != keys.length - 1) {
		res += ','
	}
}

console.log(res);