"use strict";

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
    var startTime = getTimeSinceStart(start);
    var endTime = getTimeSinceStart(end);

    if (endTime > schoolEnd) {
        return ((lastLessonTime - startTime) / schoolEnd) * 100;
    } else {
        return ((endTime - startTime) / schoolEnd) * 100;
    }
}

//This function says how far into the day the lesson is in percent
function getYStartPercent(time) {
    return (getTimeSinceStart(time) / schoolEnd) * 100;
}
//This function return the time in hours since 7:45 am
function getTimeSinceStart(time) {
    var times = time.split(':').map(parseFloat);
    var h = times[0];
    var m = times[1];

    h -= 7.75;
    var tot = h;
    tot += (m / 60);

    return tot;
}

function getCurrentView() {
    return localStorage.getItem('view');
}

function setCurrentView(value) {
    setCurrentView(value);
    localStorage.setItem('view', value)
    updateVisibleViewIndicator();
}

//Returns the maximum amount of lesson which take place at the same time as the current lesson
function getConcurrentLessons(current, all) {
    var cStart = getTimeSinceStart(current.startTime);
    var cEnd = getTimeSinceStart(current.endTime);

    var concurrentLessons = [];

    for (var time = cStart; time < cEnd; time += 0.01) {

        var concurrent = 1;
        var lessons = [current];

        for (var i = 0; i < all.length; i++) {
            if (current != all[i]) {
                var tStart = getTimeSinceStart(all[i].startTime);
                var tEnd = getTimeSinceStart(all[i].endTime);

                if (tStart < time && tEnd > time) {
                    concurrent++;
                    lessons.push(all[i]);
                }
            }
        }

        if (concurrent > concurrentLessons.length) {
            concurrentLessons = lessons;
        }
    }

    return concurrentLessons;
}

//Returns the amount of lessons that take place sometime in the timeframe of this lesson.
//For example; half the class has biology and the other half have first physics then
//chemistry. This function will return 3 even though there are a maximum of 2 concurrent lessons
function getSimultaneousLessons(current, all, previous) {
    var cStart = getTimeSinceStart(current.startTime);
    var cEnd = getTimeSinceStart(current.endTime);

    for (var i = 0; i < all.length; i++) {
        if (current != all[i] && previous.indexOf(all[i]) == -1) {
            var tStart = getTimeSinceStart(all[i].startTime);
            var tEnd = getTimeSinceStart(all[i].endTime);

            if (tStart < cStart) {
                if (tEnd > cStart) {
                    previous.push(all[i]);
                    previous = previous.concat(getSimultaneousLessons(all[i], all, previous));
                }
            } else {
                if (tStart < cEnd) {
                    previous.push(all[i]);
                    previous = previous.concat(getSimultaneousLessons(all[i], all, previous));
                }
            }
        }
    }

    return previous;
}

(function() {

    Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    Date.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Date.shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Date.longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // defining patterns
    var replaceChars = {
        // Day
        d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
        D: function() { return Date.shortDays[this.getDay()]; },
        j: function() { return this.getDate(); },
        l: function() { return Date.longDays[this.getDay()]; },
        N: function() { return (this.getDay() == 0 ? 7 : this.getDay()); },
        S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
        w: function() { return this.getDay(); },
        z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
        // Week
        W: function() {
            var target = new Date(this.valueOf());
            var dayNr = (this.getDay() + 6) % 7;
            target.setDate(target.getDate() - dayNr + 3);
            var firstThursday = target.valueOf();
            target.setMonth(0, 1);
            if (target.getDay() !== 4) {
                target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
            return 1 + Math.ceil((firstThursday - target) / 604800000);
        },
        // Month
        F: function() { return Date.longMonths[this.getMonth()]; },
        m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
        M: function() { return Date.shortMonths[this.getMonth()]; },
        n: function() { return this.getMonth() + 1; },
        t: function() {
            var year = this.getFullYear(), nextMonth = this.getMonth() + 1;
            if (nextMonth === 12) {
                year = year++;
                nextMonth = 0;
            }
            return new Date(year, nextMonth, 0).getDate();
        },
        // Year
        L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
        o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
        Y: function() { return this.getFullYear(); },
        y: function() { return ('' + this.getFullYear()).substr(2); },
        // Time
        a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
        A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
        B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
        g: function() { return this.getHours() % 12 || 12; },
        G: function() { return this.getHours(); },
        h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
        H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
        i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
        s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
        u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
            '0' : '')) + m; },
        // Timezone
        e: function() { return /\((.*)\)/.exec(new Date().toString())[1]; },
        I: function() {
            var DST = null;
            for (var i = 0; i < 12; ++i) {
                var d = new Date(this.getFullYear(), i, 1);
                var offset = d.getTimezoneOffset();

                if (DST === null) DST = offset;
                else if (offset < DST) { DST = offset; break; }                     else if (offset > DST) break;
            }
            return (this.getTimezoneOffset() == DST) | 0;
        },
        O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
        P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
        T: function() { return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); },
        Z: function() { return -this.getTimezoneOffset() * 60; },
        // Full Date/Time
        c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
        r: function() { return this.toString(); },
        U: function() { return this.getTime() / 1000; }
    };

    // Simulates PHP's date function
    Date.prototype.format = function(format) {
        var date = this;
        return format.replace(/(\\?)(.)/g, function(_, esc, chr) {
            return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
        });
    };

}).call(this);