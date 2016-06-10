using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;
namespace iosocketstest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        Socket socket = IO.Socket("http://localhost:8080");
        public void startServer()
        {
            BackgroundWorker worker = new BackgroundWorker();
            worker.DoWork +=  delegate(object snd, DoWorkEventArgs ek)
            {

                socket.On("sendMessage", (data) => {
                    dynamic datafromwebsite = JsonConvert.DeserializeObject((string)data);
                    Invoke(new MethodInvoker(delegate { richTextBox1.Text += datafromwebsite.name + "\n" + datafromwebsite.age; }));
                });

                
                 socket.Connect();
            };

            worker.RunWorkerAsync();
            
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            startServer();
        }

        private void textBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) {
                socket.Emit("hello", textBox1.Text);
            }
        }
    }
}
