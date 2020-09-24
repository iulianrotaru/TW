var OriginalTitle, AnimatedTitle;
var litere;

function myTimerTitle() {
    ///console.log('myTimerTitle');

    ++litere;
    if(litere + litere - 1 > OriginalTitle.length) {
        return ;
    }
    AnimatedTitle = "";
    for(var i = 0; i < litere; ++i) {
        AnimatedTitle += OriginalTitle[i];
    }

    var j = litere;
    if(j < OriginalTitle.length - litere) {
        j = OriginalTitle.length - litere;
    }

    for(var x = litere; x < j ; ++x) {
        AnimatedTitle += "\xa0";
    }

    for(; j < OriginalTitle.length ; ++j) {
        AnimatedTitle += OriginalTitle[j];
    }

    document.title = AnimatedTitle;
}

function myStopFunctionTitle() {
    clearInterval(myVarTitle);
}

var MainTitleAnimation = function() {
    ///console.log('MainTitleAnimation');
    OriginalTitle = document.title;
    litere = 0;
    document.title = "";

    var myVarTitle = setInterval(myTimerTitle, 100);
}