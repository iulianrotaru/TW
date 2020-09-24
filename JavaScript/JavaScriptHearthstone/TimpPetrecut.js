///WriteMesaje();
var WriteMesajTimpPetrecut = function(minute,secunde) {
    console.log('WriteMesajTimpPetrecut');
    var ok = document.getElementById("mesajTimpPetrecut");
    ok.innerHTML="";
    if(minute > 0) {
        if(minute == 1) {
            ok.innerHTML += "un minut ";
        }
        else {
            ok.innerHTML += minute + " minute ";
        }
    }

    if(secunde == 1) {
        ok.innerHTML += "o secunda";
    }
    else {
        ok.innerHTML += secunde + " secunde";
    }
}
var afisezValueLocalStorage = function() {
    console.log('WriteValueLocalStorage');
    var secunde = localStorage.getItem("Secunde")?localStorage.getItem("Secunde"):"0";
    var minute = localStorage.getItem("Minute")?localStorage.getItem("Minute"):"0";
    WriteMesajTimpPetrecut(minute,secunde);
}

var crescValueLocalStorage = function() {
    console.log('crescValueLocalStorage');
    var secunde = localStorage.getItem("Secunde")?localStorage.getItem("Secunde"):"0";
    var minute = localStorage.getItem("Minute")?localStorage.getItem("Minute"):"0";
    secunde = parseInt(secunde) + 1;
    if(secunde == 60) {
        secunde = 0;
        minute = parseInt(minute) + 1;
    }
    localStorage.setItem("Secunde",secunde);
    localStorage.setItem("Minute",minute);
}

var resetValueLocalStorage = function() {
    console.log('resetValueLocalStorage');
    localStorage.setItem("Secunde",0);
    localStorage.setItem("Minute",0);
}

function myTimerT() {
    crescValueLocalStorage();
    afisezValueLocalStorage();
}

function myStopFunctionT() {
    clearInterval(myTime);
}

var MainTimpPetrecut = function() {
    afisezValueLocalStorage();
    
    var myTime = setInterval(myTimerT, 1000);
    ///resetValueLocalStorage();
}
MainTimpPetrecut();
///trebuie sa mai adaug ceva la descriere pentru localstorage astfel incat sa fie pentru fiecare pagina in parte