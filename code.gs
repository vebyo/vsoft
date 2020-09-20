// get Sheet ID

var sID = "1aJDNJOzK3dR5kdUuLd9noj4WW0Bmi2UKI7rjt3B2sY8";

// get external JSON source
function getJSON(jUrl) {

  var jUrl = "https://script.google.com/macros/s/AKfycbzuAvU8GSLIsrUNI4C6sTkCF0BeAfuH-iwKLJYu5euRMnYu_pI/exec?name=clients&format=json";
  var content = UrlFetchApp.fetch(jUrl); // get feed
  var json = JSON.parse(content.getContentText()); //
  var stringdata = JSON.stringify(json);
  // get items array
  let items = json.items
  // get emails in items array
  let idKeys = items.map(items=>items.idKey)
  let firstNames = items.map(items=>items.firstName)
  
  Logger.log(idKeys);
  
}

function doGet(e) {
var ss = SpreadsheetApp.openById(sID);
var ws = ss.getSheetByName("Options");
var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>';}).join('');
//var list2 = ws.getRange(1,2,ws.getRange("B1").getDataRegion().getLastRow(),1).getValues();
  //var htmlListArray2 = '<option>' + firstNames + '</option>'.join('');
var tmp = HtmlService.createTemplateFromFile("index");
  tmp.list = htmlListArray;
  //tmp.list2 = htmlListArray2;
  return tmp.evaluate();
  
}

function userClicked(userInfo){
    // ss = SpreadSheet | ws = WorkSheet
  var ss = SpreadsheetApp.openById(sID);
  var ws = ss.getSheetByName("Data");
    //Memasukkan Nilai di Kolom Sheet sesuai urutan
  ws.appendRow([userInfo.NISMurid,userInfo.NamaMurid,userInfo.firstName,userInfo.lastName,userInfo.application, userInfo.tanggal,userInfo.debetrek,userInfo.kreditrek, userInfo.chip.join(), new Date()])
}

function getName(KodeNIS) {
  
  var ss = SpreadsheetApp.openById(sID);
  var ws = ss.getSheetByName("Match");
  var data = ws.getRange (1,1, ws.getLastRow(),2).getValues();

  var NISList = data.map(function(r){ return r[0]; }) ;
  var NamaList = data.map(function(r){ return r[1]; }) ;

  var position = NISList.indexOf(KodeNIS);
  if(position > -1){
    return NamaList[position];
  } 
  else {
  return 'NIS Tidak Terdaftar';}

}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getCalendarBusyDays(){
  
  var startDate = new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
	
	var calendar = CalendarApp.getCalendarsByName("vebyoarson@gmail.com")[0];
	var events = calendar.getEvents(startDate, endDate);
  
	var days = events.map(function(e) {return e.getStartTime().setHours(0,0,0,0);});
	var uniqueDays = [];
	
	days.forEach(function(d){
		if(uniqueDays.indexOf(d) === -1){
			uniqueDays.push(d);
		}
	});
	
	return uniqueDays;
}
