//http://www.skolverket.se/laroplaner-amnen-och-kurser/gymnasieutbildning/gymnasieskola/sok-amnen-kurser-och-program/search.htm?alphaSearchString=&searchType=FREETEXT&searchRange=COURSE&subjectCategory=&searchString=

var thElements = document.querySelectorAll('.searchresult > tbody th');
var tdElements = document.querySelectorAll('.searchresult > tbody td');

var subjects = {
'DAODAO'	: 'Datakunskap'
};

var languages = [
	['SPA', 'Spanska]',
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