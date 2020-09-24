///aici imi permit sa ma joc cat vreau
var WriteMesaje = function(mesaj) {
    console.log('WriteMesaje'+mesaj);
    var ok = document.getElementById("mesaj");
    ok.innerHTML=mesaj;
}

var N = 4;
var M = 4;
var pixleft = 10;
var pixtop = 10;
var PixelDim = 420;
var NumeJoc = "Oficiu";
var Stari = 0;
var EndGame = 0;
var WinGame = 0;
var touchStartClientX;
var touchStartClientY;
var OrdineListaReverse;
var DirectorImagini = "Imagini/imgMakeYour/";
var ExtensieImagini = ".png";
var Culoare = [
'rgba(238, 228, 218, 1)',
'#f2b179' , 
'#f59563' , 
'#f67c5f' , 
'#f65e3b' , 
'#edcf72' , 
'#edcc61' , 
'#edc850' , 
'#edc53f' , 
'#edc22e' , 
'rgba(163, 73, 164, 0.5)' , 
'rgba(163, 73, 164, 0.6)' , 
'rgba(163, 73, 164, 0.7)' , 
'rgba(163, 73, 164, 0.8)' ,
'rgba(163, 73, 164, 0.9)' , 
'rgba(163, 73, 164, 1.0)' , 
'rgba(63, 72, 204, 0.6)' , 
'rgba(63, 72, 204, 0.7)' , 
'rgba(63, 72, 204, 0.8)' ,
'rgba(63, 72, 204, 0.9)' , 
'rgba(63, 72, 204, 1.0)' , 
'rgba(150, 0, 0, 0.55)' , 
'rgba(0, 20, 0, 0.60)' , 
'rgba(0, 0, 20, 0.65)' , 
'rgba(30, 0, 0, 0.70)' , 
'rgba(0, 30, 0, 0.75)' , 
'rgba(0, 0, 80, 0.80)' , 
'rgba(0, 0, 70, 0.85)' , 
'rgba(0, 70, 0, 0.90)' , 
'rgba(60, 0, 0, 0.95)'
];
var MaxCellN = 22;
var NumeCell = [
"nimic" ,
"Donquixote Doflamingo" ,
"Boa Hancock" ,
"Gekko Moriah" ,
"Trafalgar Law" ,
"Nami" ,
"God Usopp" ,
"Eustass Capitan Kid" ,
"Roronoa Zoro" ,
"Monkey D. Dragon" ,
"Sabo" ,
"Crocodile" ,
"Marshall D. Teach" ,
"Nico Robin" ,
"Bartolomeo" ,
"Scratchmen Apoo" ,
"Jinbe" ,
"Sabo" ,
"Monkey D. Luffy" ,
"Charlotte Linlin" ,
"Kaido" ,
"Edward Newgate" ,
"GolD Roger"
]

var ImaginiCell = [];
for(var i = 0; i < 100 ; ++i) {
    ImaginiCell[i] = DirectorImagini + i + ExtensieImagini;
}

var matrix = [];
for(var i=1; i<8; i++) {
    matrix[i] = [];
    for(var j=1; j<8; j++) {
        matrix[i][j] = 0;
    }
}

var putere = function(x) {
    var rez = 1;
    for(var i = 1; i <= x ; ++i) {
        rez = rez * 2;
    }
    return rez;
}

var generate = function() {
    var nr = 0;
    for(var i = 1; i <= N ; ++i) {
        for(var j = 1; j <= M; ++j) {
            if(matrix[i][j] == 0) {
                nr++;
            }
        }
    }
    var newpos = Math.floor(Math.random()*nr) + 1;
    var depus = Math.floor(Math.random()*2) + 1;
    crescScor(putere(depus));
    nr = 0;
    for(var i = 1; i <= N ; ++i) {
        for(var j = 1; j <= M; ++j) {
            if(matrix[i][j] == 0) {
                nr++;
                if(nr == newpos) {
                    matrix[i][j] = depus;
                    return ;
                }
            }
        }
    }
}

var salveazaStareUndo = function() {
    Stari++;
    var codStare = "";

    for(var i = 1 ; i <= N ; ++i) {
        for(var j = 1; j <= M ; ++j) {
            codStare += matrix[i][j] + "#";
        }
    }

    var idScore = N + "_" + M + "_" + "score" + NumeJoc;
    var score = localStorage.getItem(idScore)?localStorage.getItem(idScore):"0";
    codStare += score;

    var idStare = N + "_" + M + "_" + NumeJoc + "Stare" + Stari;
    localStorage.setItem(idStare,codStare);
}

