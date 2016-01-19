(function() {
    var cache = {};

    //var url = 'http://vgy.rocks/schema/get_schedule.php';
    var url = 'http://localhost/schema/get_schedule.php';
    function buildUrl(week, className) {
        return url +  '?week=' + week + "&className=" + className;
    }
    function hash(week, className) {
        return week + className;
    }

    window.getSchedule = function(week, className, callback) {
        var hashKey = hash(week, className);
        if(cache[hashKey]) {
            cache[hashKey].then(callback);
        } else {
            var deferred = $.Deferred();
            $.getJSON(buildUrl(week, className), deferred.resolve);

            var promise = deferred.promise();
            promise.then(callback);
            cache[hashKey] = promise;
        }
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
        return window.initial;
    };

    var initial = getInitial();
    var initialHash = hash(initial.week, initial.className);
    cache[initialHash] = $.Deferred().resolve(initial.schedule).promise();
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
