﻿//On load event adding

/*window.onload = function () {
    document.getElementById('btnReadFile').addEventListener('click', readSMSFile.readFileData());
    document.getElementById('btnSendSMS').addEventListener('click', SendSMSMessage.allNumbers())
}*/

var readSMSFile = {
    readFileData: function () {        
        //Getting the first element in the file object
        var f = document.getElementById('files').files[0];
        var reader = new FileReader();
        reader.onloadend = (function (theFile) {
            return function (e) {
                var strResultContent = this.result;
                strResultContent = CryptoJS.AES.encrypt(strResultContent, "123456789");
                strResultContent = CryptoJS.AES.decrypt(strResultContent, "123456789");
                document.getElementById('fileOutput').value = strResultContent.toString(CryptoJS.enc.Utf8);
            };
        })(f);
        reader.readAsText(f);
        //alert('Loaded...');
    }
}

var SendSMSMessage = {
    allNumbers: function () {
        var smsDetail = document.getElementById('fileOutput').value;
        var smsTextDetails = smsDetail.split("\n");
        for (var i = 0, details; details = smsTextDetails[i]; i++) {
            var detailRow = details.split(',');
            var SendNumber = detailRow[1];
            var SendMessage = detailRow[2];
            // alert(SendNumber);
            // alert(SendMessage);            
            app.sendGroup(SendNumber, SendMessage);
        }
    }
}

//Method B - To send SMS
//cordova-plugin-sms 
//This plugin has default option to enable the SMS permission from "App Permission" option
var app = {
    sendGroup: function (number, message) {
        //alert(number);
        //var number = document.getElementById('numberTxt').value.toString(); // iOS: ensure number is actually a string 
        //var message = document.getElementById('messageTxt').value;        
        if (SMS) SMS.sendSMS(number, message, function () { }, function () { });
        alert("SMS sent successfully!");
    }
}



//cordova-sms-plugin
/*var app = {
    sendSms: function () {
        alert("Sending SMS.....");
        var number = document.getElementById('numberTxt').value.toString(); // iOS: ensure number is actually a string
        var message = document.getElementById('messageTxt').value;

        console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                intent: '' // send SMS without opening any other app
            }
        };
        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
    }
};
*/




