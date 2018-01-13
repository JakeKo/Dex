'use strict';

module.exports = class Sets {
	public static union(s1: Set<any>, s2: Set<any>): Set<any> {
		const s: Set<any> = new Set(s1);

		s2.forEach(item => {
			s.add(item);
		});

		return s;
	}

	public static intersection(s1: Set<any>, s2: Set<any>): Set<any> {
		const s: Set<any> = new Set();

		s1.forEach(item => {
			if (s2.has(item)) s.add(item);
		});

		return s;
	}

	public static exclusion(s1: Set<any>, s2: Set<any>): Set<any> {
		const s: Set<any> = new Set(s1);

		s2.forEach(item => {
			if (s.has(item)) s.delete(item);
			else s.add(item);
		});

		return s;
	}

	public static difference(s1: Set<any>, s2: Set<any>): Set<any> {
		const s: Set<any> = new Set(s1);

		s2.forEach(item => {
			s.delete(item);
		});

		return s;
	}
}