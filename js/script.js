var subjects = {
'FYSFYS01' 	: 'Fysik 1',
'FYSFYS01a' : 'Fysik 1a',
'FYSFYS02' 	: 'Fysik 2',
'MATMAT01b' : 'Matematik 1b',
'MATMAT01c' : 'Matematik 1c',
'MATMAT02b' : 'Matematik 2b',
'MATMAT02c' : 'Matematik 2c',
'MATMAT03b'	: 'Matematik 3b',
'MATMAT03c' : 'Matematik 3c',
'MATMAT04' 	: 'Matematik 4',
'MATMAT05' 	: 'Matematik 5',
'ENGENG05' 	: 'Engelska 5',
'ENGENG06' 	: 'Engelska 6',
'ENGENG07' 	: 'Engelska 7',
'HISHIS01a' : 'Historia 1a',
'HISHIS01b' : 'Historia 1b',
'HISHIS02' 	: 'Historia 2',
'SVESVE01' 	: 'Svenska 1',
'SVESVE02' 	: 'Svenska 2',
'SVESVE03' 	: 'Svenska 3',
'SAMSAM01'	: 'Samhällskunskap 1',
'SAMSAM01b'	: 'Samhällskunskap 1b',
'SAMSAM02' 	: 'Samhällskunskap 2',
'MENTORSRÅD': 'Mentorsråd',
'GYARTE'	: 'Gymnasiearbete',
'GYAREK'	: 'Gymnasiearbete',
'GYARES'	: 'Gymnasiearbete',
'GYARNA'	: 'Gymnasiearbete',
'GYARSA'	: 'Gymnasiearbete',
'KEMKEM01'	: 'Kemi 1',
'KEMKEM02'	: 'Kemi 2',
'TEKTEK01'	: 'Teknik 1',
'WEBWEB01'	: 'Webserverprogrammering 1',
'WEBWEU01'	: 'Webutveckling 1',
'WEBWEU02'	: 'Webutveckling 2',
'DAODAO'	: 'Datakunskap',
'RELREL01'	: 'Religion 1',
'PSKPSY01'	: 'Psykologi 1',
'PSKPSY02a'	: 'Psykologi 2a',
'PSKPSY02b'	: 'Psykologi 2b',
'BIOBIO01'	: 'Biologi 1',
'BIOBIO02'	: 'Biologi 2',
'IDRIDR01'	: 'Idrott 1',
'IDRIDR02'	: 'Idrott 2',
'MODITA01'	: 'Moderna Språk 1 (Italenska)',
'MODDEU01'	: 'Moderna Språk 1 (Tyska)',
'MODDEU02'	: 'Moderna Språk 2 (Tyska)',
'MODITA02'	: 'Moderna Språk 2 (Italenska)',
'MODFRA03'	: 'Moderna Språk 3 (Franska)',
'MODSPA03'	: 'Moderna Språk 3 (Spanska)',
'MODDEU03'	: 'Moderna Språk 3 (Tyska)',
'MODFRA04'	: 'Moderna Språk 4 (Franska)',
'MODSPA04'	: 'Moderna Språk 4 (Spanska)',
'MODDEU04'	: 'Moderna Språk 4 (Tyska)',
'TISDAG'	: 'Tisdagslektion',
'FOTFOT01'	: 'Fotografi 1',
'SVERET0'	: 'Retorik',
'JURRÄT'	: 'JURRÄT',
'SOISOO0'	: 'SOISOO0',
'LEDLED0'	: 'LEDLED0',
'PEDKOU0'	: 'PEDKOU0',
'NAKNAK01b'	: 'NAKNAK01b',
'NAKNAK02'	: 'NAKNAK02',
'HUMHUM00S'	: 'HUMHUM00S',
'HUMHUM00S2': 'HUMHUM00S2',
'KOSFIL0'	: 'KOSFIL0',
'FÖRENT0'	: 'FÖRENT0',
'FÖRFÖR00S'	: 'FÖRFÖR00S',
'MERMEE01'	: 'MERMEE01',
'SVASVA02'	: 'SVASVA02',

};

$.ajaxSetup ({
    cache: false
});

$(function() {
    var selectedClass = localStorage.getItem('class') || '13TE';
    $('#classSelect').val(selectedClass);
    $('#className').text(selectedClass);

    fetchData(selectedClass);
});

