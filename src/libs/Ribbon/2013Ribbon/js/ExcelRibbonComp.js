//'use strict';
namespace("SIMS.Components.Common");
namespace("SIMS.Components.Excel");
namespace("SIMS.Components.Word");

//Class Declaration and Derivation
var SIMS_Ribbon_Excel = SIMS.Components.Common.Ribbon = SIMS.Components.Excel.Ribbon = SIMS.Components.Word.Ribbon = SIMS.Components.Common.RibbonBase.extend({
    
    ribbonGenArr: null,
    constructor: function () {
        this.base();
        this.ribbonXmlPath = 'word-ribbon.xml';
        this.appName = 'word';
        this.manipulatorFactory = new SIMS.Manipulators.RibbonControlManipulatorFactory();
        this.controlXMLPath = null;
        this.controlXMLUpdate = false;
        this.galleryUpdateStack = [];
        this.colorTheme = null;
        this.tabName = null;
        this.pivotChartToolsFieldButton = false;
        this.attrUpdateList = [];
        //This is for storing the value of new attribute CHART_TOOLS_FORMAT_LAUNCHER_GROUP
        this.chartFormatTablauncherGroup = null;
        // this.pageColor = null;
        // this.myTabPageColor = null;
        //----Commented above as not required. Unneccesarily done by Ravi Sahu. Same sould be commented by Ravi in Trunk - Ashwin
        this.ribbonGenArr = [];
        this.AddPathToXmlPathMap("app/comps/common/ribbon/excel-ribbon.xml", "app/comps/common/ribbon/excel-ribbon.xml");
        this.AddPathToXmlPathMap("app/comps/common/ribbon/word-ribbon.xml", "app/comps/common/ribbon/word-ribbon.xml");
    },

    RegisterMe: function () {
        this.ArrValCompVal = [];

        this.RegisterAttributes();
        this.RegisterEvents();

        //this.RegisteredComponent = new ComponentRegistration();           

        //return compRegn;
    },

    RegisterAttributes: function () {

        //Attributes Registration..
        this.RegisterAttribute("DOCUMENT_NAME", "Document1 - Microsoft Word", 'text');
        this.RegisterAttribute("SEL_TAB", "Home", 'text');
        //this.RegisterAttribute("SEL_ITEMS", "[{&quot;ItemName&quot;: &quot;bold&quot;,&quot;isSelected&quot;: &quot;false&quot;},{&quot;ItemName&quot;: &quot;aligncenter&quot;,&quot;isSelected&quot;: &quot;false&quot;},{&quot;ItemName&quot;: &quot;alignleft&quot;,&quot;isSelected&quot;: &quot;false&quot;},{&quot;ItemName&quot;: &quot;alignbottom&quot;,&quot;isSelected&quot;: &quot;false&quot;}]", 'json', new this.SELECTED_RIBBON_ITEMS());
        this.RegisterAttribute("FONT_SIZE", "11", 'int');
        this.RegisterAttribute("FONT_NAME", "Calibri", 'text');
        this.RegisterAttribute("NUM_FORMAT", "General", 'text');
        this.RegisterAttribute("CITATION_STYLE", "MLA", 'text');
        this.RegisterAttribute("BOTTOM_ALIGN", "General", 'text');
        this.RegisterAttribute("TOP_ALIGN", "General", 'text');
        this.RegisterAttribute("RIBBON_PATH", "word-ribbon.xml", 'text');
        this.RegisterAttribute("APP", "word", 'text');
        this.RegisterAttribute("CENTER_ALIGN", "false", 'bool');
        this.RegisterAttribute("WATCH_WINDOW", "false", 'bool');
        this.RegisterAttribute("LEFT_ALIGN", "false", 'bool');
        this.RegisterAttribute("CHANGE_TAB_NAME", "General", 'text');
        this.RegisterAttribute("HIDE_TAB", "General", 'text');
        this.RegisterAttribute("ACTIVATE_TAB", "General", 'text');
        this.RegisterAttribute("FORMAT_PAINTER", "General", 'text');
        this.RegisterAttribute("TEXT_PANE_HIGHLIGHTED", "false", 'bool');
        this.RegisterAttribute("FONT_COLOR", "General", 'text');
        this.RegisterAttribute("PICTURE_BORDER", "General", 'text');
        this.RegisterAttribute("PARA_SPACING_AFTER", "General", 'text');
        this.RegisterAttribute("PARA_SPACING_BEFORE", "General", 'text');
        this.RegisterAttribute("SHAPE_FILL", "General", 'text');
        this.RegisterAttribute("SHAPE_OUTLINE", "General", 'text');
        this.RegisterAttribute("QAT_QUICK_PRINT", "General", 'bool');
        this.RegisterAttribute("QAT_TRACK_CHANGES", "General", 'bool');
        this.RegisterAttribute("QAT_PRINT_PREVIEW", "General", 'bool');
        this.RegisterAttribute("QAT_SPELLING_GRAMMAR", "General", 'bool');
        this.RegisterAttribute("JUSTIFY", "General", 'bool');
        this.RegisterAttribute("PARAGRAPH_MARKER_PRESSED", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_BOLD", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_MAILINGS_PREVIEW", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_TRACK_CHANGES", "false", 'bool');
        this.RegisterAttribute("TAB_COLOR", "General", 'bool');
        this.RegisterAttribute("THEME", "Office", 'text');
        this.RegisterAttribute("SHADING_COLOR", "0", 'text');
        this.RegisterAttribute("TOGGLE_STATE", "0", 'text');
        this.RegisterAttribute("CHECKBOX", "false", 'bool');
        this.RegisterAttribute("CHECKBOX_ARRAY", "false", 'bool');
        this.RegisterAttribute("SPIN_VAL", "false", 'bool');
        this.RegisterAttribute("DIMENSIONS", "", 'obj');
        this.RegisterAttribute("SHAPE_WIDTH", "", 'number');
        this.RegisterAttribute("SHAPE_HEIGHT", "", 'number');
        this.RegisterAttribute("SMART_HEIGHT", "", 'number');
        this.RegisterAttribute("SMART_WIDTH", "", 'number');
        this.RegisterAttribute("TABLE_WIDTH", "", 'number');
        this.RegisterAttribute("TABLE_HEIGHT", "", 'number');
        this.RegisterAttribute("PICTURE_WIDTH", "", 'number');
        this.RegisterAttribute("PICTURE_HEIGHT", "", 'number');
        this.RegisterAttribute("SELECTED_SPARKLINE_INDEX", "0", 'int');
        this.RegisterAttribute("SELECTED_PARAGRAPH_STYLES_INDEX", "0", 'int');
        this.RegisterAttribute("SELECTED_TABLE_STYLES_INDEX_WORD", "0", 'int');
        this.RegisterAttribute("SELECTED_PICTURE_STYLES_INDEX", "0", 'int');
        this.RegisterAttribute("SELECTED_CHART_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("SPARKLINE_SRC", "app/Comps/Common/Ribbon/img/Excel/sparklines/SparklineItems.png", 'text');
        this.RegisterAttribute("RIBBON_SUB_XML", "", 'text');
        this.RegisterAttribute("SUB_XML_UPDATE", "false", 'bool');
        this.RegisterAttribute("MERGE_AND_CENTER", "false", 'bool');
        this.RegisterAttribute("WRAP_TEXT", "false", 'bool');
        this.RegisterAttribute("MIDDLE_ALIGN", "false", 'bool');
        this.RegisterAttribute("SCALE_WIDTH", "Automatic", 'text');
        this.RegisterAttribute("SCALE_HEIGHT", "Automatic", 'text');
        this.RegisterAttribute("LEFT_INDENT", "", 'number');
        this.RegisterAttribute("RIGHT_INDENT", "", 'number');
        this.RegisterAttribute("RIGHT_ALIGN", "false", 'bool');
        this.RegisterAttribute("SELECTED_LINE_SPACING_INDEX", "1", 'int');
        this.RegisterAttribute("HIGHLIGHT_ITALICS", "false", 'bool');
        this.RegisterAttribute("NORMAL_VIEW", "false", 'bool');
        this.RegisterAttribute("PAGE_BREAK_PREVIEW", "false", 'bool');
        this.RegisterAttribute("PAGE_LAYOUT", "false", 'bool');
        this.RegisterAttribute("SPARKLINE_TYPE", "Line", 'text');
        this.RegisterAttribute("EXCEL_FONT_COLOR", "General", 'bool');
        this.RegisterAttribute("UNDO_REDO_INDEX", "", 'number');
        this.RegisterAttribute("TABLE_DIMENSIONS", "", 'text');
        this.RegisterAttribute("FORMAT_PAINTER_EXCEL", "", "text");
        this.RegisterAttribute("SHOW_LEVEL", "", "text");
        this.RegisterAttribute("OUTLINE_LEVEL", "", "text");
        this.RegisterAttribute("WINDOW_SPLIT", "false", 'bool');
        this.RegisterAttribute("NUMBERING_OPTIONS", "false", 'bool');
        this.RegisterAttribute("BULLET_OPTIONS", "false", 'bool');
        this.RegisterAttribute("DOC_FORMATTING_INDEX", "0", 'int')
        this.RegisterAttribute("SELECTED_TABLE_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("PIVOT_TABLE_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("PIVOT_CHART_TOOLS_DESIGN_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("SLICER_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("CHART_TOOLS_CHART_ELEMENTS", "", 'text');
        this.RegisterAttribute("SPARKLINE_COLOR", "General", "bool");
        this.RegisterAttribute("TEXT_HIGHLIGHT_COLOR", "false", "bool");
        this.RegisterAttribute("HIGHLIGHT_UNDERLINE", "false", "bool");
        this.RegisterAttribute("HIGHLIGHT_REPEAT_HEADER_ROWS", "false", 'bool');
        this.RegisterAttribute("CHART_HEIGHT", "", 'int');
        this.RegisterAttribute("CHART_WIDTH", "", 'int');
        this.RegisterAttribute("PAGE_LAYOUT_SCALE", "", 'int');
        this.RegisterAttribute("DATA_FILTER", "", "bool");
        this.RegisterAttribute("SHOW_MARKUP", "All Markup", 'text');
        this.RegisterAttribute("CHART_SHAPEFILL_COLOR", "0", 'int');
        this.RegisterAttribute("FILL_COLOR", "0", 'int');
        this.RegisterAttribute("HIGHLIGHT_ALIGN_TOPRIGHT", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_ALIGN_CENTER", "false", 'bool');
        this.RegisterAttribute("PIVOTTABLETOOLS_ACTIVE_FIELD", "false", 'bool');
        this.RegisterAttribute("PIVOTTABLETOOLS_TABLE_NAME", "false", 'bool');
        this.RegisterAttribute("PIVOTCHARTTOOLS_CHART_NAME", "false", 'bool');
        this.RegisterAttribute("TABLETOOLS_DESIGN_TABLE_NAME", "false", 'string');
        this.RegisterAttribute("SLICERTOOLS_OPTIONS_SLICER_CAPTION", "false", 'bool');



        //Above attributes were available in Feb 17 Ribbon Investigation Brach. 
        //It is expected, Lazyload Handling for all the above attributes would have been done by Monalika mam. - Ashwin

        this.RegisterAttribute("CONTEXT_MENU_ITEM_INDEX", "", "text");
        this.RegisterAttribute("SHOW_FORMULAS", "false", 'bool');
        this.RegisterAttribute("EXCEL_SELECTED_SHAPE_INDEX", "0", 'int');
        this.RegisterAttribute("WORDART_SELECTED_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("HIGHLIGHT_RESTRICT_EDITING", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_HOME_BORDERS", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_ALIGN_TOP_LEFT", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_ALIGN_CENTER_LEFT", "false", 'bool');

        this.RegisterAttribute("HIGHLIGHT_ALIGN_TOP_CENTER", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_REVIEW_REVIEWINGPANE", "false", 'bool');
        this.RegisterAttribute("SLICER_BUTTON_WIDTH", "", 'number');
        this.RegisterAttribute("SLICER_BUTTON_COLUMN", "", 'number');
        this.RegisterAttribute("SLICER_SIZE_HEIGHT", "", 'number');
        this.RegisterAttribute("HIGHLIGHT_VIEW_SIDEBYSIDE", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_VIEW_SYNCHRONOUS_SCROLLING", "false", 'bool');
        this.RegisterAttribute("PAGE_COLOR", "General", 'text');
        this.RegisterAttribute("MYTAB_PAGE_COLOR", "General", 'text');
        this.RegisterAttribute("HIGHLIGHT_DEVELOPER_DESIGN_MODE", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_DEVELOPER_RESTRICT_EDITING", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_DEVELOPER_XML_SOURCE", "false", 'bool');
        this.RegisterAttribute("TAB_HEADER_CSS", "", 'text');
        //        this.RegisterAttribute("HIGHLIGHT_OUTLINING_SHOW_DOCUMENT", "false", 'bool'); //Commenting this attribute as its not working in subribbon for outlining tab. Ravi Sahu
        this.RegisterAttribute("HIGHLIGHT_PRINT_LAYOUT", "false", 'bool');
        this.RegisterAttribute("VALIDATE_SELECTED_TAB", "false", "bool", false);
        this.RegisterAttribute("SELECTED_TAB", "", "string", false);
        this.RegisterAttribute("HIGHLIGHT_HOME_BULLETS", "false", 'bool');
        this.RegisterAttribute("IS_TAB_SELECTED_ONCE", "NO", 'string', false);
        this.RegisterAttribute("HIGHLIGHT_SHOW_COMMENTS", "false", 'bool');
        this.RegisterAttribute("SELECTED_SHAPE_STYLES_INDEX", "0", 'int');
        this.RegisterAttribute("FOCALIZE_SPIN_CONTROL", "", 'string', false);
        this.RegisterAttribute("SELECTED_SMARTART_LAYOUT_INDEX", "0", 'int');
        this.RegisterAttribute("SELECTED_SMARTART_STYLE_INDEX", "0", 'int');
        this.RegisterAttribute("PIVOTTABLETOOLS_HIGHLIGHT_FIELD_LIST", "false", 'bool');
        this.RegisterAttribute("PIVOTTABLETOOLS_HIGHLIGHT_+/-BUTTONS", "false", 'bool');
        this.RegisterAttribute("PIVOTTABLETOOLS_HIGHLIGHT_FIELD_HEADERS", "false", 'bool');
        this.RegisterAttribute("PIVOTCHARTTOOLS_HIGHLIGHT_FIELD_BUTTONS", "false", 'bool');
        this.RegisterAttribute("PIVOTCHARTTOOLS_HIGHLIGHT_FIELD_LIST", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_REVIEW_SHOW_INK", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_REVIEW_PROTECT_WORKBOOK", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_TABLETOOLS_DESIGN_EXTERNAL_REFRESH", "false", 'bool');
        this.RegisterAttribute("SELECTED_TABS_LIST", "", 'json', false);
        this.RegisterAttribute("ENABLE_COLLAPSE_BUTTON", "false", "bool", false);
        this.RegisterAttribute("POWERVIEW_HIGHLIGHT_FIT_TO_WINDOW", "false", 'bool');
        this.RegisterAttribute("POWERVIEW_HIGHLIGHT_FIELD_LIST", "false", 'bool');
        this.RegisterAttribute("POWERVIEW_HIGHLIGHT_FILTER_AREA", "false", 'bool');
        this.RegisterAttribute("POWERPIVOT_HIGHLIGHT_DATA_VIEW", "false", 'bool');
        this.RegisterAttribute("POWERPIVOT_HIGHLIGHT_DIAGRAM_VIEW", "false", 'bool');
        this.RegisterAttribute("POWERPIVOT_HIGHLIGHT_SHOW_HIDDEN", "false", 'bool');
        this.RegisterAttribute("POWERPIVOT_HIGHLIGHT_CALCULATION_AREA", "false", 'bool');
        this.RegisterAttribute("FOCUS_COMP_ID_FOR_ACCESS_KEYS", "", 'string');
        this.RegisterAttribute("USE_RELATIVE_REFERENCES", "false", 'bool');
        this.RegisterAttribute("HIGHLIGHT_INSERT_TEXTBOX", "false", 'bool');
        this.RegisterAttribute("ATTACH_SUB_RIBBON_WITH_IDENTIFIER", "false", 'bool');
        //To identify which Group launcher event is called for id 531 
        this.RegisterAttribute("CHART_TOOLS_FORMAT_LAUNCHER_GROUP", null, 'string', true);

    },

    RegisterEvents: function () {

        //Events Registration..
        this.RegisterEvent(1, "Ribbon_Bold_Click", "Ribbon: Bold button clicked", false, false, "");
        this.RegisterEvent(2, "Ribbon_Center-Align_Click", "Ribbon: Center-Align button clicked", false, false, "");
        this.RegisterEvent(3, "Ribbon_Left-Align_Click", "Ribbon: Left-Align button clicked", false, false, "");
        this.RegisterEvent(4, "Ribbon_Styles pane launcher_Click", "Ribbon: Styles pane launcher clicked", false, false, "Component not yet developed");
        this.RegisterEvent(5, "Ribbon_Font Size 16_Click", "Ribbon: Font Size 16 clicked", false, false, "");
        this.RegisterEvent(6, "Ribbon_Open File_Click", "Ribbon: Open File is clicked", false, false, "");
        this.RegisterEvent(7, "Save_Click", "Save is clicked", false, false, "");
        this.RegisterEvent(8, "Close_Click", "Close is clicked", false, false, "");
        this.RegisterEvent(9, "Ribbon_SaveAs_Click", "Ribbon: SaveAs is clicked", false, false, "");
        this.RegisterEvent(10, "Ribbon_Clear_Click", "Ribbon: Clear is clicked", false, false, "");
        this.RegisterEvent(11, "Ribbon_Clear-Formats_Click", "Ribbon: Clear Formats is clicked", false, false, "");
        this.RegisterEvent(12, "Ribbon_Clear-Contents_Click", "Ribbon: Clear Contents is clicked", false, false, "");
        this.RegisterEvent(13, "Ribbon_Clear-All_Click", "Ribbon: Clear All is clicked", false, false, "");
        this.RegisterEvent(14, "CheckMark_Bullet_Click", "", false, false, "");
        this.RegisterEvent(20, "Ribbon_Insert_Text_From_File", "Ribbon: Text from file is clicked", false, false, "SIMS.Components.Common.InsertFileDialog");
        this.RegisterEvent(21, "Ribbon_Insert_Pictures_Click", "Ribbon: Pictures is clicked", false, false, "SIMS.Components.Common.SaveAsDialog");
        this.RegisterEvent(22, "Ribbon_PictureTools_Wrap_Tight_Click", "Ribbon: Wrap Tight is clicked", false, false, "");
        this.RegisterEvent(23, "Ribbon_PictureTools_Position_MoreLayoutOptions_Click: More layout options (position) is clicked", "", false, false, "SIMS.Components.Word.LayoutDialog");
        this.RegisterEvent(24, "Ribbon_Review_Spelling_Click: Spelling is clicked", "", false, false, "SIMS.Components.Excel.SpellingDialog");
        this.RegisterEvent(25, "Ribbon_PictureTools_Position_Click: Picture Position is clicked", "", false, false, "");
        this.RegisterEvent(26, "Ribbon_ArtisticEffects_PlasticWrap_Click: Plastic Wrap artistic effect is clicked", "", false, false, "");
        this.RegisterEvent(27, "Ribbon_ArtisticEffect_Options_Click: Artistic effect options is clicked", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(28, "Ribbon_WrapText_Click: Wrap text is clicked", "", false, false, "");
        this.RegisterEvent(29, "Ribbon_Fill_Series: Fill Series is clicked", "", false, false, "SIMS.Components.Excel.ExcelSeriesDlg");
        this.RegisterEvent(30, "Ribbon_Format_Autofit_ColumnWidth_Click: Autofit column width is clicked", "", false, false, "");
        this.RegisterEvent(31, "Ribbon_PictureEffect_Bevel_Divot_Click: Divot Bevel is clicked", "", false, false, "");
        this.RegisterEvent(32, "Ribbon_Design_PageBorder_Click: Page Borders is clicked", "", false, false, "SIMS.Components.Word.BordersShadingDialog");
        this.RegisterEvent(33, "Ribbon_Shape_DoubleWave_Click: Double Wave shape is clicked", "", false, false, "");
        this.RegisterEvent(34, "Ribbon_Borders_And_Shading_Click: Borders and Shading is clicked", "", false, false, "SIMS.Components.Word.BordersShadingDialog");
        this.RegisterEvent(35, "Ribbon_Size_Launcher: Size Launcher is clicked", "", false, false, "SIMS.Components.Word.LayoutDialog");
        this.RegisterEvent(36, "Margin_Dialog_Launcher: Margin_Size is clicked", "", false, false, "SIMS.Components.Word.PageSetupDialog");
        this.RegisterEvent(37, "Solid_Bullet_Click", "", false, false, "");
        this.RegisterEvent(38, "Bullets_Icon_Click", "", false, false, "");
        this.RegisterEvent(39, "Line_Spacing_1.0", "", false, false, "");

        this.RegisterEvent(41, "Ribbon_Clipboard", "Ribbon: Clipboard launcher clicked", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(42, "Ribbon_Font", "Ribbon: Font launcher clicked", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(43, "Ribbon_Paragraph", "Ribbon: Paragraph launcher clicked", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(44, "Ribbon_Alignment", "", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(45, "Ribbon_Number", "", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(46, "Ribbon_Charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(47, "Ribbon_ScaleToFit", "", false, false, "SIMS.Components.Excel.PageSetupDialog");
        this.RegisterEvent(48, "Ribbon_SheetOptions", "", false, false, "SIMS.Components.Excel.PageSetupDialog");
        this.RegisterEvent(49, "Ribbon_PageSetup", "", false, false, "SIMS.Components.Excel.PageSetupDialog");
        this.RegisterEvent(50, "Column Width...", "", false, false, "SIMS.Components.Excel.ColWidthRowHeightDialog");
        this.RegisterEvent(51, "Insert Cells...", "", false, false, "SIMS.Components.Excel.CellInsertDeleteDialog");
        this.RegisterEvent(52, "Insert Sheet Rows", "", false, false, "");
        this.RegisterEvent(53, "Insert Sheet Columns", "", false, false, "");
        this.RegisterEvent(54, "Insert Sheet", "", false, false, "");
        this.RegisterEvent(55, "Delete Cells...", "", false, false, "SIMS.Components.Excel.CellInsertDeleteDialog");
        this.RegisterEvent(56, "Delete Sheet Rows", "", false, false, "");
        this.RegisterEvent(57, "Delete Sheet Columns", "", false, false, "");
        this.RegisterEvent(58, "Delete Sheet", "", false, false, "");
        this.RegisterEvent(59, "Font_Borders_MoreBorders", "", false, false, "");
        this.RegisterEvent(60, "Alignment_Middle", "", false, false, "");
        this.RegisterEvent(61, "Alignment_MergeNCenter", "", false, false, "");
        this.RegisterEvent(62, "Format_FormatCells", "", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(63, "Accounting Number Format", "", false, false, "");
        this.RegisterEvent(64, "Percent Style", "", false, false, "");
        this.RegisterEvent(65, "Comma Style", "", false, false, "");
        this.RegisterEvent(66, "Increase Decimal", "", false, false, "");
        this.RegisterEvent(67, "Decrease Decimal", "", false, false, "");
        this.RegisterEvent(68, "Select_All_Click", "", false, false, "");

        this.RegisterEvent(69, "Cell Styles: Title", "", false, false, "");
        this.RegisterEvent(70, "Cell Styles: Heading 1", "", false, false, "");
        this.RegisterEvent(71, "Cell Styles: Heading 4", "", false, false, "");
        this.RegisterEvent(72, "Cell Styles: Total", "", false, false, "");

        this.RegisterEvent(73, "Justify", "", false, false, "");

        this.RegisterEvent(74, "Font Size Changed", "", false, false, "");

        this.RegisterEvent(75, "Format Cell Alignment", "", false, false, "SIMS.Components.Excel.FormatCellDialog");

        this.RegisterEvent(78, "More Rotation Options - wrap text", "", false, false, "SIMS.Components.Word.LayoutDialog");
        this.RegisterEvent(79, "Size launcher", "", false, false, "");
        this.RegisterEvent(80, "More Borders", "", false, false, "SIMS.Components.Excel.FormatCellDialog");
        this.RegisterEvent(82, "Insert", "", false, false, "SIMS.Components.Excel.CellInsertDeleteDialog");

        this.RegisterEvent(84, "Delete", "", false, false, "SIMS.Components.Excel.CellInsertDeleteDialog");
        this.RegisterEvent(85, "Merge Across", "", false, false, "");
        this.RegisterEvent(86, "Merge Cells", "", false, false, "");
        this.RegisterEvent(87, "Unmerge Cells", "", false, false, "");
        this.RegisterEvent(88, "Picture effects options", "", false, false, "SIMS.Components.Common.FormatPane");

        this.RegisterEvent(89, "Number Format - General", "", false, false, "");
        this.RegisterEvent(90, "Number Format - Number", "", false, false, "");
        this.RegisterEvent(91, "Number Format - Currency", "", false, false, "");
        this.RegisterEvent(92, "Number Format - Short Date", "", false, false, "");
        this.RegisterEvent(93, "Number Format - Long Date", "", false, false, "");
        this.RegisterEvent(94, "Number Format - Time", "", false, false, "");
        this.RegisterEvent(95, "Number Format - Fraction", "", false, false, "");
        this.RegisterEvent(96, "Number Format - Scientific", "", false, false, "");
        this.RegisterEvent(97, "Number Format - Text", "", false, false, "");

        //From Country Specific Accounting Formats
        this.RegisterEvent(98, "English - United States", "", false, false, "");
        this.RegisterEvent(99, "More Accounting Formats...", "", false, false, "SIMS.Components.Excel.FormatCellDialog");

        this.RegisterEvent(100, "Cell Styles: Comma", "", false, false, "");
        this.RegisterEvent(101, "Cell Styles: Currency", "", false, false, "");
        this.RegisterEvent(102, "Shape layout", "", false, false, "SIMS.Components.Word.LayoutDialog");
        this.RegisterEvent(103, "Increase Indent", "", false, false, "");
        this.RegisterEvent(104, "Row Height...", "", false, false, "SIMS.Components.Excel.ColWidthRowHeightDialog");
        this.RegisterEvent(105, "hide columns", "", false, false, "");

        this.RegisterEvent(108, "arial narrow font clicked", "", false, false, "");
        this.RegisterEvent(109, "11 font size clicked", "", false, false, "");
        this.RegisterEvent(110, "blue shadow clicked", "", false, false, "");
        this.RegisterEvent(111, "below clicked", "", false, false, "");
        this.RegisterEvent(113, "font clicked", "", false, false, "");
        this.RegisterEvent(114, "Excel page setup dialog launch", "", false, false, "");
        this.RegisterEvent(115, "Excel potrait layout", "", false, false, "");
        this.RegisterEvent(116, "Excel Landscape Layout", "", false, false, "");
        this.RegisterEvent(117, "Print titles .. excel", "", false, false, "SIMS.Components.Excel.PageSetupDialog");
        this.RegisterEvent(118, "number dropdown..percent", "", false, false, "");
        this.RegisterEvent(119, "word font size 26 select", "", false, false, "");
        this.RegisterEvent(120, "Font 30 clicked", "", false, false, "");
        this.RegisterEvent(121, "More symbols clicked", "", false, false, "SIMS.Components.Word.InsertSymbolDialog");
        this.RegisterEvent(122, "Edit Footer", "", false, false, "");
        this.RegisterEvent(123, "Edit Header", "", false, false, "");
        this.RegisterEvent(124, "File Tab", "", false, false, "SIMS.Components.FileMenu.Excel");
        this.RegisterEvent(125, "Close Header and Footer", "", false, false, "");
        this.RegisterEvent(126, "Go to Footer", "", false, false, "");
        this.RegisterEvent(127, "Insert Document Info .. Filename", "", false, false, "");
        this.RegisterEvent(128, "Header and Footer .. insert field", "", false, false, "SIMS.Components.Word.FieldDialog");
        this.RegisterEvent(129, "Header and Footer .. quick parts", "", false, false, "");
        this.RegisterEvent(131, "Paste Value and Source Formatting", "", false, false, "");
        this.RegisterEvent(132, "Language prefernces clicked", "", false, false, "SIMS.Components.Word.WordOptionsDialog");
        this.RegisterEvent(133, "Excel Ribbon Copy Clicked", "", false, false, "");
        this.RegisterEvent(134, "Word ribbon font 22", "", false, false, "");
        this.RegisterEvent(135, "Word ribbon format shape pane launch", "", false, false, "");
        this.RegisterEvent(137, "Tracking launcher in review tab clicked", "", false, false, "SIMS.Components.Word.TrackChangesOptions");
        this.RegisterEvent(138, "Excel autosum", "", false, false, "");
        this.RegisterEvent(139, "view one page", "", false, false, "");
        this.RegisterEvent(140, "view 100%", "", false, false, "");
        this.RegisterEvent(141, "view.. zoom", "", false, false, "SIMS.Components.Word.ZoomDialog");
        this.RegisterEvent(142, "word cut", "", false, false, "");
        this.RegisterEvent(143, "format painter word", "", false, false, "");
        this.RegisterEvent(144, "Excel - Home - Fill - Flash Fill", "", false, false, "");
        this.RegisterEvent(145, "format painter double clicked", "", false, false, "");
        this.RegisterEvent(146, "Show/Hide (Ctrl+*) clicked", "", false, false, "");
        this.RegisterEvent(147, "mirrored clicked", "", false, false, "");
        this.RegisterEvent(148, "Paste clicked", "", false, false, "");
        this.RegisterEvent(149, "Flash Fill", "", false, false, "");
        this.RegisterEvent(150, "Increase Font Size clicked", "", false, false, "");
        this.RegisterEvent(151, "Show Formula", "", false, false, "");
        this.RegisterEvent(152, "line spacing 1.15", "", false, false, "");
        this.RegisterEvent(153, "Font Color Picked", "", false, false, "");
        this.RegisterEvent(154, "Shape Fill Color Picked", "", false, false, "");
        this.RegisterEvent(155, "Shape Outline Color Picked", "", false, false, "");
        this.RegisterEvent(156, "Text Outline COlor Picked", "", false, false, "");
        this.RegisterEvent(157, "Para Spacing After", "", false, false, "");
        this.RegisterEvent(158, "Page break clicked", "", false, false, "");
        this.RegisterEvent(161, "Format pane- More Lines ", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(162, "Format pane- Shadow ", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(163, "Format pane- Reflection ", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(164, "Format pane- Glow ", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(165, "Format pane- Gradiant ", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(166, "Excel -Format -Rename sheets ", "", false, false, "");
        this.RegisterEvent(167, "Word drawing tools - 3d text options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(168, "Word drawing tools - format shape - shape fill", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(169, "Word drawing tools - format shape - shape outline", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(170, "Word drawing tools - format shape - shape 3d options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(171, "Word drawing tools - format shape - shape shadow options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(172, "Word drawing tools - format shape - shape reflection options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(173, "Word drawing tools - format shape - shape glow options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(174, "Word drawing tools - format shape - shape soft edges options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(175, "line spacing 1.5", "", false, false, "");
        this.RegisterEvent(176, "Different first page_header tab", "", false, false, "");
        this.RegisterEvent(177, "quick print", "", false, false, "");
        this.RegisterEvent(178, "Excel - thick box border applied", "", false, false, "");
        this.RegisterEvent(179, "QAT_More commands clicked", "", false, false, "SIMS.Components.Excel.OptionsDialog");
        this.RegisterEvent(180, "Excel - insert function", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(181, "Track Changes - Add To Quick Access Toolbar", "", false, false, "");
        this.RegisterEvent(182, "Remove from Quick Access Toolbar", "", false, false, "");
        this.RegisterEvent(183, "Insert function - all", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(184, "Insert function - recently used", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(185, "Insert function - financial", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(186, "Insert function - logical", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(187, "Insert function - text", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(188, "Insert function - date time", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(189, "Insert function - lookup reference", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(190, "Insert function - math trig", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(191, "Insert function - statistical", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(192, "Insert function - engineering", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(193, "Insert function - cube", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(194, "Function - NOW", "", false, false, "SIMS.Components.Excel.NowFuncArgDialog");
        this.RegisterEvent(195, "Insert Function - Information", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(196, "Insert Function - Compatibility", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(197, "Insert Function - Web", "", false, false, "SIMS.Components.Excel.InsertFunctionDialog");
        this.RegisterEvent(198, "Tab Color Picked", "", false, false, "");
        this.RegisterEvent(199, "Excel - Recently used - Sum", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(200, "Excel - Paste - Formulas", "", false, false, "");
        this.RegisterEvent(201, "Excel - Paste - Formulas and number formatting", "", false, false, "");
        this.RegisterEvent(202, "Excel - Paste - Keep source formatting", "", false, false, "");
        this.RegisterEvent(203, "Excel - Paste - No borders", "", false, false, "");
        this.RegisterEvent(204, "Excel - Paste - keep source column widths", "", false, false, "");
        this.RegisterEvent(205, "Excel - Paste - Paste Special", "", false, false, "SIMS.Components.Excel.PasteSpecialDialog");
        this.RegisterEvent(206, "Excel - Fill Down", "", false, false, "");
        this.RegisterEvent(207, "Save", "", false, false, "");
        this.RegisterEvent(208, "Excel- No Fill", "", false, false, "");
        this.RegisterEvent(209, "Excel - Home - Fill - Right", "", false, false, "");
        this.RegisterEvent(210, "Excel - Formulas -  MathTrig - Product", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(211, "Excel - Home - Format - Move/Copy sheet", "", false, false, "SIMS.Components.Excel.MoveSheetDialog");
        this.RegisterEvent(212, "Word - Picture tools format - artistic effects options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(213, "Word - Picture tools format - 3d rotation options", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(214, "Word - Picture styles launcher", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(215, "Word-Page Bakground-Watermark-Custom Watermark", "", false, false, "SIMS.Components.Word.PrintedWatermarkDialog");
        this.RegisterEvent(216, "Word-Page Bakground-Watermark-Sample1", "", false, false, "");
        this.RegisterEvent(217, "Excel - Average Function applied from Autosum subitems", "", false, false, "");
        this.RegisterEvent(218, "Excel - Median Function", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(219, "Word-Drawing tools tab-Shape styles-2nd style in last row", "", false, false, "");
        this.RegisterEvent(220, "Word-Drawing tools tab-Shape Effects-3rd style in 3rd row-Offset Diagonal Top Left.", "", false, false, "");
        this.RegisterEvent(221, "Insert Sparklines - Line", "", false, false, "SIMS.Components.Excel.CreateSparklinesDlg");
        this.RegisterEvent(222, "Sparklines - Edit Data", "", false, false, "SIMS.Components.Excel.CreateSparklinesDlg");
        this.RegisterEvent(223, "Sparklines - Markers Checkbox", "", false, false, "");
        this.RegisterEvent(224, "Excel - Page Layout - Set Print Area", "", false, false, "");
        this.RegisterEvent(225, "Word - Page Setup - Scale", "", false, false, "");
        this.RegisterEvent(226, "Word - Insert tab - Online video clicked", "", false, false, "SIMS.Components.Word.InsertVideoDialog");
        this.RegisterEvent(227, "Word - Picture tools format tab - Shape height up spin clicked", "", false, false, "");
        this.RegisterEvent(228, "Word - Page setup dialog with margins tab", "", false, false, "SIMS.Components.Excel.PageSetupDialog");
        this.RegisterEvent(229, "Word - Page setup dialog launched with layout tab", "", false, false, "SIMS.Components.Excel.PageSetupDialog");
        this.RegisterEvent(230, "Word - Review Tab- spelling Grammer check", "", false, false, "SIMS.Components.Common.SpellingGrammarPane");
        this.RegisterEvent(231, "Excel - Average formula applied from Statistical formulas or Recently used list.", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");


        this.RegisterEvent(232, "Word  - DESIGN   MORE STYLE", "", false, false, "");
        this.RegisterEvent(233, "Word - Review Tab- define", "", false, false, "SIMS.Components.Common.SpellingGrammarPane");
        this.RegisterEvent(234, "Word - Review Tab- thesauruas", "", false, false, "SIMS.Components.Common.SpellingGrammarPane");
        this.RegisterEvent(235, "Excel - Autosum - Min", "", false, false, "");
        this.RegisterEvent(236, "Excel - Autosum - Max", "", false, false, "");
        this.RegisterEvent(237, "Excel - Statistical - Min", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(238, "Excel - Statistical - Max", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(239, "Excel - Statistical - Mina", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(240, "Excel - Statistical - Maxa", "", false, false, "SIMS.Components.Excel.SumFuncArgDialog");
        this.RegisterEvent(241, "Word-Picture tools tab-Shape height spin", "", false, false, "");
        this.RegisterEvent(242, "Word-Picture tools tab-Shape width spin", "", false, false, "");
        this.RegisterEvent(243, "Word-Home-Font SIze", "", false, false, "");
        this.RegisterEvent(244, "Word-Drawing tools tab-Shape height spin", "", false, false, "");
        this.RegisterEvent(245, "Word-Drawing tools tab-Shape width spin", "", false, false, "");
        this.RegisterEvent(246, "Word-Drawing tools tab-WordArt Styles group-Text outline-Weight-More lines", "", false, false, "SIMS.Components.Common.FormatPane");
        this.RegisterEvent(247, "Word-Insert-Draw Text Box", "", false, false, "");
        this.RegisterEvent(248, "Excel - theme - wisp", "", false, false, "");
        this.RegisterEvent(249, "Excel - themecolor - blue warm", "", false, false, "");
        this.RegisterEvent(250, "QAT - customize ribbon", "", false, false, "SIMS.Components.Excel.OptionsDialog");
        this.RegisterEvent(251, "Word - Shapes DropDown- Draw Text Box", "", false, false, "");
        this.RegisterEvent(252, "Word - Artistic effects - Paint Brush", "", false, false, "");
        this.RegisterEvent(253, "Word - Picture tools tab - Picture effects - Soft Edges option- 5 Point", "", false, false, "");
        this.RegisterEvent(254, "Word - Picture tools tab,Page layout tab - Wrap text-Square", "", false, false, "");
        this.RegisterEvent(255, "Word - Close button clicked", "", false, false, "");
        this.RegisterEvent(256, "Excel - Sparkline Tools Design - Styles - index 34", "", false, false, "");
        this.RegisterEvent(257, "Excel - Chart - Chart Title Above Chart", "", false, false, "");
        this.RegisterEvent(258, "Excel - Chart - Change colors index 3", "", false, false, "");
        this.RegisterEvent(259, "Excel - Chart - Chart Styles index 3", "", false, false, "");
        this.RegisterEvent(260, "Excel - Insert - Recommended Charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(261, "Excel - Chart - Area - More chart areas", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(262, "Excel - Chart - Bar charts - more bar charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(263, "Excel - Chart - Bubble charts - more scatter charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(264, "Excel - Chart - column charts - more column charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(265, "Excel - Chart - combo charts - more combo charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(266, "Excel - Chart - line charts - more line charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(267, "Excel - Chart - pie charts - more pie charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(268, "Excel - Chart - pivot charts - more pivot charts", "", false, false, "");
        this.RegisterEvent(269, "Excel - Chart - Stock charts - more stock charts", "", false, false, "SIMS.Components.Excel.InsertChart");
        this.RegisterEvent(270, "Word- smartart format- size- height ", "", false, false, "");
        this.RegisterEvent(271, "Word- smartart format- size- width", "", false, false, "");
        this.RegisterEvent(272, "Word- smartart design- change colors - colorful range - accent colors 2 to 3", "", false, false, "");
        this.RegisterEvent(273, "Word- smartart design- flat- 3D", "", false, false, "");
        this.RegisterEvent(274, "Word-Insert- smartart clicked", "", false, false, "SIMS.Components.Word.SmartArtDialog");
        this.RegisterEvent(275, "Word-Page layout-Para Spacing Before", "", false, false, "");
        this.RegisterEvent(276, "Excel - Page layout - theme colors - green", "", false, false, "");
        this.RegisterEvent(277, "Excel - Page layout - themes - retrospect", "", false, false, "");
        this.RegisterEvent(278, "Word - SmartArt design tab-Text pane clicked", "", false, false, "");
        this.RegisterEvent(279, "Word - Insert - Shapes - Recently Used - Text Box", "", false, false, "");
        this.RegisterEvent(280, "Word - QAT - Spelling & Grammar clicked", "", false, false, "SIMS.Components.Common.SpellingGrammarPane");
        this.RegisterEvent(281, "Word - QAT - Print Preview and Print clicked", "", false, false, "");
        this.RegisterEvent(282, "Word- smartart design- change colors - colorful range - accent colors 4 to 5", "", false, false, "");
        this.RegisterEvent(283, "Word- smartart design- inset- 3D", "", false, false, "");
        this.RegisterEvent(284, "Word insert shape rectangle", "", false, false, "");
        this.RegisterEvent(285, "Excel - Chart - Chart Styles index 6", "", false, false, "");
        this.RegisterEvent(286, "Word - Page layout tab - Margins-Narrow mragins clicked", "", false, false, "");
        this.RegisterEvent(287, "Excel - Sparkline Design Tools - Sparkline Styles - Gallery control item index 10", "", false, false, "");
        this.RegisterEvent(288, "Word - Insert - Shapes - Recently Used - rectangle", "", false, false, "");
        this.RegisterEvent(289, "Excel - Home - Styles - Cell Styles - Themed Cell styles - 40% Accent 1 ", "", false, false, "");
        this.RegisterEvent(290, "Word - Home - Text Effects - Fill - Black, Text 1, Outline - Background 1, Hard Shadow - Background 1", "", false, false, "");
        this.RegisterEvent(291, "Word - Home - Text Effects - Shadow - outer -offset left", "", false, false, "");
        this.RegisterEvent(292, "Word-Drawing tools tab-Shape styles-3rd style in the first row", "", false, false, "");
        this.RegisterEvent(293, "Word-Drawing tools tab-Shape Outer, Offset Diagonal Bottom Right shadow—in the first row, the first style.", "", false, false, "");
        this.RegisterEvent(294, "Add to QAT clicked in Default Context menu in Ribbon", "", false, false, "");
        this.RegisterEvent(295, "Number format changed", "", false, false, "");
        this.RegisterEvent(296, "Excel - Page layout - Scale to fit - Width changed", "", false, false, "");
        this.RegisterEvent(297, "Excel - Home-Styles-Themed Cell Styles-20% Accent1", "", false, false, "");
        this.RegisterEvent(298, "Excel - Formulas - Logical/Recently used - IF", "", false, false, "");
        this.RegisterEvent(299, "Excel - Clipboard-format painter", "", false, false, "");
        this.RegisterEvent(300, "Excel - INSERT-Sparklines-Column", "", false, false, "");
        this.RegisterEvent(301, "Excel - SPARKLINE TOOLS DESIGN tab-Style -Accent 4, (no dark or light)", "", false, false, "");
        this.RegisterEvent(302, "Excel - formulas-date _and_time-today", "", false, false, "");
        this.RegisterEvent(303, "Word - Home-Paragraph-Decrease Indent ", "", false, false, "");
        this.RegisterEvent(304, "Word -Insert-Text-Date and Time event", "", false, false, "SIMS.Components.Word.DateTimeDialog");
        this.RegisterEvent(305, "Excel - Formula - Lookup and Reference - VLOOKUP", "", false, false, "");
        this.RegisterEvent(306, "Excel - Formula - Financial - PMT", "", false, false, "");
        this.RegisterEvent(307, "Excel - Formula/Home - Autosum - Count numbers", "", false, false, "");
        this.RegisterEvent(308, "Word - View- SHow -Ruler", "", false, false, "");
        this.RegisterEvent(309, "Word -Home-Paragraph group-Numbering dropdown-2nd option event", "", false, false, "");
        this.RegisterEvent(310, "Word -Home-Paragraph group-Numbering dropdown-3rd option event", "", false, false, "");
        this.RegisterEvent(311, "Word -Design-Themes dropdown-5th option(Ion Boardroom) option event", "", false, false, "");
        this.RegisterEvent(313, "Word -Design-Themes dropdown-6th option(Organic) option event", "", false, false, "");
        this.RegisterEvent(312, "Word -Design-Colors dropdown-6th option (Blue II) event", "", false, false, "");
        this.RegisterEvent(315, "Word - Page Layout tab - Left Indent spin", "", false, false, "");
        this.RegisterEvent(314, "Word -Design-Colors dropdown-(Violet II) event", "", false, false, "");
        this.RegisterEvent(316, "Word -Home-Paragraph- Align Right", "", false, false, "");
        this.RegisterEvent(317, "Word -Home-Paste dropdown- Paste Special clicked", "", false, false, "SIMS.Components.Word.WordPasteSpecialDialog");
        this.RegisterEvent(318, "Word -Home-SElect All dropdown- Selection Pane clicked", "", false, false, "Component not yet developed");    //Replace with Actual component name when it will be developed
        this.RegisterEvent(319, "Word -Insert- Links-Hyperlink", "", false, false, "Component not yet developed");
        this.RegisterEvent(320, "Word -Review -Proofing- Word Count", "", false, false, "Component not yet developed");
        this.RegisterEvent(321, "Word -Review- Language -Translate- Choose Translational Language", "", false, false, "Component not yet developed");
        this.RegisterEvent(322, "Word -Insert- Links-Bookmark", "", false, false, "Component not yet developed");
        this.RegisterEvent(323, "Word -Review- TRacking -Review Pane", "", false, false, "Component not yet developed");
        this.RegisterEvent(324, "Word-Insert-Charts", "", false, false, "Component not yet developed");
        this.RegisterEvent(325, "Word -Insert- Links-Cross Reference", "", false, false, "Component not yet developed");
        this.RegisterEvent(326, "Word -Insert- Illustrations-Online pictures", "", false, false, "Component not yet developed");
        this.RegisterEvent(327, "Word -Insert- Apps-See all", "", false, false, "Component not yet developed");
        this.RegisterEvent(328, "Word -Insert- Word Art-Fill - Plum, Accent 1, Shadow (row 1, column 2)", "", false, false, "");
        this.RegisterEvent(329, "Word -Picture tools format,Page layout tab- wrap text- top and bottom", "", false, false, "");
        this.RegisterEvent(330, "Word - View tab-Navigation Pane check box clicked", "", false, false, "");
        this.RegisterEvent(331, "Word -Design-Paragraph spacing-No paragraph spacing clicked", "", false, false, "");
        this.RegisterEvent(332, "Excel - Formula - Defined names - Name Manager", "", false, false, "Component not yet developed");
        this.RegisterEvent(333, "Excel - Formula - Define name", "", false, false, "Component not yet developed");
        this.RegisterEvent(334, "Excel - Formula - Use in formula - Paste names", "", false, false, "Component not yet developed");
        this.RegisterEvent(335, "Word -Picture Tools Format-Arrange- rotate- Rotate Right 90", "", false, false, "");
        this.RegisterEvent(336, "Word -Picture Tools Format-Style- Drop Shadow Rectangle", "", false, false, "");
        this.RegisterEvent(337, "Word -Picture Tools Format-Style- Soft Edge Rectangle", "", false, false, "");
        this.RegisterEvent(338, "Word -Table Tools Layout- Cell Size - Width", "", false, false, "");
        this.RegisterEvent(339, "Word -Table Tools Layout- Cell Size - Autofit- Autofit Window", "", false, false, "");
        this.RegisterEvent(340, "Word -Table Tools Layout- Cell Size - Cell Size Launcher", "Ribbon: Table Properties Clicked", false, false, "");
        this.RegisterEvent(341, "Excel - Formula - More Functions - Statistical - COUNTIF", "Ribbon: COUNTIF clicked", false, false, "");
        this.RegisterEvent(342, "Excel - table tools format - convert to range", "Ribbon: convert to range Clicked", false, false, "");
        this.RegisterEvent(343, "Excel - Home - Editing - Find and replace - Find", "", false, false, "");
        this.RegisterEvent(344, "Excel - Home - Editing - Find and replace - Replace", "", false, false, "");
        this.RegisterEvent(345, "Word - Review Tab - Mailings clicked", "", false, false, "");
        this.RegisterEvent(346, "Word - Home - Editing - - Find", "", false, false, "SIMS.Components.Word.NavigationPane");
        this.RegisterEvent(347, "Word - Home - Editing - Find-Find", "", false, false, "SIMS.Components.Word.NavigationPane");
        this.RegisterEvent(348, "Word - Home - Editing - Find-Advanced Find", "", false, false, "SIMS.Components.Word.FindAndReplaceDialog");
        this.RegisterEvent(349, "Word - Home - Editing - Find-Go to", "", false, false, "SIMS.Components.Word.FindAndReplaceDialog");
        this.RegisterEvent(350, "Word - Home - Editing - Replace", "", false, false, "SIMS.Components.Word.FindAndReplaceDialog");
        this.RegisterEvent(351, "Word - Picture Tools Format Tab - Adjust- Corrections - Brightness- Brightness: +20% Contrast: 0%", "", false, false, "");
        this.RegisterEvent(352, "Word - Picture Tools Format Tab - Adjust- Corrections - Brightness- Brightness: 0% Contrast: +20%", "", false, false, "");
        this.RegisterEvent(353, "Excel - View Tab - Zoom clicked", "", false, false, "SIMS.Components.Excel.ZoomDialog");
        this.RegisterEvent(354, "Word -Table Tools Layout- Cell Size - Autofit- Autofit Contents", "", false, false, "");
        this.RegisterEvent(355, "Word - Home- Font Name", "", false, false, "");
        this.RegisterEvent(356, "Word - Home- Font Name- Times New Roman ", "", false, false, "");
        this.RegisterEvent(357, "Word - Home- Font Size- 12 ", "", false, false, "");
        this.RegisterEvent(358, "Word - Home- Text Effects and Typography- Row3,column3 ", "", false, false, "");
        this.RegisterEvent(359, "Excel - Formulas - More Functions - Statistical - COUNTIFS ", "", false, false, "");
        this.RegisterEvent(360, "Word- Home- Font- Italics ", "", false, false, "");
        this.RegisterEvent(361, "Excel - Home-Styles-Themed Cell Styles-20% Accent2", "", false, false, "");
        this.RegisterEvent(362, "Word - Home-Paragraph-Bullet- Hollow Round Bullet", "", false, false, "");
        this.RegisterEvent(363, "Word - Home-Paragraph-Bullet- Arrow Bullet", "", false, false, "");
        this.RegisterEvent(364, "Word - Home-Paragraph-Bullet- Define New Bullet", "", false, false, "");
        this.RegisterEvent(365, "Word - Home-Paragraph-Numbering", "", false, false, "");
        this.RegisterEvent(366, "Excel - View - Workbook Views - Normal", "", false, false, "");
        this.RegisterEvent(367, "Excel - View - Workbook Views - Page Break Preview", "", false, false, "");
        this.RegisterEvent(368, "Excel - View - Workbook Views - Page Layout", "", false, false, "");
        this.RegisterEvent(369, "Excel - View - Workbook Views - Custom Views", "", false, false, "");
        this.RegisterEvent(370, "Excel - Home - Styles - Equal To", "", false, false, "");
        this.RegisterEvent(371, "Excel - Home - Styles - Text That contains", "", false, false, "");
        this.RegisterEvent(372, "Excel - Home - Styles - Orange Bar", "", false, false, "");
        this.RegisterEvent(373, "Excel - Home - Styles - Red Bar", "", false, false, "");
        this.RegisterEvent(374, "Word - Page Layout - Page Setup - Columns- Two", "", false, false, "");
        this.RegisterEvent(375, "Word - Page Layout - Page Setup - Columns- More Columns", "", false, false, "");
        this.RegisterEvent(376, "Excel - View - Windows - Freeze panes - Freeze/Unfreeze", "", false, false, "");
        this.RegisterEvent(377, "Word - Design -Document Formatting - Styles- Lines", "", false, false, "");
        this.RegisterEvent(378, "Word - Design -Document Formatting - Styles- Minimallist", "", false, false, "");
        this.RegisterEvent(379, "Word - Outlining - Outline Tools- Move Up", "", false, false, "");
        this.RegisterEvent(380, "Word - Outlining - Outline Tools- Move Down", "", false, false, "");
        this.RegisterEvent(381, "Word - Outlining - Outline Tools- Expand", "", false, false, "");
        this.RegisterEvent(382, "Word - Outlining - Outline Tools- Collapse", "", false, false, "");
        this.RegisterEvent(383, "Word - View - Views Outline", "", false, false, "");
        this.RegisterEvent(384, "Word - outlining - Show Level- Level 3", "", false, false, "");
        this.RegisterEvent(385, "Word - Home - Paste- Keep SOurce formatting", "", false, false, "");
        this.RegisterEvent(386, "Word - outlining - close outline view", "", false, false, "");
        this.RegisterEvent(387, "Word - view - Print view", "", false, false, "");
        this.RegisterEvent(388, "Excel - Insert - Tables - PivotTable", "", false, false, "");
        this.RegisterEvent(389, "Excel - Insert - Tables - Recommended Pivot Table", "", false, false, "");
        this.RegisterEvent(390, "Excel - Insert - Tables - Table", "", false, false, "");
        this.RegisterEvent(391, "Excel - Page Layout - Themes - Slice", "", false, false, "");
        this.RegisterEvent(392, "Excel - Page Layout - Themes - Celestial", "", false, false, "");
        this.RegisterEvent(393, "Excel - View - Window - Split", "", false, false, "");
        this.RegisterEvent(394, "Excel - Sort A to Z", "", false, false, "");
        this.RegisterEvent(395, "Excel - HOME - Editting - Sort Z to A", "", false, false, "");
        this.RegisterEvent(396, "Excel - Custom Sort", "", false, false, "");
        this.RegisterEvent(397, "Excel - Formula - Define Name - Name manager", "", false, false, "");
        this.RegisterEvent(398, "Word - Table Tools Layout -Rows and columns- Insert Above", "", false, false, "");
        this.RegisterEvent(399, "Word - Table Tools Layout -Merge- Merge Cells", "", false, false, "");
        this.RegisterEvent(400, "Excel - Formula - Define Name", "", false, false, "");
        this.RegisterEvent(401, "Word - Table Tools Design -Borders-No Border", "", false, false, "");
        this.RegisterEvent(402, "Excel - SPARKLINE TOOLS DESIGN tab-Style -Accent 2, (no dark or light)", "", false, false, "");
        this.RegisterEvent(403, "Excel - Table Style Light 16", "", false, false, "");
        this.RegisterEvent(404, "Excel - Table Style Medium 2", "", false, false, "");
        this.RegisterEvent(405, "Word - outlining - Show Level- Level 1", "", false, false, "");
        this.RegisterEvent(406, "Excel - Formula - Define Name - use in formula - first item", "", false, false, "");
        this.RegisterEvent(407, "Excel - Undo Button clicked", "", false, false, "");
        this.RegisterEvent(408, "Excel - Item Clicked in Undo Dropdown", "", false, false, "");
        this.RegisterEvent(409, "Word - Insert - Tables - Table - Table grid item clicked", "", false, false, "");
        this.RegisterEvent(410, "Word - Home - Styles - Heading 1", "", false, false, "");
        this.RegisterEvent(411, "Word - Table Tools Layout -Select-Select Cell", "", false, false, "");
        this.RegisterEvent(412, "Word - Table Tools Layout -Select-Select Table", "", false, false, "");
        this.RegisterEvent(413, "Word - Insert tab-Table dropdown-Insert table clicked", "", false, false, "");
        this.RegisterEvent(414, "Word - Table Tools Design -Table styles-Table grid clicked", "", false, false, "");
        this.RegisterEvent(415, "Excel - Formula - Use in Formula - Item", "", false, false, "");
        this.RegisterEvent(416, "Excel - Formula - Use in Formula - Paste Names", "", false, false, "");
        this.RegisterEvent(417, "Word - Present Online - End Online Presentation", "", false, false, "");
        this.RegisterEvent(418, "Word - Table Tools Layout -Properties clicked", "", false, false, "");
        this.RegisterEvent(419, "Word - Table Tools Design -Borders-Bottom Border", "", false, false, "");
        this.RegisterEvent(420, "Word - Home - Styles - Heading 2", "", false, false, "");
        this.RegisterEvent(421, "Word - Home - Styles - Heading 3", "", false, false, "");
        this.RegisterEvent(422, "Word - Home - Styles - Apply Styles", "", false, false, "");
        this.RegisterEvent(423, "Excel - Table Tools Design - Table Style Options- Total Rows", "", false, false, "");
        this.RegisterEvent(424, "Excel - HOME - Conditional Formatting - Highlight Cell Rules - More Rules", "", false, false, "SIMS.Components.Excel.ConditionalFormattingRulesManagerDialog");
        this.RegisterEvent(425, "Excel - HOME - Conditional Formatting - Top/Bottom Rules - More Rules", "", false, false, "SIMS.Components.Excel.ConditionalFormattingRulesManagerDialog");
        this.RegisterEvent(426, "Excel - HOME - Conditional Formatting - Data Bars - More Rules", "", false, false, "SIMS.Components.Excel.ConditionalFormattingRulesManagerDialog");
        this.RegisterEvent(427, "Excel - HOME - Conditional Formatting - Color Scales - More Rules", "", false, false, "SIMS.Components.Excel.ConditionalFormattingRulesManagerDialog");
        this.RegisterEvent(428, "Excel - HOME - Conditional Formatting - Icon Sets - More Rules", "", false, false, "SIMS.Components.Excel.ConditionalFormattingRulesManagerDialog");
        this.RegisterEvent(429, "Excel - HOME - Conditional Formatting - Manage Rules", "", false, false, "SIMS.Components.Excel.ConditionalFormattingRulesManagerDialog");
        this.RegisterEvent(430, "Excel - HOME - Conditional Formatting - New Rule", "", false, false, "SIMS.Components.Excel.NewFormattingRuleDialog.NewRuleDialog");
        this.RegisterEvent(431, "Excel - Header and Footer Tools - Header and Footer Elements - File Name", "", false, false, "");
        this.RegisterEvent(432, "Excel - HOME - Conditional Formatting - Data Bars - Red Data Bars", "", false, false, "");
        this.RegisterEvent(433, "Word - Table Tools Layout -Select-Select Row", "", false, false, "");
        this.RegisterEvent(434, "Excel - Table Tools Design - Table Styles - Table Style Light 10", "", false, false, "");
        this.RegisterEvent(435, "Word - Insert Tab - Illustrations - Insert Screenshot", "", false, false, "");
        this.RegisterEvent(436, "Word - Insert Tab - Pages - Blank Page", "", false, false, "");
        this.RegisterEvent(437, "Word - Insert Tab - Pages - Page Break", "", false, false, "");
        this.RegisterEvent(438, "Word - Page Layout Tab - Page Setup - Break", "", false, false, "");
        this.RegisterEvent(439, "Word - Header and Footer Design Tab - Header and Footer - Page Number - Current Position - Plain Number", "", false, false, "");
        this.RegisterEvent(440, "Excel - Data Tab - Data Tools - What if Analysis - Goal Seek", "", false, false, "");
        this.RegisterEvent(441, "Excel - Home tab - Styles - Number Format - Currency[0]", "", false, false, "");
        this.RegisterEvent(442, "Excel - Home tab - Styles - Themed Styles - Accent 4", "", false, false, "");
        this.RegisterEvent(443, "Excel - Home tab - Clipboard - Paste - Value & Number formatting", "", false, false, "");
        this.RegisterEvent(444, "Word - Pictures Tools tab - Adjust - Paste - Corrections-Brightness: -40% Contrast: +40%", "", false, false, "");
        this.RegisterEvent(445, "Word - Home tab - Paragraph - Paste -line and spacing-2.0", "", false, false, "");
        this.RegisterEvent(446, "Word - View tab - Views - Read Mode", "", false, false, "");
        this.RegisterEvent(447, "Word - Reference tab - Citations and Bibliography - Bibliography - Insert Bibliography", "", false, false, "");
        this.RegisterEvent(448, "Word - Reference tab - Citations and Bibliography - Insert Citation - Add New Source", "", false, false, "");
        this.RegisterEvent(449, "Word - Reference tab - Citations and Bibliography - Bibliography Style - APA", "", false, false, "");
        this.RegisterEvent(450, "Word - Reference tab - Citations and Bibliography - Manage Sources", "", false, false, "");
        this.RegisterEvent(451, "Word - Reference tab - Footnotes Launcher clicked", "", false, false, "");
        this.RegisterEvent(452, "Word - Reference tab - Footnotes - Insert Footnote", "", false, false, "");
        this.RegisterEvent(457, "Word - Picture Tools Format tab - Picture Styles - Picture Border", "", false, false, "");
        this.RegisterEvent(453, "Excel - Chart Tools Design - Data - Select Data", "", false, false, "");
        this.RegisterEvent(454, "Excel - Insert Tab Pie  - chart - Select Data", "", false, false, "");
        this.RegisterEvent(455, "Excel - Insert Tab Pie  - chart  - Select Data", "", false, false, "");
        this.RegisterEvent(456, "Excel - Chart Tools Design - Data - Select Data", "", false, false, "");
        this.RegisterEvent(461, "Word - Pictures Tools tab/Page Layout Tab-Arrange-Rotate -flip horizontal", "", false, false, "");
        this.RegisterEvent(463, "Word - Pictures Tools tab-Picture Styles-Picture Border-weight-1.5pt", "", false, false, "");
        this.RegisterEvent(464, "Word - Pictures Tools tab-Picture Styles-Picture Border-weight-3pt", "", false, false, "");
        this.RegisterEvent(465, "Word - Pictures Tools tab-Adjust-Set Transparent Color", "", false, false, "");
        this.RegisterEvent(467, "Word - Pictures Tools tab-Adjust-Recolor-olive green,accent color 3,light", "", false, false, "");
        this.RegisterEvent(466, "Word - Pictures Tools tab-Adjust-Recolor-aqua ,accent color 5,light", "", false, false, "");
        this.RegisterEvent(458, "Excel - Chart Tools Format - Current Selection - Chart Elements - Chart Area", "", false, false, "");
        this.RegisterEvent(459, "Excel - Chart Tools Format - Current Selection - Chart Elements -  Chart Title", "", false, false, "");
        this.RegisterEvent(460, "Excel - Chart Tools Format - Current Selection - Vertical (Value) Axis", "", false, false, "");
        this.RegisterEvent(462, "Excel - Chart Tools Format - Current Selection - Format Selection", "", false, false, "");
        this.RegisterEvent(468, "Excel - Chart Tools Format - Word Art Styles - Fill - Gold, Accent 4, Soft Bevel", "", false, false, "");
        this.RegisterEvent(469, "Excel - Chart Tools Format - Word Art Styles -  Fill - Blue, Accent 1, Shadow", "", false, false, "");
        this.RegisterEvent(470, "Excel - Header and Footer Design - Navigation -  Go To footer", "", false, false, "");
        this.RegisterEvent(471, "Word - Pictures Tools tab-size-crop drop down-crop", "", false, false, "");
        this.RegisterEvent(472, "Excel - Home - Styles- Format as table - Table Style Medium 3, Excel - Table tools Design - Table Styles - Table Style Medium 3", "", false, false, "");
        this.RegisterEvent(473, "Excel - Chart Tools Format - Current Selection - Shape effect shadow ", "", false, false, "");
        this.RegisterEvent(474, "Excel - Chart Tools Format - Current Selection - Shape effect shadow", "", false, false, "");
        this.RegisterEvent(475, "Excel - Home - Styles- Format as table - Table Style Medium 10, Excel - Table tools Design - Table Styles - Table Style Medium 10", "", false, false, "");
        this.RegisterEvent(476, "Excel - Home - Styles- Format as table - Table Style Medium 9, Excel - Table tools Design - Table Styles - Table Style Medium 9", "", false, false, "");
        this.RegisterEvent(477, "Excel - Home - Cells - Delete - Delete Table Columns", "", false, false, "");
        this.RegisterEvent(478, "Word-Mailings - Start Mail Merge-Edit Recipient List", "", false, false, "");
        this.RegisterEvent(479, "Excel - Chart Tools Format - Current Selection - Series 1 ", "", false, false, "");
        this.RegisterEvent(480, "Excel - Chart Tools Format - Current Selection - Vertical (Value) Axis major Gridlines", "", false, false, "");
        this.RegisterEvent(481, "Word- Mailings -Start Mail Merge-Start Mail Merge drop down- step by step wizard", "", false, false, "");
        this.RegisterEvent(482, "Word- Mailings -Start Mail Merge-Select Recipients-Use an Existing List", "", false, false, "");
        this.RegisterEvent(483, "Excel - Chart Tools Format - Current Selection - Chart elements", "", false, false, "");
        this.RegisterEvent(484, "Excel - Chart Tools Format - Current Selection - Shape Fill picture", "", false, false, "");
        this.RegisterEvent(485, "Word - Pictures Tools tab - Adjust - Paste - Corrections- Brightness -20% Contrast: 0% (Normal)", "", false, false, "");
        this.RegisterEvent(486, "Excel - Chart Tools Design - Chart layouts - Data Labels - Center", "", false, false, "");
        this.RegisterEvent(487, "Excel - Chart Tools Design - Chart layouts - Data Labels - More options ", "", false, false, "");
        this.RegisterEvent(488, "Excel - Chart Tools Design - Chart layouts - Data Labels - Legend - None", "", false, false, "");
        this.RegisterEvent(489, "Word - References - Citations and Bibliography - Bibliography - Works Cited", "", false, false, "");
        this.RegisterEvent(490, "Word - Table Tools Layout - Rows and Columns - Delete - Delete Columns", "", false, false, "");
        this.RegisterEvent(491, "Word - Table Tools Layout - Table - Select - Select Columns", "", false, false, "");
        this.RegisterEvent(492, "Word - Table Tools Layout - Rows and Columns - Delete - Delete Cells", "", false, false, "");
        this.RegisterEvent(493, "Word - Table Tools Layout - Rows and Columns - Insert Cells Dialog Box Launcher", "Ribbon: Insert Cells Clicked", false, false, "");
        this.RegisterEvent(494, "Excel - Insert - Charts - Insert Line Chart - Line With Markers", "", false, false, "");
        this.RegisterEvent(495, "Word - Review - Tracking - Simple Markup", "", false, false, "");
        this.RegisterEvent(496, "Word- Mailings -Write and Insert Fields -Address Block", "", false, false, "");
        this.RegisterEvent(497, "Word- Mailings -Write and Insert Fields -Match Fields", "", false, false, "");
        this.RegisterEvent(498, "Word- Mailings -Write and Insert Fields -Update Labels ", "", false, false, "");
        this.RegisterEvent(499, "Excel - Sparkline tools design - Styles - Sparkline Color - Color ", "", false, false, "");
        this.RegisterEvent(500, "Excel - Views - Freeze panes - Freeze Top row ", "", false, false, "");
        this.RegisterEvent(501, "Word- References - Table of Contents - Table of Contents - Automatic Table 2", "", false, false, "");
        this.RegisterEvent(502, "Word- References - Index - Mark Entry", "", false, false, "");
        this.RegisterEvent(503, "Word- References - Index -Insert Index", "", false, false, "");
        this.RegisterEvent(504, "Excel - Insert - Charts - Pie - Pie", "", false, false, "");
        this.RegisterEvent(505, "Excel - Home - Font - Font size", "", false, false, "");
        this.RegisterEvent(506, "Excel - Home - Font - Font size - 12", "", false, false, "");
        this.RegisterEvent(507, "Excel - Home - Font - Font size - 14 ", "", false, false, "");
        this.RegisterEvent(508, "Excel - Home - Font - Font size - 18", "", false, false, "");
        this.RegisterEvent(509, "Excel - Home - Font - Font size - 20", "", false, false, "");
        this.RegisterEvent(510, "Word- Table Tools Layout - Alignment - Align Center", "", false, false, "");
        this.RegisterEvent(511, "Word- Table Tools Layout - Alignment - Align Top Right", "", false, false, "");
        this.RegisterEvent(512, "Excel - Insert tab - charts section - insert cloumn chart dropdown - clustered column", "", false, false, "");
        this.RegisterEvent(513, "Excel - Data Tab - Sort order largest to smallest", "", false, false, "");
        this.RegisterEvent(514, "Excel - Chart Tools Design - Chart layouts - Axes - Primary Vertical ", "", false, false, "");
        this.RegisterEvent(515, "Excel - Chart Tools Format - Chart Elements - Horizontal Value Axis ", "", false, false, "");
        this.RegisterEvent(516, "Excel - Chart Tools Design - Chart layouts - Axes - More Axes Options", "", false, false, "");
        this.RegisterEvent(517, "Excel - Chart Tools Design - Chart layouts - Axes Title - More Axes Title Options", "", false, false, "");
        this.RegisterEvent(518, "Excel - Chart Tools Design - Chart layouts - Chart Titles - More Title Options ", "", false, false, "");
        this.RegisterEvent(519, "Excel - Chart Tools Design - Chart layouts - Legends - More Legend Options", "", false, false, "");
        this.RegisterEvent(520, "Excel - Home - Conditional Formatting - Data Bars - Purple Data bars", "", false, false, "");
        this.RegisterEvent(521, "Excel - Insert - Bar Chart - 2D Bar - Clustered Bar", "", false, false, "");
        this.RegisterEvent(522, "Excel - Chart Tools Design - Chart layouts - Data Labels -Inside End", "", false, false, "");
        this.RegisterEvent(523, "Word - Home - Font - Font size - 36", "", false, false, "");
        this.RegisterEvent(524, "Excel - Chart Tools Design - Chart Styles - Style 2", "", false, false, "");
        this.RegisterEvent(525, "Excel - Chart Tools Format - Texture - Blue Tissue paper", "", false, false, "");
        this.RegisterEvent(526, "Excel - Chart Tools Format - Texture - Papyrus", "", false, false, "");
        this.RegisterEvent(527, "Excel - Chart Tools Design - Type - Change Chart Type", "", false, false, "");
        this.RegisterEvent(528, "Word-Present Online-edit", "", false, false, "");
        this.RegisterEvent(529, "Word-Home-Font-Text Highlight Color", "", false, false, "");
        this.RegisterEvent(530, "Word-Present Online-Resume Online Presentation", "", false, false, "");
        this.RegisterEvent(531, "Excel - Chart Tools Format - Size - Launcher , Excel - Chart Tools Format - Word Art Styles - Launcher, Chart Tools Format - Shape Styles - Shape Fill - Gradient - More Gradients Textures, Chart Tools Format - Shape Styles - Shape Fill - point to Texture - More Textures , Chart Tools Format - Shape Outline - Weight or Dashes - More Lines Textures,Chart Tools Format - Shape Styles - Shape Effects - Presets or Bevel - 3-D Options", "", false, false, "");
        this.RegisterEvent(532, "Word - Review - Changes - Next", "", false, false, "");
        this.RegisterEvent(533, "Word - Review - Comments - New Comment", "", false, false, "");
        this.RegisterEvent(534, "Word - Review - Comments - Next", "", false, false, "");
        this.RegisterEvent(535, "Word - Review - Tracking - All Markup", "", false, false, "");
        this.RegisterEvent(536, "Word - Review - Changes - Reject - Reject and Move to Next ", "", false, false, "");
        this.RegisterEvent(537, "Word - Review - Changes - Reject - Reject Change ", "", false, false, "");
        this.RegisterEvent(538, "Word - Review - Changes - Previous", "", false, false, "");
        this.RegisterEvent(539, "Word - Review - Changes - Accept - Accept all changes and stop tracking", "", false, false, "");
        this.RegisterEvent(540, "Word - Citation - Citation - Style", "", false, false, "");
        this.RegisterEvent(541, "Word - Review - Comments - Delete Comment - Delete All Comments in Document", "", false, false, "");
        this.RegisterEvent(542, "Word - Table tools layout - Merge - Split Cells", "", false, false, "");
        this.RegisterEvent(543, "Word - Table tools layout - Data - Sort", "", false, false, "");
        this.RegisterEvent(544, "Word - Home - Paragraph - Sort", "", false, false, "");
        this.RegisterEvent(545, "Word - Table tools layout - Data - Repeat Header Rows", "", false, false, "");
        this.RegisterEvent(546, "Word - Table tools layout - Cell Size - Height", "", false, false, "");
        this.RegisterEvent(547, "Word - Table tools Design - Borders - All Borders", "", false, false, "");
        this.RegisterEvent(548, "Word - Reference tab -Captions -Insert Caption", "", false, false, "");
        this.RegisterEvent(549, "Word - Insert tab -Tables -Table-Conver Text to Table", "", false, false, "");
        this.RegisterEvent(550, "Word - Table Tools Layout tab -Data -Formula", "", false, false, "");
        this.RegisterEvent(551, "Excel - Chart Tools Format - Size - Shape Height", "", false, false, "");
        this.RegisterEvent(552, "Excel - Chart Tools Format - Size - Shape Width", "", false, false, "");
        this.RegisterEvent(553, "Word - Reference tab - Citations and Bibliography - Bibliography Style - MLA", "", false, false, "");
        this.RegisterEvent(554, "Excel - Home - Styles - Conditional Formattting - Top Bottom Rules - Top 10 items", "", false, false, "");
        this.RegisterEvent(555, "Word - Reference - Citations and Bibliography - Insert Citation - Jewett Citation (In Sub-Ribbon Xml)", "", false, false, "");
        this.RegisterEvent(556, "Excel - Page Layout - Page Setup - Print Area - Clear Print Area", "", false, false, "");
        this.RegisterEvent(557, "Excel - Home - Cells - Insert - Insert Table Rows Above", "", false, false, "");
        this.RegisterEvent(558, "Excel - Table Tools Design - Tools - Remove Duplicates", "", false, false, "");
        this.RegisterEvent(559, "Excel - Page layout - Page Setup - Breaks - Insert Page Break", "", false, false, "");
        this.RegisterEvent(560, "Excel - Sparklines Tools design tab - Show - High Point", "", false, false, "");
        this.RegisterEvent(561, "Excel - Sparklines Tools design tab - Styles - Sparkline Style Dark #3", "", false, false, "");
        this.RegisterEvent(562, "Word - Design/Home/Table tools Design -color grid -More colors", "", false, false, "");
        this.RegisterEvent(563, "Excel - Sparkline Tools Design - Style - Sparkline Style Dark #6", "", false, false, "");
        this.RegisterEvent(564, "Word - References - Citations & Bibliography - Bibliography - Bibliography", "", false, false, "");
        this.RegisterEvent(565, "Word - Home - Font - Font Styles - Cambria", "", false, false, "");
        this.RegisterEvent(566, "Word - Table Tools Design - Table Styles -  Gallery - List Table 3 Accent 6", "", false, false, "");
        this.RegisterEvent(567, "Word - Mailings - Finish & Merge -  Edit Individual Documents", "", false, false, "");
        this.RegisterEvent(568, "Word - Table Tools Design - Table Styles -  Gallery - List Table 3 Accent 1", "", false, false, "");
        this.RegisterEvent(569, "Excel - Chart Tools Format - Word Art styles - Fill Blue Accent 1 Shadow ", "", false, false, "");
        this.RegisterEvent(570, "Word - Review - Changes - Accept - Accept all changes", "", false, false, "");
        this.RegisterEvent(571, "Word - Review - Tracking - Track - Track Changes", "", false, false, "");
        this.RegisterEvent(572, "Word - Review - Changes - Reject", "", false, false, "");
        this.RegisterEvent(573, "Word - Table tools Design - Border Styles - Double solid line 1/2 accent 4", "", false, false, "");
        this.RegisterEvent(574, "Excel - Chart Tools Format - Current Selection - Series 1 Data Labels ", "", false, false, "");
        this.RegisterEvent(575, "Excel - Home - Font group - Italics ", "", false, false, "");
        this.RegisterEvent(576, "Word - Table tools Design - Border Styles - Double solid line 1/2 accent 5", "", false, false, "");
        this.RegisterEvent(577, "Excel - Chart Tools Design - Chart layouts - Data Labels - Outside End", "", false, false, "");
        this.RegisterEvent(578, "Excel - Chart Tools Format - Shape Styles - Shape Effects - 3-D Rotation - More Options", "", false, false, "");
        this.RegisterEvent(579, "Excel - Chart Tools Design - Shape Fill - Color", "", false, false, "");
        this.RegisterEvent(580, "Word - Design - Watermark - Draft1", "", false, false, "");
        this.RegisterEvent(581, "Excel - Home - Cell Styles - Heading 2", "", false, false, "");
        this.RegisterEvent(582, "Excel - Home - Format - Hide & Unhide - Unhide Columns", "", false, false, "");
        this.RegisterEvent(583, "Word - Insert - Symbol - Insert Symbol - TradeMark Sign", "", false, false, "");
        this.RegisterEvent(584, "Word - Home - Styles - Galary - No Spacing", "", false, false, "");
        this.RegisterEvent(585, "Word - Home - Font - Font Styles - Calibri", "", false, false, "");
        this.RegisterEvent(586, "Word - Smartart Tools Format - Shape Styles - Shape Effects - Preset", "", false, false, "");
        this.RegisterEvent(587, "Word smartart tools format - shape outline", "", false, false, "");
        this.RegisterEvent(588, "Word smartart tools format - shape fill - gradient - more gradient", "", false, false, "");
        this.RegisterEvent(589, "Word smartart tools format - shape fill - texture - more txture", "", false, false, "");
        this.RegisterEvent(590, "Word smartart tools format - shape effects - reflection - reflection options", "", false, false, "");
        this.RegisterEvent(591, "Word smartart tools format - shape fill - color picker", "", false, false, "");
        this.RegisterEvent(592, "Word smartart tools format - shape effects - glow - glow options", "", false, false, "");
        this.RegisterEvent(593, "Word smartart tools format - shape effects - Soft Edge - soft edges options", "", false, false, "");
        this.RegisterEvent(594, "Word smartart tools format - shape outline - dashes - more lines", "", false, false, "");
        this.RegisterEvent(595, "Word smartart tools format - shape effects - 3D-Rotation - 3-d rotation options", "", false, false, "");
        this.RegisterEvent(596, "Word smartart tools format - text effects - reflection - tight reflection, touching", "", false, false, "");
        this.RegisterEvent(597, "Excel - Home-Styles-Themed Cell Styles-Accent1", "", false, false, "");
        this.RegisterEvent(598, "Excel - Home-Styles-Themed Cell Styles-Accent5", "", false, false, "");
        this.RegisterEvent(599, "Excel - Insert - Text - Header&Footer", "", false, false, "");
        this.RegisterEvent(600, "Excel - Home - Format as a table - Table style light 5", "", false, false, "");
        this.RegisterEvent(601, "Excel - Insert - Wordart - Wordart1", "", false, false, "");
        this.RegisterEvent(602, "Excel - Insert - Wordart - Wordart6", "", false, false, "");
        this.RegisterEvent(603, "Excel - Data - Sort - Clear", "", false, false, "");
        this.RegisterEvent(604, "Excel - Home - Conditional Formatting - Data Bars - Blue Data bars", "", false, false, "");
        this.RegisterEvent(605, "Excel - Home -> Alignment group -> Orientation -> Angle Counter Clockwise", "", false, false, "");
        this.RegisterEvent(606, "Excel - Home -> Font group -> Bottom Borders -> Outside Border", "", false, false, "");
        this.RegisterEvent(607, "Excel - PageLayout -> ScaleToFit group -> Height -> 1Page", "", false, false, "");
        this.RegisterEvent(608, "Excel - Formula - More Functions - Statistical - COUNT", "Ribbon: COUNT clicked", false, false, "");
        this.RegisterEvent(609, "Excel - PageLayout -> ScaleToFit group -> Height ", "", false, false, "");
        this.RegisterEvent(610, "Excel - HeaderFooterDesign -> Footer -> FileName ", "", false, false, "");
        this.RegisterEvent(611, "Excel - Data -> Outline -> SubTotol ", "", false, false, "");
        this.RegisterEvent(612, "Excel - Data -> Outline -> Group -> AutoOutline", "", false, false, "");
        this.RegisterEvent(613, "Excel - PivotTable Tools Analyze -> Active Field -> Field Settings", "", false, false, "");
        this.RegisterEvent(614, "Excel - PivotTable Tools Analyze -> Filter -> Insert Slicer", "", false, false, "");
        this.RegisterEvent(615, "Excel - PivotTable Tools Analyze -> Data -> Refresh", "", false, false, "");
        this.RegisterEvent(616, "Excel - PivotTable Tools Analyze -> Data -> Refres-All", "", false, false, "");
        this.RegisterEvent(617, "Excel - PivotTable Tools Analyze -> Calculations -> calculte field", "", false, false, "");
        this.RegisterEvent(618, "Excel - Data -> WhatIfAnalysis -> ScenarioManager", "", false, false, "");
        this.RegisterEvent(619, "Excel - Data -> WhatIfAnalysis -> DataTable", "", false, false, "");
        this.RegisterEvent(620, "Excel - SlicerToolsOptions -> Size -> launcher", "", false, false, "");
        this.RegisterEvent(621, "Excel - SlicerToolsOptions -> Size -> height", "", false, false, "");
        this.RegisterEvent(622, "Excel - SlicerToolsOptions -> Buttons -> width", "", false, false, "");
        this.RegisterEvent(623, "Excel - SlicerToolsOptions -> Buttons -> columns", "", false, false, "");
        this.RegisterEvent(624, "Excel - SlicerToolsOptions -> Styles -> Dark1", "", false, false, "");
        this.RegisterEvent(625, "Excel - Data -> Sort&Filter -> Advanced", "", false, false, "");
        this.RegisterEvent(626, "Excel - Formulas -> Financial -> CUMPRINC", "", false, false, "");
        this.RegisterEvent(627, "Excel - Averageif formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(628, "Excel - Recently used - Sumif", "", false, false, "");
        this.RegisterEvent(629, "Excel - Averageifs formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(630, "word-    Picture Formate Tool>Picture Style > [1][5]", "", false, false, "");
        this.RegisterEvent(631, "Word -  Titlebar->Undo->Paragraph alignment", "", false, false, "");
        this.RegisterEvent(632, "Word -  Home->styles->lower paragraph", "", false, false, "");
        this.RegisterEvent(633, "Word -  Titlebar->context menu->Customize quick access toolbar", "", false, false, "");
        this.RegisterEvent(634, "Word -  Home->Font group->Underline->Thick underline", "", false, false, "");
        this.RegisterEvent(635, "Word -  Home->Font group->Text effects and typography->shadow->Outer->Offset Right", "", false, false, "");
        this.RegisterEvent(636, "Word -  Quick Access Toolbar->Undo", "", false, false, "");
        this.RegisterEvent(637, "Word -  Developer->Controls->rich text contend control", "", false, false, "");
        this.RegisterEvent(638, "Word -  Outlining->Master Document->Insert", "", false, false, "");
        this.RegisterEvent(639, "word-   Developer Tab->Controls->Drop-Down List Content Control", "", false, false, "");
        this.RegisterEvent(640, "Word -  myTab>Web->Page Color->Color grid", "", false, false, "");
        this.RegisterEvent(641, "Word -  Home->Clipboard->Paste->Use Destination Theme", "", false, false, "");
        this.RegisterEvent(642, "Word -  Design->->Document Formatting->Themes->Save Current Theme", "", false, false, "");
        this.RegisterEvent(643, "Word -  Insert->Text->TextBox->Austin Quote", "", false, false, "");
        this.RegisterEvent(644, "Word -  View->Windows->View Side by Side", "", false, false, "");
        this.RegisterEvent(645, "Word -  View->Windows->Synchronous Scrolling", "", false, false, "");
        this.RegisterEvent(646, "Word -  Insert->Illustrations->Shapes-> Starts and Banners->Horizontal Scroll", "", false, false, "");

        this.RegisterEvent(647, "Word -  View->Window->Switch Window->1", "", false, false, "");
        this.RegisterEvent(648, "Word -  View->Window->Switch Window->2", "", false, false, "");
        this.RegisterEvent(649, "Word -  Outlining->Master Document->Create", "", false, false, "");
        this.RegisterEvent(650, "Word -  Outlining->Master Document->Show Document", "", false, false, "");
        this.RegisterEvent(651, "Word -  Design>Colors>Customize Colors", "", false, false, "");
        this.RegisterEvent(652, "Word -  Review>Compare>Combine", "", false, false, "");
        this.RegisterEvent(653, "Word -  Page Layout>Page Setup>Columns>One", "", false, false, "");
        this.RegisterEvent(654, "Word -  Page Layout>Page Setup>Columns>Left", "", false, false, "");
        this.RegisterEvent(655, "Word -  Page Layout>Page Setup>Breaks>Continuous", "", false, false, "");

        this.RegisterEvent(656, "Word -  Picture Formate Tool>Picture Effects> Shadow> outer> [2][2]", "", false, false, "");
        this.RegisterEvent(657, "Word - Home - Paragraph - Numbering - Document Numbering - (First)", "", false, false, "");
        this.RegisterEvent(658, "Word - Home - Paragraph - Bullets - Document Bullets - (First)", "", false, false, "");
        this.RegisterEvent(659, "word-    Picture Formate Tool>picture effect > shadow>inner [5][5]", "", false, false, "");

        this.RegisterEvent(660, "word-    Picture Formate Tool>Picture Style > [5][5]", "", false, false, "");

        this.RegisterEvent(661, "word-    picture formate tool>artist effect>marker", "", false, false, "");
        this.RegisterEvent(662, "word-    picture formate tool>artist effect>sketch", "", false, false, "");
        this.RegisterEvent(663, "Word - Home Tab -> Styles -> heading 2 -> modify", "", false, false, "");
        this.RegisterEvent(664, "Word - Home Tab -> Styles -> heading 1 -> Updationg section", "", false, false, "");
        this.RegisterEvent(665, "Word - Insert Tab -> Header & Footer -> Page Number ->Top of Page -> Plain Number 2", "", false, false, "");
        this.RegisterEvent(666, "Word - Design Tab -> Document Formatting -> Themes -> Celestial", "", false, false, "");
        this.RegisterEvent(667, "Word - Insert Tab -> Header & Footer -> Page Number ->Top of Page -> Plain Number 3", "", false, false, "");
        this.RegisterEvent(668, "Word - Developer Tab -> Code -> Visual Basic", "", false, false, "");
        this.RegisterEvent(669, "Word - Developer Tab -> Controls -> Legecy Tools -> Check Box Form Field", "", false, false, "");
        this.RegisterEvent(670, "Word - View Tab -> Macros -> Macros click -> record macro", "", false, false, "");
        this.RegisterEvent(671, "Word - Home Tab -> Font -> Text effects and typography -> shadow -> Offset Diagonal Top Left", "", false, false, "");
        this.RegisterEvent(672, "Word - Developer Tab -> Controls -> Combo box content control", "", false, false, "");
        this.RegisterEvent(673, "Word - View Tab -> Macros -> Macros click -> view macros", "", false, false, "");
        this.RegisterEvent(674, "Word - View Tab -> Macros -> Upper half click", "", false, false, "");
        this.RegisterEvent(675, "Word - Design Tab -> Fonts -> Century Gothic Platino Linotype", "", false, false, "");
        this.RegisterEvent(676, "Word - Developer Tab -> Controls -> Properties", "", false, false, "");
        this.RegisterEvent(677, "Word - Developer Tab -> Controls -> Legecy Tools -> Text Form Field", "", false, false, "");
        this.RegisterEvent(678, "Word - Developer Tab -> Controls -> Design Mode", "", false, false, "");
        this.RegisterEvent(679, "Word - Developer Tab -> Controls -> Date Picker Content Control", "", false, false, "");
        this.RegisterEvent(680, "Word - Table Tools Design -> Table Styles -> List Table 3 - Acent 4", "", false, false, "");
        this.RegisterEvent(681, "Word - Home -> Font -> Font size -> font size 20", "", false, false, "");
        this.RegisterEvent(682, "Word - Mailings -> Preview Results Group -> Preview Results", "", false, false, "");
        this.RegisterEvent(683, "Word - Home -> Styels Group -> More option -> Create a Style", "", false, false, "");
        this.RegisterEvent(684, "Word - Design -> Document Formatting -> Fong -> Calibri Cambria", "", false, false, "");
        this.RegisterEvent(685, "Word Picture Tools Format tab - Color - Recolor - 1st Row 4th Column Washout", "", false, false, "");
        this.RegisterEvent(686, "Word Home tab - Font size - 14", "", false, false, "");
        this.RegisterEvent(687, "Word TABLE TOOLS LAYOUT tab - Rows and Column - Insert Below", "", false, false, "");
        this.RegisterEvent(688, "VIEW tab -  Zoom group - Multiple Pages", "", false, false, "");
        this.RegisterEvent(689, "PAGE LAYOUT tab -  Page Setup group - Margins  - Normal", "", false, false, "");
        this.RegisterEvent(690, "Word mailings - start mail merge - start mail merge - labels", "", false, false, "");
        this.RegisterEvent(691, "TABLE TOOLS DESIGN tab - Table Styles group - More - List Table 4 - Accent 4", "", false, false, "");
        this.RegisterEvent(692, "TABLE TOOLS DESIGN tab -  Table Style Options group -  First Column check box", "", false, false, "");
        this.RegisterEvent(693, "Word home - clipboard - copy", "", false, false, "");
        this.RegisterEvent(694, "Word - titlebar - minimize", "", false, false, "");
        this.RegisterEvent(695, "Word home - font - calibri", "", false, false, "");
        this.RegisterEvent(696, "Word picture tools format - picture styles - Moderate frame white", "", false, false, "");
        this.RegisterEvent(697, "Word picture tools format - picture styles - picture effects - shadow - Offset Diagonal Top Left", "", false, false, "");
        this.RegisterEvent(698, "Word home - font - Change case - uppercase", "", false, false, "");
        this.RegisterEvent(699, "Word design - document formatting - fonts - century gothic", "", false, false, "");
        this.RegisterEvent(700, "Word Table Tools Layout - Rows and Columns - Delete - Delete Row", "", false, false, "");
        this.RegisterEvent(701, "Word Table Tools Layout - Rows and Columns - Insert Right", "", false, false, "");
        this.RegisterEvent(702, "Word Picture Tools Format - Adjust - Change Picture", "", false, false, "");
        this.RegisterEvent(703, "Word Insert - Text - Signature Line - Microsoft Office Signature Line", "", false, false, "");
        this.RegisterEvent(704, "Word Review - Protect - Restrict Editing", "", false, false, "");
        this.RegisterEvent(705, "Word Table Tools Layout - Alignment- Align Top Left", "", false, false, "");
        this.RegisterEvent(706, "Excel - Home - Cell Style - Comma[0]", "", false, false, "");
        this.RegisterEvent(707, "Excel - Chart Tools Design - Chart Styles - Style 7", "", false, false, "");
        this.RegisterEvent(708, "hide sheet", "", false, false, "");
        this.RegisterEvent(709, "unhide sheet", "", false, false, "");
        this.RegisterEvent(710, "Word Table Tools Layout - Alignment- Align Top Left", "", false, false, "");
        this.RegisterEvent(711, "Chart tools design - chart layout - quick layout - Layout 9", "", false, false, "");
        this.RegisterEvent(712, "Word - SMART ART TOOLS FORMAT Tab -> Arrange -> Position-> Bottom Right", "", false, false, "");
        this.RegisterEvent(713, "Word - SMART ART TOOLS FORMAT Tab -> Arrange -> Position-> Top Center", "", false, false, "");

        this.RegisterEvent(714, "Word - SMART ART TOOLS FORMAT Tab -> Shape Styles -> Shape Effects-> Preset -> Preset 7", "", false, false, "");
        this.RegisterEvent(715, "Word -Font Decrease Event -> home -> font group", "", false, false, "");
        this.RegisterEvent(716, "Word -font customize -> design-> documents formating groups> font > customize", "", false, false, "");
        this.RegisterEvent(717, "Word -Dropped clicked  Insert ->text groups> drop cap >dropped clicked", "", false, false, "");
        this.RegisterEvent(718, "Word -book title style  home ->style groups> book title clicked", "", false, false, "");
        this.RegisterEvent(719, "Word -Drop Cap Custom  insert->Text group> drop cap", "", false, false, "");
        this.RegisterEvent(720, "Word -Quick Parts  insert->Text group> QuickPart > save selection to galary", "", false, false, "");
        this.RegisterEvent(721, "Word  horizontal line myTab->horizontal line", "", false, false, "");
        this.RegisterEvent(722, "Word  BookMark myTab->BookMark", "", false, false, "");
        this.RegisterEvent(723, "Word  WebPage preview myTab-WebPage preview", "", false, false, "");
        this.RegisterEvent(724, "Word  custom theme Design-theme", "", false, false, "");
        this.RegisterEvent(725, "Word  Select object Home->style group >select", "", false, false, "");
        this.RegisterEvent(726, "Word  group clicked drawing tool->arrange group >group", "", false, false, "");
        this.RegisterEvent(727, "Word  Publish clicked blog post->publish", "", false, false, "");
        this.RegisterEvent(728, "Word  managed clicked blog post->managed", "", false, false, "");
        this.RegisterEvent(729, "Word  Save selection  to auto text galary clicked  insert >text section->auto text", "", false, false, "");
        this.RegisterEvent(730, "Word  Use destination styles clicked ,Home >Clipboard->paste", "", false, false, "");
        this.RegisterEvent(731, "Word  $th Bullet type  clicked ,Home >paragraph group->bullet library", "", false, false, "");
        this.RegisterEvent(732, "Word  Link & Keep Source Formatting(F)  clicked ,from paste option", "", false, false, "");
        this.RegisterEvent(733, "Word -  Page Layout - Right Indent Spin", "", false, false, "");
        this.RegisterEvent(734, "Word -  Insert Tab Text Box - First Item clicked", "", false, false, "");
        this.RegisterEvent(735, "Word -  Page Layout Tab > Breaks > - Next Line clicked", "", false, false, "");
        this.RegisterEvent(736, "Word -  Picture formate tool>color > Recolor> 3rd row 3rd coll", "", false, false, "");
        this.RegisterEvent(737, "Word -  Picture formate tool>color > galary style> Soft edge oval", "", false, false, "");
        this.RegisterEvent(738, "Word -  TableTools > Design > Table Styles Group > Click More > click List Table 3 - Accent 2 ", "", false, false, "");
        this.RegisterEvent(739, "Word -  SmartArt > style > basic cycle clicked ", "", false, false, "");
        this.RegisterEvent(740, "Word -  SmartArt > style > polished clicked ", "", false, false, "");
        this.RegisterEvent(741, "Word -  Gradient range Acent 2 clicked - smarttool design >style group >color", "", false, false, "");
        this.RegisterEvent(742, "Word -  title clicked from insert merge field", "", false, false, "");
        this.RegisterEvent(743, "Word -  LastName clicked from insert merge field", "", false, false, "");
        this.RegisterEvent(744, "Word -  Double solid line 1/2pt clicked from Table Layout", "", false, false, "");
        this.RegisterEvent(745, "Word -  Home -> Font -> Underline", "", false, false, "");
        this.RegisterEvent(746, "Word -  Mailing -> Insert Merge Field", "", false, false, "");

        this.RegisterEvent(783, "Word -  Review->Comments->Delete arrow->Delete", "", false, false, "");
        this.RegisterEvent(784, "Word -  Home->Font->font size->9", "", false, false, "");
        this.RegisterEvent(785, "Word -  References->Citations & Bibliography->Insert Citation-> The Greening", "", false, false, "");
        this.RegisterEvent(786, "Word -  Review->Comments->Previous", "", false, false, "");
        this.RegisterEvent(787, "Word -  Review->Changes->Accept->Accept and Move to next", "", false, false, "");
        this.RegisterEvent(788, "Word -  Review->Changes->Accept", "", false, false, "");
        this.RegisterEvent(789, "Word -  Page layout->Page setup->columns->Three", "", false, false, "");
        this.RegisterEvent(790, "Word -  SmartArt Tools Design->layouts->more layouts", "", false, false, "");
        this.RegisterEvent(791, "Word -  Drawing Tools Format->shapestyles->shapeeffects->bevel->angle", "", false, false, "");
        this.RegisterEvent(792, "Word -  Drawing Tools Format->wordartstyles->texteffects->transform->Chevron up", "", false, false, "");
        this.RegisterEvent(793, "Word -  Insert->text->wordart->Fill – White, Outline -Accent 2, Hard Shadow - Accent 2", "", false, false, "");
        this.RegisterEvent(794, "Word -  Drawing Tools Format->text->align text->middle", "", false, false, "");
        this.RegisterEvent(795, "Word -  Drawing Tools Format->shape styles->colored fill red acent 2", "", false, false, "");
        this.RegisterEvent(796, "Word -  WordArt Tools Design->Create graphic->Add Shape->Add shape after", "", false, false, "");
        this.RegisterEvent(797, "Word -  WordArt Tools Design->Create graphic->Add Shape", "", false, false, "");
        this.RegisterEvent(798, "Word -  Design->Fonts->Times New Roman- Arial", "", false, false, "");
        this.RegisterEvent(799, "Word -  Design->Themes->Integral", "", false, false, "");
        this.RegisterEvent(800, "Word -  Titlebar->Undo->cancel", "", false, false, "");
        this.RegisterEvent(801, "Excel - Recently used - Sumifs", "", false, false, "");
        this.RegisterEvent(802, "Excel - RANK.AVG formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(803, "Excel - QUARTILE.EXC formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(804, "Excel - STDEV.S formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(805, "Excel - VAR.S formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(806, "Excel - correl formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(807, "Excel - FREQUENCY formula applied from Statistical formulas or Recently used list.", "", false, false, "");
        this.RegisterEvent(808, "Excel - CELL_STYLES - Currecy -Context menu", "", false, false, "");
        this.RegisterEvent(809, "Excel - TitleBar -> App icon Double click", "", false, false, "");
        this.RegisterEvent(810, "Excel - Formula -> Trave Precedents", "", false, false, "");
        this.RegisterEvent(811, "Excel - Formula -> Trave Dependents", "", false, false, "");
        this.RegisterEvent(812, "Excel - Formula -> Remove Arrows", "", false, false, "");
        this.RegisterEvent(813, "Excel - Data -> Data Validation", "", false, false, "");
        this.RegisterEvent(814, "Excel - View -> New Window", "", false, false, "");
        this.RegisterEvent(815, "Excel - View -> Arrange All", "", false, false, "");
        this.RegisterEvent(816, "Excel - Home -> Editing -> fill -> across worksheets", "", false, false, "");
        this.RegisterEvent(817, "Excel - Insert > Links > Hyperlink", "", false, false, "");
        this.RegisterEvent(818, "Excel - HOME -> Font -> Borders arrow -> Top and Double Bottom Border.", "", false, false, "");
        this.RegisterEvent(819, "Excel - Data Tab -> Data Tools -> Text to Columns", "", false, false, "");
        this.RegisterEvent(820, "Excel - Data Tab-> Connections group ->Connections", "", false, false, "");
        this.RegisterEvent(821, "Excel - Data Tab-> Connections group ->Properties", "", false, false, "");
        this.RegisterEvent(822, "Excel - Formula -> Function Library group -> Text -> Substitute", "", false, false, "");
        this.RegisterEvent(823, "Excel - Data -> Get External Data group -> From Access button", "", false, false, "");
        this.RegisterEvent(824, "Excel - Data -> Get External Data group -> From Web button", "", false, false, "");
        this.RegisterEvent(825, "Excel - FORMULAS tab > Formula Auditing group > Watch Window", "", false, false, "");
        this.RegisterEvent(826, "Excel - Formula -> Function Library group -> Text -> Proper", "", false, false, "");
        this.RegisterEvent(827, "Excel - FORMULAS tab > Formula Auditing group > Error Checking", "", false, false, "");
        this.RegisterEvent(828, "Excel - Formulas tab - Look up and Reference - INDEX", "", false, false, "");
        this.RegisterEvent(829, "Excel - PivotTable Tools Design - banded columns", "", false, false, "");
        this.RegisterEvent(830, "Excel - PivotTable Tools Design - gallery - pivot style medium 3", "", false, false, "");
        this.RegisterEvent(831, "Excel - PivotTable Tools Analyze - active field - expand field", "", false, false, "");
        this.RegisterEvent(832, "Excel - PivotTable Tools Analyze - active field - collapse field", "", false, false, "");
        this.RegisterEvent(833, "Excel - Data - Analysis - Data Analysis", "", false, false, "");
        this.RegisterEvent(834, "Excel - Data - Analysis - Solver", "", false, false, "");
        this.RegisterEvent(835, "Excel - Titlebar - Minimize", "", false, false, "");
        this.RegisterEvent(836, "Excel - Titlebar - Close", "", false, false, "");
        this.RegisterEvent(837, "Excel - Data - Properties", "", false, false, "");
        this.RegisterEvent(838, "Excel - Formula - Financial - PV", "", false, false, "");
        this.RegisterEvent(839, "Excel - Insert - PivotChart", "", false, false, "");
        this.RegisterEvent(840, "Excel - PivotChart Analyze - PivotChart", "", false, false, "");
        this.RegisterEvent(841, "Excel - Formulas -> Financial -> CUMIPMT", "", false, false, "");
        this.RegisterEvent(842, "Excel - Formulas -> Financial -> IPMT", "", false, false, "");
        this.RegisterEvent(843, "Excel - Formulas -> Financial -> PPMT", "", false, false, "");
        this.RegisterEvent(844, "Excel - Formulas -> Error Checking -> circular reference -> 1", "", false, false, "");
        this.RegisterEvent(845, "Excel - View -> Window -> Switch Windows -> 1", "", false, false, "");
        this.RegisterEvent(846, "Excel - View -> Window -> Switch Windows -> 2", "", false, false, "");
        this.RegisterEvent(847, "Excel - View -> Window -> Switch Windows -> 3", "", false, false, "");
        this.RegisterEvent(848, "Excel - Review -> Share Workbook", "", false, false, "");
        this.RegisterEvent(849, "Excel - Review -> New\Edit Comment", "", false, false, "");
        this.RegisterEvent(850, "Excel - Review -> Highlight Changes", "", false, false, "");
        this.RegisterEvent(851, "Excel - Review -> Accept/Reject Changes", "", false, false, "");
        this.RegisterEvent(852, "Excel - Page Layout > Themes > Basis", "", false, false, "");
        this.RegisterEvent(853, "Excel - Insert > Text > Signature Line", "", false, false, "");
        this.RegisterEvent(854, "Excel - Developer > Code > Visual Basic", "", false, false, "");
        this.RegisterEvent(855, "Excel - Developer > Code > Macros", "", false, false, "");
        this.RegisterEvent(856, "Excel - Developer > Code > Record Macro", "", false, false, "");
        this.RegisterEvent(857, "Excel - View > Macro > Macro", "", false, false, "");
        this.RegisterEvent(858, "Excel - Developer > Code > View Code", "", false, false, "");
        this.RegisterEvent(859, "Excel - Home > Cells > Format > protect sheet", "", false, false, "");
        this.RegisterEvent(860, "Excel - Review > Changes > Allow Users to edit ranges", "", false, false, "");
        this.RegisterEvent(861, "Excel - Home tab -> Cells group -> Format -> Lock Cell", "", false, false, "");
        this.RegisterEvent(862, "Excel -  page layout -> page set up -> background", "", false, false, "");
        this.RegisterEvent(863, "Excel -  Titlebar -> compare and merge workbooks", "", false, false, "");
        this.RegisterEvent(864, "Excel -  Home tab -> Font group -> Borders -> Top and Bottom border", "", false, false, "");
        this.RegisterEvent(865, "Excel -  Home tab -> Cell Styles -> input", "", false, false, "");
        this.RegisterEvent(866, "Excel -  Home tab -> Cell Styles -> 20% accent 6", "", false, false, "");
        this.RegisterEvent(867, "Excel -  Insert tab -> Illustrations  -> Pictures", "", false, false, "");
        this.RegisterEvent(868, "Excel -  Insert tab -> Text  -> Text Box", "", false, false, "");
        this.RegisterEvent(869, "Excel -  Home-tab -> Alignment  -> Orientation ->Angle Clockwise ", "", false, false, "");
        this.RegisterEvent(870, "Excel -  Home-tab -> Paste  -> Formatting ", "", false, false, "");
        this.RegisterEvent(871, "Excel - Home - Styles - Conditional Formattting - Top Bottom Rules - Bottom 10 items", "", false, false, "");
        this.RegisterEvent(872, "Excel - Page Layout- Sheet options - Gridlines - View", "", false, false, "");
        this.RegisterEvent(873, "Excel -Home - Font -Border-All border", "", false, false, "");
        this.RegisterEvent(874, "Excel -Home - Font -Border- Thick bottom border", "", false, false, "");
        this.RegisterEvent(875, "Excel -Home - Editing- Find & Select-Go To", "", false, false, "");
        this.RegisterEvent(876, "Excel -Home - Clipboard- Paste-Transpose", "", false, false, "");
        this.RegisterEvent(877, "Excel -Home - Clipboard- Paste-Values", "", false, false, "");
        this.RegisterEvent(878, "PAGE LAYOUT-Page Setup -Margins button -Narrow.", "", false, false, "");
        this.RegisterEvent(879, "PAGE LAYOUT-Page Setup -Margins button -Custom margins", "", false, false, "");
        this.RegisterEvent(880, "PAGE LAYOUT -Scale to Fit- Width arrow -1 page.", "", false, false, "");
        this.RegisterEvent(881, "Excel - Header and Footer Tools - Header and Footer Elements - Page Number", "", false, false, "");
        this.RegisterEvent(882, "Excel - Header and Footer Tools - Header and Footer Elements - Number Of Pages", "", false, false, "");
        this.RegisterEvent(883, "Excel - Header and Footer Tools - Header and Footer Elements - Current Data", "", false, false, "");
        this.RegisterEvent(884, "Excel - Header and Footer Tools - Header and Footer Elements - Current Time", "", false, false, "");
        this.RegisterEvent(885, "Excel - Header and Footer Tools - Header and Footer Elements - File Path", "", false, false, "");
        this.RegisterEvent(886, "Excel - Header and Footer Tools - Header and Footer Elements - Sheet Name", "", false, false, "");
        this.RegisterEvent(887, "Excel - Header and Footer Tools - Header and Footer Elements - Picture", "", false, false, "");
        this.RegisterEvent(888, "Excel - Developer - Insert - Button", "", false, false, "");
        this.RegisterEvent(889, "Excel - Page Layout > Themes > Metropolitan", "", false, false, "");
        this.RegisterEvent(890, "Excel - Page Layout > Themes > Parallax", "", false, false, "");
        this.RegisterEvent(891, "Excel - CELL_STYLES - Heading4 -Context menu", "", false, false, "");
        this.RegisterEvent(892, "Excel - CELL_STYLES - Total -Context menu", "", false, false, "");
        this.RegisterEvent(893, "Excel - CELL_STYLES - 20%-Acent2 -Context menu", "", false, false, "");
        this.RegisterEvent(894, "Excel - Header and Footer Tools - Header and Footer  - Footer  listitem no 6", "", false, false, "");
        this.RegisterEvent(895, "Excel -  Picture formate tool  Arrange  Align  Snap to Grid", "", false, false, "");
        this.RegisterEvent(896, "Excel - Header and Footer Design - Navigation -  Go To header", "", false, false, "");
        this.RegisterEvent(897, "hide rows", "", false, false, "");
        this.RegisterEvent(898, "Excel -  FORMULAS - Defined names - Apply names..", "", false, false, "");
        this.RegisterEvent(899, "Excel - FORMULAS - Defined names - create from selection", "", false, false, "");
        this.RegisterEvent(900, "Excel - Chart - combo charts -  Clustered Column - Line on Secondary Axis", "", false, false, "");
        this.RegisterEvent(901, "Excel - Chart - Chart Gridline Primary Major Vertical", "", false, false, "");
        this.RegisterEvent(902, "Excel - MATHS & TRIG - Abs", "", false, false, "");
        this.RegisterEvent(903, "Excel - MATHS & TRIG - Int", "", false, false, "");
        this.RegisterEvent(904, "Excel - Chart - Chart Styles style 7", "", false, false, "");
        this.RegisterEvent(905, "Excel - Chart Tools Design - Data - Switch Row/Column", "", false, false, "");
        this.RegisterEvent(906, "Excel - Chart - Chart Axis Title Primary Horizontal", "", false, false, "");
        this.RegisterEvent(907, "Excel - Chart - Chart Axis Title Secondary Vertical", "", false, false, "");
        this.RegisterEvent(908, "Excel - Insert - Chart - Insert chart", "", false, false, "");
        this.RegisterEvent(909, "Excel - Picture Tools Format - Size  Height", "", false, false, "");
        this.RegisterEvent(910, "Excel - Picture Tools Format - Arrange  Rotate  More Rotation Options", "", false, false, "");
        this.RegisterEvent(911, "Excel - Insert - Shape  Rounded Rectangle", "", false, false, "");
        this.RegisterEvent(912, "Excel - ChartTool Design -Styles -Accent2_Darker 50", "", false, false, "");
        this.RegisterEvent(913, "Excel - HOME tab>Styles group->Conditional Formatting->point to Data Bars-> Green Data Bar", "", false, false, "");
        this.RegisterEvent(914, "Excel - ChartTool Design -Styles -Change Colors Color4", "", false, false, "");
        this.RegisterEvent(915, "Excel - Chart Tools Design - Chart layouts - Trendline -Linear ", "", false, false, "");
        this.RegisterEvent(916, "Excel - Chart Tools Design - Chart layouts - Trendline -More Trendline Options.. ", "", false, false, "");
        this.RegisterEvent(917, "Excel - Insert Tab -> Charts Group -> Insert bar chart ->Stacked Bar", "", false, false, "");
        this.RegisterEvent(918, "Excel - CHART Tools Format Tab -> Shape Styles Group ->Shape Fill Arrow -> No Fill ", "", false, false, "");
        this.RegisterEvent(919, "Excel - CHART Tools Format Tab -> Shape Styles Group ->Shape Outline Arrow -> No Outline", "", false, false, "");
        this.RegisterEvent(920, "Alignment_Bottom", "", false, false, "");
        this.RegisterEvent(921, "Excel -HOME ->Styles Group ->Conditional formatting ->Clear Rule-> Clear Rule from selected cells", "", false, false, "");
        this.RegisterEvent(922, "Excel - Formula - Use in Formula - BasketSubtotals", "", false, false, "");
        this.RegisterEvent(923, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Series Total Revenue", "", false, false, "");
        this.RegisterEvent(924, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Horizontal (Value) Axis", "", false, false, "");
        this.RegisterEvent(925, "Excel - Home - Styles - Less Than..", "", false, false, "");
        this.RegisterEvent(926, "Excel -Chart Tools Design Tab - Add Chart Element - Legend - Right", "", false, false, "");
        this.RegisterEvent(927, "Excel -Chart Tools Format Tab - Chart Elements - Legend", "", false, false, "");
        this.RegisterEvent(928, "Excel -Chart Tools Design Tab > Add Chart Element > Data Label > Data Callout ", "", false, false, "");
        this.RegisterEvent(929, "Excel -FORMULAS Tab >Functional Librrary > Text > Left ", "", false, false, "");
        this.RegisterEvent(930, "Excel -FORMULAS Tab >Functional Librrary >More Functions> MODE.SGNL ", "", false, false, "");
        this.RegisterEvent(931, "Excel - Formulas Tab - Error Checking - Trace Error", "", false, false, "");
        this.RegisterEvent(932, "Excel - Home tab -> Styles group -> Cells Styles -> Data and Model -> Note", "", false, false, "");
        this.RegisterEvent(933, "Excel - Data tab -data tool group -data validation arrow -Circle invalid data", "", false, false, "");
        this.RegisterEvent(934, "Excel - Page Layout Tab - Themes group- Themes-Ion", "", false, false, "");
        this.RegisterEvent(935, "Excel - Home Tab - Styles group -Format as Table - New Table Style", "", false, false, "");
        this.RegisterEvent(936, "Excel - Home Tab - Font - Fill Color", "", false, false, "");
        this.RegisterEvent(937, "Excel - Home Tab - Editing -> Find & Select -> Go to Special", "", false, false, "");
        this.RegisterEvent(938, "Excel - Home Tab - Sort and Filter -> Clear", "", false, false, "");
        this.RegisterEvent(939, "Excel - Page Layout Tab - Themes -> Fonts -> Calibri", "", false, false, "");
        this.RegisterEvent(940, "Excel - Title Bar - Undo", "", false, false, "");
        this.RegisterEvent(941, "Excel - Home Tab - Paste ->Paste Link", "", false, false, "");
        this.RegisterEvent(942, "Excel - Home Tab - Paste ->Picture", "", false, false, "");
        this.RegisterEvent(943, "Excel - Home Tab - Paste ->Linked Picture", "", false, false, "");
        this.RegisterEvent(944, "Excel - CHART TOOLS DESIGN -Chart Layouts -Add Chart Element-Data Labels-click Best Fit.", "", false, false, "");
        this.RegisterEvent(945, "Excel -FORMULAS Tab >Defined Names >Use in Formula ", "", false, false, "");
        this.RegisterEvent(946, "Excel - PageLayout >> ScaleToFit >> Width >> 2 Pages", "", false, false, "");
        this.RegisterEvent(947, "Excel - PageLayout >> ScaleToFit >> Height >> 2 Pages", "", false, false, "");
        this.RegisterEvent(948, "Excel -  Insert tab -> Charts  -> Insert Line Chart -> 2-D Line -> Line", "", false, false, "");
        this.RegisterEvent(949, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Horizontal (Category) Axis", "", false, false, "");
        this.RegisterEvent(950, "Excel - INSERT - Text - Word Art: Fill – Black, Text 1, Outline – Background 1, Hard Shadow – Background 1", "", false, false, "");
        this.RegisterEvent(951, "Excel - Picture Tools Format - Picture Styles - Bevel Rectangle", "", false, false, "");
        this.RegisterEvent(952, "Excel - Sparkline Tools Design - Show - Last Point", "", false, false, "");
        this.RegisterEvent(953, "Excel - Sparkline Tools Design - Style - More - Sparkline Style Accent 1, (no dark or light)", "", false, false, "");
        this.RegisterEvent(954, "Excel - Smartart Tools Design - Create Graphic - Text Pane", "", false, false, "");
        this.RegisterEvent(955, "Excel - Smartart Tools Format- Shape Effects - Bevel - Riblet", "", false, false, "");
        this.RegisterEvent(956, "Excel - Chart Tools Design -  Chart Layouts - Add Chart Element - Axis Titles - Primary Vertical", "", false, false, "");
        this.RegisterEvent(957, "Excel - Drawing Tools Format->shape styles->Shape Fill->Texture->Stationery", "", false, false, "");
        this.RegisterEvent(958, "Excel - Insert -> Illustrations ->Insert a SmartArt Graphic", "", false, false, "");
        this.RegisterEvent(959, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Plot Area", "", false, false, "");
        this.RegisterEvent(960, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Series ''Dallas''", "", false, false, "");
        this.RegisterEvent(961, "Excel - Smartart Tools Design - Change Colors - Colorful - Colorful Range - Accent Colors 3 to 4", "", false, false, "");
        this.RegisterEvent(962, "Excel - Smartart Tools Design - Smartart Styles - 3D- Polished", "", false, false, "");
        this.RegisterEvent(963, "Excel - Smartart Tools Format - Shape Styles - Shape Fill", "", false, false, "");
        this.RegisterEvent(964, "Word - Table Tools Layout Data group Convert to Text", "", false, false, "");
        this.RegisterEvent(965, "PIVOT Chart Analyze Field List", "", false, false, "");
        this.RegisterEvent(966, "PIVOT TABLES Analyze Field List", "", false, false, "");
        this.RegisterEvent(967, "INSERT Reports Power View", "", false, false, "");
        this.RegisterEvent(968, "Pivot Tools Analyze Tab -> Pivot Table Group -> Options -> Show Report filter pages", "", false, false, "");
        this.RegisterEvent(969, "SLICER TOOLS OPTIONS ->Slicer Styles ->Slicer Style Dark 2", "", false, false, "");
        this.RegisterEvent(970, "Excel - Drawing Tools Format->shape effect->Preset->3-D Options", "", false, false, "");
        this.RegisterEvent(971, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Back Wall", "", false, false, "");
        this.RegisterEvent(972, "Excel - Chart Tool Format - Current Seelction - Chart Elements -Floor", "", false, false, "");
        this.RegisterEvent(973, "Excel - Drawing Tools Format-> shape effect -> Bevel -> 3-D Options", "", false, false, "");
        this.RegisterEvent(974, "Excel - Drawing Tools Format-> shape effect -> Shadow -> Shadow Options", "", false, false, "");
        this.RegisterEvent(975, "Excel - Drawing Tools Format-> shape effect -> Soft Edges Effects -> Soft Edges Options", "", false, false, "");
        this.RegisterEvent(976, "Excel - Drawing Tools Format-> shape effect -> Reflection -> Reflection Options", "", false, false, "");
        this.RegisterEvent(977, "Excel - Drawing Tools Format-> shape effect -> 3-D Rotation -> 3-D Rotation Options", "", false, false, "");
        this.RegisterEvent(978, "Excel - Drawing Tools Format-> shape effect -> Glow -> Glow Options", "", false, false, "");
        this.RegisterEvent(979, "Excel - Drawing Tools Format-> Text Effects -> 3-D Rotation -> 3-D Rotation Options", "", false, false, "");
        this.RegisterEvent(980, "Excel - Drawing Tools Format-> Text Outline -> Weight -> More Lines", "", false, false, "");
        this.RegisterEvent(981, "Excel - Drawing Tools Format-> Text Outline -> Dashes -> More Lines", "", false, false, "");
        this.RegisterEvent(982, "Excel - Drawing Tools Format-> Shape Outline -> Weight -> More Lines", "", false, false, "");
        this.RegisterEvent(983, "Excel - Drawing Tools Format-> Shape Outline -> Dashes -> More Lines", "", false, false, "");
        this.RegisterEvent(984, "Excel - Drawing Tools Format-> Text effect -> Bevel -> 3-D Options", "", false, false, "");
        this.RegisterEvent(985, "Excel - Design-> Switch Visualization -> Column Chart -> Stacked Column", "", false, false, "");
        this.RegisterEvent(986, "Excel - Design-> Switch Visualization -> Other Chart -> Pie", "", false, false, "");
        this.RegisterEvent(987, "Excel - Design-> Switch Visualization -> Map", "", false, false, "");
        this.RegisterEvent(988, "Excel - Power View-> Themes -> Text Size -> 75%", "", false, false, "");
        this.RegisterEvent(989, "Excel - Power View-> Themes -> Background -> Light1 Center Gradient", "", false, false, "");
        this.RegisterEvent(990, "Excel - Smartart Tools Format - Shape Styles - Shape Outline - Weight - More Lines", "", false, false, "");
        this.RegisterEvent(991, "Excel - Smartart Tools Format - Shape Styles - Shape Outline - Dashes - More Lines", "", false, false, "");
        this.RegisterEvent(992, "Excel - Smartart Tools Format - Shape Styles - Shape Fill - Gradient - More Gradients", "", false, false, "");
        this.RegisterEvent(993, "Excel - Smartart Tools Format - Shape Styles - Shape Fill - Texture - More Textures", "", false, false, "");
        this.RegisterEvent(994, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - Preset - 3D Options", "", false, false, "");
        this.RegisterEvent(995, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - Bevel - 3D Options", "", false, false, "");
        this.RegisterEvent(996, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - Shadow - Shadow Options", "", false, false, "");
        this.RegisterEvent(997, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - Reflection - Reflection Options", "", false, false, "");
        this.RegisterEvent(998, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - Glow - Glow Options", "", false, false, "");
        this.RegisterEvent(999, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - Soft Edges - Soft Edges Options", "", false, false, "");
        this.RegisterEvent(1000, "Excel - Smartart Tools Format - Shape Styles - Shape Effects - 3D Rotation - 3D Rotation Options", "", false, false, "");
        this.RegisterEvent(1001, "Excel - INSERT -> Filters -> Slicer", "", false, false, "");
        this.RegisterEvent(1002, "Power Pivot - HOME -> Get External Data -> From Access", "", false, false, "");
        this.RegisterEvent(1003, "Power Pivot- HOME -> Get External Data -> From Other Sources", "", false, false, "");
        this.RegisterEvent(1004, "Power Pivot - HOME -> PIVOT TABLE -> Pivot Table", "", false, false, "");
        this.RegisterEvent(1005, "Excel - Page Layout Tab - Arrange - Rotate - More Rotation Options", "", false, false, "");
        this.RegisterEvent(1006, "Excel - PowerPivot - Manage", "", false, false, "");
        this.RegisterEvent(1007, "Excel - Formulas Tab - HLOOKUP", "", false, false, "");
        this.RegisterEvent(1008, "Excel - Formulas Tab - Text- Right", "", false, false, "");
        this.RegisterEvent(1009, "Excel - Formulas Tab - Text- Upper", "", false, false, "");
        this.RegisterEvent(1010, "Excel - Formulas Tab - Text- Concatenate", "", false, false, "");
        this.RegisterEvent(1011, "Excel - Table Tools Design Tab - Table Styles- Table Style Medium 11", "", false, false, "");
        this.RegisterEvent(1012, "Excel - Data -> Get External Data group -> From Text button", "", false, false, "");
        this.RegisterEvent(1013, "Excel - Data Tab -> Data Tools -> Remove Duplicates", "", false, false, "");
        this.RegisterEvent(1014, "Excel - Formulas Tab - MATCH", "", false, false, "");
        this.RegisterEvent(1015, "Excel - Data -> Get External Data group -> From Other Sources- From Microsoft Query", "", false, false, "");
        this.RegisterEvent(1016, "Excel - Formulas Tab -Use in Formula - Option4", "", false, false, "");
        this.RegisterEvent(1017, "Excel - Formulas Tab -Use in Formula - Paste Items", "", false, false, "");
        this.RegisterEvent(1018, "Excel - Home Tab - Styles group - Conditional Formatting - Icon Sets - 3 Arrows (Colored)", "", false, false, "");
        this.RegisterEvent(1019, "Excel - Picture Tools Format  - Adjust- Color- Picture Color Options", "", false, false, "");
        this.RegisterEvent(1020, "Excel - Picture Tools Format  - Adjust- Corrections- Picture Corrections Options", "", false, false, "");
        this.RegisterEvent(1021, "Excel - Picture Tools Format  - Picture Styles- Picture Border - Weight- More Lines", "", false, false, "");
        this.RegisterEvent(1022, "Excel - Picture Tools Format  - Picture Styles- Picture Border - Dashes- More Lines", "", false, false, "");
        this.RegisterEvent(1023, "Excel - Insert Tab  - Illustrations- Screenshot- Available Windows", "", false, false, "");
        this.RegisterEvent(1024, "Excel - Data -> Get External Data group -> From Other Source -> From XML Source", "", false, false, "");
        this.RegisterEvent(1025, "Power View - Design - Columns - Add", "", false, false, "");
        this.RegisterEvent(1026, "Power View - Home - PivotTable", "", false, false, "");
        this.RegisterEvent(1027, "Power View - Home  - PivotChart", "", false, false, "");
        this.RegisterEvent(1028, "Excel - Slicer Tools Options -> Slicer Settings", "", false, false, "");
        this.RegisterEvent(1029, "Excel - Insert -> Symbols  -> Symbol", "", false, false, "");
        this.RegisterEvent(1030, "Excel - Developer -> Controls  -> Properties", "", false, false, "");
        this.RegisterEvent(1031, "Pivot Tools Analyze Tab -> Group -> Group Selection", "", false, false, "");
        this.RegisterEvent(1032, "Review Tab -> Changes Group -> Protect Workbook", "", false, false, "");
        this.RegisterEvent(1033, "PivotTable Tools Design Tab -> Layout Group -> Subtotals dropdown-> 1st", "", false, false, "");
        this.RegisterEvent(1034, "PivotTable Tools Design Tab -> Layout Group -> Subtotals dropdown-> 2nd", "", false, false, "");
        this.RegisterEvent(1035, "PivotTable Tools Design Tab -> Layout Group -> Subtotals dropdown-> 3rd", "", false, false, "");
        this.RegisterEvent(1036, "PivotTable Tools Design Tab -> Layout Group -> Subtotals dropdown-> 4th", "", false, false, "");
        this.RegisterEvent(1037, "PivotTable Tools Design Tab -> Layout Group -> Report Layout dropdown-> 1st", "", false, false, "");
        this.RegisterEvent(1038, "PivotTable Tools Design Tab -> Layout Group -> Report Layout dropdown-> 2nd", "", false, false, "");
        this.RegisterEvent(1039, "PivotTable Tools Design Tab -> Layout Group -> Report Layout dropdown-> 3rd", "", false, false, "");
        this.RegisterEvent(1040, "PivotTable Tools Design Tab -> Layout Group -> Report Layout dropdown-> 4th", "", false, false, "");
        this.RegisterEvent(1041, "PivotTable Tools Design Tab -> Layout Group -> Report Layout dropdown-> 5th", "", false, false, "");
        this.RegisterEvent(1042, "Developer Tab -> Macro Security", "", false, false, "");
        this.RegisterEvent(1043, "Developer Tab -> Controls -> Insert -> Checkbox", "", false, false, "");
        this.RegisterEvent(1044, "Formula Tab -> Function Library -> Math & Triag -> Subtotal", "", false, false, "");
        this.RegisterEvent(1045, "Table Tools Design Tab -> Properties -> Table1 text box", "", false, false, "");
        this.RegisterEvent(1046, "Slicer Tools Options Tab -> Slicer -> Customer type text box", "", false, false, "");
        this.RegisterEvent(1047, "PivotTable Tools Analyze Tab -> Pivot table -> Options dropdown -> Options", "", false, false, "");
        this.RegisterEvent(1048, "PivotTable Tools Analyze Tab -> Pivot table -> Options", "", false, false, "");
        this.RegisterEvent(1049, "PivotTable Tools Design Tab -> PivotTable Style Options -> Banded Rows check box", "", false, false, "");
        this.RegisterEvent(1050, "PivotChart Tools Design Tab -> Chart Styles -> Change colors dropdown -> Color 2", "", false, false, "");
        this.RegisterEvent(1051, "Table Tools Design Tab -> Tools -> Summarize with PivotTable", "", false, false, "");
        this.RegisterEvent(1052, "DEVELOPER Tab -> Controls -> Insert arrow -> ActiveX control -> Command ", "", false, false, "");
        this.RegisterEvent(1053, "DEVELOPER Tab -> Controls -> Insert arrow -> ActiveX control -> Check Box ", "", false, false, "");
        this.RegisterEvent(1054, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - Preset- Options", "", false, false, "");
        this.RegisterEvent(1055, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - Shadow- Options", "", false, false, "");
        this.RegisterEvent(1056, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - Reflection- Options", "", false, false, "");
        this.RegisterEvent(1057, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - Glow- More Options", "", false, false, "");
        this.RegisterEvent(1058, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - Soft Edges- Options", "", false, false, "");
        this.RegisterEvent(1059, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - Bevel- Options", "", false, false, "");
        this.RegisterEvent(1060, "Excel - Picture Tools Format  - Picture Styles- Picture Effect - 3 D Rotation- Options", "", false, false, "");
        this.RegisterEvent(1061, "Power Pivot- HOME -> PivotTable group -> PivotTable arrow -> click Four Charts", "", false, false, "");
        this.RegisterEvent(1062, "PivotChart Tools Analyze Tab -> PivotChart group -> Chart Name box", "", false, false, "");
        this.RegisterEvent(1063, "Design -> Switch Visualization -> Column Chart -> Clustered Column", "", false, false, "");
        this.RegisterEvent(1064, "Power Pivot- HOME -> Calculations group -> Create KPI", "", false, false, "");
        this.RegisterEvent(1065, "PowerView -> Themes -> Themes -> Hardcover", "", false, false, "");
        this.RegisterEvent(1066, "PowerView -> Themes -> Background -> Dark 1 Vertical Gradient", "", false, false, "");
        this.RegisterEvent(1067, "PIVORTCHART Tools Analyze tab -> Show/Hide group -> Field Buttons", "", false, false, "");
        this.RegisterEvent(1068, "Design -> Switch Visualization -> Bar Chart -> Clustered Column", "", false, false, "");
        this.RegisterEvent(1069, "PowerView -> View -> Field List", "", false, false, "");
        this.RegisterEvent(1070, "Power Pivot -> Home tab -> Formatting group -> Format: General arrow -> Currency", "", false, false, "");
        this.RegisterEvent(1071, "Design -> Slicer -> Slicer", "", false, false, "");
        this.RegisterEvent(1072, "INSERT tab -> Apps group -> Store", "", false, false, "");
        this.RegisterEvent(1073, "Power Pivot -> Home tab -> View -> data view", "", false, false, "");
        this.RegisterEvent(1074, "Power Pivot -> Home tab -> View -> diagram view", "", false, false, "");
        this.RegisterEvent(1075, "PowerView -> View -> Filters Area", "", false, false, "");
        this.RegisterEvent(1076, "Power Pivot tab -> Tables -> Add to data model", "", false, false, "");
        this.RegisterEvent(1077, "Power Pivot -> Design tab -> Relationships -> Create Realationship", "", false, false, "");
        this.RegisterEvent(1078, "Formulas tab -> Function Library Group -> Financial -> DB", "", false, false, "");
        this.RegisterEvent(1079, "Formulas tab -> Function Library Group -> Financial -> DDB", "", false, false, "");
        this.RegisterEvent(1080, "Formulas tab -> Function Library Group -> Financial -> RATE", "", false, false, "");
        this.RegisterEvent(1081, "Formulas tab -> Function Library Group -> Financial -> NPV", "", false, false, "");
        this.RegisterEvent(1082, "Formulas tab -> Function Library Group -> Financial -> XIRR", "", false, false, "");
        this.RegisterEvent(1083, "Formulas tab -> Function Library Group -> Financial -> FV", "", false, false, "");
        this.RegisterEvent(1084, "Formulas tab -> Function Library Group -> Financial -> SLN", "", false, false, "");
        this.RegisterEvent(1085, "PIVORTCHART Tools Analyze tab -> Filter group -> Insert Slicer", "", false, false, "");
        this.RegisterEvent(1086, "Formulas tab -> Function Library Group -> Financial -> NPER", "", false, false, "");
        this.RegisterEvent(1087, "Formulas tab -> Function Library Group -> Financial -> IRR", "", false, false, "");
        this.RegisterEvent(1088, "Formulas tab -> Function Library Group -> Financial -> XNPV", "", false, false, "");        
        this.RegisterEvent(1089, "Formulas tab -> Function Library Group -> More Functions --> Statistical -> NORM.DIST", "", false, false, ""); 
        this.RegisterEvent(1090, "Formulas tab -> Function Library Group -> Math & Trig -> RAND", "", false, false, "");        
        this.RegisterEvent(1091, "Formulas tab -> Function Library Group -> More Functions --> Statistical -> COVARIANCE.S", "", false, false, ""); 
        this.RegisterEvent(1092, "Formulas tab -> Function Library Group -> More Functions --> Statistical -> EXPON.DIST", "", false, false, "");
        this.RegisterEvent(1093, "Fire event on TAB click", "", false, false, "");
        this.RegisterEvent(1094, "Ribbon collapse event", "", false, false, "");
        this.RegisterEvent(1095, "Formulas tab -> Function Library Group -> More Functions --> Statistical -> BINOM.DIST", "", false, false, "");
        this.RegisterEvent(1096, "Slicer Tools Options -> Slicer group  -> Report Connections", "", false, false, "");
        this.RegisterEvent(1097, "View tab -> Show Group -> Headings", "", false, false, "");
        this.RegisterEvent(1098, "Insert tab-> Charts group-> Insert Scatter (X,Y) or Bubble Chart-> Scatter with Smooth Lines", "", false, false, "");
        this.RegisterEvent(1099, "Formulas tab -> Function Library group -> More Functions -> Statistical -> HYPGEOM.DIST", "", false, false, "");
        this.RegisterEvent(1100, "Formulas tab -> Function Library group -> More Functions -> Statistical -> POISSON.DIST", "", false, false, "");
        this.RegisterEvent(1101, "Picture tools format tab -> Adjust -> Change Picture", "", false, false, "");
        this.RegisterEvent(1102, "Developer tab -> Code Group -> Use Relative References", "", false, false, "");
        this.RegisterEvent(1103, "View tab -> Window Group -> Switch Windows -> Option 1", "", false, false, "");
        this.RegisterEvent(1104, "View tab -> Window Group -> Switch Windows -> Option 2", "", false, false, "");
        this.RegisterEvent(1105, "Formulas tab -> Formula Auditing -> Evaluate Formula", "", false, false, "");
        this.RegisterEvent(1106, "Data tab -> Data Tools -> Consolidate", "", false, false, "");
        this.RegisterEvent(1107, "Formulas Tab -> Function Library Group -> Text -> LEN", "", false, false, "");
        this.RegisterEvent(1108, "Formulas Tab -> Function Library Group -> Date & Time -> DATE", "", false, false, "");
        this.RegisterEvent(1109, "Formulas Tab -> Function Library Group -> Text -> FIND", "", false, false, "");
        this.RegisterEvent(1110, "Formulas Tab -> Function Library Group -> Text -> TRIM", "", false, false, "");
        this.RegisterEvent(1111, "HOME tab -> Styles group -> Conditional Formatting -> Highlight Cells Rules -> Duplicate Values", "", false, false, "");
        this.RegisterEvent(1112, "Formulas Tab -> Function Library Group -> Date & Time -> DATEVALUE", "", false, false, "");
        this.RegisterEvent(1113, "INSERT tab -> Apps group -> My Apps", "", false, false, "");
        this.RegisterEvent(1114, "INSERT tab -> Apps group -> My Apps arrow -> See All", "", false, false, "");
        this.RegisterEvent(1115, "INSERT tab -> Apps group -> My Apps arrow -> Bing Maps", "", false, false, "");
        this.RegisterEvent(1116, "PIVOTCHART_TOOLS_ANALYSE tab -> Show/Hide group -> Field Buttons arrow -> show report", "", false, false, "");
        this.RegisterEvent(1117, "PIVOTCHART_TOOLS_ANALYSE tab -> Show/Hide group -> Field Buttons arrow -> show legend", "", false, false, "");
        this.RegisterEvent(1118, "PIVOTCHART_TOOLS_ANALYSE tab -> Show/Hide group -> Field Buttons arrow -> show axis", "", false, false, "");
        this.RegisterEvent(1119, "PIVOTCHART_TOOLS_ANALYSE tab -> Show/Hide group -> Field Buttons arrow -> show value", "", false, false, "");
        this.RegisterEvent(1120, "PIVOTCHART_TOOLS_ANALYSE tab -> Show/Hide group -> Field Buttons arrow -> hide all", "", false, false, "");
        this.RegisterEvent(1121, "Home Tab -> Style -> Conditional Formatting -> Highlight Cell Rules -> Greater than", "", false, false, "");
        this.RegisterEvent(1122, "Developer Tab -> Control Group -> Insert -> Form Control -> Scroll bar control", "", false, false, "");
        this.RegisterEvent(1123, "FORMULAS tab -> Function Library group -> Text -> MID", "", false, false, "");
        this.RegisterEvent(1124, "FORMULAS tab -> Function Library group -> date and time -> NETWORKDAYS", "", false, false, "");
        this.RegisterEvent(1125, "FORMULAS tab -> Function Library group -> Text -> REPLACE", "", false, false, "");
        this.RegisterEvent(1126, "Excel - Insert Tab -> Charts Group -> Insert bar chart ->3-D Clustured Bar", "", false, false, "");
        this.RegisterEvent(1127, "FORMULAS tab -> Formula Auditing -> Remove Arrows -> Remove Precedent Arrows", "", false, false, "");
        this.RegisterEvent(1128, "FORMULAS tab -> Formula Auditing  -> Remove Arrows -> Remove Dependent Arrows", "", false, false, "");
        this.RegisterEvent(1129, "FORMULAS tab -> Function Library group -> Text -> TEXT", "", false, false, "");
        this.RegisterEvent(1130, "DEVELOPER tab -> XML group -> Text -> Source", "", false, false, "");
        this.RegisterEvent(1131, "View tab -> Macros group -> Macros -> Use Relative References", "", false, false, "");
        this.RegisterEvent(1132, "TABLE TOOLS DESIGN -> External Table Data -> Refresh", "", false, false, "");
        this.RegisterEvent(1133, "DEVELOPER tab -> Controls -> Insert -> Spin Button (Form Control)", "", false, false, "");
        this.RegisterEvent(1134, "TABLE TOOLS DESIGN -> External Table Data -> Refresh drop[down -> Refresh All", "", false, false, "");
        this.RegisterEvent(1135, "Word - MailingsTab - Create group-Labels clicked", "", false, false, "");
        this.RegisterEvent(1136, "HOME -> Font -> Increase Font Size", "", false, false, "");
        this.RegisterEvent(1137, "TITLEBAR -> QAT -> Save", "", false, false, "");
        this.RegisterEvent(1138, "Powerpivot ribbon Home -> Formatting -> Appy Currency Format -> English United States", "", false, false, "");
        this.RegisterEvent(1139, "Powerpivot ribbon Home -> Formatting -> Appy Currency Format -> More Formats", "", false, false, "");
        this.RegisterEvent(1140, "TABLE TOOLS DESIGN -> Tools -> Insert Slicer", "", false, false, "");
        this.RegisterEvent(1141, "Excel -> Styles -> Cell Styles -> Accent 1 Context menu", "", false, false, "");
        this.RegisterEvent(1142, "Excel -> Styles -> Cell Styles -> Heading 2 Context menu", "", false, false, "");
        this.RegisterEvent(1143, "Excel -> Styles -> Cell Styles -> Heading 4 Context menu", "", false, false, "");
        this.RegisterEvent(1144, "Excel -> Styles -> Cell Styles -> Accent 5 Context menu", "", false, false, "");
        this.RegisterEvent(1145, "Excel -> Styles -> Cell Styles -> Heading 1 Context menu", "", false, false, "");
        this.RegisterEvent(1146, "Excel -> Styles -> Cell Styles -> Title Context menu", "", false, false, "");
        this.RegisterEvent(1147, "Excel -> Styles -> Cell Styles -> Comma Context menu", "", false, false, "");
        this.RegisterEvent(1148, "Excel -> Styles -> Cell Styles -> Comma [0] Context menu", "", false, false, "");
        this.RegisterEvent(1149, "Excel -> Styles -> Cell Styles -> Normal Context menu", "", false, false, "");
        this.RegisterEvent(1150, "Excel -> Styles -> Cell Styles -> Input Context menu", "", false, false, "");
        this.RegisterEvent(1151, "Excel -> Styles -> Cell Styles -> Note Context menu", "", false, false, "");
        this.RegisterEvent(1152, "Excel -> Styles -> Cell Styles -> 20% - Accent1 Context menu", "", false, false, "");
        this.RegisterEvent(1153, "Excel -> Styles -> Cell Styles -> 20% - Accent2 Context menu", "", false, false, "");
        this.RegisterEvent(1154, "Excel -> Styles -> Cell Styles -> 20% - Accent6 Context menu", "", false, false, "");
        this.RegisterEvent(1155, "Excel -> Styles -> Cell Styles -> 40% - Accent1 Context menu", "", false, false, "");
        this.RegisterEvent(1156, "Excel -> Styles -> Cell Styles -> Accent4 Context menu", "", false, false, "");
        this.RegisterEvent(1157, "Excel -> Styles -> Cell Styles -> Currency [0] Context menu", "", false, false, "");
        this.RegisterEvent(1158, "Excel -> Styles -> Cell Styles -> Percent Context menu", "", false, false, "");
        
        this.RegisterEvent(9999, "Ribbon_Incorrect_Click", "Ribbon: Incorrect Button Clicked", "", false, false, "");

    },

    //    HandleAccelaraterKey: function (event) {
    //        alert("gjdfjklgj");
    //        //console.log(this.Compinfo.compName + ": " + (event.ctrlKey == true ? "Ctrl + " : "") + (event.altKey == true ? "Alt + " : "") + (event.shiftKey == true ? "Shift + " : "") + event.keyCode + " pressed");
    //        //if(event.keyCode ==
    //        return false;
    //    },

    LogComponentEvent: function (eventId, desc, bsafe) {
        
        this.CheckAndMoveToNormalState(eventId);
        this.base(eventId, desc, bsafe);
    },

    CheckAndMoveToNormalState: function(eventId){
        if ((eventId !== 124) && (eventId !== 5124)) {//Do not change state for File Menu Event.
            this.goIntoNormalState();
        }
    },

    SetAttribute: function (compid, attrName, attrValue) {

        var $thisComp = this.$thisCompElement;
        var params = null;

        
        try {
            var attr = getArray(this._compinfo.initialattrs.attr).find("@name", attrName);

            if (attr.length > 0) {
                params = attr[0]["@params"];
            }
        }
        catch (ex) { };

        switch (attrName) {

            //case "SPACING_BEFORE":        
            //    $thisComp.find(".LeftNumericUpDownBefore").val(attrValue);        
            //    break;        
            case "CHANGE_TAB_NAME":

                var attrVal = attrValue;
                //Header footer tab name is corrected in ribbon xml. Thus to support the old tasks below check is added.
                if (attrValue == "Header Footer Tools" || attrValue == "Header & Footer Tools")
                    attrVal = "Header Footer Tools Design";

                var tabNameMin = params.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();
                var $tabHeader = $thisComp.find('.tab-header-' + tabNameMin);
                var $children = $tabHeader.children();

                $tabHeader.text(attrVal).append($children);

                break;

            case "HIDE_TAB":
                this.HideTab(attrValue);
                this.RemoveTabFromList(attrValue);

                break;

            case "ACTIVATE_TAB":
                var attrVal = attrValue;
                //Header footer tab name is corrected in ribbon xml. Thus to support the old tasks below check is added.
                if (attrValue == "Header Footer Tools" || attrValue == "Header & Footer Tools")
                    attrVal = "Header Footer Tools Design";

                var tabNameMin = attrVal.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();

                // adding modified tab name in a array which is used to check at the time when contextual tab is shown or hide.
                if (this.activatedTabsList.indexOf(tabNameMin) === -1) {
                    this.activatedTabsList.push(tabNameMin);
                }

                var $tabHeader = $thisComp.find('.tab-header-' + tabNameMin);

                $tabHeader.show();

                //add css for contextual tab head
                var headText = $tabHeader.data("head-text");
                if (headText != undefined) {

                    var headNameMin = headText.removeSpaces().replace("&", "").toLowerCase();
                    var $contextualTabHead = $thisComp.find(".contextual-head-" + headNameMin);

                    //special handling for Excel Power Pivot ribbon contextual tabs
                    if ($contextualTabHead.parents().hasClass('excel-power-pivot ribbon')) {
                        $contextualTabHead.text(headText.toLowerCase());
                    }

                    //special handling for chart tools design tab
                    if ($tabHeader.is(".tab-header-charttoolsdesign")) {
                        var $chartToolFormatTab = $thisComp.find(".tab-header-charttoolsformat");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $chartToolFormatTab.outerWidth() + 5 })
                    }
                    else if ($tabHeader.is(".tab-header-charttoolsformat")) {
                        var $chartToolDesignTab = $thisComp.find(".tab-header-charttoolsdesign");
                        $contextualTabHead.css({ "left": $chartToolDesignTab.offset().left, "width": $tabHeader.outerWidth() + $chartToolDesignTab.outerWidth() + 5 })
                    }
                    //special handling for table tools tabs  -- Word Ribbon
                    else if ($tabHeader.is(".word .tab-header-tabletoolsdesign")) {
                        var $tab = $thisComp.find(".tab-header-tabletoolslayout");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 5 })
                    }
                    else if ($tabHeader.is(".tab-header-tabletoolslayout")) {
                        var $tab = $thisComp.find(".tab-header-tabletoolsdesign");
                        $contextualTabHead.css({ "left": $tab.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 5 })
                    }
                    //special handling for smartart tools tabs
                    else if ($tabHeader.is(".tab-header-smartarttoolsformat")) {
                        var $tab = $thisComp.find(".tab-header-smartarttoolsdesign");
                        $contextualTabHead.css({ "left": $tab.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 5 })
                    }
                    else if ($tabHeader.is(".tab-header-smartarttoolsdesign")) {
                        var $tab = $thisComp.find(".tab-header-smartarttoolsformat");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $tab.outerWidth() + 5 })
                    }
                    else if ($tabHeader.is(".tab-header-pivottabletoolsanalyze")) {
                        var $pivottabletoolsdesign = $thisComp.find(".tab-header-pivottabletoolsdesign");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $pivottabletoolsdesign.outerWidth() + 5 })
                    }
                    else if ($tabHeader.is(".tab-header-pivottabletoolsdesign")) {
                        var $pivottabletoolsanalyze = $thisComp.find(".tab-header-pivottabletoolsanalyze");
                        $contextualTabHead.css({ "left": $pivottabletoolsanalyze.offset().left, "width": $tabHeader.outerWidth() + $pivottabletoolsanalyze.outerWidth() + 5 })
                    }
                    else if ($tabHeader.is(".tab-header-pivotcharttoolsanalyze")) {
                        var $pivotcharttoolsdesign = $thisComp.find(".tab-header-pivotcharttoolsdesign");
                        var $pivotcharttoolsformat = $thisComp.find(".tab-header-pivotcharttoolsformat");
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() + $pivotcharttoolsdesign.outerWidth() + $pivotcharttoolsformat.outerWidth() + 10 })
                    }
                    else if ($tabHeader.is(".tab-header-pivotcharttoolsdesign")) {
                        var $pivotcharttoolsanalyze = $thisComp.find(".tab-header-pivotcharttoolsanalyze");
                        var $pivotcharttoolsformat = $thisComp.find(".tab-header-pivotcharttoolsformat");
                        $contextualTabHead.css({ "left": $pivotcharttoolsanalyze.offset().left, "width": $pivotcharttoolsanalyze.outerWidth() + $tabHeader.outerWidth() + $pivotcharttoolsformat.outerWidth() + 10 })
                    }
                    else if ($tabHeader.is(".tab-header-pivotcharttoolsformat")) {
                        var $pivotcharttoolsanalyze = $thisComp.find(".tab-header-pivotcharttoolsanalyze");
                        var $pivotcharttoolsdesign = $thisComp.find(".tab-header-pivotcharttoolsdesign");
                        $contextualTabHead.css({ "left": $pivotcharttoolsanalyze.offset().left, "width": $pivotcharttoolsanalyze.outerWidth() + $tabHeader.outerWidth() + $pivotcharttoolsdesign.outerWidth() + 10 })
                    }
                    else {
                        $contextualTabHead.css({ "left": $tabHeader.offset().left, "width": $tabHeader.outerWidth() })
                    }
                    $contextualTabHead.show();

                    //special handling for Excel Power Pivot ribbon contextual tabs, as those TABs open at the left side of the title bar instead of right
                    //Threfore repositioning of title text is avoided
                    if (!($contextualTabHead.parents().hasClass('excel-power-pivot ribbon'))) {
                        var $control = $thisComp.find('.title-bar .office-control.ctrl-text');
                        var wd = $control.innerWidth();
                        var controlPos = ($tabHeader.offset().left - wd).toString() + "px";
                        $control.css({ "position": "absolute", "left": "255px", "top": "6px" });
                    }
                    else {
                        // do nothing
                    }

                }

                break;
            case "DOCUMENT_NAME":
                var $control = $thisComp.find('.title-bar .office-control.ctrl-text');
                this.manipulatorFactory.getManipulator($control).setData($control, {
                    text: attrValue
                });
                break;
            case "CENTER_ALIGN":


                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }


                else {
                    var $control = $thisComp.find('.office-control.align-center .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }

                break;
            case "WATCH_WINDOW":

                var $frmlasTab = $thisComp.find('#ribbon-tab-container-formulas');

                if ($frmlasTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($frmlasTab, attrName, attrValue);
                }


                else {
                    var $control = $thisComp.find('.office-control.formula_watch_windows .button-binder');
                    if (attrValue.toLowerCase() == "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }

                break;
            case "LEFT_ALIGN":


                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }


                else {

                    var $control = $thisComp.find('.office-control.align-left .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }

                }
                break;
            case "FORMAT_PAINTER":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.format-painter .button-binder', attrValue);
                }
                break;

            case "TEXT_HIGHLIGHT_COLOR":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.word-font-highlight .button-binder', attrValue);
                }
                break;

            case "HIGHLIGHT_UNDERLINE":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.highlight-underline .combobox', attrValue);
                }
                break;

            case "FORMAT_PAINTER_EXCEL":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.format-painter-excel .button-binder', attrValue);
                }
                break;

            case "RIGHT_ALIGN":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.align-right .button-binder', attrValue);
                }
                break;
            case "TEXT_PANE_HIGHLIGHTED":
                var $smartArtDesignTab = $thisComp.find('#ribbon-tab-container-smartarttoolsdesign');

                if ($smartArtDesignTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($smartArtDesignTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.text-pane .button-binder', attrValue);
                }
                break;
            case "JUSTIFY":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.justify .button-binder', attrValue);
                }
                break;
            case "PARAGRAPH_MARKER_PRESSED":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.paragraph-marker .button-binder', attrValue);
                }
                break;
            case "EXCEL_SELECTED_SHAPE_INDEX":

                //this.setGalleryItem('excel-drawing-shape-gallery', attrValue);
                //Not sure of this change
                var $drawingToolsFormatTab = $thisComp.find('#ribbon-tab-container-drawingtoolsformat');

                if ($drawingToolsFormatTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($drawingToolsFormatTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('excel-drawing-shape-gallery', attrValue);
                }

                break;
            case "WORDART_SELECTED_STYLE_INDEX":

                //this.setGalleryItem('excel-wordart-style-gallery', attrValue);
                //Not sure of this change
                var $drawingToolsFormatTab = $thisComp.find('#ribbon-tab-container-drawingtoolsformat');

                if ($drawingToolsFormatTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($drawingToolsFormatTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('excel-wordart-style-gallery', attrValue);
                }
                break;
            case "HIGHLIGHT_BOLD":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.boldbutton .button-binder', attrValue);
                }
                break;
            case "HIGHLIGHT_HOME_BORDERS":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.borders .combobox', attrValue);
                }
                break;
            case "HIGHLIGHT_ALIGN_TOP_LEFT":
                var $tabletoolslayout = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tabletoolslayout.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tabletoolslayout, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.aligntopleft .button-binder', attrValue);
                }
                break;
            case "HIGHLIGHT_ALIGN_CENTER_LEFT":
                var $tabletoolslayout = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tabletoolslayout.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tabletoolslayout, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.aligncenterleft .button-binder', attrValue);
                }
                break;
            case "HIGHLIGHT_ALIGN_TOP_CENTER":
                var $tabletoolslayout = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tabletoolslayout.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tabletoolslayout, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.aligntopcenter .button-binder', attrValue);
                }

                break;
            case "HIGHLIGHT_RESTRICT_EDITING":
                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.restrictediting .button-binder', attrValue);
                }
                break;
            case "HIGHLIGHT_ALIGN_TOPRIGHT":
                var $tabletoolslayout = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tabletoolslayout.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tabletoolslayout, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.aligntopright .button-binder', attrValue);
                }
                break;
            case "HIGHLIGHT_ALIGN_CENTER":
                var $tabletoolslayout = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tabletoolslayout.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tabletoolslayout, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.aligntablecenter .button-binder', attrValue);
                }
                break;
            case "HIGHLIGHT_TRACK_CHANGES":
                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.trackchange .combobox', attrValue);
                }
                break;
            case "HIGHLIGHT_ITALICS":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.italicsbutton .button-binder', attrValue);
                }
                break;
            case "PIVOTTABLETOOLS_HIGHLIGHT_FIELD_LIST":
                var $pivottabletoolsanalyze = $thisComp.find('#ribbon-tab-container-pivottabletoolsanalyze');

                if ($pivottabletoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivottabletoolsanalyze, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.field_list .button-binder', attrValue);
                }
                break;
            case "PIVOTCHARTTOOLS_HIGHLIGHT_FIELD_LIST":
                var $pivotcharttoolsanalyze = $thisComp.find('#ribbon-tab-container-pivotcharttoolsanalyze');

                if ($pivotcharttoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivotcharttoolsanalyze, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.pivot_chart_field_list .button-binder', attrValue);
                }
                break;
            case "PIVOTTABLETOOLS_HIGHLIGHT_+/-BUTTONS":
                var $pivottabletoolsanalyze = $thisComp.find('#ribbon-tab-container-pivottabletoolsanalyze');

                if ($pivottabletoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivottabletoolsanalyze, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.plus_minus_buttons .button-binder', attrValue);
                }
                break;
            case "PIVOTTABLETOOLS_HIGHLIGHT_FIELD_HEADERS":
                var $pivottabletoolsanalyze = $thisComp.find('#ribbon-tab-container-pivottabletoolsanalyze');

                if ($pivottabletoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivottabletoolsanalyze, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.field_headers .button-binder', attrValue);
                }
                break;
            case "PIVOTCHARTTOOLS_HIGHLIGHT_FIELD_BUTTONS":
                var $pivotcharttoolsanalyze = $thisComp.find('#ribbon-tab-container-pivotcharttoolsanalyze');
                if ($pivotcharttoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivotcharttoolsanalyze, attrName, attrValue);
                }
                else {
                    this.pivotChartToolsFieldButton = attrValue;
                    this.toggleButton('.office-control.pivot_chart_field_buttons', attrValue);
                }
                break;
            case "TOGGLE_STATE":
                this.toggleButton('.office-control.' + params + ' .button-binder', attrValue);
                break;
            case "SEL_TAB":
                var attrVal = attrValue;
                //Header footer tab name is corrected in ribbon xml. Thus to support the old tasks below check is added.
                if (attrValue == "Header Footer Tools" || attrValue == "Header & Footer Tools")
                    attrVal = "Header Footer Tools Design";

                var tabNameMin = attrVal.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();
                var $tabHeader = $thisComp.find('.tab-header-' + tabNameMin);
                this.manipulatorFactory.getManipulator($tabHeader).selectTab($tabHeader);
                
                break;
            case "FONT_SIZE":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("font-size", attrValue);
                }
                break;
            case "FONT_NAME":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("font-name", attrValue);
                }
                break;
            case "NUM_FORMAT":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("num-format", attrValue);
                }
                break;
            case "PIVOTTABLETOOLS_ACTIVE_FIELD":
                var $pivottabletoolsanalyze = $thisComp.find('#ribbon-tab-container-pivottabletoolsanalyze');

                if ($pivottabletoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivottabletoolsanalyze, attrName, attrValue);
                }
                else {
                    $thisComp.find('.pivottabletools_activefield').find('.sims-TextBox').setData({ "value": attrValue });
                }
                break;
            case "PIVOTTABLETOOLS_TABLE_NAME":
                var $pivottabletoolsanalyze = $thisComp.find('#ribbon-tab-container-pivottabletoolsanalyze');

                if ($pivottabletoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivottabletoolsanalyze, attrName, attrValue);
                }
                else {
                    $thisComp.find('.pivottabletools_tablename').find('.sims-TextBox').setData({ "value": attrValue });
                }
                break
            case "TABLETOOLS_DESIGN_TABLE_NAME":
                var $tabletoolsdesign = $thisComp.find('#ribbon-tab-container-tabletoolsdesign');

                if ($tabletoolsdesign.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tabletoolsdesign, attrName, attrValue);
                }
                else {
                    $thisComp.find('.tabletools_tablename').find('.sims-TextBox').setData({ "value": attrValue });
                }
                break;
            case "SLICERTOOLS_OPTIONS_SLICER_CAPTION":
                var $sliceroptionsTab = $thisComp.find('#ribbon-tab-container-slicertoolsoptions');

                if ($sliceroptionsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sliceroptionsTab, attrName, attrValue);
                }
                else {
                    $thisComp.find('.slicer_caption_name').find('.sims-TextBox').setData({ "value": attrValue });
                }
                break;
            case "PIVOTCHARTTOOLS_CHART_NAME":
                var $pivotcharttoolsanalyze = $thisComp.find('#ribbon-tab-container-pivotcharttoolsanalyze');

                if ($pivotcharttoolsanalyze.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivotcharttoolsanalyze, attrName, attrValue);
                }
                else {
                    $thisComp.find('.pivotcharttools_chartname').find('.sims-TextBox').setData({ "value": attrValue });
                }
                break;
            case "BOLD":
                break;

            //            case "NUM_FORMAT":        
            //                $thisComp.find('#num-format.office-control input').val(attrName);        
            //                break;        
            case "BOTTOM_ALIGN":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    var bool = attrValue.toLowerCase();
                    var $button = $thisComp.find('#bottom-align.office-control .button-binder');
                    if (bool == '1' || bool == 'true') {
                        $button.addClass('active-toggle');
                    }
                    else {
                        $button.removeClass('active-toggle');
                    }
                }
                break;
            case "TOP_ALIGN":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    var bool = attrValue.toLowerCase();
                    var $button = $thisComp.find('#top_align.office-control .button-binder');
                    if (bool == '1' || bool == 'true') {
                        $button.addClass('active-toggle');
                    }
                    else {
                        $button.removeClass('active-toggle');
                    }
                }
                break;
            case "ITALICS":
                break;
            case "ALIGNLEFT":
                break;
            case "ALIGNBOTTOM":
                break;
            case "APP":
                this.appName = attrValue;
                gRibbonCMTheme = this.appName;
                break;
            case "RIBBON_PATH":
                this.ribbonXmlPath = this.GetXmlPathFromMap(attrValue);
                var self = this;
                var ribbonGenr = this.ribbonGenerator = new ribbonGenerator();

                if (this.ribbonGenArr) {
                    this.ribbonGenArr.push(this.ribbonGenerator);
                }

                var path = this.ribbonXmlPath; // = 'Comps/ExcelRibbon/word-ribbon.xml';

                //Load 1024 ribbon xml for lower resolutions
                if (gSimsAreaWidth < 1279) {
                    path = this.ribbonXmlPath.replace(".xml", "_1024.xml");

                }
                //Making ribbon generation to be only once for a task...
                //Need to correct this later if required
                if ($thisComp.children('.ribbon').length == 0) {

                    var storedXml = SIMS.Components.Common.RibbonXML.Get(path);

                    if (storedXml) {
                        self.CreateRibbon(storedXml);
                    }
                    else {
                        $.ajax({
                            async: false,
                            url: path,
                            success: function (xml) {
                                SIMS.Components.Common.RibbonXML.Set(xml, path);
                                self.CreateRibbon(xml);
                            }
                        });
                    }
                }
                break;
            case "RIBBON_SUB_XML":
                this.controlXMLPath = attrValue;
                break;
            case "SUB_XML_UPDATE":
                this.controlXMLUpdate = attrValue;
                break;
            case "ATTACH_SUB_RIBBON_WITH_IDENTIFIER":
                if (attrValue === "true") {
                    this.AttachSubRibbonWithIdentifier = true;
                }
                break;

            case "QAT_TRACK_CHANGES":
                this.hideShowControl('.qat-track-changes', attrValue);
                break;
            case "QAT_QUICK_PRINT":
                this.hideShowControl('.qat-quick-print', attrValue);
                break;
            case "QAT_SPELLING_GRAMMAR":
                this.hideShowControl('.qat-spelling-grammar', attrValue);
                break;
            case "QAT_PRINT_PREVIEW":
                this.hideShowControl('.qat-print-preview', attrValue);
                break;
            case "THEME":

                this.colorTheme = attrValue;
                // To set THEME twice - in case - Monalika-AShwin
                var $colorGrids = this.$thisCompElement.find('.sims-ColorGrid.sims-control');

                if ($colorGrids.length != 0) {
                    $colorGrids.setData({
                        theme: attrValue
                    });
                }

                //updating the color theme in GenerateHTML after sub ribbon XML update
                break;
            case "PARA_SPACING_AFTER":
                var $pageLayoutTab = this.getWordLayoutTabContainer($thisComp);

                if ($pageLayoutTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pageLayoutTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.para-spacing-after .sims-SpinControl');
                    var params = {
                        currentvalue: attrValue
                    };
                    $control.setData(params);
                }
                break;
            case "PARA_SPACING_BEFORE":
                var $pageLayoutTab = this.getWordLayoutTabContainer($thisComp);

                if ($pageLayoutTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pageLayoutTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.para-spacing-before .sims-SpinControl');
                    var params = {
                        currentvalue: attrValue
                    };
                    $control.setData(params);
                }
                break;
            case "CHECKBOX":
                this.toggleCheckBox(params, attrValue);
                break;
            case "CHECKBOX_ARRAY":
                var self = this;
                var cbArray = JSON.parse(attrValue);
                $.each(cbArray, function (classname, checked) {
                    self.toggleCheckBox('.' + classname, checked);
                });
                break;
            case "SPIN_VAL":
                attrValue = this.setSpinVal(params, attrValue);
                break;
            case "SMART_HEIGHT":
                attrValue = this.setSpinVal(params, attrValue);
                break;
            case "SMART_WIDTH":
                attrValue = this.setSpinVal(params, attrValue);
                break;
            case "SHAPE_HEIGHT":
                attrValue = this.setSpinVal(params, attrValue);
                break;
            case "SHAPE_WIDTH":
                attrValue = this.setSpinVal(params, attrValue);
                break;
            case "SLICER_BUTTON_WIDTH":
                var $sliceroptionsTab = $thisComp.find('#ribbon-tab-container-slicertoolsoptions');

                if ($sliceroptionsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sliceroptionsTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('slicertools_buttons_width', attrValue);
                }
                break;
            case "SLICER_BUTTON_COLUMN":
                var $sliceroptionsTab = $thisComp.find('#ribbon-tab-container-slicertoolsoptions');

                if ($sliceroptionsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sliceroptionsTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('slicer-column', attrValue);
                }
                break;
            case "SLICER_SIZE_HEIGHT":
                var $sliceroptionsTab = $thisComp.find('#ribbon-tab-container-slicertoolsoptions');

                if ($sliceroptionsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sliceroptionsTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('slicertools_size_height', attrValue);
                }
                break;
            case "PICTURE_WIDTH":
            case "PICTURE_HEIGHT":
                attrValue = this.setSpinVal(params, attrValue);
                break;

            case "CHART_HEIGHT":
                var $chartToolsFrmtTab = $thisComp.find('#ribbon-tab-container-charttoolsformat');

                if ($chartToolsFrmtTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($chartToolsFrmtTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('chart-height', attrValue);
                }
                break;

            case "CHART_WIDTH":
                var $chartToolsFrmtTab = $thisComp.find('#ribbon-tab-container-charttoolsformat');

                if ($chartToolsFrmtTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($chartToolsFrmtTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('chart-width', attrValue);
                }
                break

            case "PAGE_LAYOUT_SCALE":


                var $pageLayoutTab = $thisComp.find('#ribbon-tab-container-pagelayout');

                if ($pageLayoutTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pageLayoutTab, attrName, attrValue);
                }
                else {
                    attrValue = this.setSpinVal('scaling', attrValue);
                }
                break;

            case "TABLE_WIDTH":
                attrValue = this.setSpinVal(params, attrValue);
                break;
            case "TABLE_HEIGHT":

                var $tableToolsLayoutTab = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tableToolsLayoutTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tableToolsLayoutTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.table-height .sims-SpinControl');
                    var params = {
                        currentvalue: attrValue
                    };
                    $control.setData(params);
                }
                break;
            case "SELECTED_SPARKLINE_INDEX":


                var $sparkLinesDesTab = $thisComp.find('#ribbon-tab-container-sparklinestoolsdesign');

                if ($sparkLinesDesTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sparkLinesDesTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('sparkline-gallery', attrValue);
                }
                break;

            case "SELECTED_PARAGRAPH_STYLES_INDEX":


                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('paragraph-styles-gallery', attrValue);
                    this.setGalleryItem('paragraph-styles-gallery', attrValue);
                }
                break;

            case "SELECTED_PICTURE_STYLES_INDEX":
                var $pictureToolsFrmtTab = $thisComp.find('#ribbon-tab-container-picturetoolsformat');

                if ($pictureToolsFrmtTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pictureToolsFrmtTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('picture-styles-gallery', attrValue);
                    this.setGalleryItem('picture-styles-gallery', attrValue);
                }
                break;

            case "SELECTED_CHART_STYLE_INDEX":

                //this.setGalleryItem('chart-style-gallery', attrValue);
                //Not sure of this change
                var $chartToolsDsgnTab = $thisComp.find('#ribbon-tab-container-charttoolsdesign');
                if ($chartToolsDsgnTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($chartToolsDsgnTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('chart-style-gallery', attrValue);
                    this.setGalleryItem('chart-style-gallery', attrValue);
                }
                break;
            case "SELECTED_TABLE_STYLE_INDEX":

                //this.setSelectedGalleryControlItem('table-style-gallery', attrValue);
                var $tableToolsDsgnTab = $thisComp.find('#ribbon-tab-container-tabletoolsdesign');

                if ($tableToolsDsgnTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tableToolsDsgnTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('table-style-gallery', attrValue);
                    this.setGalleryItem('table-style-gallery', attrValue);
                }
                break;
            case "PIVOT_TABLE_STYLE_INDEX":

                var $pivottabledesignTab = $thisComp.find('#ribbon-tab-container-pivottabletoolsdesign');

                if ($pivottabledesignTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivottabledesignTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('pivottable-style-gallery', attrValue);
                    this.setGalleryItem('pivottable-style-gallery', attrValue);
                }
                break;
            case "PIVOT_CHART_TOOLS_DESIGN_STYLE_INDEX":

                var $pivotchartdesignTab = $thisComp.find('#ribbon-tab-container-pivotcharttoolsdesign');

                if ($pivotchartdesignTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pivotchartdesignTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('chart-style-gallery', attrValue);
                    this.setGalleryItem('chart-style-gallery', attrValue);
                }
                break;
            case "SLICER_STYLE_INDEX":

                var $sliceroptionsTab = $thisComp.find('#ribbon-tab-container-slicertoolsoptions');

                if ($sliceroptionsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sliceroptionsTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('slicer-style-gallery', attrValue);
                    this.setGalleryItem('slicer-style-gallery', attrValue);
                }
                break;
            case "SPARKLINE_SRC":

                var $sparkLinesDesTab = $thisComp.find('#ribbon-tab-container-sparklinestoolsdesign');

                if ($sparkLinesDesTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sparkLinesDesTab, attrName, attrValue);
                }
                else {
                    this.setSpaklineControlImgSrc('sparkline-gallery', attrValue);
                }
                break;
            case "MERGE_AND_CENTER":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.office-control.mergeandcenter .combobox');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;
            case "SHOW_FORMULAS":


                var $frmlasTab = $thisComp.find('#ribbon-tab-container-formulas');

                if ($frmlasTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($frmlasTab, attrName, attrValue);
                }


                else {
                    var $control = $thisComp.find('.office-control.showformulas .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;
            case "WRAP_TEXT":


                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {

                    var $control = $thisComp.find('.office-control.wraptext .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;
            case "MIDDLE_ALIGN":


                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {

                    var $control = $thisComp.find('.office-control.middlealign .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;
            case "SCALE_WIDTH":


                var $pageLayoutTab = $thisComp.find('#ribbon-tab-container-pagelayout');

                if ($pageLayoutTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($pageLayoutTab, attrName, attrValue);
                }
                else {

                    this.setTextBoxVal("pagelayout_scale_width", attrValue);
                }
                break;
            case "FONT_COLOR":
                this.setColorGridVal('font_color', attrValue);
                break;
            case "SCALE_HEIGHT":
                this.setTextBoxVal("pagelayout_scale_height", attrValue);
                break;
            case "LEFT_INDENT":
                this.setSpinVal(params, attrValue);
                break;
            case "SELECTED_LINE_SPACING_INDEX":

                break;
            case "NORMAL_VIEW":


                var $viewTab = $thisComp.find('#ribbon-tab-container-view');

                if ($viewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($viewTab, attrName, attrValue);
                }
                else {

                    var $control = $thisComp.find('.office-control.normal .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;

            case "PAGE_BREAK_PREVIEW":
                var $viewTab = $thisComp.find('#ribbon-tab-container-view');

                if ($viewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($viewTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.office-control.pagebreak .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;

            case "PAGE_LAYOUT":
                var $viewTab = $thisComp.find('#ribbon-tab-container-view');

                if ($viewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($viewTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.office-control.pagelayout .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;

            case "SPARKLINE_TYPE":
                var $sparkLinesDesTab = $thisComp.find('#ribbon-tab-container-sparklinestoolsdesign');

                if ($sparkLinesDesTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($sparkLinesDesTab, attrName, attrValue);
                }
                else {
                    var $control = null;
                    switch (attrValue.toLowerCase()) {
                        case "line":
                            $control = $thisComp.find('.office-control.line .button-binder');
                            $control = $thisComp.find('.office-control.line .button-binder');
                            $control.addClass('active-toggle');

                            $control = $thisComp.find('.office-control.column .button-binder');
                            $control.removeClass('active-toggle');

                            $control = $thisComp.find('.office-control.win .button-binder');
                            $control.removeClass('active-toggle');
                            break;

                        case "column":
                            $control = $thisComp.find('.office-control.column .button-binder');
                            $control.addClass('active-toggle');

                            $control = $thisComp.find('.office-control.line .button-binder');
                            $control.removeClass('active-toggle');

                            $control = $thisComp.find('.office-control.win .button-binder');
                            $control.removeClass('active-toggle');
                            break;


                        case "win":
                            $control = $thisComp.find('.office-control.win .button-binder');
                            $control.addClass('active-toggle');

                            $control = $thisComp.find('.office-control.line .button-binder');
                            $control.removeClass('active-toggle');

                            $control = $thisComp.find('.office-control.column .button-binder');
                            $control.removeClass('active-toggle');
                            break;



                        default:
                            break;

                    }
                }

                break;

            case "SHOW_LEVEL":
                var $outliningTab = $thisComp.find('#ribbon-tab-container-outlining');

                if ($outliningTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($outliningTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("outlining-showlevel", attrValue);
                }
                break;

            case "OUTLINE_LEVEL":
                var $outliningTab = $thisComp.find('#ribbon-tab-container-outlining');

                if ($outliningTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($outliningTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("outlining-outlinelevel", attrValue);
                }
                break;

            case "SHOW_MARKUP":
                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("review-showmarkup", attrValue);
                }
                break;

            case "DOC_FORMATTING_INDEX":
                var $designTab = $thisComp.find('#ribbon-tab-container-design');

                if ($designTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($designTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('document-styles', attrValue);
                    this.setGalleryItem('document-styles', attrValue);
                }
                break;

            case "WINDOW_SPLIT":
                var $viewTab = $thisComp.find('#ribbon-tab-container-view');


                if ($viewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($viewTab, attrName, attrValue);
                }
                {
                    var $control = $thisComp.find('.office-control.ZoomSplit .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;

            case "NUMBERING_OPTIONS":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.office-control.numbering .combobox');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;

            case "BULLET_OPTIONS":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    var $control = $thisComp.find('.office-control.bullets .combobox');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;


            case "CHART_TOOLS_CHART_ELEMENTS":
                var $chartToolsFrmtTab = $thisComp.find('#ribbon-tab-container-charttoolsformat');

                if ($chartToolsFrmtTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($chartToolsFrmtTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("charttools-chartelements", attrValue);
                }
                break;

            case "CITATION_STYLE":
                var $referencesTab = $thisComp.find('#ribbon-tab-container-references');

                if ($referencesTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($referencesTab, attrName, attrValue);
                }
                else {
                    this.setTextBoxVal("citation-style", attrValue);
                }
                break;

            case "HIGHLIGHT_REPEAT_HEADER_ROWS":
                var $tableToolsLayoutTab = $thisComp.find('#ribbon-tab-container-tabletoolslayout');

                if ($tableToolsLayoutTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tableToolsLayoutTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.repeatheader .button-binder', attrValue);
                }
                break;


            case "DATA_FILTER":
                var $dataTab = $thisComp.find('#ribbon-tab-container-data');
                if ($dataTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($dataTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.data-filter .button-binder', attrValue);
                }
                break;

            // -- lazyloading implemented till above by Monalika   
            // -- lazyloading implemented below by Ashwin   

            case "HIGHLIGHT_MAILINGS_PREVIEW":

                var $mailingsTab = $thisComp.find('#ribbon-tab-container-mailings');

                if ($mailingsTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($mailingsTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.previewresults .button-icon', attrValue);
                }

                break;

            case "HIGHLIGHT_REVIEW_REVIEWINGPANE":

                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.reviewingpane .combobox', attrValue);
                }

                break;

            case "HIGHLIGHT_VIEW_SIDEBYSIDE":

                var $viewTab = $thisComp.find('#ribbon-tab-container-view');

                if ($viewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($viewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.sidebyside .button-binder', attrValue);
                }

                break;

            case "HIGHLIGHT_VIEW_SYNCHRONOUS_SCROLLING":

                var $viewTab = $thisComp.find('#ribbon-tab-container-view');

                if ($viewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($viewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.sybchronousscrolling .button-binder', attrValue);
                }

                break;

            //            case "PAGE_COLOR":   
            //                this.pageColor = attrValue;   
            //                break;   
            //            case "MYTAB_PAGE_COLOR":   
            //                this.myTabPageColor = attrValue;   
            //                break;    

            case "HIGHLIGHT_DEVELOPER_DESIGN_MODE":
                var $developerTab = $thisComp.find('#ribbon-tab-container-developer');

                if ($developerTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($developerTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('#ribbon-tab-container-developer .developer-design-mode', attrValue);
                }

                break;

            case "HIGHLIGHT_DEVELOPER_XML_SOURCE":
                var $developerTab = $thisComp.find('#ribbon-tab-container-developer');

                if ($developerTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($developerTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('#ribbon-tab-container-developer .developer-xml-source', attrValue);
                }

                break;

            case "HIGHLIGHT_DEVELOPER_RESTRICT_EDITING":

                var $developerTab = $thisComp.find('#ribbon-tab-container-developer');

                if ($developerTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($developerTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.restrict-editing .button-binder', attrValue);
                }

                break;

            case "HIGHLIGHT_SHOW_COMMENTS":

                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.show-comments .button-binder', attrValue);
                }

                break;
            /*
            case "HIGHLIGHT_OUTLINING_SHOW_DOCUMENT":

            var $outliningTab = $thisComp.find('#ribbon-tab-container-outlining');

            if ($outliningTab.children().length == 0)  //not yet created
            {
            this.addAttrDataInTab($outliningTab, attrName, attrValue);
            }
            else {
            this.toggleButton('.office-control.show-document .button-binder', attrValue);
            }

            break;
            */ 
            // This was added for a specific case SIMS-72570 . Should not be blindly used without discussion.    
            case "TAB_HEADER_CSS":
                if (attrValue != "" && attrValue != undefined) {
                    $thisComp.find(".tab-header:visible").css(JSON.parse(attrValue));
                }
                break;
            case "HIGHLIGHT_PRINT_LAYOUT":
                var $PrintTab = $thisComp.find('#ribbon-tab-container-view');

                if ($PrintTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($PrintTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.Print-Layout .button-binder', attrValue);
                }
                break;

            case "VALIDATE_SELECTED_TAB":
                if (attrValue == "true" || attrValue == "TRUE")
                    this.RegisteredComponent.EditRegisterdAttribute("SELECTED_TAB", "", true);
                break;

            case "HIGHLIGHT_HOME_BULLETS":
                var $homeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($homeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($homeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.bullets .combobox', attrValue);
                }
                break;

            case "IS_TAB_SELECTED_ONCE": //Lazy loading Handling not required for this attribute as it is just setting some variables.
                this.tabName = attrValue.toLowerCase();
                this.RegisteredComponent.EditRegisterdAttribute("IS_TAB_SELECTED_ONCE", "NO", true);
                break;

            case "RIGHT_INDENT":
                this.setSpinVal(params, attrValue);
                break;

            case "SELECTED_SHAPE_STYLES_INDEX":

                var $drawingToolsFormatTab = $thisComp.find('#ribbon-tab-container-drawingtoolsformat');

                if ($drawingToolsFormatTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($drawingToolsFormatTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('shape-styles-gallery', attrValue);
                    this.setGalleryItem('shape-styles-gallery', attrValue);
                }
                break;
            case "FOCALIZE_SPIN_CONTROL": //We didnt add this in lazy loading, because till the time this attribute was called, the page layout tab was formed but still not visible. That is why the focalize of spin was not getting called.
                var $pageLayoutTab = this.getWordLayoutTabContainer($thisComp);

                if ($pageLayoutTab.children().length > 0 && $pageLayoutTab.css("display") != "none")  //not yet created
                {
                    $pageLayoutTab.find("." + attrValue).find(".sims-SpinControl").focalize(true);
                }

                break;

            default:
                break;

            case "SELECTED_SMARTART_LAYOUT_INDEX":


                var $smartartTab = $thisComp.find('#ribbon-tab-container-smartarttoolsdesign');

                if ($smartartTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($smartartTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('smartart-layout-gallery', attrValue);
                    this.setGalleryItem('smartart-layout-gallery', attrValue);
                }
                break;

            case "SELECTED_SMARTART_STYLE_INDEX":

                
                var $smartartTab = $thisComp.find('#ribbon-tab-container-smartarttoolsdesign');

                if ($smartartTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($smartartTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('smartart-styles-gallery', attrValue);
                    this.setGalleryItem('smartart-styles-gallery', attrValue);
                }
                break;
            // Added to select table style in table design tool tab    
            case "SELECTED_TABLE_STYLES_INDEX_WORD":

                var $tableToolsDsgnTab = $thisComp.find('#ribbon-tab-container-tabletoolsdesign');

                if ($tableToolsDsgnTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tableToolsDsgnTab, attrName, attrValue);
                }
                else {
                    this.setSelectedGalleryControlItem('table-styles-gallery', attrValue);
                    this.setGalleryItem('table-styles-gallery', attrValue);
                }
                break;
                
            //To highlight Review tab protect workbook
            case "HIGHLIGHT_REVIEW_PROTECT_WORKBOOK":

                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.protect-workbook .button-binder', attrValue);
                }

                break;
                
            //To highlight Review tab show ink
            case "HIGHLIGHT_REVIEW_SHOW_INK":

                var $reviewTab = $thisComp.find('#ribbon-tab-container-review');

                if ($reviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($reviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.show-ink .button-binder', attrValue);
                }

                break;

            //To highlight Table Tools Design tab refresh buton
            case "HIGHLIGHT_TABLETOOLS_DESIGN_EXTERNAL_REFRESH":

                var $tableToolsDesignTab = $thisComp.find('#ribbon-tab-container-tabletoolsdesign');

                if ($tableToolsDesignTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($tableToolsDesignTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.tabletools_external_refresh_button', attrValue);
                }

                break;

            //To highlight Insert TAB Text grouo Textbox
            case "HIGHLIGHT_INSERT_TEXTBOX":

                var $insertTab = $thisComp.find('#ribbon-tab-container-insert');

                if ($insertTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($insertTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.insert-textbox', attrValue);
                }

                break;
            //To fire event on TAB click
            case "SELECTED_TABS_LIST":
                this.enableRibbonTabEvent(attrValue, $thisComp);
                break;

            //To generate event on Collapse button click
            case "ENABLE_COLLAPSE_BUTTON":
                if (attrValue.toLowerCase() == "true") {
                    this.generateCollapseButton($thisComp);
                }
                break;

            //To highlight Powerview tab fit to window
            case "POWERVIEW_HIGHLIGHT_FIT_TO_WINDOW":

                var $powerviewTab = $thisComp.find('#ribbon-tab-container-powerview');

                if ($powerviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerview-fit-to-window .button-binder', attrValue);
                }

                break;

            //To highlight Powerview tab field list
            case "POWERVIEW_HIGHLIGHT_FIELD_LIST":

                var $powerviewTab = $thisComp.find('#ribbon-tab-container-powerview');

                if ($powerviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerview-field-list .button-binder', attrValue);
                }

                break;
            case "POWERVIEW_HIGHLIGHT_FILTER_AREA":

                var $powerviewTab = $thisComp.find('#ribbon-tab-container-powerview');

                if ($powerviewTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerviewTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerview_filters_area .button-binder', attrValue);
                }

                break;
            case "POWERPIVOT_HIGHLIGHT_DATA_VIEW":

                var $powerPivotRibbonHomeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($powerPivotRibbonHomeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerPivotRibbonHomeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerpivot_data_view .button-binder', attrValue);
                }

                break;
            case "POWERPIVOT_HIGHLIGHT_DIAGRAM_VIEW":

                var $powerPivotRibbonHomeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($powerPivotRibbonHomeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerPivotRibbonHomeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerpivot_diagram_view .button-binder', attrValue);
                }

                break;
            case "POWERPIVOT_HIGHLIGHT_SHOW_HIDDEN":

                var $powerPivotRibbonHomeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($powerPivotRibbonHomeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerPivotRibbonHomeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerpivot_show_hidden .button-binder', attrValue);
                }

                break;
            case "POWERPIVOT_HIGHLIGHT_CALCULATION_AREA":

                var $powerPivotRibbonHomeTab = $thisComp.find('#ribbon-tab-container-home');

                if ($powerPivotRibbonHomeTab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($powerPivotRibbonHomeTab, attrName, attrValue);
                }
                else {
                    this.toggleButton('.office-control.powerpivot_calculation_area .button-binder', attrValue);
                }

                break;
            case "FOCUS_COMP_ID_FOR_ACCESS_KEYS":
                this.focusCompIdForAccessKeys = attrValue;
                break;

            case "USE_RELATIVE_REFERENCES":

                var $devtab = $thisComp.find('#ribbon-tab-container-developer');

                if ($devtab.children().length == 0)  //not yet created
                {
                    this.addAttrDataInTab($devtab, attrName, attrValue);
                }


                else {
                    var $control = $thisComp.find('.office-control#developer_relative .button-binder');
                    if (attrValue.toLowerCase() === "true") {
                        $control.addClass('active-toggle');
                    }
                    else {
                        $control.removeClass('active-toggle');
                    }
                }
                break;

        }
    },


    getWordLayoutTabContainer: function ($thisComp) {
        return $thisComp.find('#ribbon-tab-container-pagelayout');
    },

    //set selected item of gallery control in ribbon.
    setSelectedGalleryControlItem: function (controlClassName, attrValue) {
        var $galleryControl = this.$thisCompElement.find('.office-control.' + controlClassName);
        var $control = this.manipulatorFactory.getManipulator($galleryControl);
        if ($control != undefined) {
            $control.SetSelectedItem($galleryControl, parseInt(attrValue));
        }
    },

    setSpaklineControlImgSrc: function (controlClassName, attrValue) {
        var $sparklineControl = this.$thisCompElement.find('.office-control.' + controlClassName);
        var $control = this.manipulatorFactory.getManipulator($sparklineControl);
        $control.ChangeItemsImage($sparklineControl, attrValue);
    },

    setTextBoxVal: function (className, value) {
        var $control = this.$thisCompElement.find('.office-control.' + className + ' input.combo-textbox');
        $control.val(value);
        $control.attr('value', value);
        $control.attr('defaultValue', value);

        //Dhirendra to validate after market release :)
        $control.data("val", value);
    },

    //    toggleCheckBox: function (params, attrValue) {
    //        var $control = this.$thisCompElement.find('.office-control.' + params);
    //
    //
    //
    //        var className = params;
    //        if ($control.length != 0) {
    //            var bChecked = false;
    //            if (attrValue) {
    //                //bChecked = Boolean(attrValue);
    //
    //                if (attrValue == "false" || attrValue == false) {
    //                    bChecked = false;
    //                }
    //                else {
    //                    bChecked = true;
    //                }
    //
    //            }
    //
    //
    //            var params = {
    //                checked: bChecked
    //            };
    //            this.manipulatorFactory.getManipulator($control).setData($control, params);
    //            this.removeAttrFrmUpdateList('CHECKBOX', className, attrValue);
    //        }
    //
    //        else {
    //            this.setAttributeValue('CHECKBOX', className, attrValue);
    //        }
    //
    //
    //    },

    toggleButton: function (selector, sActive) {
        var $control = this.$thisCompElement.find(selector);
        if (sActive.toLowerCase() === "true") {
            $control.addClass('active-toggle');
        }
        else {
            $control.removeClass('active-toggle');
        }
    },

    hideShowControl: function (selector, sHideShow) {
        var $control = this.$thisCompElement.find(selector);
        if (sHideShow.toLowerCase() == "true") {
            $control.removeClass('hidden');
        }
        else {
            $control.addClass('hidden');
        }
    },

    //    addAttrDataInTab: function ($tab, attrName, attrValue) {
    //        var dataObj = {};
    //        dataObj.attrName = attrName;
    //        dataObj.attrValue = attrValue;
    //
    //        if ($tab.data('attrList') != undefined) {
    //            var dataArr = $tab.data('attrList');
    //            dataArr.push(dataObj);
    //            //dataArr = $.unique(dataArr);
    //            $tab.data('attrList', dataArr);
    //        }
    //        else {
    //            $tab.data('attrList', [dataObj]);
    //        }
    //    },

    GetAttribute: function (compid, attrName) {
        var attrValue = "";
        var $thisComp = this.$thisCompElement;

        var attr = getArray(this._compinfo.finalattrs.attr).find("@name", attrName);
        var params = null;
        if (attr.length > 0) {
            params = attr[0]["@params"];
        }

        switch (attrName) {
            case "DOCUMENT_NAME":
                break;
            case "SEL_TAB":
                break;
            case "FONT_SIZE":
                var $fontSize = $thisComp.find('.office-control.font-size input.combo-textbox');
                //attrValue = $fontSize.attr('value');
                attrValue = $fontSize.data("val");
                break;
            case "FONT_NAME":
                var $fontName = $thisComp.find('.office-control.font-name input.combo-textbox');
                attrValue = $fontName.data("val");
                break;
            case "BOLD":
                attrValue = $thisComp.find('togglebutton-bold').data('state');
                break;
            case "NUM_FORMAT":
                //attrValue = $thisComp.find('.num-format.office-control input').attr('value');
                attrValue = $thisComp.find('.num-format.office-control input').data("val");
                break;
            case "SCALE_WIDTH":
                attrValue = $thisComp.find('.pagelayout_scale_width.office-control input').data("val");
                break;
            case "SCALE_HEIGHT":
                attrValue = $thisComp.find('.pagelayout_scale_height.office-control input').data("val");
                break;
            case "BOTTOM_ALIGN":
                attrValue = $thisComp.find('#bottom-align.office-control .button-binder').addClass();
                break;
            case "ITALICS":
                attrValue = $thisComp.find('togglebutton-italics').data('state');
                break;
            case "ALIGNLEFT":
                attrValue = $thisComp.find('togglebutton-alignleft').data('state');
                break;
            case "ALIGNBOTTOM":
                attrValue = $thisComp.find('togglebutton-alignbottom').data('state');
                break;
            case "SHAPE_HEIGHT":
                attrValue = $thisComp.find('.ribbon-tab-Drawing Tools Format .shape-height1 .spinContainer .spinInput').val();
                break;
            case "SMART_HEIGHT":
                attrValue = $thisComp.find('.ribbon-tab-Smartart Tools Format .smart-height .spinContainer .spinInput').val();
                break;

            case "SMART_WIDTH":
                attrValue = $thisComp.find('.ribbon-tab-Smartart Tools Format .smart-width .spinContainer .spinInput').val();
                break;
            case "TABLE_WIDTH":
                attrValue = $thisComp.find('.ribbon-tab-Table Tools Layout .table-width .spinContainer .spinInput').val();
                break;
            case "TABLE_HEIGHT":
                var $tableheight = $thisComp.find('.table-height');
                var data = $tableheight.find(".sims-SpinControl").getData();
                attrValue = data.currentvalue;
                break;
            case "SHAPE_WIDTH":
                attrValue = $thisComp.find('.ribbon-tab-Drawing Tools Format .shape-width1 .spinContainer .spinInput').val();
                break;
            case "SLICER_BUTTON_WIDTH":
                attrValue = $thisComp.find('#ribbon-tab-container-slicertoolsoptions .slicertools_buttons_width .spinContainer .spinInput').val();
                break;
            case "SLICER_BUTTON_COLUMN":
                attrValue = $thisComp.find('#ribbon-tab-container-slicertoolsoptions .slicer-column .spinContainer .spinInput').val();
                break;
            case "SLICER_SIZE_HEIGHT":
                attrValue = $thisComp.find('#ribbon-tab-container-slicertoolsoptions .slicertools_size_height .spinContainer .spinInput').val();
                break;
            case "PICTURE_HEIGHT":
                attrValue = $thisComp.find('#ribbon-tab-container-picturetoolsformat .shape-height .spinContainer .spinInput').val();
                break;
            case "PICTURE_WIDTH":
                attrValue = $thisComp.find('.ribbon-tab-Picture Tools Format .shape-width .spinContainer .spinInput').val();
                break;
            case "SPACING_AFTER":
                attrValue = $thisComp.find('.ribbon-tab-Drawing Tools Format .spinContainer .spinInput').val();
                break;
            case "SPACING_BEFORE":
                attrValue = $thisComp.find('.ribbon-tab-Drawing Tools Format .spinContainer .spinInput').val();
                break;
            case "FONT_COLOR":
                attrValue = this.getColorGridVal('font-color');
                break;
            case "PICTURE_BORDER":
                attrValue = this.getColorGridVal('picture-border');
                break;
            case "SHAPE_OUTLINE":
                attrValue = this.getColorGridVal('shape-outline');
                break;
            case "FILL_COLOR":
            case "SHAPE_FILL":
                attrValue = this.getColorGridVal('shape-fill');
                break;
            case "PARA_SPACING_AFTER":
                var $spacingAfter = $thisComp.find('.para-spacing-after');
                var data = $spacingAfter.find(".sims-SpinControl").getData();
                attrValue = data.currentvalue;
                break;
            case "PARA_SPACING_BEFORE":
                var $spacingBefore = $thisComp.find('.para-spacing-before');
                var data = $spacingBefore.find(".sims-SpinControl").getData();
                attrValue = data.currentvalue;
                break;
            case "TAB_COLOR":
                attrValue = this.getColorGridVal('tab-color');
                break;
            case "SHADING_COLOR":
                attrValue = this.getColorGridVal('shading-color');
                break;
            case "SPIN_VAL":
                attrValue = this.getSpinVal(params);
                break;
            case "LEFT_INDENT":
                attrValue = $thisComp.find('.ribbon-tab-Page Layout .left-indent .spinContainer .spinInput').val();
                break;
            case "EXCEL_FONT_COLOR":
                attrValue = this.getColorGridVal('excel-font-color');
                break;

            case "UNDO_REDO_INDEX":
                attrValue = $(this).data("UndoRedoIndex");
                break;

            case "TABLE_DIMENSIONS":
                attrValue = $(this).data("TableDimensions");
                break;

            case "CHART_TOOLS_CHART_ELEMENTS":
                var $chartElements = $thisComp.find('.office-control.charttools-chartelements input.combo-textbox');
                attrValue = $chartElements.data("val");
                break;

            case "SPARKLINE_COLOR":
                attrValue = this.getColorGridVal('sparklinetools-color');
                break;

            case "CITATION_STYLE":
                attrValue = $thisComp.find('.citation-style.office-control input').data("val");
                break;

            case "CHART_HEIGHT":
                attrValue = $thisComp.find('#ribbon-tab-container-charttoolsformat .chart-height .sims-SpinControl').getData().currentvalue;
                break;

            case "CHART_WIDTH":
                attrValue = $thisComp.find('#ribbon-tab-container-charttoolsformat .chart-width .sims-SpinControl').getData().currentvalue;
                break;

            case "PAGE_LAYOUT_SCALE":
                attrValue = $thisComp.find('#ribbon-tab-container-pagelayout .scaling .sims-SpinControl').getData().currentvalue;
                break;

            case "CHART_SHAPEFILL_COLOR":
                attrValue = this.getColorGridVal('chart-shapefill-color');
                break;

            case "CONTEXT_MENU_ITEM_INDEX":
                attrValue = this.$thisCompElement.data("CONTEXT_MENU_ITEM_INDEX");
                break;
            case "PAGE_COLOR":
                attrValue = this.getColorGridVal('page-color');
                break;
            case "MYTAB_PAGE_COLOR":
                attrValue = this.getColorGridVal('mytab-page-color');
                break;

            case "SELECTED_TAB":
                attrValue = this.$thisCompElement.find('.tab-header-selected').text();
                break;
            case "IS_TAB_SELECTED_ONCE":

                var $tab = null,
                    self = this;
                $tab = $thisComp.find('#ribbon-tab-container-' + self.tabName);
                if ($tab.children().length != 0) {
                    //                     $tab.bind('click', function () {
                    //                         self.LogComponentEvent(838, "Ribbon: " + tabName + " Tab Header Clicked", true);
                    //                     });
                    attrValue = "YES";
                }
                else {
                    attrValue = "NO";
                }

                break;

            case "RIGHT_INDENT":
                attrValue = $thisComp.find('#ribbon-tab-container-pagelayout .right-indent .spinContainer .spinInput').val();
                break;

            case "SLICERTOOLS_OPTIONS_SLICER_CAPTION":
                attrValue = $thisComp.find('#ribbon-tab-container-slicertoolsoptions .slicer_caption_name .sims-TextBox').val();
                break;
            
            case "TABLETOOLS_DESIGN_TABLE_NAME":
                attrValue = $thisComp.find('#ribbon-tab-container-tabletoolsdesign .tabletools_tablename .sims-TextBox').val();
                break;

            case "PIVOTCHARTTOOLS_CHART_NAME":
                attrValue = $thisComp.find('#ribbon-tab-container-pivotcharttoolsanalyze .pivotcharttools_chartname .sims-TextBox').val();
                break;
            // New attribute create to identify the Chart Tools format launcher group with event id 531
            case "CHART_TOOLS_FORMAT_LAUNCHER_GROUP":
                attrValue = this.chartFormatTablauncherGroup;
                break;

            default:
                break;
        }
        return attrValue;
    },

    getSpinVal: function (controlClassName) {
        var $spinControl = this.$thisCompElement.find('.' + controlClassName);
        var data = $spinControl.find(".sims-SpinControl").getData();
        return data.currentvalue;
    },

    //    setSpinVal: function (controlClassName, attrValue) {
    //        var $spinControl = this.$thisCompElement.find('.' + controlClassName);
    //
    //        if ($spinControl != undefined && $spinControl.length > 0) {
    //            var data = $spinControl.find(".sims-SpinControl").setData({
    //                currentvalue: attrValue
    //            });
    //            this.removeAttrFrmUpdateList('SPIN_VAL', controlClassName, attrValue);
    //        }
    //        else {
    //            this.setAttributeValue('SPIN_VAL', controlClassName, attrValue);
    //        }
    //    },

    getColorGridVal: function (className) {
        $colorGrid = this.$thisCompElement.find('.dropdown-item.' + className + ' .sims-ColorGrid.sims-control');
        var data;
        /* var data = $colorGrid.getData();
        return data.index;*/


        if ($colorGrid.length != 0) {
            data = $colorGrid.getData();
            return data.index;
        }
        else if (SIMS.Objects.DOMElements.Ribbon && SIMS.Objects.DOMElements.Ribbon.attr('theme')) // theme issue - delinked
        {
            $colorGrid = this.$thisCompElement.find('.dropdown-item .sims-ColorGrid.sims-control');
            data = $colorGrid.getData();
            return data.index;
        }
        else
            return "";
    },
    setColorGridVal: function (className, attrvalue) {
        //Change done to fix SIMS-79458, regression of colorgrid dd lazyloading
        //Set the data of combobox dropdown here. When combobox dropdown render on arrow click, it will read this data and set ColorGrid index.
       // $colorGridParent = this.$thisCompElement.find('.office-control.' + className + ' .combobox-dropdown');
        $combobox = this.$thisCompElement.find('.office-control.' + className);
        $colorGridParent = $combobox.find('.combobox-dropdown');
        $colorGridParent.data("colorIndex", attrvalue);
        var $colorChangerDiv = $combobox.find(".colorchanger");
        if ($colorChangerDiv.length > 0) {
            var colorHex = null;
            var themeName = this.colorTheme || "Office";
            for (var i = 0; i < ColorGridInputList.length; i++) {
                if (ColorGridInputList[i].theme === themeName && ColorGridInputList[i].colorGridType === "patternColor"){
                    var colorindex = attrvalue || 0;
                    colorHex = ColorGridInputList[i].colors[colorindex].clr;
                    break;
                }
            }
            $colorChangerDiv.css("background-color", "#" + colorHex);
        }
    },

    OpenDropdown: function () {
        var key = 'V';
        //$('.SIMS .ribbon .SK_' + key).closest('.office-control').DropdownOpener();
        $('.SIMS .ribbon .SK_' + key).closest('.office-control').find('.dropdown-button').trigger('click');

    },

    //    attachContextMenus: function () {
    //        this.attachCellStyleContextMenu();
    //    },

    //    attachCellStyleContextMenu: function () {
    //        var $contextMenu = this.$thisCompElement.find('#cellStylesContextMenu');
    //        $contextMenu.appendTo(this.$thisCompElement.find('.office-control.cell-styles'));

    //        var $cellStyles = this.$thisCompElement.find(".office-control.cell-styles .dropdown-image-item");
    //        $cellStyles.contextMenu({
    //            menu: 'cellStylesContextMenu',
    //            captureClickFor: '.dropdown-item',
    //            inSpeed: 25,
    //            outSpeed: 50
    //        },

    //    fireContextMenuClick
    //    );
    //    },

    isDropdownOpen: function () {
        return this.$thisCompElement.find(".dropdown-open").length > 0;
    },

    isGalleryOpen: function () {
        return this.$thisCompElement.find(".gallery-items-expanded").length > 0;
    },

    handleKeyCondition: function (key) {
        if (key === "ALT" || key === "F6" || key === "F10") {
            return true;
        }
        return this.isDropdownOpen() || this.isGalleryOpen();
    },

    AttachComponentEvents: function (CompInfo, $Comp) {


        this.compId = CompInfo["@id"];
        var self = this;

        SIMS.Objects.DOMElements.SIMArea.add(this.$thisCompElement).click(function () {
            self.goIntoNormalState();
        });

        //Attaching Context Menu
        //this.attachContextMenus();
        var clicks, timer, delay;
        clicks = 0; delay = 250; timer = null;

        //Wire Events and Messaging for controls
        //var $allConrols = $Comp.find('.office-control');


        var $ribbonComp = $Comp.find(".ribbon:first");
        $ribbonComp.noRepeatBind('officeButtonClick selectedIndexChanged dropdownMenuItemClick iconClick spinValueChanged checkChanged', function (e, desc, eventId, ICMessageId, eventInfo, clickstreamInfo) {
            //alert('click '+desc);
            console.log(eventId);
            if(!clickstreamInfo)  {
                clickstreamInfo = desc;
            }
            console.log(clickstreamInfo);
            var sCompDesc = "Ribbon: ";
            var id = 9999;

            if (eventInfo) {
                if (eventInfo.cmIndex)
                    self.$thisCompElement.data("CONTEXT_MENU_ITEM_INDEX", eventInfo.cmIndex);
            }

            if (eventId == 408) // Replace with Undo Redo itemClickEvent event ids..
            {
                $(self).data("UndoRedoIndex", eventInfo);
            }

            if (eventId != null && eventId !== "") {
                id = parseInt(eventId);
            }

            if (eventId == 409) {
                $(self).data("TableDimensions", desc);
            }

            if (id == 299) {
                //Click Handler
                //http://stackoverflow.com/questions/6330431/jquery-bind-double-click-and-single-click-separately

                clicks++;

                timer = setTimeout(function () {

                    //If later click or double click would differ then use this block
                    switch (clicks) {
                        case 1: //SINGLE CLICK
                            self.LogComponentEvent(299, sCompDesc + clickstreamInfo);
                            break;
                        case 2: // DOUBLE CLICK
                            self.LogComponentEvent(145, "Ribbon : Home tab : Clipboard group : Format Painter Double Clicked");
                            break;
                    }


                    clicks = 0;
                }, delay);


            }

            if (id === 270) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "SMART_HEIGHT");
                    if (attr) {
                        if (self.getSpinVal("smart-height").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                }
            }
            if (id === 271) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "SMART_WIDTH");
                    if (attr) {
                        if (self.getSpinVal("smart-width").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                }
            }

            if (id === 338) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "TABLE_WIDTH");
                    if (attr) {
                        if (self.getSpinVal("table-width").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                }
            }

            if (id === 546) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "TABLE_HEIGHT");
                    if (attr) {
                        if (self.getSpinVal("table-height").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                }
            }

            if (id === 551) {
                self.ChartSpinButtonEventhandler(id, "chart-height", "CHART_HEIGHT", eventInfo, sCompDesc + clickstreamInfo);
            }

            if (id === 552) {
                self.ChartSpinButtonEventhandler(id, "chart-width", "CHART_WIDTH", eventInfo, sCompDesc + clickstreamInfo);
            }

            if (id === 241) {
                self.validatePictureToolSpinBoxValues(id, sCompDesc, clickstreamInfo ,eventInfo);
            }
            else if (id === 242) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "SHAPE_WIDTH");
                    if (attr) {
                        if (self.getSpinVal("shape-width").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                    else {
                        attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "PICTURE_WIDTH");
                        if (attr) {
                            if (self.getSpinVal("shape-width").toString() === attr["@value"].toString()) {
                                self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                            }
                        }
                    }
                }
            }
            else if (id === 244) {
                self.ShapeHeightChange(id, sCompDesc, clickstreamInfo, eventInfo);
            }
            else if (id === 245) {
                self.ShapeWidthChange(id, sCompDesc, clickstreamInfo, eventInfo);
            }
            else if (id === 157) {
                self.SpacingAfterChange(id, sCompDesc, clickstreamInfo, eventInfo);
            }
            else if (id === 315) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "LEFT_INDENT");
                    if (attr) {
                        if (self.getSpinVal("left-indent").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                }
            }
            else if (id === 733) {
                if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
                    var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "RIGHT_INDENT");
                    if (attr) {
                        if (self.getSpinVal("right-indent").toString() === attr["@value"].toString()) {
                            self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                        }
                    }
                }
            }
            else if (desc != null) {
                switch (desc.toLowerCase()) {
                    /* -------Excel Ribbon events-----------*/ 
                    case 'bold':
                        //self.OpenDropdown();
                        id = 1;
                        break;
                    case 'clear all':
                        id = 13;
                        break;
                    case 'clear formats':
                        id = 11;
                        break;
                    case 'clear contents':
                        id = 12;
                        break;
                    case 'clear comments':
                        //id = 13;
                        break;
                    case 'clear hyperlinks':
                        //id = 14;
                        break;

                    case 'series...':
                        id = 29;
                        break;

                    case 'autofit column width':
                        id = 30;
                        break;
                    /* -------Excel Ribbon events-----------*/ 

                    /* -------Word Ribbon events-----------*/ 
                    case 'text from file...':
                        id = 20;
                        break;
                    case '16':
                        id = 5;
                        break;
                    case 'pictures':
                        id = 21;
                        break;
                    case 'tight':
                        id = 22;
                        break;
                    case 'more layout options...':
                        id = 23;
                        break;

                    case 'spelling':
                        id = 24;
                        break;
                    case 'position':
                        id = 25;
                        break;
                    case 'plastic wrap':
                        id = 26;
                        break;
                    case 'artistic effects options...':
                        id = 27;
                        break;
                    case 'wrap text':
                        id = 28;
                        break;
                    case 'divot':
                        id = 31;
                        break;
                    case 'page borders':
                        id = 32;
                        break;
                    case 'double wave':
                        id = 33;
                        break;
                    case 'borders and shading...':
                        id = 34;
                        break;
                    case 'line numbering options...':
                        id = 36;
                        break;
                    case 'more paper sizes...':
                        id = 36;
                        break;
                    case 'custom margins...':
                        id = 36;
                        break;
                    case 'solid bullet':
                        id = 37;
                        break;
                    case 'bullets':
                        id = 38;
                        break;
                    case '1.0':
                        id = 39;
                        break;
                    case 'column width...':
                        id = 50;
                        break;
                    case 'insert cells...':
                        id = 51;
                        break;
                    case 'insert sheet rows':
                        id = 52;
                        break;
                    case 'insert sheet columns':
                        id = 53;
                        break;
                    case 'insert sheet':
                        id = 54;
                        break;
                    case 'delete cells...':
                        id = 55;
                        break;
                    case 'delete sheet rows':
                        id = 56;
                        break;
                    case 'delete sheet columns':
                        id = 57;
                        break;
                    case 'delete sheet':
                        id = 58;
                        break;
                    case 'more borders..':
                        id = 59;
                        break;
                    case 'middle align':
                        id = 60;
                        break;
                    case 'format cells...':
                        id = 62;
                        break;
                    case 'accounting number format':
                        id = 63;
                        break;
                    case 'percent style':
                        id = 64;
                        break;
                    case 'comma style':
                        id = 65;
                        break;
                    case 'increase decimal':
                        id = 66;
                        break;
                    case 'decrease decimal':
                        id = 67;
                        break;
                    case 'select all':
                        id = 68;
                        break;
                    case 'justify':
                        id = 73;
                        break;
                    case 'more rotation options':
                        id = 78;
                        break;
                    case 'more borders':
                        id = 80;
                        break;
                    case 'insert':
                        id = 82;
                        break;
                    case 'line spacing options...':
                        id = 43;
                        break;
                    case 'delete':
                        id = 84;
                        break;
                    case 'arial':
                        id = 108;
                        break;
                    case '11':
                        id = 109;
                        break;
                    case 'show/hide (ctrl+*)':
                        id = 146;
                        break;
                    case 'mirrored':
                        id = 147;
                        break;
                    case 'increase font size':
                        id = 150;
                        break;
                    case 'page':
                        id = 158;
                        break;
                    case 'quick print':
                        id = 177;
                        break;
                    case 'different first page':
                        id = 176;
                        break;
                    case 'more commands...':
                        id = 179;
                        break;
                    case 'online video':
                        id = 226;
                        break;
                    case 'close':
                        id = 255;
                        break;
                    case 'narrow':
                        id = 286;
                        break;

                    default:
                        break;
                    /* -------Word Ribbon events-----------*/ 

                }
            }

            self.FireSimEvent(id, eventInfo, sCompDesc + clickstreamInfo);


            if (ICMessageId) {
                self.SendMessageToComponents(ICMessageId, ICMessageId, ICMessageId);
            }
        });

        $ribbonComp.noRepeatBind('lazyLoadTab', function (e, eventInfo) {

            if (eventInfo && eventInfo.tabXML && eventInfo.tabContainer) {
                self.LazyLoadTab(eventInfo.tabXML, eventInfo.tabContainer);
            }
        });

        $ribbonComp.noRepeatBind('updateTabAttributes', function (e, eventInfo) {

            if (eventInfo && eventInfo.attrList) {
                self.UpdateTabAttributes(self.compId, eventInfo.attrList);
            }
        });

        $ribbonComp.noRepeatBind('updateTabSubRibbon', function (e, eventInfo) {
            if (eventInfo && eventInfo.subRibXML) {
                self.UpdateTabSubRibbon(eventInfo.subRibXML);
            }
        });
        //Wire Events and Messaging for dialog Launchers

        //Commenting out as the event binding breaks for launchers present in lazy generated tabs
        //var $launchers = $Comp.find('.section-launcher');
        //$launchers.noRepeatBind('launcherClick', function (e, desc, data) {
        
        this.attachLauncherEvents($ribbonComp);

        //Adding Double click for fromat Painter
        this.$thisCompElement.find(".format-painter").dblclick(function () {
            self.LogComponentEvent(145, "Ribbon : Home tab : Clipboard group : Format Painter Double Clicked");
        });

        //File Menu Event
        this.$thisCompElement.find(".tab-header-backstage").bind('fileMenu', function () {
            self.LogComponentEvent(124, "Ribbon : File Tab Clicked");
            self.SendMessageToComponents(203, "File Tab Open", {
                accessiblity: self.isAccessible()
            });
        });

        //Wiring font size functionality
        //this.addFontsizeFunctionality();
    },

    attachLauncherEvents: function($ribbonComp){
            var self = this;
            $ribbonComp.noRepeatBind('launcherClick', function (e, desc, data, clickstreamInfo) {
            var sCompDesc = "Ribbon: ";
            var eventid = 9999;
            var currTab = $(e.target).parents(".ribbon-tab-container:first").attr("id");
            if(!clickstreamInfo)  {
                clickstreamInfo = desc;
            }
            switch (desc.toLowerCase()) {
                case "styles":
                    eventid = 4;
                    break;
                case "clipboard":
                    eventid = 41;
                    break;
                case "font":
                    eventid = 42;
                    break;
                case "paragraph":
                    eventid = 43;
                    break;
                case "alignment":
                    eventid = 44;
                    break;
                case "number":
                    eventid = 45;
                    break;
                case "charts":
                    eventid = 46;
                    break;
                case "scale to fit":
                    eventid = 47;
                    break;
                case "sheet options":
                    eventid = 48;
                    break;
                case "page setup":
                    eventid = 49;
                    break;
                case "size":
                    {
                        switch (currTab) {
                            case "ribbon-tab-container-charttoolsformat":
                                eventid = 531;
                                // This stores the value for the attribute CHART_TOOLS_FORMAT_LAUNCHER_GROUP
                                self.chartFormatTablauncherGroup = 'SIZE';
                                break;

                            case "ribbon-tab-container-slicertoolsoptions":
                                eventid = 620;
                                break;

                            default:
                                eventid = 35;
                                break;
                        }
                    }
                    break;
                case "picture styles":
                    eventid = 88;
                    break;
                case "tracking":
                    eventid = 137;
                    break;
                case "shape styles":

                    {
                        switch (currTab) {
                            case "ribbon-tab-container-charttoolsformat":
                                eventid = 531;
                                // This stores the value for the attribute CHART_TOOLS_FORMAT_LAUNCHER_GROUP
                                self.chartFormatTablauncherGroup = 'SHAPE_STYLES';
                                break;

                            default:
                                eventid = 168;
                                break;
                        }
                    }


                    break;
                case "wordart styles":
                    {
                        switch (currTab) {
                            case "ribbon-tab-container-charttoolsformat":
                                eventid = 531;
                                // This stores the value for the attribute CHART_TOOLS_FORMAT_LAUNCHER_GROUP
                                self.chartFormatTablauncherGroup = 'WORDART_STYLES';
                                break;

                            default:
                                eventid = 165;
                                break;
                        }
                    }
                    break;
                case "cell size":
                    eventid = 340;
                    break;
                case "borders":
                    eventid = 34;
                    break;
                case "footnotes":
                    eventid = 451;
                    break;
                case "rows & columns":
                    eventid = 493;
                    break;

                default:
                    break;

            }

            self.LogComponentEvent(eventid, sCompDesc + clickstreamInfo);
        });
    },

    FireSimEvent: function(id, controlEventArgs, clickstreamStr) {
        var self = this;
            if (id !== 241 && id !== 242 && id !== 244 && id !== 245 && id !== 270 && id !== 271 && id !== 315 && id !== 546 && id !== 338 && id != 299 && id != 551 && id != 552 && id != 157) {
            self.LogComponentEvent(id, clickstreamStr);
        }
    },

    ChartSpinButtonEventhandler: function(compEventId, spinCtrlName, finalAttrName, controlEventArgs, clickstreamStr) {
        if (this._compinfo.finalattrs && this._compinfo.finalattrs.attr) {
            var attr = getArray(this._compinfo.finalattrs.attr).findSingle("@name", finalAttrName);
            if (attr) {
                if (this.getSpinVal(spinCtrlName).toString() === attr["@value"].toString()) {
                    this.LogComponentEvent(compEventId, clickstreamStr);
                }
            }
        }
    },
    ShapeHeightChange: function (id, sCompDesc, clickstreamInfo, eventInfo) {
        var self = this;
        if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
            var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "SHAPE_HEIGHT");
            if (attr) {
                if (self.getSpinVal("shape-height1").toString() === attr["@value"].toString()) {
                    self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                }
                else if (eventInfo.spinChangedBy == "enter") {
                    self.LogComponentEvent(9999, "SHAPE_HEIGHT incorrectly changed through keyboard");
                }
            }
        }
    },

    ShapeWidthChange: function (id, sCompDesc, clickstreamInfo, eventInfo) {
        var self = this;
        if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
            var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "SHAPE_WIDTH");
            if (attr) {
                if (self.getSpinVal("shape-width1").toString() === attr["@value"].toString()) {
                    self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                }
                else if (eventInfo.spinChangedBy == "enter") {
                    self.LogComponentEvent(9999, "SHAPE_WIDTH incorrectly changed through keyboard");
                }
            }
        }
    },

    SpacingAfterChange: function (id, sCompDesc, clickstreamInfo, eventInfo) {
        this.LogComponentEvent(id, sCompDesc + clickstreamInfo);
    },

    validatePictureToolSpinBoxValues : function(id, sCompDesc, clickstreamInfo,eventInfo){
        
        var self = this;
        if (self._compinfo.finalattrs && self._compinfo.finalattrs.attr) {
            
            var attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "SHAPE_HEIGHT");
            if (attr) {
                        if (self.getSpinVal("shape-height").toString() === attr["@value"].toString()) {
                    self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                }
                }
                    else {
                        attr = getArray(self._compinfo.finalattrs.attr).findSingle("@name", "PICTURE_HEIGHT");
            if (attr) {
                            if (self.getSpinVal("shape-height").toString() === attr["@value"].toString()) {
                    self.LogComponentEvent(id, sCompDesc + clickstreamInfo);
                }
                }
            }
        }
    },
    RemoveTabFromList: function (attrValue) {

        if (attrValue == "Header Footer Tools" || attrValue == "Header & Footer Tools")
            attrValue = "Header Footer Tools Design";

        this.base(attrValue);
    },

    HideTab: function (attrVal) {

        if (attrVal == "Header Footer Tools" || attrVal == "Header & Footer Tools")
            attrVal = "Header Footer Tools Design";

        var $thisComp = this.$thisCompElement;
        var tabNameMin = attrVal.removeSpaces().replace("&amp;", "").replace("&", "").toLowerCase();

        var $tabHeader = $thisComp.find('.tab-header-' + tabNameMin);
        $tabHeader.hide();

        var headText = $tabHeader.data("head-text");
        if (headText != undefined) {
            var headNameMin = headText.removeSpaces().replace("&", "").toLowerCase();
            var $contextualTabHead = $thisComp.find(".contextual-head-" + headNameMin);

            if ($contextualTabHead != null || $contextualTabHead != undefined) {
                $contextualTabHead.hide();
            }
        }

        if ($thisComp.find(".tab-header-contextual").filter(":visible").length == 0) {
            var $control = $thisComp.find('.title-bar .office-control.ctrl-text');
            $control.css({ "position": "inherit", "top": "6px", "vertical-align": "middle" });
        }

    },

    GenerateHTML: function () {

        this.base();

        var $thisComp = this.$thisCompElement

        var self = this;
        var path = this.controlXMLPath;
        var ribbonGenr = this.ribbonGenerator;

        if (path != null && this.controlXMLUpdate === "true") {

            //Load 1024 ribbon xml for lower resolutions
            if (gSimsAreaWidth < 1279) {

                path = this.controlXMLPath.replace(".xml", "_1024.xml");

            }

            $.ajax({
                async: false,
                url: path,
                success: function (xml) {
                    self.PostSubRibbonAjaxCall(xml);
                }
            });

        }
        if (this.pivotChartToolsFieldButton == "true") {
               this.toggleButton('.office-control.pivot_chart_field_buttons', this.pivotChartToolsFieldButton);
        }

        if (self.galleryUpdateStack.length != 0) {
            for (var i = 0; i < self.galleryUpdateStack.length; i++) {
                self.setSelectedGalleryControlItem(self.galleryUpdateStack[i].classname, self.galleryUpdateStack[i].attrVal);
            }
            //reset galleryUpdateStack as update is complete
            self.galleryUpdateStack.length = 0;
            self.galleryUpdateStack = [];
        }


        if (self.colorTheme != null) {
            $thisComp.children(".ribbon").attr("theme", self.colorTheme);
            self.colorTheme = null;
        }

        //        if (this.pageColor != null) {
        //            this.setColorGridVal('page-color', this.pageColor);
        //        }
        //        if (this.myTabPageColor != null) {
        //            this.setColorGridVal('mytab-page-color', this.myTabPageColor);
        //        }
        //Bind events finally when all xml related generation or updates are done

        //self.AttachComponentEvents(self._compinfo, $thisComp);
    },

    //    UpdateTabAttributes: function (compId, attrList) {
    //        var self = this;
    //
    //        for (var i = 0; i < attrList.length; i++) {
    //            self.SetAttribute(compId, attrList[i].attrName, attrList[i].attrValue);
    //        }
    //
    //
    //    },
    //
    //
    //    UpdateTabSubRibbon: function (subRibbonXML) {
    //
    //        var ribbonGenr = this.ribbonGenerator;
    //
    //        ribbonGenr.updateTabBody(subRibbonXML);
    //    },
    //
    //    LazyLoadTab: function (tabXML, $tabCont) {
    //        var self = this;
    //        var ribbonGenr = this.ribbonGenerator;
    //
    //        var $tabBody = ribbonGenr.getTabBody(tabXML, true);
    //        $tabCont.append($tabBody);
    //
    //        var attrUpdateList = this.attrUpdateList.slice(0); //checkbox, spin_val
    //
    //        if (attrUpdateList.length != 0) {
    //            for (var i = 0; i < attrUpdateList.length; i++)         //try to set attribute value if any
    //            {
    //                if (attrUpdateList[i].attrName == 'CHECKBOX')
    //                    self.toggleCheckBox(attrUpdateList[i].classname, attrUpdateList[i].attrVal);
    //                else if (attrUpdateList[i].attrName == 'SPIN_VAL')
    //                    self.setSpinVal(attrUpdateList[i].classname, attrUpdateList[i].attrVal);
    //            }
    //        }
    //    },

    PostSubRibbonAjaxCall: function(xml){
        //$thisComp.children().remove();
        this.ribbonGenerator.updateRibbonfromXML(xml, this.$thisCompElement.children('.ribbon'), this.AttachSubRibbonWithIdentifier);
        //reset controlXMLUPdate as update is complete
        this.controlXMLUpdate = "false";
        this.AttachSubRibbonWithIdentifier = false;
        //self.AttachComponentEvents(self._compinfo, $thisComp);

    },

    addFontsizeFunctionality: function () {
        var self = this;

        var $incFontSz = this.$thisCompElement.find(".increase-font-sz");
        var $decFontSz = this.$thisCompElement.find(".decrease-font-sz");
        var $fontSize = this.$thisCompElement.find(".font-size");

        var $fontValue = $fontSize.find(".combo-textbox");

        var getNextItem = function () {
            var nCurrentValue = parseInt(self.GetAttribute(null, "FONT_SIZE"));
            var data = $fontSize.data("customdata");
            for (var i = 0; i < data.length; i++) {
                if (data[i] > nCurrentValue) {
                    return data[i];
                }
            }
        };

        var getPrevItem = function () {
            var nCurrentValue = parseInt(self.GetAttribute(null, "FONT_SIZE"));
            var data = $fontSize.data("customdata");
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i] < nCurrentValue) {
                    return data[i];
                }
            }
        };

        $incFontSz.click(function () {
            var nNext = getNextItem();
            if (!nNext) {
                nNext = Math.round((parseInt(self.GetAttribute(null, "FONT_SIZE")) + 10) / 10) * 10;
            }
            self.SetAttribute(null, "FONT_SIZE", nNext);
        });

        $decFontSz.click(function () {
            var nPrev = getPrevItem();
            if (nPrev) {
                self.SetAttribute(null, "FONT_SIZE", nPrev);
            }
        });
    },

    ReceiveComponentMessage: function (compMessageArgs) {
        console.log(this._compinfo.compName + ": Message Id:" + compMessageArgs.MessageId + "  MessageName:" + compMessageArgs.MessageName);
        if (compMessageArgs.MessageId === SIMS.SharedData.UniqueMessages.FM_ESCAPE_PRESS) {

            //console.log(compMessageArgs.MessageDetails.accessiblity);
            if (compMessageArgs.MessageDetails.accessiblity === true) {


                this.goIntoAccessibilityState();
            }
            else {// some code for other states

            }
        }
        else{

            this.base(compMessageArgs); // for contextual ribbon tab handling in BaseRibbon.
        }


        //self.SendMessageToComponents(203, "File Tab Open", { accessiblity: self.isAccessible() });
    },

    setGalleryItem: function (className, attrVal) {
        var value = {};
        value.classname = className;
        value.attrVal = attrVal;
        this.galleryUpdateStack.push(value);

    },

    generateCollapseButton: function ($thisComp) {
        var self = this;
        var container = $thisComp.find(".ribbon-tab-container");

        var btnElement = $("<div></div>").addClass("collapse-button");
        $thisComp.find(".ribbon-tab-container").append(btnElement);
        
        //Button parameters
        var btnHeight = parseInt(btnElement.css("height"));
        var btnWidth = parseInt(btnElement.css("width"));

        var containerWidth = container.outerWidth();
        var $topPos = container.offset().top + container.outerHeight() - btnHeight -2;
        var $leftPos = containerWidth - btnWidth - 1;

        //Generate tooltip of the button
        var tooltipContent = "<b>Collapse the Ribbon (Ctrl+F1)</b><br/><br/>Need a bit more space? Collapse the<br/>ribbon so only the tab names show.";
        var $tooltip = $("<div></div>").addClass("collapse-button-tooltip");
        $tooltip.html(tooltipContent);
        $thisComp.find(".ribbon-tab-container").append($tooltip);

        $($thisComp.find(".ribbon-tab-container .collapse-button")).mouseover(function () {
            $(this).next(".collapse-button-tooltip").delay(1000).fadeIn(200);
        }).mouseout(function () {
            $(this).next(".collapse-button-tooltip").delay(20).fadeOut(200);
        });

        var tooltipTopPos = $topPos + btnHeight + 2;
        var tooltipLeftPos = $leftPos - parseInt($tooltip.css("width"));
        
        $thisComp.find(".ribbon-tab-container .collapse-button").css({ top: $topPos, left: $leftPos });
        $thisComp.find(".ribbon-tab-container .collapse-button-tooltip").css({ top: tooltipTopPos, left: tooltipLeftPos });

        //Attach event to the button
        $thisComp.find(".ribbon-tab-container .collapse-button").bind('click', function () {
            self.LogComponentEvent(1094, "Ribbon : Collapse the Ribbon Button Clicked");
        });
        
    },

    enableRibbonTabEvent: function (attrValue, $thisComp) {
        var self = this;
        var tabList = JSON.parse(attrValue);
        var tabName = null;
        var $tabHeader = null;
        
        $thisComp.find("li.tab-header").unbind("fireEventOnTabClick");;

        for (var i = 0; i < tabList.length; i++) {
            tabName = tabList[i].toLowerCase().replace(/ /g, "");
            $tabHeader = $thisComp.find('.tab-header-' + tabName);
            $tabHeader.attr("enableTabClickEvent", true);

            $tabHeader.unbind('fireEventOnTabClick').bind('fireEventOnTabClick', function () {
                self.LogComponentEvent(1093, "Ribbon : " + tabName + " Tab Clicked", true);
            });
               
        }
    
    },

    //    setAttributeValue: function (attrName, className, attrVal) {
    //        var value = {};
    //        value.classname = className;
    //        value.attrVal = attrVal;
    //        value.attrName = attrName;
    //        this.attrUpdateList.push(value);
    //
    //
    //
    //    },
    //
    //    removeAttrFrmUpdateList: function (attrName, className, attrVal) {
    //        var index = -1;
    //        if (this.attrUpdateList.length != 0) {
    //            for (var i = 0, len = this.attrUpdateList.length; i < len; i++) {
    //                if (this.attrUpdateList[i].classname == className && this.attrUpdateList[i].attrVal == attrVal && this.attrUpdateList[i].attrName == attrName) {
    //                    index = i;
    //                    break;
    //                }
    //            }
    //
    //            if (index != -1) {
    //                this.attrUpdateList.splice(index, 1);         //remove that object
    //            }
    //
    //        }
    //
    //    },


    triggerCloseEvent: function () {

        this.LogComponentEvent(8, "ALT+F4 pressed");

        return true;
    },

    CreateRibbon: function (xml) {
        this.ribbonGenerator.activeTabList = (GetAllValuesOfAnAttribute(this._compID, "ACTIVATE_TAB")).toString().toLowerCase();

        this.ribbonGenerator.activeTabList = this.ribbonGenerator.activeTabList.replace("header & footer tools", "header & footer tools design");
        this.ribbonGenerator.activeTabList = this.ribbonGenerator.activeTabList.replace("header footer tools", "header & footer tools design");

        this.$thisCompElement.append(this.ribbonGenerator.getRibbonFromXml(xml, this.appName));

        this.ribbonGenerator.activeTabList = "";

        //Should be called in GenerateHTML, however due to repeat binding issue kept here
        this.AttachComponentEvents(this._compinfo, this.$thisCompElement);
    },

    Dispose: function () {

        //SIMCMP-3839 : fix for memory leak due to ribbon optimization code changes
        var apps = ["excel", "ppt", "word"];

        if (apps.indexOf(this.appName) !== -1) {    //if excel or ppt where ribbon optimization implemented
            if (this.ribbonGenArr && this.ribbonGenArr.length) {
                for (var i = 0; i < this.ribbonGenArr.length; i++) {
                    this.ribbonGenArr[i].Dispose();
                }
            }
        }

        this.ribbonGenArr = null;

        this.base();
    }
});