var salveazaBestCell = function() {
    var maxCell = 1;
    for(var i = 1 ; i <= N ; ++i) {
        for(var j = 1; j <= M ; ++j) {
            if(maxCell < matrix[i][j]) {
                maxCell = matrix[i][j];
            }
        }
    }

    var idBestCell = N + "_" + M + "_" + NumeJoc + "BestCell";
    var maxC = localStorage.getItem(idBestCell)?localStorage.getItem(idBestCell):"0";
    maxC = parseInt(maxC);
    if(maxC < maxCell) {
        localStorage.setItem(idBestCell,maxCell);
    }
}

var afisareMatrice = function() {
    console.log("vine matricea");

    afisareScoruri();
    salveazaStareUndo();
    if(WinGame == 1) {
        stergeWinGame();
    }

    for(var i = 1; i <= N; ++ i) {
        console.log(matrix[i]);
        for(var j = 1;j <= M; ++ j) {
            var NumeDiv = "Celula_"+i+"_"+j;
            var celula = document.getElementById(NumeDiv);
            celula.style.top = (PixelDim/N*(i-1) +3+pixtop)+"px";
            celula.style.left = (PixelDim/M*(j-1) +3+pixleft)+ "px";
            celula.style.width = PixelDim/M -6+ "px";
            celula.style.height = PixelDim/N -6+ "px";
            celula.style.position = "absolute";
            celula.style.borderRadius = 10-N +"px";
            celula.style.zIndex = "10";
            celula.style.background =  Culoare[matrix[i][j]];
            celula.style.borderColor = "#2b9d2a";
            celula.style.borderStyle = "solid";
            celula.style.borderWidth = "1px";

            if(matrix[i][j] == 0) {
                continue;
            }
            var NumeimagineDiv = "imagine" + NumeDiv;
            var celImg = document.getElementById(NumeimagineDiv);
            var imag = document.createElement("img");
            imag.src = ImaginiCell[matrix[i][j]];
            celImg.style.top = "5px";
            celImg.style.left = "5px";
            celImg.style.width = PixelDim/M - 16+ "px";
            celImg.style.height = PixelDim/N - 16+ "px";
            celImg.style.position = "absolute";
            celImg.style.borderRadius = "3px";
            celImg.style.zIndex = "1000";
            imag.width = PixelDim/M - 16;
            imag.height = PixelDim/N - 16;
            imag.style.borderRadius = "3px";
            celImg.appendChild(imag);
        }
    }

    cautaEndGame();
    if(WinGame == 0) {
        cautaWinGame();
    }

    afiseazaLegenda();
}

