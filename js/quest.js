//Esperem fins que es carregui tot el document HTML
$(document).ready(function () {


    //Creem 12 posicions aleatòries per a les monedes i roques
    let posicions = posicionsAleatories();
    let vides = document.getElementById('numVides');
    let monedes = document.getElementById('numMonedes');

    //**********************************************************/
    //************ Sense utilitzar la llibreria jQuery *********/
    //**********************************************************/
    /*
    let terreny_joc = document.getElementById('terreny-joc');
    //1.1 Personatge
    let personatge1 = creaElement('span','personatge','img/personatge1.png');
    //L'afegim al document
    terreny_joc.firstElementChild.firstElementChild.append(personatge1);

    //1.2 Portal
    let portal = creaElement('div','portal','img/portal.gif');
    //L'afegim al document
    terreny_joc.lastElementChild.lastElementChild.append(portal);
    
    //1.3 Roques
    for(let i=0; i<6; i++){
        let pos = posicions.pop(); //Agafem una posició i l'esborrem de l'array
        let coordY = Math.floor(pos/10);
        let coordX = pos%10;
        let roca = creaElement('p','roca','img/roca.png');
        terreny_joc.children[coordY].children[coordX].append(roca);
    }

    //1.4 Monedes
    for(let i=0; i<6; i++){
        let pos = posicions.pop(); //Agafem una posició i l'esborrem de l'array
        let coordY = Math.floor(pos/10);
        let coordX = pos%10;
        let moneda = creaElement('div','moneda','img/moneda.gif');
        terreny_joc.children[coordY].children[coordX].append(moneda);
    }
    */

    //**********************************************************/
    //************* Utilitzant la llibreria jQuery *************/
    //**********************************************************/
    let $terreny_joc = $('#terreny-joc');
    //1.1 Personatge
    $personatge = $('<span class="personatge"><img src="img/personatge1.png"></span>');
    $terreny_joc.children().first().children().first().append($personatge);

    //1.2 Portal
    $portal = $('<div class="portal"><img src="img/portal.gif"></div>');
    $terreny_joc.children().last().children().last().append($portal);

    //1.3 Roques
    for(let i=0; i<6; i++){
        let pos = posicions.pop(); //Agafem una posició i l'esborrem de l'array
        let coordY = Math.floor(pos/10);
        let coordX = pos%10;

        $pedra = $('<p class="roca"><img src="img/roca.png"></p>');
        $terreny_joc.children().eq(coordY).children().eq(coordX).append($pedra);
    }

    //1.4 Monedes
    for(let i=0; i<6; i++){
        let pos = posicions.pop(); //Agafem una posició i l'esborrem de l'array
        let coordY = Math.floor(pos/10);
        let coordX = pos%10;

        $moneda = $('<div class="moneda" valor="'+
                    (Math.floor(Math.random() * 25) + 1)
                    +'"><img src="img/moneda.gif"></div>');

        $terreny_joc.children().eq(coordY).children().eq(coordX).append($moneda);
    }

    //**********************************************************/
    //************** Canvi de personatge ***********************/
    //**********************************************************/

    //Cerquem el botó de canvi
    let botoCanvi = document.getElementsByClassName('change')[0];
    //Afegim l'esdeveniment de clic
    botoCanvi.addEventListener('click', function(){
        //Cerquem el personatge
        let pers = document.getElementsByClassName('personatge')[0];

        //Mirem la imatge
        let imgPers = pers.firstElementChild.getAttribute('src');
        
        //La canviem segons el valor
        if(imgPers == 'img/personatge1.png'){
            pers.firstElementChild.setAttribute('src','img/personatge2.png');
        }
        else {
            pers.firstElementChild.setAttribute('src','img/personatge1.png');
        }
    })

    //**********************************************************/
    //******************* Moviment *****************************/
    //**********************************************************/

    // Fletxes amunt i avall sense utilitzar jQuery
    let fletxaAmunt = document.getElementsByClassName('up')[0];
    let fletxaAvall = document.getElementsByClassName('down')[0];

    //Afegim esdeveniments
    fletxaAmunt.addEventListener('click', function(){
        let pers = document.getElementsByClassName('personatge')[0];
        //Quan ens movem amunt canviem a la secció anterior (comprovem que hi haja una secció més amunt)
        if(pers.parentNode.parentNode.previousElementSibling){
            //Obtenim la posició del <div> on es troba personatge dintre dels <div> del <section>
            let posX = Array.from(pers.parentNode.parentNode.children).indexOf(pers.parentNode);
            console.log(posX);

            //Agafem l'element de la nova posició
            let elemNovaPosicio = pers.parentNode.parentNode.previousElementSibling.children[posX];
            
            //Comprovem si hi ha roca a la nova posició
            let hiHaRoca = comprovarRoca(elemNovaPosicio);

            //Passem l'element del DOM a element jQuery, ja que la funció comprovarMoneda està feta en jQuery
            comprovarMoneda($(elemNovaPosicio));

            let hiHaPortal = comprovarPortal(elemNovaPosicio);

            if(!hiHaRoca && !hiHaPortal){
                elemNovaPosicio.append(pers);
            }
            
        }
    })

    fletxaAvall.addEventListener('click', () => {
        let pers = document.getElementsByClassName('personatge')[0];
        //Quan ens movem amunt canviem a la secció anterior (comprovem que hi haja una secció més amunt)
        if(pers.parentNode.parentNode.nextElementSibling){
            //Obtenim la posició del <div> on es troba el personatge dintre dels <div> del <section>
            let posX = Array.from(pers.parentNode.parentNode.children).indexOf(pers.parentNode);
            console.log(posX);

            //Agafem l'element de la nova posició
            let elemNovaPosicio = pers.parentNode.parentNode.nextElementSibling.children[posX];
            
            //Comprovem si hi ha roca a la nova posició
            let hiHaRoca = comprovarRoca(elemNovaPosicio);

            //Passem l'element del DOM a element jQuery, ja que la funció comprovarMoneda està feta en jQuery
            comprovarMoneda($(elemNovaPosicio));

            let hiHaPortal = comprovarPortal(elemNovaPosicio);

            if(!hiHaRoca && !hiHaPortal){
                elemNovaPosicio.append(pers);
            }
        }
    })

    // Fletxes esquerra i dreta utilitzant jQuery
    $fletxaDreta = $('.right');
    $fletxaEsquerra = $('.left');

    //Afegim esdeveniments
    $fletxaDreta.on('click', () => {
        //Moure a la dreta significa moure l'element al germà següent
        //Obtenim personate
        let $pers = $('.personatge');
        if($pers.parent().next()){

            //Agafem l'element de la nova posició
            $elemNovaPosicio = $pers.parent().next();

            //Comprovem si hi ha roca a la nova posició (passem l'objecte jQuery a objecte del DOM, ja que la funció comprovarRoca no usa jQuery)
            let hiHaRoca = comprovarRoca($elemNovaPosicio.get(0));

            comprovarMoneda($elemNovaPosicio);

            let hiHaPortal = comprovarPortal($elemNovaPosicio.get(0));

            if(!hiHaRoca && !hiHaPortal){
                $elemNovaPosicio.append($pers);
            }
            
        }
    });

    $fletxaEsquerra.on('click', () => {
        //Moure a l'esquerra significa moure l'element al germà anterior
        //Obtenim personate
        let $pers = $('.personatge');
        if($pers.parent().prev()){

            //Agafem l'element de la nova posició
            $elemNovaPosicio = $pers.parent().prev();

            //Comprovem si hi ha roca a la nova posició
            let hiHaRoca = comprovarRoca($elemNovaPosicio.get(0));

            comprovarMoneda($elemNovaPosicio);

            let hiHaPortal = comprovarPortal($elemNovaPosicio.get(0));

            if(!hiHaRoca && !hiHaPortal){
                $elemNovaPosicio.append($pers);
            }
        }
    });

    //**********************************************************/
    //******************** Comprovar roca **********************/
    //**********************************************************/
    function comprovarRoca(novaPosicio){
        //Mirem si la nova posició té un element
        if(novaPosicio.firstElementChild){
            //Mirem si l'element és una roca
            if(novaPosicio.firstElementChild.getAttribute('class') == 'roca'){
                //Treiem una vida
                vides.textContent -= 1;
                //Comprovar final de partida
                comprovaFinalVides(vides.textContent);
                return true;   
            }
        }
        return false;
    }

    //**********************************************************/
    //******************* Comprovar final vides ****************/
    //**********************************************************/
    function comprovaFinalVides(num){
        if(num==0){
            //Esborrem el personatge
            let pers = document.getElementsByClassName('personatge')[0];
            pers.parentNode.removeChild(pers);
            alert('Has perdut totes les vides. El joc ha acabat');
        }
    }


    //**********************************************************/
    //******************* Comprovar moneda *********************/
    //**********************************************************/
    //Mirem si la nova posició té un element
    function comprovarMoneda($novaPosicio){
        if($novaPosicio.children().first()){
            //Mirem si l'element és una moneda
            if($novaPosicio.children().first().attr('class') == 'moneda'){
                //Sumem les monedes
                let numMonedes = $novaPosicio.children().first().attr('valor');
                monedes.textContent = parseInt(monedes.textContent) + parseInt(numMonedes);
                $novaPosicio.children().first().remove();
            }
        }
    }

    //**********************************************************/
    //******************* Mostrem valor moneda *****************/
    //**********************************************************/

    let $monedes = $('.moneda');
    $monedes.on('dblclick', function(){
        alert('Valor de la moneda: ' + $(this).attr('valor'));
    });


    //**********************************************************/
    //******************* Comprovar portal *********************/
    //**********************************************************/
    //Mirem si la nova posició té un element
    function comprovarPortal(novaPosicio){
        if(novaPosicio.firstElementChild){
            //Mirem si l'element és un portal
            if(novaPosicio.firstElementChild.getAttribute('class') == 'portal'){
                //Esborrem el personatge
                let pers = document.getElementsByClassName('personatge')[0];
                pers.parentNode.removeChild(pers);
                alert('Enhorabona! Has guanyat la partida!');
                return true;
            }
        }
        return false;
    }
 


    //Funció que crea un element d'un tipus determinat amb una imatge i una classe determinada
    function creaElement(tipus,classe,URLimatge){
        //Creem element pare
        let nouElement = document.createElement(tipus);
        //Li afegim una classe
        nouElement.classList.add(classe);
        //Si és moneda li afegim el valor
        if(classe='moneda'){
            nouElement.setAttribute('valor',Math.floor(Math.random() * 25) + 1)
        }
        //Creem l'element amb la imatge
        let imatge = document.createElement('img');
        imatge.setAttribute('src',URLimatge)
        //Afegim la imatge a l'element pare
        nouElement.append(imatge);
        return nouElement;
    }

    function posicionsAleatories(){
        //Creem 12 números aleatoris no repetits entre l'1 i el 58 que definiran la posició dels elements
        let arrayRandom = [];

        while(arrayRandom.length < 12){
            const numAleatori = Math.floor(Math.random() * 58) + 1
            if (!arrayRandom.includes(numAleatori)) {
                arrayRandom.push(numAleatori);
            }
        }
       return arrayRandom;
    }
});