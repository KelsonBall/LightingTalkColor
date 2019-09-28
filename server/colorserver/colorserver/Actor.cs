using System;
using System.Threading.Tasks;

namespace colorserver
{
    public class Actor<T>
    {
        private readonly Task<T> access;

        public Actor(T asset)
        {
            access = Task.Run(() => asset);
        }

        public async Task<Actor<T>> Do(Action<T> action)
        {
            await access.ContinueWith(t => action(t.Result));
            return this;
        }
    }
}