var afiseazaLegenda = function() {
    salveazaBestCell();

    var idBestCell = N + "_" + M + "_" + NumeJoc + "BestCell";
    var maxCellBest = localStorage.getItem(idBestCell);
    maxCellBest = parseInt(maxCellBest);

    var maxCell = 1;
    for(var i = 1 ; i <= N ; ++i) {
        for(var j = 1; j <= M ; ++j) {
            if(maxCell < matrix[i][j]) {
                maxCell = matrix[i][j];
            }
        }
    }
    var maxCC = maxCell;
    var MaxCellCase = N * M + 1;
    if(MaxCellCase > MaxCellN) {
        MaxCellCase = MaxCellN;
    }

    var Cells = [];
    var maxiCell = maxCell + 4;
    if(maxiCell >= MaxCellCase - 1) {
        maxiCell = MaxCellCase - 1;
    }

    if(maxCell > maxiCell - 4) {
        maxCell = maxiCell - 4;
        if(maxCell < 1) {
            maxCell = 1;
        }
    }

    for(var i = maxCell ; i <= maxiCell ; ++i) {
        Cells.push(i);
    }
    Cells.push(MaxCellCase);
    if(OrdineListaReverse == 1) {
        Cells.reverse();
    }

    var legenda = document.getElementById("Legenda");
    legenda.innerHTML = '';

    for(var i = 0; i < Cells.length; ++i) {
        var linie = document.createElement("div");
        linie.classList.add("legend-row");
        linie.style.top = "100px";
        
        if(Cells[i] == MaxCellCase) {
            linie.style.background = "blue";
        }

        if(Cells[i] == maxCellBest) {
            linie.style.background = "green";
        }

        if(Cells[i] == maxCell && maxCell == maxCC && maxCell < maxCellBest) {
            linie.style.background = "red";
        }

        var interiorLinie = document.createElement("div");
        ///interiorLinie.style.background = "rgb(205, 193, 180)";
        interiorLinie.style.borderRadius = "10px";
        interiorLinie.style.zIndex = "1000";
        //interiorLinie.style.borderColor = "rgb(210, 134, 129)"
        //interiorLinie.style.borderStyle = "solid";
        //interiorLinie.style.borderWidth = "1px";
        interiorLinie.style.display = "flex";
        
        var celula = document.createElement("div");
        var pixi = 80;
        celula.style.width = (pixi - 6) + "px";
        celula.style.height = (pixi - 6) + "px";
        celula.style.position = "flexible";
        celula.style.borderRadius = 10 +"px";
        celula.style.zIndex = "1000";
        celula.style.background =  Culoare[Cells[i]];
        celula.style.borderColor = "#2b9d2a";
        celula.style.borderStyle = "solid";
        celula.style.borderWidth = "1px";

        var imagineCelula = document.createElement("div");
        imagineCelula.style.padding = "5px 5px";
        imagineCelula.style.width = pixi- 16+ "px";
        imagineCelula.style.height = pixi - 16+ "px";
        imagineCelula.style.position = "absolute";
        imagineCelula.style.borderRadius = "3px";
        imagineCelula.style.zIndex = "1000";

        var imag = document.createElement("img");
        imag.src = ImaginiCell[Cells[i]];
        imag.width = pixi - 16;
        imag.height = pixi - 16;
        imag.style.borderRadius = "3px";

        var text = document.createElement("p");
        text.textContent = NumeCell[Cells[i]];

        var box = document.createElement("div");
        box.style.width = "145px";
        box.style.background = "red";
        box.style.display = "flex";
        box.style.justifyContent = "center";
        box.style.alignItems = "center";
        box.style.background =  Culoare[Cells[i]];
        box.style.borderColor = "#2b9d2a";
        box.style.borderStyle = "solid";
        box.style.borderRadius = "10px";
        box.style.borderWidth = "1px";
        box.appendChild(text);

        imagineCelula.appendChild(imag);
        celula.appendChild(imagineCelula);
        interiorLinie.appendChild(celula);
        interiorLinie.appendChild(box);
        linie.appendChild(interiorLinie);

        var listObject = document.createElement("li");
        listObject.classList.add("lista");
        listObject.appendChild(linie);
        legenda.appendChild(listObject);
    }

}

var afiseazaEndGame = function() {
    console.log('afiseazaEndGame');

    EndGame = 1;
    document.getElementById("MesajJoc").style.width = "440px";
    document.getElementById("MesajJoc").style.height = "440px";
    document.getElementById("MesajJoc").style.borderRadius = "3px";
    document.getElementById("MesajJoc").style.opacity = "0.95";
    document.getElementById("MesajJoc").style.backgroundColor = "rgba(238, 228, 218, 0.9)";
    document.getElementById("MesajJoc").style.zIndex = "1000";
    document.getElementById("MesajJoc").style.position = "absolute";
    document.getElementById("MesajJoc").style.display = "flex";

    var ok = document.getElementById("MesajEndGame");
    ok.style.fontSize = "40px";
    ok.innerHTML = "Game Over!";
}

var stergeEndGame = function() {
    console.log('stergeEndGame');

    EndGame = 0;
    document.getElementById("MesajJoc").style.width = "0px";
    document.getElementById("MesajJoc").style.height = "0px";
    document.getElementById("MesajJoc").style.borderRadius = "0px";
    document.getElementById("MesajJoc").style.opacity = "0.95";
    document.getElementById("MesajJoc").style.backgroundColor = "rgba(238, 228, 218, 0.9)";
    document.getElementById("MesajJoc").style.zIndex = "1000";
    document.getElementById("MesajJoc").style.position = "initial";
    document.getElementById("MesajJoc").style.display = "flexbox";

    var ok = document.getElementById("MesajEndGame");
    ok.style.fontSize = "0px";
    ok.innerHTML = "";
}

