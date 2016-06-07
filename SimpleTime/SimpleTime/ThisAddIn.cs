using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Excel = Microsoft.Office.Interop.Excel;
using Office = Microsoft.Office.Core;
using Microsoft.Office.Tools.Excel;
using System.IO;
using System.IO.Ports;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;
using System.Collections;

namespace SimpleTime
{
    public partial class ThisAddIn
    {
        //EasyTime
        //Utvikler: Marius Sørenes (kan endres via kontrakt)
        //Copyright (C) Marius Sørenes (kan endres via kontrakt)
        //Version: 1.0

        #region objects
        SerialPort main_port;
      
        Hashtable table = new Hashtable();
        #endregion

        #region methods

        /// <summary>
        /// Metode for å hente porter(COM) som er på den lokale datamaskinen
        /// </summary>
        /// <returns></returns>
        public List<string> hentPorter() {
            List<string> returnList = new List<string>();
            //Legger til sjekk for feil
            try {
                try {
                    //Henter alle mulige porter(com) på lokal datamaskinen. 
                    string[] ports = SerialPort.GetPortNames();
                    for (int i = 0; i < ports.Length; i++) {
                        returnList.Add(ports[0]);
                    }
                } catch (Exception ek) {

                }
            } catch (COMException ek) {

            }
            return returnList;
        }


        /// <summary>
        /// DEMO FUNKSJON, SKAL SLETTES ETTER BRUK. 
        /// Metode for å legge til informajon, for testing
        /// av utforming og design
        /// </summary>
        public void leggTilInformasjon()
        {

            Excel.Worksheet activeWorkSheet = (Excel.Worksheet)Application.ActiveSheet;


            //Navn
            Excel.Range NyNavneRad = activeWorkSheet.get_Range("A1");
            NyNavneRad.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
            Excel.Range NavneRad2 = activeWorkSheet.get_Range("A1");
            NavneRad2.Value2 = "Hello World";//Navn;

            //Dato
            Excel.Range newDatoRow = activeWorkSheet.get_Range("B1");
            newDatoRow.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
            Excel.Range DatoRange2 = activeWorkSheet.get_Range("B1");
            DatoRange2.Font.Size = 18;
            DatoRange2.Font.Bold = true;
            DatoRange2.Value2 = DateTime.Now.ToString("dd:MM:yy");//Dato;

        }
        #endregion 

        #region start_methods

        /// <summary>
        /// Metode for startfunksjoner av programmet
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ThisAddIn_Startup(object sender, System.EventArgs e)
        {
            //test code til å legge til navn 
            table.Add("08 5F 1D 00", "Johannes Steinsbø");
            table.Add("D4 95 17 B8", "Marius Sørenes");

            //Startsfase og algoritmer

            //Registrerer eventer for SerialPort
            SetComPort();
            main_port.Parity = Parity.None;
            main_port.StopBits = StopBits.One;
            main_port.DataBits = 8;
            main_port.Handshake = Handshake.None;
            main_port.DataReceived += Main_port_DataReceived;

            main_port.Open();
            
        }

        private void Main_port_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
        
            SerialPort port = (SerialPort)sender;
            try {
 
                if (this.Application.ActiveSheet != null) {

                    Excel.Worksheet activeWorkSheet = (Excel.Worksheet)Application.ActiveSheet;

                        //Variabler til bruk
                        string input = port.ReadLine().Trim();
                        string s = "";

                        //Hent navn
                        foreach (DictionaryEntry entry in table)
                        {
                            if (input == (string)entry.Key)
                            {
                                s = (string)entry.Value;
                            }
                        }

                        //Navn
                        Excel.Range NyNavneRad = activeWorkSheet.get_Range("A1");
                        NyNavneRad.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                        Excel.Range NavneRad2 = activeWorkSheet.get_Range("A1");
                        NavneRad2.Value2 = s;//Navn;

                        //Dato
                        Excel.Range newDatoRow = activeWorkSheet.get_Range("B1");
                        newDatoRow.Insert(Excel.XlInsertShiftDirection.xlShiftDown);
                        Excel.Range DatoRange2 = activeWorkSheet.get_Range("B1");
                        DatoRange2.Font.Bold = true;
                        DatoRange2.Value2 = DateTime.Now.ToString("dd:MM:yy");//Dato;
                    }
                
            } catch (COMException comex) { }
        }

        /// <summary>
        /// Metode for sluttfunksjon av programmet
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ThisAddIn_Shutdown(object sender, System.EventArgs e)
        {
            //Avsluttningsfase og algoritmer
        }

        /// <summary>
        /// Denne metoden sjekker hvilken COM(port) arduinoen er på, 
        /// Dette er en snippet hentet ifra Arduino Playground
        /// </summary>
        /// <returns></returns>
        private bool DetectArduino()
        {
            try
            {
                //The below setting are for the Hello handshake
                byte[] buffer = new byte[5];
                buffer[0] = Convert.ToByte(16);
                buffer[1] = Convert.ToByte(128);
                buffer[2] = Convert.ToByte(0);
                buffer[3] = Convert.ToByte(0);
                buffer[4] = Convert.ToByte(4);
                int intReturnASCII = 0;
                char charReturnValue = (Char)intReturnASCII;
                main_port.Open();
                main_port.Write(buffer, 0, 5);
                Thread.Sleep(1000);
                int count = main_port.BytesToRead;
                string returnMessage = "";
                while (count > 0)
                {
                    intReturnASCII = main_port.ReadByte();
                    returnMessage = returnMessage + Convert.ToChar(intReturnASCII);
                    count--;
                }

                main_port.Close();
                if (returnMessage.Contains("HELLO FROM ARDUINO"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// Denne metoden setter porten som vi skal bruke til arduino com. Den er hentet ifra 
        /// Arduiono Playgrounds
        /// </summary>
        private void SetComPort()
        {
            bool portFound = false;
            try
            {
                string[] ports = SerialPort.GetPortNames();
                foreach (string port in ports)
                {
                    main_port = new SerialPort(port, 9600);
                    if (DetectArduino())
                    {
                        portFound = true;
                        break;
                    }
                    else
                    {
                        portFound = false;

                    }
                }
            }
            catch (Exception e)
            {
            }
        }

        #region VSTO generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InternalStartup()
        {
            this.Startup += new System.EventHandler(ThisAddIn_Startup);
            this.Shutdown += new System.EventHandler(ThisAddIn_Shutdown);
        }

        #endregion

        #endregion
    }
}
