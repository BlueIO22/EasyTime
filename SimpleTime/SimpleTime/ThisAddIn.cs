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

namespace SimpleTime
{
    public partial class SimpleTime_Main
    {
        //EasyTime
        //Utvikler: Marius Sørenes (kan endres via kontrakt)
        //Copyright (C) Marius Sørenes (kan endres via kontrakt)
        //Version: 1.0

        #region objects
        SerialPort main_port;
        #endregion

        #region methods
        public List<string> hentPorter() {
            List<string> returnList = new List<string>();
            try {
                try {

                } catch (Exception ek) {

                }
            } catch (COMException ek) {

            }
            return returnList;
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
            //Startsfase og algoritmer

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
