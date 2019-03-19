(function () {
    "use strict";

    document.addEventListener("deviceready", init, false);
    function init() {
        console.log("test log");
        window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/index.html", gotFile, fail);

        //alert(cordova.file.applicationDirectory);
        //document.querySelector("#textArea").innerHTML = "this.result";
        // readFile('C:\\Key\\jd-release-key.keystore');
        //This alias is a read-only pointer to the app itself

        //window.re cordova.file.applicationDirectory + "www/index.html", gotFile, fail);

        /* Yes, this works too for our specific example...
        $.get("index.html", function(res) {
            console.log("index.html", res);
        });
        */

    }

    function fail(e) {
        console.log("FileSystem Error");
        console.dir(e);
    }

    function gotFile(fileEntry) {
        console.log("test log 2");
        alert(fileEntry);

        fileEntry.file(function (file) {
            console.log("test log 3");
            var reader = new FileReader();
            reader.onloadend = function (e) {
                console.log("Text is: " + this.result);
                document.querySelector("#textArea").innerHTML = this.result;
            }

            reader.readAsText(file);
        });

    }

})();

var app = {
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
    },


    gotfile2: function (fileEntry) {
        console.log("test log 2");
        alert(fileEntry);

        fileEntry.file(function (file) {
            console.log("test log 3");
            var reader = new FileReader();
            reader.onloadend = function (e) {
                console.log("Text is: " + this.result);
                document.querySelector("#textArea").innerHTML = this.result;
            }

            reader.readAsText(file);
        });

    },

    fileUpload: function () {
        try {
            alert("reading file.....");
            var datafile = document.getElementById('DataFile');
            alert(datafile.value);
            app.gotfile2(datafile);
            /* datafile.file(function (file) {
                 alert("test log 3");
                 var reader = new FileReader();
                 reader.onloadend = function (e) {
                     alert("Text is: " + this.result);
                     document.querySelector("#textArea").innerHTML = this.result;
                 }
                 reader.readAsText(file);
                 alert("completed.....");
             }*/
        }
        catch (err) {
            alert(err.message);
        }
    }
};






//Method B - To send SMS
/*var app = {
    sendSms: function () {
        var number = document.getElementById('numberTxt').value.toString(); // iOS: ensure number is actually a string 
        var message = document.getElementById('messageTxt').value;        
        if (SMS) SMS.sendSMS(number, message, function () { }, function () { });
        alert("SMS sent successfully!");
        navigator.vibrate(2000);
        
    }
};
*/


