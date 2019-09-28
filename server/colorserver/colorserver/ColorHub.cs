﻿using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace colorserver
{
    public class ColorHub : Hub
    {
        private static Actor<List<IClientProxy>> displayClients = new Actor<List<IClientProxy>>(new List<IClientProxy>());

        public async Task ShowMessage(string message)
        {
            Console.WriteLine(message);
        }

        public async Task AddColorPoint(dynamic data)
        {
            var point = new ColorPoint { hue = data.hue, x = data.x, y = data.y };
            Console.WriteLine(point.ToString());
            await displayClients.Do(async list =>
            {
                foreach (var client in list)
                    await client.SendAsync("RecieveColorPoint", point.hue, point.x, point.y);
            });
        }

        public async Task SubscribeAsDisplay()
        {
            await displayClients.Do(list => list.Add(Clients.Caller));            
        }
    }
}
