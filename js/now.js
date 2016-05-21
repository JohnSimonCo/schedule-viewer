var activeNowDetailLessonIndex = 0;
var nowLessons, upcomingLessons;

function setupNow(data) {
    nowLessons = getNowConcurrentLessons(data);
    var nowLessonElements = [];

    for (var i = 0; i < nowLessons.length; i++) {
        for (var j = 0; j < nowLessons[i].info.length; j++) {
            nowLessonElements.push(generateLessonElement(nowLessons[i], j));
        }
    }

    var nowUpcomingLessonElements = [];
    upcomingLessons = getUpcomingLessons(data);
    for (var i = 0; i < upcomingLessons.length; i++) {
        var subLessonElements = [];
        for (var j = 0; j < upcomingLessons[i].info.length; j++) {
            subLessonElements.push(generateLessonElement(upcomingLessons[i], j));
        }
        nowUpcomingLessonElements.push(subLessonElements);
    }

    nowLessonElements = addScrollingSubstructure([nowLessonElements]);
    nowUpcomingLessonElements = addScrollingSubstructure(nowUpcomingLessonElements);

    generateSection('Nuvarande lektion:', nowLessonElements, nowLessons[0], true);
    generateSection(upcomingLessons.length == 1 ? 'Kommande lektion:' : 'Kommande lektioner', nowUpcomingLessonElements, upcomingLessons[0], false);

    updateNowTime();
}

function addScrollingSubstructure(elementList) {
    var res = [];

    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].length == 1) {
            res.push(elementList[i]);
        } else {
            var container = $('<div>');

            var leftArrowContainer = $('<div>');
            var leftArrowSvg = $('<svg>');
            var leftArrowPath1 = $('<path>');
            var leftArrowPath2 = $('<path>');

            var rightArrowContainer = $('<div>');
            var rightArrowSvg = $('<svg>');
            var rightArrowPath1 = $('<path>');
            var rightArrowPath2 = $('<path>');


            leftArrowContainer.attr('class', 'now-arrow-left');
            leftArrowSvg.attr('fill', '#fff');
            leftArrowSvg.attr('viewBox', '0 0 24 24');
            leftArrowSvg.attr('xmlns', 'http://www.w3.org/2000/svg');
            leftArrowPath1.attr('d', 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z');
            leftArrowPath2.attr('d', 'M0-.5h24v24H0z');
            leftArrowPath2.attr('fill', 'none');

            rightArrowContainer.attr('class', 'now-arrow-right');
            rightArrowSvg.attr('fill', '#fff');
            rightArrowSvg.attr('viewBox', '0 0 24 24');
            rightArrowSvg.attr('xmlns', 'http://www.w3.org/2000/svg');
            rightArrowPath1.attr('d', 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z');
            rightArrowPath2.attr('d', 'M0-.25h24v24H0z');
            rightArrowPath2.attr('fill', 'none');

            leftArrowSvg.append(leftArrowPath1);
            leftArrowSvg.append(leftArrowPath2);
            leftArrowContainer.append(leftArrowSvg);

            rightArrowSvg.append(rightArrowPath1);
            rightArrowSvg.append(rightArrowPath2);
            rightArrowContainer.append(rightArrowSvg);

            container.append(leftArrowContainer);

            var holder = $('<div>');

            for (var j = 0; j < elementList[i].length; j++) {
                holder.append(elementList[i][j]);
            }

            container.append(holder);
            container.append(rightArrowContainer);

            res.push(container);
        }
    }

    return res;
}

function generateSection(title, elements, firstLesson, now) {
    var header = $('<div>');
    var timeCounterElement  = $('<div>');

    header.attr('class', 'now-header');
    timeCounterElement.attr('class', 'now-time-remaining');
    timeCounterElement.addClass(now ? 'readableTimeNow' : 'readableTimeLater');

    header.text(title);
    timeCounterElement.text(now ? getReadableTimeRemaining(firstLesson) : getReadableTimeUntil(firstLesson));

    $('#nowSectionHolder').append(header);
    $('#nowSectionHolder').append(timeCounterElement);

    for (var i = 0; i < elements.length; i++) {
        $('#nowSectionHolder').append(elements[i]);
    }
}

function updateNowTime() {
    var now = new Date();
    $('.now-time').text(now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()));

    var currentCount = $('.readableTimeNow');
    if (currentCount && nowLessons) {
        $('.readableTimeNow').text(getReadableTimeRemaining(nowLessons[0]));
    }

    var laterCount = $('.readableTimeLater');
    if (laterCount && upcomingLessons) {
        $('.readableTimeLater').text(getReadableTimeUntil(upcomingLessons[0]));
    }

    setTimeout(updateNowTime, 1000);
}

function getMasterLessonFromDetailIndex(allNow) {
    var k = 0;
    for (var i = 0; i < allNow.length; i++) {
        for (var j = 0; j < allNow[i].info.length; j++) {
            if (k == activeNowDetailLessonIndex) {
                return allNow[i];
            }
            k++;
        }
    }
}

function getUpcomingLessons(data) {
    var currentDay = generateCurrentDate();
    var upcoming = [];
    for (var i = 0; i < data.lessons.length; i++) {
        if (data.lessons[i].day == currentDay && isAfterNow(data.lessons[i])) {
            upcoming.push(data.lessons[i]);
        }
    }

    return upcoming;
}

function isAfterNow(lesson) {
    var times = lesson.startTime.split(':').map(parseFloat);
    var h = times[0];
    var m = times[1];

    var now = new Date();

    if (h > now.getHours()) {
        return true;
    } else if (h == now.getHours()) {
        if (m > now.getMinutes()) {
            return true;
        }
    }
    return false;


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

    infoTitleElement.text(lesson.info[detailIndex].text);
    infoSubtitleElement.text(lesson.info[detailIndex].location + '\n' + lesson.info[detailIndex].teacher);
    infoTimeStart.text(lesson.startTime);
    infoTimeEnd.text(lesson.endTime);

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

    var deltaH = h - now.getHours() - 1;
    var deltaM = m - now.getMinutes();
    var deltaS = 60 - now.getSeconds();

    var res = '';

    if (deltaH > 0) {
        res += deltaH + ' tim ';
    }

    var rm;

    if (deltaH == 0) {
        rm = 60 - now.getMinutes() + m;
    } else if (deltaM > 0) {
        rm = deltaM;
    }
    res += rm + ' min ';

    if (deltaH == 0 && rm < 10) {
        if (deltaS > 0) {
            res += deltaS + ' sek ';
        } else {
            return 'Klar!';
        }
    }

    return res + 'återstår av:';
}

function getReadableTimeUntil(lesson) {
    var times = lesson.startTime.split(':').map(parseFloat);
    var h = times[0];
    var m = times[1];

    var now = new Date();

    var deltaH = h - now.getHours() - 1;
    var deltaM = m - now.getMinutes();
    var deltaS = 60 - now.getSeconds();

    var res = '';
    if (deltaH > 0) {
        res += deltaH + ' tim ';
    }

    var rm;

    if (deltaH == 0) {
        rm = 60 - now.getMinutes() + m;
    } else if (deltaM > 0) {
        rm = deltaM;
    }
    res += rm + ' min ';

    if (deltaH == 0 && rm < 10) {
        if (deltaS > 0) {
            res += deltaS + ' sek ';
        } else {
            return 'Klar!';
        }
    }

    return res + 'tills:';
}