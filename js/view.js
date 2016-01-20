"use strict";

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
    if (getCurrentView() == VIEW_WEEK) {
        setCurrentView(VIEW_DAY);
    } else {
        setCurrentView(VIEW_WEEK);
    }

    invalidateLayout();
}

function lessonClickHandler(lesson) {
    return function() {
        var res = '';
        for (var i = 0; i < lesson.rows.length; i++) {
            if (i != 0) {
                res += '<br>';
            }
            res += lesson.rows[i];
        }
        if (!res) {
            res = 'Okänt'
        }
        if (!lesson.location) {
            $('#modalLocation').text('Okänt');
        } else {
            $('#modalLocation').text(lesson.location);
        }

        $('#modalTitle').html(res);
        $('#modalTimeStart').text(lesson.startTime);
        $('#modalTimeEnd').text(lesson.endTime);
        $('#modalDay').text(lastData.titles[lesson.day].split(' ')[0]);
        $('#modal').css('background', lesson.color);
        setModalVisibility(true);
    }
}

function setModalVisibility(visible) {
    if (visible) {
        $('#overlay-layout').css('display', 'block');
    } else {
        $('#overlay-layout').css('display', 'none');
    }
}