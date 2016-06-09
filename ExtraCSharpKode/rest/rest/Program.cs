using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using Newtonsoft.Json;

using System.Net.Http;
using System.Net.Http.Headers;

namespace rest
{
    public class Person {
        public string name;
        public string text;

        public Person() {
        }
    }
    class Program
    {
            
        static void Main(string[] args)
        {
            if (Console.ReadLine() == "send") {
                Program prog = new Program();
                Person pers = new Person();
                pers.name = "Marius Sørenes";
                pers.text = "this was sent from c#";
                prog.sendPost(JsonConvert.SerializeObject(pers));                
            }
                while (true) { }
        }

        public void sendPost(string data) {
            HttpClient client = new HttpClient();
            StringContent content = new StringContent(data);
            content.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");

            client.PostAsync("http://localhost:3000/index/sendsite", content);
            
        }
    }
}
