using System;
using System.Threading.Tasks;

namespace task_demo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var task = WaitThenPrint();
            task.ContinueWith(DoTheThing);

            Console.WriteLine("Hello World!");
        }

        static void DoTheThing(Task<int> theTask)
        {
            Console.WriteLine(theTask.Result);
        }

        static async Task<int> WaitThenPrint()
        {
            await Task.Delay(1000);
            Console.WriteLine("Hello from task");
            return 4; // garunteed random number, chosen by Mr Monroes die roll
        }
    }
}
