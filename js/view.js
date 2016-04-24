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
function changeWeek(week) {
    $('#weekSelectNow').text(week);
    fetchData(localStorage.getItem('class') || '13TE', $('#weekSelectNow').text());
}

function toggleClassDropdown() {
    if (classDropdownVisible) {
        $('#classDropdown').css('display', 'none');
        $('#class-dropdown-overlay-layout').css('display', 'none')
    } else {
        $('#classDropdown').css('display', 'block');
        $('#class-dropdown-overlay-layout').css('display', 'block ')
    }

    classDropdownVisible = !classDropdownVisible;
}

function toggleWeekDropdown() {
    if (weekDropdownVisible) {
        $('#weekDropdown').css('display', 'none');
        $('#week-dropdown-overlay-layout').css('display', 'none')
    } else {
        $('#weekDropdown').css('display', 'block');
        $('#week-dropdown-overlay-layout').css('display', 'block ')
    }

    weekDropdownVisible = !weekDropdownVisible;
}


//This function is called by the spinner in the top panel to change
//the active schedule
function changeClass(classSelected) {

    $('#className').text(classSelected);

    $('.selectedClass').removeClass('selectedClass');
    $('#' + classSelected +  'classDropdown').addClass('selectedClass');

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
            //TODO switch to false when we have new lärare info
            if (false) {
                $('#modalContainer').append('<div onclick="event.stopPropagation()" style="background: '  + sublesson.color + '" class="modal"><div class="modalTitle">' + sublesson.text + '</div><table><tr><td>Från:</td><td>' + lesson.startTime + '</td></tr>   <tr><td>Till:</td><td>' + lesson.endTime + '</td></tr>     <tr><td>Dag:</td><td>' + lastData.titles[lesson.day].split(' ')[0] + '</td></tr>    <tr><td>Sal:</td><td>' + sublesson.location + '</td></tr>    <tr><td>Lärare:</td><td>' + sublesson.teacher + '</td></tr>     </table></div>');
            } else {
                $('#modalContainer').append('<div onclick="event.stopPropagation()" style="background: '  + sublesson.color + '" class="modal"><div class="modalTitle">' + sublesson.text + '</div><table><tr><td>Från:</td><td>' + lesson.startTime + '</td></tr>   <tr><td>Till:</td><td>' + lesson.endTime + '</td></tr>     <tr><td>Dag:</td><td>' + lastData.titles[lesson.day].split(' ')[0] + '</td></tr>    <tr><td>Sal:</td><td>' + sublesson.location + '</td></tr>   </table></div>');
            }
        }

        //Let's set appropriate padding-top and padding-bottom
        //for modalContainer

        //Top should be calc(50vh - (half top card height))
        //Bottom should be calc(50vh - (half bottom card height))


        //First we get a list of all children
        var children = $('#modalContainer').children();

        var topHeight = $(children[0]).innerHeight();
        var bottomHeight = $(children[children.length - 1]).innerHeight();

        $('#modalContainer').css('padding-top', 'calc(50vh - ' + (topHeight/2 + 20) + 'px)');
        $('#modalContainer').css('padding-bottom', 'calc(50vh - ' + (bottomHeight/2 + 20) + 'px)');

        setModalVisibility(true);
    }
}

function setModalVisibility(visible) {
    if (visible) {
        $('#overlay-layout').css('visibility', 'visible');
        $('#overlay-layout').css('opacity', '1');
    } else {
        $('#overlay-layout').css('opacity', '0');
        setTimeout(function() {
            $('#overlay-layout').css('visibility', 'hidden');
            modalContainer.remove();
       }, 200);
    }
}

function showLoadingIndicator() {
    var uiElements = $('.day');
    var classes = $('.class');
    var empties = $('.empty-view');
    var emptiesLov = $('.empty-view-lov');

    for (var i = 0; i < classes.length; i++) {
        uiElements.push(classes[i]);
    }

    for (var i = 0; i < empties.length; i++) {
        uiElements.push(empties[i]);
    }

    for (var i = 0; i < emptiesLov.length; i++) {
        uiElements.push(emptiesLov[i]);
    }

    uiElements.push()

    for (var i = 0; i  < uiElements.length; i++) {
        $(uiElements[i]).css('transition', 'opacity 120ms');
        $(uiElements[i]).css('opacity', '0');
    }

    setTimeout(function() {
        $('#schedule').css('display', 'none');

        $('#loadingIndicator').css('display', 'block');
        $('#loadingIndicator').css('opacity', '1');

    }, 120);
}

function hideLoadingIndicator() {
    var deferred = $.Deferred();
    var promise = deferred.promise();

    $('#loadingIndicator').css('opacity', '0');

    setTimeout(function() {

        $('#schedule').css('display', 'block');

        $('#loadingIndicator').css('display', 'none');

        deferred.resolve();

    }, 120);

    return promise;
}