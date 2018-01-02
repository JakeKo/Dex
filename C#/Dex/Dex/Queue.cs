using System.Collections.Generic;

namespace Dex {
	public class Queue<T> {
		public List<T> Elements { get; set; }

		public Queue(List<T> list = null) {
			if (list != null)
				this.Elements = new List<T>(list);
			else
				this.Elements = new List<T>(0);
		}

		// Returns the next element in the queue without removing it
		public T Peek() {
			return this.Elements[0];
		}

		// Adds an element to the end of the queue
		public void Enqueue(T value) {
			this.Elements.Add(value);
		}

		// Returns the next element in the queue
		public T Dequeue() {
			var value = this.Elements[0];
			this.Elements.RemoveAt(0);
			return value;
		}

		// Deletes the specified value from the queue the specified number of times
		public void Delete(T value, int count = 1) {
			for (int i = 0; i < count; i++) {
				int index = this.Elements.IndexOf(value);

				if (index >= 0 && index < this.Elements.Count)
					this.Elements.RemoveAt(index);
			}
		}
	}
}