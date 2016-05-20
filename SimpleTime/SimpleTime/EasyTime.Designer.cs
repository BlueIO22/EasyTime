namespace SimpleTime
{
    partial class EasyTime : Microsoft.Office.Tools.Ribbon.RibbonBase
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        public EasyTime()
            : base(Globals.Factory.GetRibbonFactory())
        {
            InitializeComponent();
        }

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            Microsoft.Office.Tools.Ribbon.RibbonGroup group1;
            this.tab1 = this.Factory.CreateRibbonTab();
            this.button1 = this.Factory.CreateRibbonButton();
            group1 = this.Factory.CreateRibbonGroup();
            this.tab1.SuspendLayout();
            group1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tab1
            // 
            this.tab1.ControlId.ControlIdType = Microsoft.Office.Tools.Ribbon.RibbonControlIdType.Office;
            this.tab1.Groups.Add(group1);
            this.tab1.Label = "EasyTime";
            this.tab1.Name = "tab1";
            // 
            // group1
            // 
            group1.Items.Add(this.button1);
            group1.Label = "knapper";
            group1.Name = "group1";
            // 
            // button1
            // 
            this.button1.Label = "Standard mal";
            this.button1.Name = "button1";
            this.button1.Click += new Microsoft.Office.Tools.Ribbon.RibbonControlEventHandler(this.button1_Click);
            // 
            // EasyTime
            // 
            this.Name = "EasyTime";
            this.RibbonType = "Microsoft.Excel.Workbook";
            this.Tabs.Add(this.tab1);
            this.Load += new Microsoft.Office.Tools.Ribbon.RibbonUIEventHandler(this.EasyTime_Load);
            this.tab1.ResumeLayout(false);
            this.tab1.PerformLayout();
            group1.ResumeLayout(false);
            group1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        internal Microsoft.Office.Tools.Ribbon.RibbonTab tab1;
        internal Microsoft.Office.Tools.Ribbon.RibbonButton button1;
    }

    partial class ThisRibbonCollection
    {
        internal EasyTime EasyTime
        {
            get { return this.GetRibbon<EasyTime>(); }
        }
    }
}