var afiseazaWinGame = function() {
    console.log('afiseazaWinGame');

    WinGame = 1;
    document.getElementById("MesajJoc").style.width = "440px";
    document.getElementById("MesajJoc").style.height = "440px";
    document.getElementById("MesajJoc").style.borderRadius = "3px";
    document.getElementById("MesajJoc").style.opacity = "0.95";
    document.getElementById("MesajJoc").style.backgroundColor = "rgba(238, 228, 218, 0.9)";
    document.getElementById("MesajJoc").style.zIndex = "1000";
    document.getElementById("MesajJoc").style.position = "absolute";
    document.getElementById("MesajJoc").style.display = "flex";

    var ok = document.getElementById("MesajEndGame");
    ok.style.fontSize = "40px";
    ok.innerHTML = "You Won!";
}

var stergeWinGame = function() {
    console.log('stergeWinGame');

    WinGame = 2;
    document.getElementById("MesajJoc").style.width = "0px";
    document.getElementById("MesajJoc").style.height = "0px";
    document.getElementById("MesajJoc").style.borderRadius = "0px";
    document.getElementById("MesajJoc").style.opacity = "0.95";
    document.getElementById("MesajJoc").style.backgroundColor = "rgba(238, 228, 218, 0.9)";
    document.getElementById("MesajJoc").style.zIndex = "1000";
    document.getElementById("MesajJoc").style.position = "initial";
    document.getElementById("MesajJoc").style.display = "flexbox";

    var ok = document.getElementById("MesajEndGame");
    ok.style.fontSize = "0px";
    ok.innerHTML = "";
}

var cautaEndGame = function() {
    for(var i = 1; i <= N ; ++i) {
        for(var j = 1 ; j <= M ;++j) {
            if(matrix[i][j] == 0) {
                return ;
            }
            if(i > 1) {
                if(matrix[i][j] == matrix[i-1][j]) {
                    return ;
                }
            }
            if(j > 1) {
                if(matrix[i][j] == matrix[i][j-1]) {
                    return ;
                }
            }
        }
    }
    afiseazaEndGame();
}

var cautaWinGame = function() {
    var ok = 0;
    for(var i = 1; i <= N; ++i) {
        for(var j = 1; j <= M; ++j) {
            if(matrix[i][j] == 11) {
                ok = 1;
            }
        }
    }

    if(ok == 1) {
        afiseazaWinGame();
    }
}

var StergDivNefolositoare = function() {
    for(i = 1; i <= 7; ++ i) {
        for(j = 1;j <= 7; ++ j) 
            if(i > N || j > M) {
            var NumeDiv = "Celula_"+i+"_"+j;
            var celula = document.getElementById(NumeDiv);
            celula.style.top = 0+"px";
            celula.style.left = 0 + "px";
            celula.style.width = 0+ "px";
            celula.style.height = 0+ "px";
            celula.style.position = "absolute";
            celula.style.borderRadius = 0 +"px";
            celula.style.zIndex = "0";
            celula.style.background =  Culoare[0];
            
            var NumeimagineDiv = "imagine" + NumeDiv;
            var celImg = document.getElementById(NumeimagineDiv);
            celImg.style.top = "0px";
            celImg.style.left = "0px";
            celImg.style.width = 0+ "px";
            celImg.style.height = 0+ "px";
            celImg.style.position = "absolute";
            celImg.style.borderRadius = "0px";
            celImg.style.zIndex = "0";
        }
    }
}

var afisareScoruri = function() {
    var idScore = N + "_" + M + "_" + "score" + NumeJoc;
    var score = localStorage.getItem(idScore)?localStorage.getItem(idScore):"0";
    document.getElementById("scoreContainer").innerHTML = score;

    var idBest = N + "_" + M + "_" + "best" + NumeJoc;
    var best = localStorage.getItem(idBest)?localStorage.getItem(idBest):"0";
    document.getElementById("bestContainer").innerHTML = best;
}

var crescScor = function(val) {
    var idScore = N + "_" + M + "_" + "score" + NumeJoc;
    var score = localStorage.getItem(idScore)?localStorage.getItem(idScore):"0";
    score = parseInt(score);
    score = score + val;
    localStorage.setItem(idScore,score);

    var idBest = N + "_" + M + "_" + "best" + NumeJoc;
    var best = localStorage.getItem(idBest)?localStorage.getItem(idBest):"0";
    best = parseInt(best);
    if(score > best) {
        localStorage.setItem(idBest,score);
    }
}

