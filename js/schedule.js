(function() {
    var cache = {};

    var url = 'http://vgy.rocks/johnrs/schedule/get_schedule.php';
    function buildUrl(week, className) {
        return url +  '?week=' + week + "&className=" + className;
    }

    window.getSchedule = function(week, className, callback) {
        var hashKey = week + className;
        if(cache[hashKey]) {
            cache[hashKey].then(callback);
        } else {
            var deferred = $.Deferred();
            cache[hashKey] = deferred.promise();
            $.getJSON(buildUrl(week, className), deferred.resolve);
        }
    };

    window.setClass = function(className) {
        //Five years
        cookie.set('className', className, 1825);
    };
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
