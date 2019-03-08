function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    var f = files[0];
    // Loop through the FileList and render image files as thumbnails.
    //for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    /*if (!f.type.match('image.*')) {
        continue;
    }*/

    var reader = new FileReader();
    //alert(f);
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            document.querySelector("#fileOutput").innerHTML = e.target.result;
            /*
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" src="', e.target.result,
                '" title="', escape(theFile.name), '"/>'].join('');
            document.getElementById('list').insertBefore(span, null);*/
        };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsText(f);

    //}
}
//document.getElementById('files').addEventListener('change', handleFileSelect, false);

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

var SendSMSMessage = {
    allNumbers: function () {

        var smsDetail = document.getElementById('fileOutput2').value;
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

var readFile = {
    readFileData: function () {
        //Getting the first element in the file object
        var f = document.getElementById('files').files[0];

        var reader = new FileReader();        
        reader.onloadend= (function (theFile) {
            return function (e) {                
                document.getElementById('fileOutput2').value = this.result;                
            };
        })(f);        
        reader.readAsText(f);
        //alert('Loaded...');
    }

}


