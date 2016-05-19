using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SerialReader
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        SerialPort port;
        Hashtable table = new Hashtable();

        private void Form1_Load(object sender, EventArgs e)
        {
            //Static values
            table.Add("08 5F 1D 00", "Marius Sørenes");
            table.Add("D4 95 17 B8", "Johannes Steinsbø");

            //Something random port stuff
            port = new SerialPort("COM3", 9600);
            port.Parity = Parity.None;
            port.StopBits = StopBits.One;
            port.DataBits = 8;
            port.Handshake = Handshake.None;

            port.DataReceived += Port_DataReceived;
            port.Open();

        }

        private void Port_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            try
            {
                SerialPort sp = (SerialPort)sender;
                string input = sp.ReadLine().Trim();
                string s = "";
                
                foreach (DictionaryEntry entry in table) { if (input == (string)entry.Key) { s = (string)entry.Value; } }
                
                 this.Invoke(new MethodInvoker(delegate { if (s.Length > 0) { listBox1.Items.Add(s + " - " + DateTime.Now); } }));
            }
            catch (ArgumentNullException sk) { }
        }
    }
}
