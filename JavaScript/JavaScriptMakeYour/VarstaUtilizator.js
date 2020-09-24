///WriteMesaje();
var birthdayDate = [0,0,0];

var WriteMesajVarsta = function(mesaj) {
    console.log('WriteMesajVarsta'+mesaj);
    var ok = document.getElementById("mesajVarsta");
    ok.innerHTML=mesaj;
}

var WriteMesajCorectVarsta = function(date) {
    var res = "";
    var ok = 0;
    if(date[0] > 0 || ok == 1)
    {
        if(date[0] == 1) {
            res += "1 an ";
        }
        else {
            res += date[0] + " ani ";
        }
        ok = 1;
    }

    if(date[1] > 0 || ok == 1)
    {
        if(date[1] == 1) {
            res += " o luna ";
        }
        else {
            res += date[1] + " luni ";
        }
        ok = 1;
    }

    if(date[2] > 0 || ok == 1)
    {
        if(date[2] == 1) {
            res += " o zi, ";
        }
        else {
            res += date[2] + " zile, ";
        }
        ok = 1;
    }

    if(date[3] > 0 || ok == 1)
    {
        if(date[3] == 1) {
            res += " o ora ";
        }
        else {
            res += date[3] + " ore ";
        }
        ok = 1;
    }

    if(date[4] > 0 || ok == 1)
    {
        if(date[4] == 1) {
            res += " un minut ";
        }
        else {
            res += date[4] + " minute ";
        }
        ok = 1;
    }

    if(date[5] > 0 || ok == 1)
    {
        if(date[5] == 1) {
            res += " o secunda ";
        }
        else {
            res += date[5] + " secunde";
        }
        ok = 1;
    }
    WriteMesajVarsta(res);
}

var getclickVarsta = function() {
    console.log('getclickVarsta');

    var setCul = document.getElementById('searchButtonVarsta');
    setCul.addEventListener('click', GetVarsta, false);

    var myVar = setInterval(myTimer, 1000);
}

var GetVarsta = function() {
    console.log('GetVarsta');
    var getVar = document.getElementById('searchVarsta');
    var info = getVar.value.toString().split('#');
    if(info.length < 3 || info.length > 3) {
        WriteMesajVarsta("Ai introdus o data incorecta");
        return ;
    }
    var data = [parseInt(info[2]),parseInt(info[1]),parseInt(info[0])];

    if(checkCorectDate(data)) ;
    else {
        WriteMesajVarsta("Ai introdus o data incorecta");
        return ;
    }

    var today = new Date();
    var a = today.getFullYear();
    var l = today.getMonth() + 1;
    var z = today.getDate();
    var curentDate = [a,l,z];

    if(checkYouAreBorn(data,curentDate)) ;
    else {
        WriteMesajVarsta("Nu esti nascut");
        return ;
    }

    birthdayDate = data;
    myTimer();
}

////      Trebuie sa fac o functie care sa-mi returnez diferenta dintre 2 dati exprimate in ZZ LL YYYY avand acelasi format
var adjustMonth = function(date) {
    if(date[1] < 0) {
        date[0] --;
        date[1] += 12;
    }
}

var adjustDay = function(date,previousMonthDays) {
    if(date[2] < 0) {
        date[1] --;
        adjustMonth(date);
        date[2] += previousMonthDays;
    }
}

var anBisect = function(an) {
    if(an % 4 !== 0) return false;
    if(an % 100 !== 0) return true;
    if(an % 400 !== 0) return false;
    return true;
}

var lastMonthDays = function(date) {
    var luni = [31,28,31,30,31,30,31,31,30,31,30,31];
    var an = date[0];
    var luna = date[1];
    if(luna === 1) {
        an--;
        luna = 12;
    }
    else {
        luna--;
    }
    var res = luni[luna-1];
    if(luna === 2 && anBisect(an)) {
        res++;
    }
    return res;
}

var diferentaDate = function(birthday,curentTime) {
    var res = [curentTime[0]-birthday[0],curentTime[1]-birthday[1],curentTime[2]-birthday[2]];

    adjustMonth(res);
    adjustDay(res,lastMonthDays(curentTime));
    return res;
}

var checkYouAreBorn = function(birthday,curentTime) {
    if(birthday[0] < curentTime[0]) return true;
    if(birthday[1] < curentTime[1]) return true;
    return birthday[2] <= curentTime[2];
}

var checkCorectDate = function(date) {
    if(date[0] < 0) return false;
    if(date[1] > 12) return false;
    if(date[1] < 1) return false;
    var zile = date[2];
    if(zile > lastMonthDays([date[0],date[1]+1,date[2]])) {
        return false;
    }
    if(zile < 1) return false;
    return true;
}

function myTimer() {
    if(checkCorectDate(birthdayDate)) ;
    else {
        return ;
    }
    var today = new Date();
    var a = today.getFullYear();
    var l = today.getMonth() + 1;
    var z = today.getDate();
    var o = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    
    var curentDif = diferentaDate(birthdayDate,[a,l,z]);
    a = curentDif[0];
    l = curentDif[1];
    z = curentDif[2];

    WriteMesajCorectVarsta([a,l,z,o,m,s]);
}

function myStopFunction() {
    clearInterval(myVar);
}