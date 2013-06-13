// calendar.js -- displays a monthly or yearly calendar
Calendar.debug = false
// Constants...
var SUNDAY = 0
var MONDAY = 1
var TUESDAY = 2
var WEDNESDAY = 3
var THURSDAY = 4
var FRIDAY = 5
var SATURDAY = 6
// These variables are replaceable by the calling application for localization
// or customization...
Calendar.firstDow = SUNDAY // First day on calendar display
Calendar.weekendDow = [SATURDAY, SUNDAY] // Weekend days
Calendar.fontFace = "Verdana" // Font face/family used for whole calendar
Calendar.pageBgColor = "#FFFFFF" // Page background color
Calendar.monthColor = "#000000" // Month, year text color
//Calendar.monthFontWeight = "" // Font weight ("bold" | "normal")
Calendar.monthFontSize = "10pt" // Font size (i.e., "10pt" | "14px")
Calendar.navbarColor = "#324664" // Navigation bar text color
Calendar.navbarBgColor = "#F2F2F2" // Background color
//Calendar.navbarFontWeight = "bold" // Font weight ("bold" | "normal")
Calendar.navbarFontSize = "10pt" // Font size (i.e., "10pt" | "14px")
Calendar.headerColor = "#000000" // Day of Week heading text color
Calendar.headerBgColor = "#F2F2F2" // Background color
//Calendar.headerFontWeight = "bold" // Font weight ("bold" | "normal")
Calendar.headerFontSize = "8pt" // Font size (i.e., "10pt" | "14px")
//Calendar.dayFontWeight = "bold" // In-month font weight
Calendar.dayFontSize = "10pt" // Font size (i.e., "10pt" | "14px")
//Calendar.paraDayFontWeight = "normal" // Out-of-month font weight
Calendar.paraDayFontSize = "10pt" // Font size (i.e., "10pt" | "14px")
Calendar.todayColor = "red" // Today's text color
Calendar.weekdayColor = "#000000" // Weekday text color
Calendar.weekdayBgColor = "#E0E0E0" // Background color
//Calendar.weekdayFontWeight = "bold" // Font weight ("bold" | "normal")
Calendar.weekdayFontSize = "10pt" // Font size (i.e., "10pt" | "14px")
Calendar.weekendColor = "black" // Weekend text color
Calendar.weekendBgColor = "#E0E0E0" // Weekend background color
Calendar.paraWeekdayColor = "gray" // Out-of-month weekday text color F
Calendar.paraWeekdayBgColor = "#E0E0E0" // Weekday background color
Calendar.paraWeekendColor = "gray" // Weekend text color
Calendar.paraWeekendBgColor = "#E0E0E0"// Weekend background color
Calendar.widthMonth = 250 // Monthly calendar width in pixels
Calendar.heightMonth = 300 // Monthly calendar height in pixels
// Day of week - initialized below
// Months
Calendar.month1 = "January"
Calendar.month2 = "February"
Calendar.month3 = "March"
Calendar.month4 = "April"
Calendar.month5 = "May"
Calendar.month6 = "June"
Calendar.month7 = "July"
Calendar.month8 = "August"
Calendar.month9 = "September"
Calendar.month10 = "October"
Calendar.month11 = "November"
Calendar.month12 = "December"
var df = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat")
// Misc
Calendar.today = "Today"
Calendar.title = "Calendar"
// Internal variables ---------------------------------------------------------
Calendar.gNow = new Date();
Calendar.ggWinCal;
Calendar.isNav = ( navigator.appName.indexOf( "Netscape" ) != -1 ) ? true : false;
Calendar.isIE = ( navigator.appName.indexOf( "Microsoft" ) != -1 ) ? true : false;
// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();
// Global Variables
global_var = 0;
// class Calendar -------------------------------------------------------------
function Calendar( p_item, p_WinCal, p_month, p_year, p_format )
{
if( ( p_month == null ) && ( p_year == null ) )	return;
// Functions -----------------------------------------------
this.calcMonthYear = Calendar_calcMonthYear;
this.calData = Calendar_calData
this.calHeader = Calendar_calHeader
this.fixupTags = Calendar_fixupTags
this.formatData = Calendar_formatData
this.getDaysOfMonth = Calendar_getDaysOfMonth;
this.getMonth = Calendar_getMonth
this.getMonthlyCalendarCode = Calendar_getMonthlyCalendarCode
this.isWeekend = Calendar_isWeekend
this.print = Calendar_print;
this.replaceStr = Calendar_replaceStr
this.show = Calendar_show
this.showY = Calendar_showY
this.writeWeekendString = Calendar_writeWeekendString
this.wwrite = Calendar_wwrite
this.wwriteA = Calendar_wwriteA
// Initialization ------------------------------------------
if( p_WinCal == null )
this.gWinCal = Calendar.ggWinCal;
else
this.gWinCal = p_WinCal;
this.gYear = p_year;
this.gFormat = p_format;
this.gReturnItem = p_item;
// Initialize the days of the week
this.Dow = new Array()
for( i = 0; i < 7; i++ )
{
this.Dow[i] = df[i]
}
// Initialize the month names
this.Month = new Array()
this.Month[0] = Calendar.month1
this.Month[1] = Calendar.month2
this.Month[2] = Calendar.month3
this.Month[3] = Calendar.month4
this.Month[4] = Calendar.month5
this.Month[5] = Calendar.month6
this.Month[6] = Calendar.month7
this.Month[7] = Calendar.month8
this.Month[8] = Calendar.month9
this.Month[9] = Calendar.month10
this.Month[10] = Calendar.month11
this.Month[11] = Calendar.month12
if( p_month == null ) 
{
this.gMonthName = null;
this.gMonth = null;
this.gYearly = true;
} 
else 
{
this.gMonthName = this.getMonth( p_month );
this.gMonth = new Number( p_month );
this.gYearly = false;
}
// Non-Leap year Month days..
this.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
this.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
this.gNowDay = Calendar.gNow.getDate();
this.gNowMonth = Calendar.gNow.getMonth();
this.gNowYear = Calendar.gNow.getFullYear();
}
// Create the calendar --------------------------------------------------------
function Calendar_build( p_item, p_month, p_year, p_format )
{
var p_WinCal = Calendar.ggWinCal;
gCal = new Calendar( p_item, p_WinCal, p_month, p_year, p_format );
// Choose appropriate show function
if( gCal.gYearly )
gCal.showY();
else
gCal.show();
}
// Return the value to the form -----------------------------------------------
function Calendar_select( monthday )
{
var vMonth = gCal.gMonth;
setarrival(vMonth, monthday-1);
Calendar.ggWinCal.close()
}
// Return an array with months/years ------------------------------------------
function Calendar_calcMonthYear( p_Month, p_Year, incr )
{
/*
Will return an 1-D array with 1st element being the calculated month 
and second being the calculated year 
after applying the month increment/decrement as specified by 'incr' parameter.
'incr' will normally have 1/-1 to navigate thru the months.
*/
var ret_arr = new Array();
if( incr == -1 ) {
// B A C K W A R D
if( p_Month == 0 ) {
ret_arr[0] = 11;
ret_arr[1] = parseInt( p_Year ) - 1;
}
else {
ret_arr[0] = parseInt( p_Month ) - 1;
ret_arr[1] = parseInt( p_Year );
}
} else if( incr == 1 ) {
// F O R W A R D
if( p_Month == 11 ) {
ret_arr[0] = 0;
ret_arr[1] = parseInt( p_Year ) + 1;
}
else {
ret_arr[0] = parseInt( p_Month ) + 1;
ret_arr[1] = parseInt( p_Year );
}
}
return ret_arr;
}
// Write the data to the document ---------------------------------------------
function Calendar_calData()
{
var vDate = new Date();
vDate.setDate( 1 );
vDate.setMonth( this.gMonth );
vDate.setFullYear( this.gYear );
var vFirstDay = ( vDate.getDay() + 7 - Calendar.firstDow ) % 7
var vDay = 1;
var vLastDay = this.getDaysOfMonth( this.gMonth, this.gYear );
var vOnLastDay = false;
var vCode = "";
var vLastMonth = (this.gMonth > 0 ? this.gMonth - 1 : 11 )
//alert ("Tekushtia mesec: "+vDate.getMonth());
var vLastMonthYear = ( this.gMonth > 0 ? this.gYear : this.gYear - 1 )
var vLastMonthLastDay = this.getDaysOfMonth( vLastMonth, vLastMonthYear )
var vParaDay = vLastMonthLastDay - vFirstDay + 1
var isWeekend = false
var bgColor = ""
var vClass = ""
vCode += "<tr>";
// Place out-of-month days in the blanks...
for( i = 0; i < vFirstDay; i++ )
{
isWeekend = this.isWeekend( i )
bgColor = ( isWeekend ? Calendar.paraWeekendBgColor : Calendar.paraWeekdayBgColor )
vClass = ( isWeekend ? "para-weekend" : "para-weekday" )
vCode += "<td bgcolor='" + bgColor + "'>" +
"<span class='" + vClass + "'>" + vParaDay + "</span>" + "</td>";
vParaDay += 1
}
// Write rest of the 1st week
for( j = vFirstDay; j < 7; j++ )
{
isWeekend = this.isWeekend( j )
isToday = ( vDay == this.gNowDay && this.gMonth == this.gNowMonth && this.gYear == this.gNowYear )
bgColor = ( isWeekend ? Calendar.weekendBgColor : Calendar.weekdayBgColor )
//vClass = ( isToday ? "today" : isWeekend ? "weekend" : "weekday" )
if ( (vDay < this.gNowDay && this.gMonth == this.gNowMonth && this.gYear == this.gNowYear)
|| (vDay > this.gNowDay && this.gMonth == this.gNowMonth && this.gYear == (this.gNowYear +1 ) ) )
{
vClass = ( isWeekend ? "para-weekend" : "para-weekday" );
vCode += "<td width='14%' bgcolor='" + bgColor + "'>" + "<span class='" + vClass + "'>" + vDay + "</span>" + "</td>";
} else
{
vClass = ( isToday ? "today" : isWeekend ? "weekend" : "weekday" );
vCode = vCode + "<td width='14%' bgcolor='" + bgColor + "'>" +
"<a href=\"JavaScript:self.opener.Calendar_select( " + vDay + " )\" " + "class='" + vClass + "' " + ">" + vDay + "</a>" + "</td>";
}
vDay = vDay + 1;
}
vCode = vCode + "</tr>";
// Write the rest of the weeks
for( k = 2; k < 7; k++ )
{
vCode = vCode + "<tr>";
for( j = 0; j < 7; j++ )
{
isWeekend = this.isWeekend( j )
isToday = ( vDay == this.gNowDay && this.gMonth == this.gNowMonth && this.gYear == this.gNowYear )
bgColor = ( isWeekend ? Calendar.weekendBgColor : Calendar.weekdayBgColor )
//vClass = ( isToday ? "today" : isWeekend ? "weekend" : "weekday" )
if ( (vDay < this.gNowDay && this.gMonth == this.gNowMonth && this.gYear == this.gNowYear)
|| (vDay > this.gNowDay && this.gMonth == this.gNowMonth && this.gYear == (this.gNowYear +1 ) ) )
{
vClass = ( isWeekend ? "para-weekend" : "para-weekday" );
vCode += "<td width='14%' bgcolor='" + bgColor + "'>" + "<span class='" + vClass + "'>" + vDay + "</span>" + "</td>";
} else
{
vClass = ( isToday ? "today" : isWeekend ? "weekend" : "weekday" );
vCode = vCode + "<td width='14%' bgcolor='" + bgColor + "'>" +
"<a href=\"JavaScript:self.opener.Calendar_select( " + vDay + " )\" " + "class='" + vClass + "' " + ">" + vDay + "</a>" + "</td>";
}
vDay=vDay + 1;
if( vDay > vLastDay ) {
vOnLastDay = true;
break;
}
}
if( j == 6 )
vCode = vCode + "</tr>";
if( vOnLastDay )
break;
}
// Fill up the rest of last week days in following month...
for( m = 1; m < ( 7 - j ); m++ ) 
{
if( this.gYearly )
vCode = vCode + "<td width='14%'" + this.writeWeekendString( j + m ) + ">" +
"<span class='text'>i??</span></td>";
else
{
isWeekend = this.isWeekend( m + j )
bgColor = ( isWeekend ? Calendar.paraWeekendBgColor : Calendar.paraWeekdayBgColor )
vClass = ( isWeekend ? "para-weekend" : "para-weekday" )
vCode += "<td width='14%' bgcolor='" + bgColor + "'>" +
"<span class='" + vClass + "'>" + m + "</span>" +
"</td>";
}
}
return vCode;
}
// Write the header to the document -------------------------------------------
function Calendar_calHeader()
{
var vCode = "";
var dow = new Array()
var i, j
// Adjust for different first day of the week...
for( i = 0; i < 7; i++ )
// dow[i] = this.Dow[( ( i + Calendar.firstDow ) % 7 )]
dow[i] = df[( ( i + Calendar.firstDow ) % 7 )]
vCode = vCode + "<tr bgcolor='" + Calendar.headerBgColor + "'>";
vCode = vCode + "<td width='14%' class='header'>" + dow[0] + "</td>";
vCode = vCode + "<td width='14%' class='header'>" + dow[1] + "</td>";
vCode = vCode + "<td width='14%' class='header'>" + dow[2] + "</td>";
vCode = vCode + "<td width='14%' class='header'>" + dow[3] + "</td>";
vCode = vCode + "<td width='14%' class='header'>" + dow[4] + "</td>";
vCode = vCode + "<td width='14%' class='header'>" + dow[5] + "</td>";
vCode = vCode + "<td width='14%' class='header'>" + dow[6] + "</td>";
vCode = vCode + "</tr>";
return vCode;
}
// Close the calendar ---------------------------------------------------------
function Calendar_close()
{
if( Calendar.ggWinCal != null )
Calendar.ggWinCal.close()
}
// Change tags to output to debugging screen ----------------------------------
function Calendar_fixupTags( wtext )
{
orig = new String( wtext )
orig = this.replaceStr( orig, "<br>", "*br*" )
orig = this.replaceStr( orig, " ", "&nbsp" )
orig = this.replaceStr( orig, "<", "<" )
orig = this.replaceStr( orig, ">", ">" )
orig = this.replaceStr( orig, "*br*", "<br>" )
return orig
}
// Format the day of week data ------------------------------------------------
function Calendar_formatData( p_day )
{
var vData;
var vMonth = 1 + this.gMonth;
vMonth = ( vMonth.toString().length < 2 ) ? "0" + vMonth : vMonth;
var vMon = this.getMonth( this.gMonth ).substr( 0, 3 ).toUpperCase();
var vFMon = this.getMonth( this.gMonth ).toUpperCase();
var vY4 = new String( this.gYear );
var vY2 = new String( this.gYear.substr( 2,2 ) );
var vDD = ( p_day.toString().length < 2 ) ? "0" + p_day : p_day;
switch( this.gFormat )
{
case "MM\/DD\/YYYY" :
vData = vMonth + "\/" + vDD + "\/" + vY4;
break;
case "MM\/DD\/YY" :
vData = vMonth + "\/" + vDD + "\/" + vY2;
break;
case "MM-DD-YYYY" :
vData = vMonth + "-" + vDD + "-" + vY4;
break;
case "MM-DD-YY" :
vData = vMonth + "-" + vDD + "-" + vY2;
break;
case "DD\/MON\/YYYY" :
vData = vDD + "\/" + vMon + "\/" + vY4;
break;
case "DD\/MON\/YY" :
vData = vDD + "\/" + vMon + "\/" + vY2;
break;
case "DD-MON-YYYY" :
vData = vDD + "-" + vMon + "-" + vY4;
break;
case "DD-MON-YY" :
vData = vDD + "-" + vMon + "-" + vY2;
break;
case "DD\/MONTH\/YYYY" :
vData = vDD + "\/" + vFMon + "\/" + vY4;
break;
case "DD\/MONTH\/YY" :
vData = vDD + "\/" + vFMon + "\/" + vY2;
break;
case "DD-MONTH-YYYY" :
vData = vDD + "-" + vFMon + "-" + vY4;
break;
case "DD-MONTH-YY" :
vData = vDD + "-" + vFMon + "-" + vY2;
break;
case "DD\/MM\/YYYY" :
vData = vDD + "\/" + vMonth + "\/" + vY4;
break;
case "DD\/MM\/YY" :
vData = vDD + "\/" + vMonth + "\/" + vY2;
break;
case "DD-MM-YYYY" :
vData = vDD + "-" + vMonth + "-" + vY4;
break;
case "DD-MM-YY" :
vData = vDD + "-" + vMonth + "-" + vY2;
break;
default :
vData = vMonth + "\/" + vDD + "\/" + vY4;
}
return vData;
}
// Return the number of days in the month -------------------------------------
function Calendar_getDaysOfMonth( monthNo, p_year )
{
/*
Check for leap year ..
1.Years evenly divisible by four are normally leap years, except for...
2.Years also evenly divisible by 100 are not leap years, except for...
3.Years also evenly divisible by 400 are leap years.
*/
if( ( p_year % 4 ) == 0 ) {
if( ( p_year % 100 ) == 0 && ( p_year % 400 ) != 0 )
return this.DOMonth[monthNo];
return this.lDOMonth[monthNo];
} else
return this.DOMonth[monthNo];
}
// Return the month name ------------------------------------------------------
function Calendar_getMonth( monthNo ) 
{
return this.Month[monthNo];
}
// Draw the calendar ----------------------------------------------------------
function Calendar_getMonthlyCalendarCode() 
{
var vCode = "";
var vHeader_Code = "";
var vData_Code = "";
// Begin Table Drawing code here..
vCode = vCode + "<table border=0 bgcolor=\"" + Calendar.weekdayBgColor + "\">";
vHeader_Code = this.calHeader();
vData_Code = this.calData();
vCode = vCode + vHeader_Code + vData_Code;
vCode = vCode + "</table>";
return vCode;
}
// Return true if dow is weekend day ------------------------------------------
function Calendar_isWeekend( vday )
{
var i;
vday = ( vday + Calendar.firstDow ) % 7
// Return special formatting for the weekend day.
for( i = 0; i < Calendar.weekendDow.length; i++ ) 
{
if( vday == Calendar.weekendDow[i] )
return true
}
return false
}
// Print the calendar ---------------------------------------------------------
function Calendar_print() {
Calendar.ggWinCal.print();
}
// Replace characters in the string -------------------------------------------
function Calendar_replaceStr( wtext, findText, replaceText )
{
var orig = new String( wtext );
var pos = orig.indexOf( findText ), len = findText.length;
while( pos != -1 )
{
pre = orig.substring( 0, pos )
post = orig.substring( pos + len, orig.length )
orig = pre + replaceText + post
pos = orig.indexOf( findText )
}
return orig
}
// Display the calendar -------------------------------------------------------
function Calendar_show()
{
var vCode = "";
this.gWinCal.document.open();
// Setup the page...
this.wwrite( "<html>" );
this.wwrite( "<head>" );
this.wwrite( "<title>" + Calendar.title + "</title>" );
this.wwrite( "<meta http-equiv=\"content-type\" content=\"text/html; charset=ISO-8859-1\">" );
// Write the CSS in the header portion of the page...
this.wwrite( "<style type='text/css'>" );
// Month heading style
this.wwrite( ".month{ " +
"font-weight:" + Calendar.monthFontWeight + ";" +
"font-size:" + Calendar.monthFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.monthColor + ";" +
"}" );
// Navigation bar style
this.wwrite( ".navbar{ " +
"font-weight:" + Calendar.navbarFontWeight + ";" +
"font-size:" + Calendar.navbarFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.navbarColor + ";" +
"text-decoration:none;" +
"}" );
// Day of Week heading style
this.wwrite( ".header{ " +
"font-weight:" + Calendar.headerFontWeight + ";" +
"font-size:" + Calendar.headerFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.headerColor + ";" +
"}" );
// Weekday style...
this.wwrite( ".weekday{ " +
"font-weight:" + Calendar.dayFontWeight + ";" +
"font-size:" + Calendar.dayFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.weekdayColor + ";" +
"text-decoration:none;" +
"}" );
// Weekday style...
this.wwrite( ".today{ " +
"font-weight:" + Calendar.dayFontWeight + ";" +
"font-size:" + Calendar.dayFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.todayColor + ";" +
"text-decoration:none;" +
"}" );
// Day of week style for out-of-month dates...
this.wwrite( ".para-weekday{ " +
"font-weight:" + Calendar.paraDayFontWeight + ";" +
"font-size:" + Calendar.paraDayFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.paraWeekdayColor + ";" +
"}" );
// weekend style...
this.wwrite( ".weekend{ " +
"font-weight:" + Calendar.dayFontWeight + ";" +
"font-size:" + Calendar.dayFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.weekendColor + ";" +
"text-decoration:none;" +
"}" );
// weekend style for out-of-month dates...
this.wwrite( ".para-weekend{ " +
"font-weight:" + Calendar.paraDayFontWeight + ";" +
"font-size:" + Calendar.paraDayFontSize + ";" +
"font-family:" + Calendar.fontFace + ";" +
"color:" + Calendar.paraWeekendColor + ";" +
"}" );
this.wwrite( "</style>" );
this.wwrite( "</head>" );
this.wwrite( "<table border='0'><tr><td>" );
this.wwrite( "<body bgcolor=\"" + Calendar.pageBgColor + "\" >" )
this.wwriteA( "<span class='month'>" )
this.wwriteA( this.gMonthName + " " + this.gYear );
this.wwriteA( "</span><br>" );
// Show navigation buttons
var prevMMYYYY = this.calcMonthYear( this.gMonth, this.gYear, -1 );
var prevMM = prevMMYYYY[0];
var prevYYYY = prevMMYYYY[1];
var nextMMYYYY = this.calcMonthYear( this.gMonth, this.gYear, 1 );
var nextMM = nextMMYYYY[0];
var nextYYYY = nextMMYYYY[1];
this.wwrite( "<table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='" + Calendar.navbarBgColor + "'><tr><td align='center'>" );
/*	this.wwrite( "<a class='navbar' href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + ( parseInt( this.gYear )-1 ) + "', '" + this.gFormat + "'" +
" );" +
"\"><<<\/a></td><td align=center>" );
*/
// Show the link of previus month or not if the month is less than NowMonth
if (this.gMonth == this.gNowMonth && this.gYear == this.gNowYear){
this.wwrite("<</td><td align=center>" );
} else {
this.wwrite( "<a class='navbar'href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
" );" + "\"><<\/a></td><td align=center>" );
}
this.wwrite( "<a class='navbar'href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', '" + Calendar.gNow.getMonth() + "', '" + Calendar.gNow.getFullYear() + "', '" + this.gFormat + "'" +
" );" +
"\">" + Calendar.today + "<\/a></td><td align=center>" );
// Show the link of next month or not if the month is more than NowMonth + 1 Year
if (this.gMonth == this.gNowMonth && (this.gYear == this.gNowYear + 1) ) {
this.wwrite( "><\/a></td></tr></table><br>" );
} else {
this.wwrite( "<a class='navbar'href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
" );" + "\">><\/a></td></tr></table><br>" );
}
/* To uncomment if the next/prev year want to be visible! =======.
this.wwrite( "<a class='navbar'href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
" );" +
"\">><\/a></td><td align=center>" );
this.wwrite( "<a class='navbar'href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + ( parseInt( this.gYear )+1 ) + "', '" + this.gFormat + "'" +
" );" +
"\">>><\/a></td></tr></table><br>" );
*/
// Get the complete calendar code for the month..
vCode = this.getMonthlyCalendarCode();
this.wwrite( vCode );
this.wwrite( "</font><br></td></tr></table></body></html>" );
this.gWinCal.document.close();
}
// Show the yearly calendar ---------------------------------------------------
function Calendar_showY()
{
var vCode = "";
var i;
var vr, vc, vx, vy;	// Row, Column, X-coord, Y-coord
var vxf = 285;	// X-Factor
var vyf = 200;	// Y-Factor
var vxm = 10;	// X-margin
var vym;	// Y-margin
if( Calendar.isIE )	vym = 75;
else if( Calendar.isNav )	vym = 25;
this.gWinCal.document.open();
this.wwrite( "<html>" );
this.wwrite( "<head><title>" + Calendar.title + "</title>" );
this.wwrite( "<style type='text/css'>\n<!--" );
for( i=0; i<12; i++ ) {
vc = i % 3;
if( i>=0 && i<= 2 )	vr = 0;
if( i>=3 && i<= 5 )	vr = 1;
if( i>=6 && i<= 8 )	vr = 2;
if( i>=9 && i<= 11 )	vr = 3;
vx = parseInt( vxf * vc ) + vxm;
vy = parseInt( vyf * vr ) + vym;
this.wwrite( ".lclass" + i + " {position:absolute;top:" + vy + ";left:" + vx + ";}" );
}
this.wwrite( "-->\n</style>" );
this.wwrite( "</head>" );
this.wwrite( "<body>" )
this.wwrite( "<font face='" + Calendar.fontFace + "' size=2>" );
this.wwrite( "Year : " + this.gYear );
this.wwrite( "<br>" );
// Show navigation buttons
var prevYYYY = parseInt( this.gYear ) - 1;
var nextYYYY = parseInt( this.gYear ) + 1;
this.wwrite( "<table width='200' border=0 cellspacing=0 cellpadding=0 ><tr><td align=center>" );
this.wwrite( "[<a href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
" );" +
"\" alt='Prev Year'><<<\/a>]</td><td align=center>" );
this.wwrite( "[<a href=\"javascript:window.print();\">Print</a>]</td><td align=center>" );
this.wwrite( "[<a href=\"" +
"javascript:window.opener.Calendar_build( " +
"'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
" );" +
"\"><\/a>]</td></tr></table><br>" );
// Get the complete calendar code for each month..
var j;
for( i=11; i>=0; i-- ) {
if( Calendar.isIE )
this.wwrite( "<div id=\"layer" + i + "\" class=\"lclass" + i + "\">" );
else if( Calendar.isNav )
this.wwrite( "<layer id=\"layer" + i + "\" class=\"lclass" + i + "\">" );
this.gMonth = i;
this.gMonthName = this.getMonth( this.gMonth );
vCode = this.getMonthlyCalendarCode();
this.wwrite( this.gMonthName + "/" + this.gYear + "<br>" );
this.wwrite( vCode );
if( Calendar.isIE )
this.wwrite( "</div>" );
else if( Calendar.isNav )
this.wwrite( "</layer>" );
}
this.wwrite( "</font><br></td></tr></table</body></html>" );
this.gWinCal.document.close();
}
// Write the weekend string ---------------------------------------------------
function Calendar_writeWeekendString( vday )
{
var i;
// Return special formatting for the weekend day.
for( i=0; i<Calendar.weekendDow.length; i++ ) {
if( vday == Calendar.weekendDow[i] )
return ( " bgcolor=\"" + Calendar.weekendBgColor + "\"" );
}
return "";
}
// Write text to the document -------------------------------------------------
function Calendar_wwrite( wtext )
{
if( Calendar.debug )
{
wtext = wtext + "<br>"
wtext = this.fixupTags( wtext )
this.gWinCal.document.writeln( wtext );
}
else
this.gWinCal.document.writeln( wtext );
}
// Write a line to the document -----------------------------------------------
function Calendar_wwriteA( wtext )
{
if( Calendar.debug )
{
wtext = this.fixupTags( wtext )
this.gWinCal.document.write( wtext );
}
else
this.gWinCal.document.write( wtext );
}
// Display the calendar -------------------------------------------------------
function calendarShow(out_ret) {
/*
p_item	: Name of field to populate for return.
p_month : 0-11 for Jan-Dec; 12 for All Months.
p_year	: 4-digit year.
p_format: Date format ( mm/dd/yyyy, dd/mm/yy, ... )
*/
global_var = out_ret;
p_item = arguments[0];
if( arguments[1] == null )
p_month = new String( Calendar.gNow.getMonth() );
else
p_month = arguments[1];
if( arguments[2] == "" || arguments[2] == null )
p_year = new String( Calendar.gNow.getFullYear().toString() );
else
p_year = arguments[2];
if( arguments[3] == null )
p_format = "MM/DD/YYYY";
else
p_format = arguments[3];
if( Calendar.debug )
vWinCal = window.open( "", "Calendar", "" )
else
vWinCal = window.open( "", "Calendar",
"width=" + Calendar.widthMonth +
",height=" + Calendar.heightMonth +
",status=yes,resizable=yes,top=200,left=200" );
//	",status=no,resizable=no,top=200,left=200" );
//vWinCal.opener = self;
vWinCal.focus();
Calendar.ggWinCal = vWinCal;
Calendar_build( p_item, p_month, p_year, p_format );
}
// Display the yearly calendar --------------------------------
/*function calendarShowYear( p_item, p_year, p_format )
{
// Load the defaults..
if( p_year == null || p_year == "" )
p_year = new String( Calendar.gNow.getFullYear().toString() );
if( p_format == null || p_format == "" )
p_format = "MM/DD/YYYY";
var vWinCal = window.open( "", "Calendar", "scrollbars=yes" );
vWinCal.opener = self;
Calendar.ggWinCal = vWinCal;
Calendar_build( p_item, null, p_year, p_format );
}
*/
//return info
function setarrival(jsmo,jsday) {
if (document.afpForm && global_var == 1) {
document.afpForm.outmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.retmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.outday.options.selectedIndex=parseInt(jsday);
}
else if (document.afpForm && global_var == 2) {
document.afpForm.retmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.retday.options.selectedIndex=parseInt(jsday);
}
else if (document.afpForm && global_var == 3) {
document.afpForm.pupmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.doffmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.pupday.options.selectedIndex=parseInt(jsday);
}
else if (document.afpForm && global_var == 4) {
document.afpForm.doffmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.doffday.options.selectedIndex=parseInt(jsday);
}
else if (document.afpForm && global_var == 5) {
document.afpForm.cinmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.cotmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.cinday.options.selectedIndex=parseInt(jsday);
}
else if (document.afpForm && global_var == 6) {
document.afpForm.cotmonth.options.selectedIndex=parseInt(jsmo);
document.afpForm.cotday.options.selectedIndex=parseInt(jsday);
}
return;
}