module.exports = class Sets {
	static union(s1, s2) {
		let s = new Set(s1);

		s2.forEach(item => {
			s.add(item);
		});
	}

	static intersection(s1, s2) {
		let s = new Set();

		s1.forEach(item => {
			if (s2.has(item)) s.add(item);
		});
	}

	static exclusion(s1, s2) {
		let s = new Set(s1);

		s2.forEach(item => {
			if (s.has(item)) s.delete(item);
			else s.add(item);
		});
	}

	static difference(s1, s2) {
		let s = new Set(s1);

		s2.forEach(item => {
			s.delete(item);
		});
	}
}