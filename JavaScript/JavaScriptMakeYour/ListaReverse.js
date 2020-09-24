
var getdubluclickReverse = function() {
    console.log('getdubluclick');
    var lista = document.getElementById('Legenda');
    lista.addEventListener('dblclick', ReverseLista, false);
}

var ReverseLista = function() {
    console.log('ReverseLista');

    OrdineListaReverse ^= 1;
    afiseazaLegenda();
}