var resetScore = function() {
    var idScore = N + "_" + M + "_" + "score" + NumeJoc;
    localStorage.setItem(idScore,0);
}

var resetBest = function() {
    var idBest = N + "_" + M + "_" + "best" + Numejoc;
    localStorage.setItem(idBest,0);
}

var StartGame = function() {
    EndGame = 0;
    WinGame = 0;
    Stari = 0; /// asta e tot pentru Undo
    resetScore();
    generate();
    generate();
    afisareMatrice();
}

var getclickSetDim = function() {
    console.log('getclickSetDim');
    var setDim = document.getElementById('SetDim');
    setDim.addEventListener('click', SeteazaDim, false);
}

var getclickJocNou = function() {
    console.log('getclickJocNou');
    var restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', ReseteazaJoc, false);
}

var getclickUndo = function() {
    console.log('getclickUndo');
    var restartButton = document.getElementById('undoButton');
    restartButton.addEventListener('click', StareAnterioaraUndo, false);
}

var StareAnterioaraUndo = function() {
    if(Stari < 2) return ;
    if(EndGame == 1) {
        stergeEndGame();
    }
    if(WinGame == 1) {
        stergeWinGame();
    }

    StergeImaginiMatrice();

    Stari--;
    var idStare = N + "_" + M + "_" + NumeJoc + "Stare" + Stari;
    var codStare = localStorage.getItem(idStare);
    codStare = codStare.toString().split("#")
    
    var indice = 0;

    for(var i = 1 ; i <= N ; ++i) {
        for(var j = 1 ; j <= M ; ++j ) {
            matrix[i][j] = parseInt(codStare[indice]);
            indice ++;
        }
    }

    var idScore = N + "_" + M + "_" + "score" + NumeJoc;
    localStorage.setItem(idScore,codStare[indice]);

    Stari--;
    
    afisareMatrice();
}

var MoveUp = function() {
    StergeImaginiMatrice();

    var schimbare = 0;

    for(var j = 1 ; j <= M ; ++j) {
        var index = 0;
        var last = 0;
        for(var i = 1; i <= N; ++i) {
            if(matrix[i][j] > 0) {
                if(index == 0) {
                    index++;
                    matrix[index][j] = matrix[i][j];
                    if(index < i) {
                        schimbare = 1;
                        matrix[i][j] = 0;
                    }
                    last = 0;
                    continue;
                }
                if(matrix[i][j] == matrix[index][j]) {
                    if(last == 0) {
                        matrix[index][j]++;
                        crescScor(putere(matrix[index][j]));
                        matrix[i][j] = 0;
                        last = 1;
                        schimbare = 1;
                    }
                    else {
                        index++;
                        matrix[index][j] = matrix[i][j];
                        if(index < i) {
                            matrix[i][j] = 0;
                            schimbare = 1;
                        }
                        last = 0;
                    }
                }
                else {
                    index++;
                    matrix[index][j] = matrix[i][j];
                    if(index < i) {
                        matrix[i][j] = 0;
                        schimbare = 1;
                    }
                    last = 0;
                }
            }
        }
    }

    if(schimbare == 1) generate();
    else Stari--; ///Asta e tot pentru Undo
    afisareMatrice();
}

var MoveDown = function() {
    StergeImaginiMatrice();

    var schimbare = 0;

    for(var j = 1 ; j <= M ; ++j) {
        var index = N + 1;
        var last = 0;
        for(var i = N; i > 0; --i) {
            if(matrix[i][j] > 0) {
                if(index == N + 1) {
                    index--;
                    matrix[index][j] = matrix[i][j];
                    if(index > i) {
                        schimbare = 1;
                        matrix[i][j] = 0;
                    }
                    last = 0;
                    continue;
                }
                if(matrix[i][j] == matrix[index][j]) {
                    if(last == 0) {
                        matrix[index][j]++;
                        crescScor(putere(matrix[index][j]));
                        matrix[i][j] = 0;
                        last = 1;
                        schimbare = 1;
                    }
                    else {
                        index--;
                        matrix[index][j] = matrix[i][j];
                        if(index > i) {
                            matrix[i][j] = 0;
                            schimbare = 1;
                        }
                        last = 0;
                    }
                }
                else {
                    index--;
                    matrix[index][j] = matrix[i][j];
                    if(index > i) {
                        matrix[i][j] = 0;
                        schimbare = 1;
                    }
                    last = 0;
                }
            }
        }
    }

    if(schimbare == 1) generate();
    else Stari--; ///Asta e tot pentru Undo
    afisareMatrice();
}

