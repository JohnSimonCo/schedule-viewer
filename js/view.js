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

//TODO REDO
function weekBack() {
    var weekNum = parseFloat($('#weekSelectNow').text());
    if (weekNum <= 1) {
        weekNum = 52;
    } else {
        weekNum--;
    }

    $('#weekSelectNow').text(weekNum);
    fetchData(localStorage.getItem('class') || '13TE', $('#weekSelectNow').text());
}

function weekForward() {
    var weekNum = parseFloat($('#weekSelectNow').text());
    if (weekNum >= 52) {
        weekNum = 1;
    } else {
        weekNum++;
    }

    $('#weekSelectNow').text(weekNum);
    fetchData(localStorage.getItem('class') || '13TE', $('#weekSelectNow').text());
}

//This function is called by the spinner in the top panel to change
//the active schedule
function changeClass(classSelected) {
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