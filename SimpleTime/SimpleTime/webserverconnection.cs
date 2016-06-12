using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Quobject.SocketIoClientDotNet;
using Newtonsoft.Json;
using Quobject.SocketIoClientDotNet.Client;
using System.Windows.Forms;
using System.ComponentModel;

namespace SimpleTime
{
    class webserverconnection
    {

        #region Information
        public string information() => "Navn: EasyTime\\WebServerConnection\nUtvikler: Sørenes IT\nVersjon: 1.0";
        #endregion

        #region dataObjects
        //Socket objekter --Uinitialisert
        Socket sockets;

        #endregion

        #region dataTypes
        //Streng for webadresse til webserveren: http://localhost:8080
        public string url()=> "http://localhost:8080";
        #endregion

        #region methods

        public bool init() {
            BackgroundWorker worker = new BackgroundWorker();
            worker.DoWork += delegate (object snd, DoWorkEventArgs ek)
            {
                sockets = IO.Socket("http://localhost:8080");
                sockets.On("getInformation", (data) => {
                     Globals.ThisAddIn.addExcelRangeFromJSON(data);
                });


                sockets.Connect();
            };

            worker.RunWorkerAsync();
            return true;
        }

        /// <summary>
        /// Metode for å sende data fra excel til webserveren
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public bool sendStringData(object value) {
            try
            {
                 
                sockets.Emit("sendJSON", value);
               
            }
            catch (Exception err) {
                
            }
            return false;
        }
        #endregion
    }
}