var MoveLeft = function() {
    StergeImaginiMatrice();

    var schimbare = 0;

    for(var i = 1; i <= N; ++i) {
        var index = 0;
        var last = 0;
        for(var j = 1 ; j <= M ; ++j) {
            if(matrix[i][j] > 0) {
                if(index == 0) {
                    index++;
                    matrix[i][index] = matrix[i][j];
                    if(index < j) {
                        schimbare = 1;
                        matrix[i][j] = 0;
                    }
                    last = 0;
                    continue;
                }
                if(matrix[i][j] == matrix[i][index]) {
                    if(last == 0) {
                        matrix[i][index]++;
                        crescScor(putere(matrix[i][index]));
                        matrix[i][j] = 0;
                        last = 1;
                        schimbare = 1;
                    }
                    else {
                        index++;
                        matrix[i][index] = matrix[i][j];
                        if(index < j) {
                            matrix[i][j] = 0;
                            schimbare = 1;
                        }
                        last = 0;
                    }
                }
                else {
                    index++;
                    matrix[i][index] = matrix[i][j];
                    if(index < j) {
                        matrix[i][j] = 0;
                        schimbare = 1;
                    }
                    last = 0;
                }
            }
        }
    }

    if(schimbare == 1) generate();
    else Stari--; ///Asta e tot pentru Undo
    afisareMatrice();
}

var MoveRight = function() {
    StergeImaginiMatrice();

    var schimbare = 0;

    for(var i = 1; i <= N; ++i) {
        var index = M + 1;
        var last = 0;
        for(var j = M ; j > 0 ; --j) {
            if(matrix[i][j] > 0) {
                if(index == M + 1) {
                    index--;
                    matrix[i][index] = matrix[i][j];
                    if(index > j) {
                        schimbare = 1;
                        matrix[i][j] = 0;
                    }
                    last = 0;
                    continue;
                }
                if(matrix[i][j] == matrix[i][index]) {
                    if(last == 0) {
                        matrix[i][index]++;
                        crescScor(putere(matrix[i][index]));
                        matrix[i][j] = 0;
                        last = 1;
                        schimbare = 1;
                    }
                    else {
                        index--;
                        matrix[i][index] = matrix[i][j];
                        if(index > j) {
                            matrix[i][j] = 0;
                            schimbare = 1;
                        }
                        last = 0;
                    }
                }
                else {
                    index--;
                    matrix[i][index] = matrix[i][j];
                    if(index > j) {
                        matrix[i][j] = 0;
                        schimbare = 1;
                    }
                    last = 0;
                }
            }
        }
    }

    if(schimbare == 1) generate();
    else Stari--; ///Asta e tot pentru Undo
    afisareMatrice();
}

var getArrows = function() {
    console.log('getArrows');
    document.addEventListener("keydown",Tasta);
}

var Tasta = function(eveniment) {
    switch(eveniment.keyCode) {
        case 37:
            MoveLeft();
            eveniment.preventDefault();
            break;
        case 38:
            MoveUp();
            eveniment.preventDefault();
            break;
        case 39:
            MoveRight();
            eveniment.preventDefault();
            break;
        case 40:
            MoveDown();
            eveniment.preventDefault();
            break;
    }
}

var getMovementFingers = function() {
    console.log('getMovementFingers');
    var matrice = document.getElementById("Matrix");

    var eventTouchstart = "touchstart";
    var eventTouchmove  = "touchmove";
    var eventTouchend   = "touchend";

    //Internet Explorer 10
    if (window.navigator.msPointerEnabled) {
		eventTouchstart    = "MSPointerDown";
		eventTouchmove     = "MSPointerMove";
		eventTouchend      = "MSPointerUp";
    }

    matrice.addEventListener(eventTouchstart,eventTouchstartfunction);
    matrice.addEventListener(eventTouchmove,eventTouchmovefunction);
    matrice.addEventListener(eventTouchend,eventTouchendfunction);
}

