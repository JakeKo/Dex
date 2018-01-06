using System.Collections.Generic;

namespace Dex {
	public class Queue<T> {
		public List<T> List { get; set; }

		public Queue(List<T> list = null) {
			this.List = list == null ? new List<T>() : new List<T>(list);
		}

		// Returns the next element in the queue without removing it
		public T Peek() {
			return this.List[0];
		}

		// Adds an element to the end of the queue
		public void Enqueue(T value) {
			this.List.Add(value);
		}

		// Returns the next element in the queue
		public T Dequeue() {
			if (this.List.Count > 0) {
				var value = this.List[0];
				this.List.RemoveAt(0);
				return value;
			} else {
				return default(T);
			}
		}

		// Deletes the specified value from the queue the specified number of times
		public void Delete(T value, int count = 1) {
			for (int i = 0; i < count; i++) {
				int index = this.List.IndexOf(value);

				if (index >= 0 && index < this.List.Count)
					this.List.RemoveAt(index);
			}
		}
	}
}