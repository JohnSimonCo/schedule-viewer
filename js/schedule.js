(function() {
    var cache = {};

    var url = 'http://schema.vgy.se/get_schedule.php';
    //var url = 'http://vgy.rocks/schema/get_schedule.php';
    //var url = 'http://localhost/schema/get_schedule.php';

    function buildUrl(week, className) {
        return url +  '?week=' + week + "&className=" + className;
    }
    function hash(week, className) {
        return week + className;
    }

    function $timeout(delay) {
        var deferred = $.Deferred();
        setTimeout(deferred.resolve, delay);
        return deferred.promise();
    }

    function identity(a) { return a; }

    function getLocalJSON(url) {
        return JSON.parse(document.getElementById(url).innerHTML);
    }
    window.getLocalJSON = getLocalJSON;

    window.getSchedule = function(week, className) {

        ga('send', 'event', 'Get new schedule', className);

        var hashKey = hash(week, className);
        if(cache[hashKey]) {
            return cache[hashKey];
        } else {
            var deferred = $.Deferred();
            $.getJSON(buildUrl(week, className), deferred.resolve);

            //.then(identity) to circumvent weird bug
            var promise = deferred.promise().then(identity);
            cache[hashKey] = promise;
            return promise;
        }
    };

    var currentLoaded = null;
    window.getScheduleWithTimeout = function(week, className, delay, callback) {
        currentLoaded = hash(week, className);
        $.when(window.getSchedule(week, className), $timeout(delay)).then(function(schedule) {
            if(currentLoaded == hash(week, className)) {
                callback(schedule);
            }
        });
    };

    window.setClass = function(className) {
        //Five years expiration
        cookie.set('className', className, 1825);
    };

    window.setView = function(view) {
        //Five years expiration
        cookie.set('view', view, 1825);
    };

    window.getInitial = function() {
        var initial = getLocalJSON('initial.json');
        ga('send', 'event', 'Get initial schedule', initial.className);
        return initial;
    };

    var initial = getInitial();
    var initialHash = hash(initial.week, initial.className);
    cache[initialHash] = $.Deferred().resolve(initial.schedule).promise();

    window.weeks = getLocalJSON('weeks.json');
    window.classNames = getLocalJSON('classNames.json');
})();

(function() {
    function createCookie(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    window.cookie = {
        set: createCookie,
        get: readCookie,
        remove: eraseCookie
    };
})();

$('#test').text('18');