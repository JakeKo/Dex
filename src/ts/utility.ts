export function DEFAULT_COMP(a: number, b: number): number {
	if (a < b) {
		return -1;
	} else if (a === b) {
		return 0;
	} else if (a > b) {
		return 1;
	}
};

export function bubbleSort<T>(list: T[], comp: (a: T, b: T) => number): T[] {
	const a: T[] = list.slice();
	for (let i = 0; i < a.length - 1; i++) {
		for (let j = i + 1; j < a.length; j++) {
			if (comp(a[i], a[j]) > 0) {
				const temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
		}
	}
	
	return a;
}