function fetchData(className) {
    $.getJSON('http://vgy.rocks/johnrs/schema/getjson.php?className=' + className, handleData);
    //$.getJSON('http://localhost/schema/getjson.php?className=' + className, handleData);
}

function handleData(data) {

	var scheduleElement = $('#schedule');
	var dayHeaderElement = $('#dayHeader');
	var classNameElement = $('#className');

	$('.class').remove();
	$('.day').remove();

	classNameElement.text(data.className);

	for (var i = 0; i < data.titles.length; i++) {
		var dayTitleElement = $('<div>');
		dayTitleElement.attr('class', 'day');
		dayTitleElement.text(data.titles[i]);

		dayHeaderElement.append(dayTitleElement);
	}

	//preprocessing, do serverside later
	var lessonsDays = [];

	//Add all lesson days
	for (var i = 0; i < data.lessons.length; i++) {
		for (var j = 0; j < data.titles.length; j++) {
			var lessonsToday = [];

			for (var k = 0; k < data.lessons.length; k++) {
				if (data.lessons[k].day == j && data.lessons[k] != lesson) {
					lessonsToday.push(data.lessons[k]);
				}
			}

			lessonsDays.push(lessonsToday);
		}
	}

	//Set data about concurrent and simultaneous lessons
	for (var i = 0; i < data.lessons.length; i++) {
		var lesson = data.lessons[i];

		lesson.concurrentLessons = 1;//getConcurrentLessons(lesson, lessonsDays[lesson.day]);
		lesson.simultaneousLessons = 1;//getSimultaneousLessons(lesson, lessonsDays[lesson.day]);
	}

	for (var i = 0; i < data.lessons.length; i++) {
		var lesson = data.lessons[i];

		var yStart = getYStartPercent(lesson.startTime);
		var lessonHeight = getLessonHeightPercent(lesson.startTime, lesson.endTime);

		if (lesson.simultaneousLessons != 1) {
			if (lesson.left == null) {
				lesson.left = 0;
				for (var a = 0; a < lesson.simultaneousLessons; a++) {
					data.lessons[i + a].left = (18.6 / data.lessons[i + 1].simultaneousLessons) * (a);
				}
			}
		} else {
			lesson.left = 0;
		}

		var mainElement = $('<div>');
		mainElement.attr('class', 'class');

		mainElement.css('top', yStart + '%');
		mainElement.css('height', lessonHeight + '%');
		mainElement.css('background', getColor(lesson.rows[0]));
		mainElement.css('width', 18.6 / lesson.concurrentLessons + '%');

		mainElement.css('left', ((lesson.day * 20) + lesson.left) + '%');

		var startTimeElement = $('<div>');
		startTimeElement.attr('class', 'start');
		startTimeElement.text(lesson.startTime);

		var endTimeElement = $('<div>');
		endTimeElement.attr('class', 'end');
		endTimeElement.text(lesson.endTime);

		var infoElement = $('<div>');
		infoElement.attr('class', 'info');

		var centerElement = $('<div>');
		centerElement.attr('class', 'center-holder');

		if (subjects[lesson.rows[0]]) {
			lesson.rows = lesson.rows.splice(0, 1);
			lesson.rows[0] = subjects[lesson.rows[0]];
		}

		if (lesson.rows.length > 4) {
			//Skulle kunna vara individuellt val, rensa alla korta
			for (var k = 0; k < lesson.rows.length; k++) {
				if (lesson.rows[k].length < 5) {
					lesson.rows.splice(lesson.rows.indexOf(lesson.rows[k]), 1);
					k--;
				}
			}

			//Nu är det rensat, nu byter vi ut namnen
			for (var k = 0; k < lesson.rows.length; k++) {
				var keys = Object.keys(subjects);
				for (var a = 0; a < keys.length; a++) {
					if (lesson.rows[k].indexOf(keys[a]) > -1) {
						lesson.rows[k] = subjects[keys[a]];
					}
				}
			}
		}

		for (var k = 0; k < lesson.rows.length; k++) {
			var rowElement = $('<div>');
			rowElement.attr('class', 'row');
			rowElement.text(lesson.rows[k]);

			centerElement.append(rowElement);
		}

		infoElement.append(centerElement);
		mainElement.append(startTimeElement);
		mainElement.append(infoElement);
		mainElement.append(endTimeElement);

		scheduleElement.append(mainElement);
		
	}

	resizeEvent();
};

