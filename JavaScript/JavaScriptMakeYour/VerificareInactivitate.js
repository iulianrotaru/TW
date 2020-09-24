///WriteMesaje();
var activityInput;
var WriteMesajTimpInactiv = function(secunde) {
    console.log('WriteMesajTimpInactiv');
    document.getElementById("Inactivitate").style.width = "100%";
    document.getElementById("Inactivitate").style.height = "100%";
    document.getElementById("Inactivitate").style.opacity = "1";
    document.getElementById("Inactivitate").style.backgroundColor = "red";
    document.getElementById("Inactivitate").style.top = "0px";
    document.getElementById("Inactivitate").style.left = "0px";
    document.getElementById("Inactivitate").style.zIndex = "1000";
    document.getElementById("Inactivitate").style.position = "absolute";
    var ok = document.getElementById("mesajTimpInactiv");
    if(secunde == 0) {
        document.getElementById("Inactivitate").style.position = "initial";
        ok.innerHTML = "";
        return ;
    }
    ok.innerHTML="Ai fost inactiv " + secunde + " secunde";
}


var timpInactivitate = 0;
var timpAsteptare = 500;

function myTimerTT() {
    timpInactivitate++;
    if(timpInactivitate > timpAsteptare) {
        WriteMesajTimpInactiv(parseInt(timpInactivitate));
    }
}

function myStopFunctionTT() {
    clearInterval(myTime);
}

var activity = function() {
    timpInactivitate = 0;
    WriteMesajTimpInactiv(0);
}

var MainFunctionVerificareInactivitate = function() {
    var myTime = setInterval(myTimerTT, 1000);

    var activityEvents = [
        'mousedown', 'mousemove', 'keydown',
        'scroll', 'touchstart'
    ];

    activityEvents.forEach(function(eventName) {
        document.addEventListener(eventName, activity, true);
    });
}