var eventTouchstartfunction = function(eveniment) {
    // Atins cu mai multe degete
    if((!window.navigator.msPointerEnabled && eveniment.touches.length > 1) || event.targetTouches > 1) {
		return;
	}

    if (window.navigator.msPointerEnabled) {
        touchStartClientX = eveniment.pageX;
        touchStartClientY = eveniment.pageY;
    }
    else {
        touchStartClientX = eveniment.touches[0].clientX;
        touchStartClientY = eveniment.touches[0].clientY;
    }

	eveniment.preventDefault();
}

var eventTouchmovefunction = function(eveniment) {
    eveniment.preventDefault();
}

var eventTouchendfunction = function(eveniment) {
    //Ignor daca mai ating
    if((!window.navigator.msPointerEnabled && eveniment.touches.length > 0) || eveniment.targetTouches > 0) {
        return;
    }

    var touchEndClientX = eveniment.changedTouches[0].clientX;
    var touchEndClientY = eveniment.changedTouches[0].clientY;

    if (window.navigator.msPointerEnabled) {
        touchEndClientX = eveniment.pageX;
        touchEndClientY = eveniment.pageY;
    }
    
    var dx = touchEndClientX - touchStartClientX;
    var absDx = Math.abs(dx);

    var dy = touchEndClientY - touchStartClientY;
    var absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
        if(absDx > absDy) {
            if(dx > 0) {
                MoveRight();
            }
            else {
                MoveLeft();
            }
        }
        else {
            if(dy > 0) {
                MoveDown();
            }
            else {
                MoveUp();
            }
        }
    }
    eveniment.preventDefault();
}

var ReseteazaJoc = function() {
    if(EndGame == 1) {
        stergeEndGame();
    }
    if(WinGame == 1) {
        stergeWinGame();
    }
    StergeImaginiMatrice();
    cleanMatrix();
    StergDivNefolositoare();
    StartGame();
}

var StergeImaginiMatrice = function() {
    
    for(i = 1; i <= N; ++ i) {
        for(j = 1;j <= M; ++ j) {
            var NumeDiv = "Celula_"+i+"_"+j;
            var NumeimagineDiv = "imagine" + NumeDiv;
            if(matrix[i][j] == 0) {
                continue;
            }
            var celImg = document.getElementById(NumeimagineDiv);
            celImg.removeChild(celImg.lastChild);
        }
    }
}

var cleanMatrix = function() {
    for(var i = 1; i <= 7; ++i)
        for(var j = 1;j <= 7; ++j)
            matrix[i][j] = 0;
}

var SeteazaDim = function() {
    var newN = parseInt(document.getElementById("SetRow").value);
    var newM = parseInt(document.getElementById("SetCol").value);
    if(newN == N && newM == M) {
        return ;
    }
    if(EndGame == 1) {
        stergeEndGame();
    }
    if(WinGame == 1) {
        stergeWinGame();
    }

    StergeImaginiMatrice();
    cleanMatrix();
    N = newN;
    M = newM;
    StergDivNefolositoare();
    StartGame();
}

function getImages() {
    fetch('http://localhost:3000/images')
        .then(function (response) {
            // Trasform server response to get the images
            response.json().then(function (images) {
                salveazaImaginiNoi(images);
            });
        });
}

var salveazaImaginiNoi = function(images) {
    if(images.length == 0) {
        return ;
    }
    NumeJoc = "MakeYour";
    MaxCellN = images.length;

    for(var i = 0; i < MaxCellN ; ++i) {
        NumeCell[i+1] = images[i].name;
        ImaginiCell[i+1] = images[i].img;
        //WriteMesaje(images[i].name);
        //WriteMesaje(images[i].img);
    }
    StergeImaginiMatrice();
    cleanMatrix();
    StergDivNefolositoare();
    StartGame();
}
getImages();

window.onload = function() {
    
    OrdineListaReverse = 1;
    document.getElementById("SetRow").value = N;
    document.getElementById("SetCol").value = M;

    StartGame();
    
    getclickSetDim();
    
    getclickJocNou();

    getclickUndo();
    
    getArrows();
    
    getMovementFingers();

    getdubluclickReverse();

    getclickCuloare();

    getclickVarsta();

    MainFunctionVerificareInactivitate();

    MainTitleAnimation();
}