var schoolEnd = getTimeSinceStart('17:30');

var sizeToHeight = [21, 17, 15, 14, 13, 13, 11, 10, 9, 8, 6];
var fontSizes = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5];

var color = -1;
var palette = ['#F44336', '#3F51B5', '#009688', '#607D8B', '#FF5722', '#9C27B0', '#4CAF50', '#2196F3', '#34495e', '#27ae60'];
var classes = [];
var colors = [];

function getColor(name) {
	if (classes.indexOf(name) < 0) {
		classes.push(name);
		colors[classes.indexOf(name)] = nextColor();
	}
	return colors[classes.indexOf(name)];
}

function nextColor() {
	color++;
	if (color >= palette.length) {
		color = 0;
	}
	return palette[color];
}


function getLessonHeightPercent(start, end) {
	var tot = getTimeSinceStart(end) - getTimeSinceStart(start);
	return (tot / schoolEnd) * 100;
}

//This function says how far into the day the lesson is in percent
function getYStartPercent(time) {
	return (getTimeSinceStart(time) / schoolEnd) * 100;
}
//This function return the time in hours since 8 am
function getTimeSinceStart(time) {
	var h = parseFloat(time.substring(0, 2));
	var m = parseFloat(time.substring(3, 5));

	h -= 8;
	var tot = h;
	tot += (m / 60);

	return tot;
}

//Returns the maximum amount of lesson which take place at the same time as the current lesson
function getConcurrentLessons(current, all) {
	var cStart = getTimeSinceStart(current.startTime);
	var cEnd = getTimeSinceStart(current.endTime);

	var maxConcurrent = 1;

	for (var time = cStart; time < cEnd; time += 0.01) {

		var concurrent = 1;

		for (var i = 0; i < all.length; i++) {
			if (current != all[i]) {
				var tStart = getTimeSinceStart(all[i].startTime);
				var tEnd = getTimeSinceStart(all[i].endTime);

				if (tStart < time && tEnd > time) {
					concurrent++;
				}
			}
		}

		if (concurrent > maxConcurrent) {
			maxConcurrent = concurrent;
		}
	}

	return maxConcurrent;
}

//Returns the amount of lessons that take place sometime in the timeframe of this lesson.
//For example; half the class has biology and the other half have first physics then
//chemistry. This function will return 3 even though there are a maximum of 3 concurrent lessons
function getSimultaneousLessons(current, all) {
	var cStart = getTimeSinceStart(current.startTime);
	var cEnd = getTimeSinceStart(current.endTime);

	var simultaneous = 1;
	
	for (var i = 0; i < all.length; i++) {
		var tStart = getTimeSinceStart(all[i].startTime);
		var tEnd = getTimeSinceStart(all[i].endTime);

		if (tStart < cStart) {
			if (tEnd > cStart) {
				simultaneous++;
			}
		} else {
			if (tStart < cEnd) {
				simultaneous++;
			}
		}
	}

	return simultaneous;
}

$(window).resize(function() {
	resizeEvent();
});

//This function makes sure text is readble regardless of window size
function resizeEvent() {
	var classes = $('.class');

	var shrunkClasses = [];

	for (var i = 0; i < classes.length; i++) {
		var size = 15;

		while (true) {
			$(classes[i]).css('font-size', size + 'px');
			if ($(classes[i]).find('.info').find('.center-holder').height() <
				$(classes[i]).height() - ($(classes[i]).find('.start').height())) {
				break;
			} else {
				if (size < 6) {
					shrunkClasses.push($(classes[i]));
					break;
				} else {
					shrunkClasses.push($(classes[i]));
					size--;
				}
			}
		}
	}

	for (var i = 0; i < shrunkClasses.length; i++) {
		shrunkClasses[i].find('.info').find('center-holder').css('top', 'calc(50% +' + '10px);');
	}

}

//This function is called by the spinner in the top panel to change
//the active schedule
function changeClass(classSelected) {
    localStorage.setItem('class', classSelected);
 	fetchData(classSelected);
}