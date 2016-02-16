"use strict";

var lastModal = -1;

$(window).resize(function() {
    resizeEvent();
});

//This function makes sure text is readable regardless of window size
function resizeEvent() {
    var classes = $('.class');

    var shrunkClasses = [];

    for (var i = 0; i < classes.length; i++) {
        var size = 15;

        while (true) {
            $(classes[i]).css('font-size', size + 'px');
            if ($(classes[i]).find('.info').find('.center-holder').height() <
                $(classes[i]).height() - 1.4 * ($(classes[i]).find('.start').height())) {
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

function weekBack() {
    var weekNum = parseFloat($('#weekSelectNow').text());
    var i = weeks.indexOf(weekNum + '');

    if (i == -1) {
        if (weekNum <= 1) {
            weekNum = Math.max.apply(Math, weeks);
        } else {
            weekNum--;
        }
    } else {
        if (i >= 1) {
            weekNum = weeks[i - 1];
        } else {
            weekNum = weeks[weeks.length - 1];
        }
    }

    $('#weekSelectNow').text(weekNum);
    fetchData(localStorage.getItem('class') || '13TE', $('#weekSelectNow').text());
}

function weekForward() {
    var weekNum = parseFloat($('#weekSelectNow').text());

    var i = weeks.indexOf(weekNum + '');

    if (i == -1) {
        if (weekNum >= 52) {
            weekNum = Math.min.apply(Math, weeks);
        } else {
            weekNum++;
        }
    } else {
        if (i < weeks.length - 1) {
            weekNum = weeks[i + 1];
        } else {
            weekNum = weeks[0];
        }
    }

    $('#weekSelectNow').text(weekNum);
    fetchData(localStorage.getItem('class') || '13TE', $('#weekSelectNow').text());
}

//This function is called by the spinner in the top panel to change
//the active schedule
function changeClass(classSelected) {
    setClass(classSelected);

    localStorage.setItem('class', classSelected);
    fetchData(classSelected, $('#weekSelectNow').text());
}

function changeView() {
    var prev = getCurrentView();
    if (prev == VIEW_WEEK) {
        setCurrentView(VIEW_DAY);
    } else {
        setCurrentView(VIEW_WEEK);
    }

    invalidateLayout(prev);
}

var modalContainer = $('#modalContainer');

function lessonClickHandler(lesson) {
    return function() {
        $('#modalMasterHolder').append(modalContainer);

        modalContainer.empty();

        for (var i = 0; i < lesson.info.length; i++) {
            var sublesson = lesson.info[i];
            $('#modalContainer').append('<div onclick="event.stopPropagation()" style="background: '  + lesson.color + '" class="modal"><div class="modalTitle">' + sublesson.text + '</div><table><tr><td>Från:</td><td>' + lesson.startTime + '</td></tr>   <tr><td>Till:</td><td>' + lesson.endTime + '</td></tr>     <tr><td>Dag:</td><td>' + lastData.titles[lesson.day].split(' ')[0] + '</td></tr>    <tr><td>Sal:</td><td>' + sublesson.location + '</td></tr></table></div>');
        }

        setModalVisibility(true);
    }
}

function setModalVisibility(visible) {
    if (visible) {
        $('#overlay-layout').css('display', 'block');
    } else {
        $('#overlay-layout').css('display', 'none');
        modalContainer.remove();
    }
}