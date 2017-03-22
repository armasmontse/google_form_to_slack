// Este es el q funciona


function SendSlackMessage(e){
  // Only include form values that are not blank
  var user_info="";
  for (var key in e.namedValues) {
    var val = e.namedValues[key][0].toString();
    if (val !== "") {
      user_info += key + ': ' + val + '\n';
    }
  }
  var url = "https://slack.com/api/chat.postMessage";
  var payload =
  {
    "token" : "token aquí",
    "as_user" :"true",
    "text" : "Nueva respuesta:\n" + user_info,
    "channel" : "#canal_de _slack", // or whatever
    "type" : "post",
  };
  var options =
  {
    "method" : "POST",
    "payload" : payload,
    "followRedirects" : false,
    "muteHttpExceptions": true
  };
   
  //Hit the Slack API with the request
  var result = UrlFetchApp.fetch(url, options);
   
  //Check the request went through and log errors if necessary
  if (result.getResponseCode() == 200) {
   var params = JSON.parse(result.getContentText());
   Logger.log(params);
  }
}





// manda undifiend u [object, object]
function Initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  //Set a trigger when the form updates the spreadsheet to call our Slack notification function
  ScriptApp.newTrigger("CreateMessage")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
  
}
 
function CreateMessage(e){
  try {
    var spreadsheet, columns;
    var my_message;
 
    //fetch the column names
    spreadsheet = SpreadsheetApp.getActiveSheet();
    columns = spreadsheet.getRange("¿LECO te dió el mejor servicio que jamás has tenido en tu vida?", 1, 1, spreadsheet.getLastColumn()).getValues()[0];
 
    // Only include form values that are not blank
    for (var keys in columns) {
    var key = columns[keys];
      var val = e.namedValues[key] ? e.namedValues[key].toString() : "";
      if (val !== "") {
        my_message +=key + ' :: ' + val + '\n';
      }
    }
    SendSlackMessage(my_message);
 
  } catch (e) {
    Logger.log(e.toString());
  }
}
 
function TestSlack(){
  SendSlackMessage("testing my stuff"); 
}
 
function SendSlackMessage(message){
var url = "https://slack.com/api/chat.postMessage";
   
  var payload =
      {
        "token" : "xoxb-154373944295-SgEDpaf7rkJqtw3Gk1IqvDEO",
        "as_user" :"false",
        "text" : "Nuevo comentario de cliente\n" + message,
        "channel" : "#leco_love_score",
        "attachments" : [{"pretext": "Notification", "text": message}],
        "type" : "post",
      };
   
  var options =
      {
        "method"  : "POST",
        "payload" : payload,   
        "followRedirects" : false,
        "muteHttpExceptions": true
      };
   
  var result = UrlFetchApp.fetch(url, options);
   
  if (result.getResponseCode() == 200) {
     
    var params = JSON.parse(result.getContentText());
     
    Logger.log(params);
  }
}