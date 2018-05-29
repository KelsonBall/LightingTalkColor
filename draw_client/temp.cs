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

    public class ColorPoint
    {
        public double hue { get; set; }
        public double x { get; set; }
        public double y { get; set; }

        public override string ToString()
            => $"({hue} <{x},{y}>)";
    }

    public class ColorHub : Hub
    {
        private static Actor<List<IClientProxy>> displayClients;

        public async Task AddColorPoint(double hue, double x, double y)
        {
            var point = new ColorPoint { hue = hue, x = x, y = y };
            Console.WriteLine(point.ToString());
            await displayClients.Do(async displays =>
            {
                foreach (var client in displays)
                    await client.SendAsync("RecieveColorPoint", point);
            });
        }

        public async Task SubscribeAsDisplay()
        {
            await displayClients.Do(list => list.Add(Clients.Caller));
        }
    }