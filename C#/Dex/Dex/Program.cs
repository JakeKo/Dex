using System;
using System.Collections.Generic;
using System.Text;

namespace Dex {
	class Program {
		static void Main(string[] args) {
			var queue = new Queue<int>();

			queue.Enqueue(2);
			queue.Enqueue(6);
			queue.Enqueue(1);
			queue.Enqueue(9);
			Console.WriteLine(ToStrings(queue.Elements));

			queue.Dequeue();
			Console.WriteLine(ToStrings(queue.Elements));

			queue.Delete(7, 5);
			Console.WriteLine(ToStrings(queue.Elements));
		}

		public static string ToStrings(List<int> list) {
			var s = new StringBuilder();

			for (int i = 0; i < list.Count; i++)
				s.Append(list[i] + " ");

			return s.ToString();
		}
	}
}
