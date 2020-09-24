
var WriteMesajCuloare = function(mesaj) {
    console.log('WriteMesajCuloare');
    var ok = document.getElementById("mesajCuloare");
    ok.innerHTML=mesaj;
}


var getclickCuloare = function() {
    console.log('getclick');
    var setCul = document.getElementById("searchButtonCuloare");
    setCul.addEventListener('click', GetCuloare, false);
}

var validationCuloare = function(cul) {
    if(cul === "") return false;
    var imagine = document.createElement("img");
    imagine.style.color = "rgb(0, 0, 0)";
    imagine.style.color = cul;
    if(imagine.style.color !== "rgb(0, 0, 0)") {
        return true;
    }
    imagine.style.color = "rgb(255, 255, 255)";
    imagine.style.color = cul;
    if(imagine.style.color !== "rgb(255, 255, 255)") {
        return true;
    }
    return false;
}

var GetCuloare = function() {
    console.log('GetCuloare');
    var getCul = document.getElementById("searchCuloare");
    var setCul = document.getElementById("Pagina");
    if(validationCuloare(getCul.value) == true) {
        setCul.style.background=getCul.value;
        WriteMesajCuloare("");
    }
    else {
        WriteMesajCuloare("Culoare invalida");
    }
}