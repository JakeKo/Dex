module.exports = (function () {
    function Sets() {
    }
    Sets.union = function (s1, s2) {
        var s = new Set(s1);
        s2.forEach(function (item) {
            s.add(item);
        });
        return s;
    };
    Sets.intersection = function (s1, s2) {
        var s = new Set();
        s1.forEach(function (item) {
            if (s2.has(item))
                s.add(item);
        });
        return s;
    };
    Sets.exclusion = function (s1, s2) {
        var s = new Set(s1);
        s2.forEach(function (item) {
            if (s.has(item))
                s.delete(item);
            else
                s.add(item);
        });
        return s;
    };
    Sets.difference = function (s1, s2) {
        var s = new Set(s1);
        s2.forEach(function (item) {
            s.delete(item);
        });
        return s;
    };
    return Sets;
}());
