var activeNowDetailLessonIndex = 0;
var nowLessons;

function setupNow(data) {
    nowLessons = getNowConcurrentLessons(data);
    var nowLessonElements = [];

    for (var i = 0; i < nowLessons.length; i++) {
        for (var j = 0; j < nowLessons[i].details.length; j++) {
            nowLessonElements.push(generateLessonElement(nowLessons[i], j));
        }
    }




    refreshFocused();
}

function refreshFocused() {

    //First remove all non-essential elements
    var topChildren = $('#nowTop').children();
    for (var i = 0; i < topChildren.length; i++) {
       topChildren[i].remove();
    }

    //Add essential to top
    var topClock = $('<div>');
    topClock.attr('class', 'now-time');
    $('#nowTop').append(topClock);

    var masterLesson = getMasterLessonFromDetailIndex(nowLessons);

    //Check if we have any lessons right now
    if (masterLesson) {

        $('#nowTimeRemaining').text(getReadableTimeRemaining(masterLesson));

    }

    updateNowTime();

}

function updateNowTime() {
    var now = new Date();
    $('.now-time').text(now.getHours() + ':' + now.getMinutes());
}

function getMasterLessonFromDetailIndex(allNow) {
    var k = 0;
    for (var i = 0; i < allNow.length; i++) {
        for (var j = 0; j < allNow[i].details.length; j++) {
            if (k == activeNowDetailLessonIndex) {
                return allNow[i];
            }
            k++;
        }
    }
}

function getNowConcurrentLessons(data) {
    var currentDay = generateCurrentDate();
    var todaysLessons = [];

    for (var i = 0; i < data.lessons.length; i++) {
        if (data.lessons[i].day == currentDay) {
            todaysLessons.push(data.lessons[i]);
        }
    }

    var now = new Date();

    var fakeLesson = {
        startTime: now.getHours() + ':' + now.getMinutes(),
        endTime: now.getHours() + ':' + (now.getMinutes() + 1)
    };

    var res = getConcurrentLessons(fakeLesson, todaysLessons);

    for (var i = 0; i < res.length; i++) {
        if (!res.left) {
            res.splice(i, 1);
        }
    }

    return res;
}

function generateLessonElement(lesson, detailIndex) {
    var element = $('<div>');
    var infoElement = $('<div>');
    var timeElement = $('<div>');
    var infoTitleElement = $('<div>');
    var infoSubtitleElement = $('<div>');
    var infoTimeStart = $('<div>');
    var infoTimeEnd = $('<div>');

    element.css('background', lesson.color);

    element.attr('class', 'now-lesson-container');
    infoElement.attr('class', 'now-lesson-info');
    timeElement.attr('class', 'now-lesson-times');
    infoTitleElement.attr('class', 'now-lesson-info-title');
    infoSubtitleElement.attr('class', 'now-lesson-info-subtitle');
    infoTimeStart.attr('class', 'now-lesson-time now-lesson-start');
    infoTimeEnd.attr('class', 'now-lesson-time now-lesson-end');

    infoTitleElement.innerHTML = lesson.details[detailIndex].text;
    infoSubtitleElement.innerHTML = lesson.details[detailIndex].location + '<br>' + lesson.details[detailIndex].teacher;
    infoTimeStart.innerHTML = lesson.startTime;
    infoTimeEnd.innerHTML = lesson.endTime;

    infoElement.append(infoTitleElement);
    infoElement.append(infoSubtitleElement);
    timeElement.append(infoTimeStart);
    timeElement.append(infoTimeEnd);
    element.append(infoElement);
    element.append(timeElement);

    return element;
}

function getReadableTimeRemaining(lesson) {
    var times = lesson.endTime.split(':').map(parseFloat);
    var h = times[0];
    var m = times[1];

    var now = new Date();

    var deltaH = h - now.getHours();
    var deltaM = m - now.getMinutes();
    var deltaS = 60 - now.getSeconds();

    var res = '';
    if (deltaH > 0) {
        res += deltaH + ' tim ';
    }
    if (deltaM > 0) {
        res += deltaM + ' min ';
    }

    if (deltaH == 0 && deltaM < 10) {
        if (deltaS > 0) {
            res += deltaS + ' sek ';
        } else {
            return 'Klar!';
        }
    }

    return res + 'återstår av:';
}

