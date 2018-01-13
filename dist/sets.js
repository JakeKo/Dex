'use strict';
module.exports = class Sets {
    static union(s1, s2) {
        const s = new Set(s1);
        s2.forEach(item => {
            s.add(item);
        });
        return s;
    }
    static intersection(s1, s2) {
        const s = new Set();
        s1.forEach(item => {
            if (s2.has(item))
                s.add(item);
        });
        return s;
    }
    static exclusion(s1, s2) {
        const s = new Set(s1);
        s2.forEach(item => {
            if (s.has(item))
                s.delete(item);
            else
                s.add(item);
        });
        return s;
    }
    static difference(s1, s2) {
        const s = new Set(s1);
        s2.forEach(item => {
            s.delete(item);
        });
        return s;
    }
};
