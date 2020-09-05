//VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES//

//datos de la GIPHY :    dc6zaTOxFJmzC
const apiKey = 'pafWZGqk8MHrstQqfclfqcJHSjDCHO9f';
const urlGiphy = 'https://api.giphy.com/v1';

// modo nocturno

let html = document.querySelector('html');
let btnNocturno = document.getElementById('btnNocturno');
let btnSearch = document.getElementById('btn-search');
let btnClose = document.getElementById('btn-close');
let btnSliderIzq = document.getElementById('boton-izq');
let btnSliderDer = document.getElementById('boton-der');

//buscar gifs-
let busqueda = document.getElementById('busqueda');
let busquedaSinCont = document.getElementById('busqueda-sinresultado');
let inputBusq = document.getElementById('search');
let tituloTred = document.querySelector('.titulo-tred');
let tituloH1 = document.querySelector('.h1');
let dibujo = document.querySelector('.dibujo');
let contenedorBusq = document.querySelector('.contenedor-busqueda');
let barraBusq = document.querySelector('.barra-busq');
var mediaqueryList = window.matchMedia("(min-width: 768px)");
let sugerencias = document.querySelector('.sugerencias');
let imgSug0 = document.getElementById('btn-search0');
let btnVerMas = document.getElementById('verMas');
let keyword;
let keywordGuardada;
let tituloBusqueda = document.getElementById('tituloBusqueda');
let grillaBusq = document.getElementById('resultadoBusqueda');
let pSug1 = document.getElementById('search1');
let pSug2 = document.getElementById('search2');
let pSug3 = document.getElementById('search3');
let pSug4 = document.getElementById('search4');
//variables importantes
let gifsRespuestas = [];
let contador = 0; //para gestionar los click
let contadorVermas = 12;
let nuevaGrilla;


//buscar gifs nav superior
let btnSearchNav = document.getElementById('btn-search-nav');
let btnCloseNav = document.getElementById('btn-close-nav');
let imgSug0Nav = document.getElementById('btn-search0-nav');
let inputBusqNav = document.getElementById('search-nav');


//div contenedor de Gifs
let divImg = document.getElementById('contenedor-Gif');
let dataImg = document.getElementById('img-gif');
let pCard = document.getElementById('usuario');
let h6Card = document.getElementById('tituloGif');
let divLinks = document.getElementById('linksGif');
let divTextos = document.getElementById('textGif');
let textTit;
let textUser;
let idCard;
let favCard = document.getElementById('fav');
let descCard = document.getElementById('desc');
let maxCard = document.getElementById('max');

//favoritos
let gifFavoritos = [];

//maximizar/minimizar Gifs
let pagPrincipal = document.getElementById('pagPrincipal');
let divMaxGif = document.getElementById('contenedor-gifMax');
let dataImgMax = document.getElementById('img-gifMax');
let btnSliderIzqGifMax = document.getElementById('boton-izqGifMax');
let btnSliderDerGifMax = document.getElementById('boton-derGifMax');
let idCardMax;
let favCardMax = document.getElementById('favMax');
let descCardMax = document.getElementById('descMax');
let pCardMax = document.getElementById('usuarioMax');
let h6CardMax = document.getElementById('tituloGifMax');

//slider treding
let slider = document.getElementById('slider');
let siguiente = document.getElementById('next');
let anterior = document.getElementById('prev');
let divImgTred = document.getElementById('contenedor-Gif-treding');
let dataImgTred = document.getElementById('img-gif-tred');
let pCardTred = document.getElementById('usuario-tred');
let h6CardTred = document.getElementById('tituloGif-tred');
let divLinksTred = document.getElementById('linksGif-treding');
let divTextosTred = document.getElementById('textGif-treding');
let idCardTred;
let favCardTred = document.getElementById('fav-tred');
let descCardTred = document.getElementById('desc-tred');
let maxCardTred = document.getElementById('max-tred');
let arrayGifsSlider;

let gifTendencias= [];

//ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS//
//modo nocturno
btnNocturno.addEventListener('click', () =>{

    if(!html.classList.contains('modo-nocturno')){
        html.classList.add('modo-nocturno');
        btnNocturno.textContent = 'Modo Diurno';
    }else{
        html.classList.remove('modo-nocturno');
        btnNocturno.textContent = 'Modo Nocturno';
    }

});

//busqueda gif lupita
btnSearch.addEventListener('click', () =>{
    grillaBusq.innerHTML = '';
    //funcion estilos
    agregarEstilosBusq();
    btnSearch.style.display = 'none';
    btnClose.style.display = 'block';
    sugerencias.style.display = "none";
    contenedorBusq.style.height = "3.12rem";
    imgSug0.style.display = "none";
    contador = 1;
    //funcion busqueda GIFS
    keyword = inputBusq.value
    buscarGifs(keyword);

})

btnSearchNav.addEventListener('click', () =>{
    busquedaNav();
})
//cierre de busqueda cruz
btnClose.addEventListener('click', () =>{
    grillaBusq.innerHTML = '';
    //funcion estilos
    quitarEstilosBusq();
    inputBusq.value = "";
    btnSearch.style.display = 'block';
    btnClose.style.display = 'none';
    tituloTred.style.visibility = "visible";
    contador = 0;
    contadorVermas = 12;
})

btnCloseNav.addEventListener('click', () =>{
    grillaBusq.innerHTML = '';
    //estilos
    inputBusqNav.value = "";
    btnSearchNav.style.display = 'block';
    btnCloseNav.style.display = 'none';
    document.getElementsByClassName('contenedor-barra-busq-nav')[0].style.paddingLeft = '3.44rem'
    busqueda.style.display = "none";
    imgSug0Nav.style.display = "none";
    tituloTred.style.display = "block";
    history.replaceState(null, null, ' ');
    scrollBy(0,-1000);
    console.log('btnclosenav');

})

//EVALUAR CAMBIO DE PANTALLA
// window.addEventListener('resize', () =>{
//     if(contador == 1){
//         if(mediaqueryList.matches){
//             tituloTred.style.display = "none";
//             tituloH1.style.display = "block";
//             dibujo.style.display = "block";
//             estilosComunes();
//             barraBusq.style.width = "29.81rem";
//         }else{
//             tituloTred.style.display = "block";
//             tituloH1.style.display = "none";
//             dibujo.style.display = "none";
//             contenedorBusq.style.marginTop = "7.75rem";
//             imgSug0.style.display = "block";
//             imgSug0.style.marginRight = "0.91rem";
//             // contenedorBusq.style.height = "3.12rem";
//             sugerencias.style.display = "flex";
//             barraBusq.style.width = "16.87rem";
//         }
//     }
// } );


btnVerMas.addEventListener('click', () =>{
    if(keywordGuardada == ""){
        url = `${urlGiphy}/gifs/trending?api_key=${apiKey}&limit=12&offset=${contadorVermas}`;
        let tendenciasVerMas = conexionApi(url);
        tendenciasVerMas.then(data => {
            nuevaGrilla = document.createElement('div');
            nuevaGrilla.setAttribute("id", "nuevagrilla");
            if(mediaqueryList.matches == true){
                nuevaGrilla.style.marginTop = "1.75rem";
            }else{
                nuevaGrilla.style.marginTop= '1.56rem';
            }
            console.log(data);
            for (var i = 0; i < (data.data.length- is_negative_number((data.data.length-(contadorVermas+12)))); i++) {
                divImg.innerHTML= '';
                crearElementoVerMas(data, i);
                divImg.classList.add('card-hover');
                nuevaGrilla.appendChild(divImg.cloneNode(true));
                gifsRespuestas.push(data.data[i]);
            }
            console.log(data.data.length); 
            if(data.data.length < 11){
                btnVerMas.style.display = 'none';
                for (var i = data.data.length; i < 12; i++) {
                    let imgRelleno = document.createElement('img');
                    imgRelleno.src = 'assets/grilla-sinfavoritos.svg';
                    imgRelleno.style.width = '100%';
                    imgRelleno.style.height = '100%';
                    nuevaGrilla.appendChild(imgRelleno);
                }
            }else{
                btnVerMas.style.display = 'block';
            }
            busqueda.insertBefore(nuevaGrilla, btnVerMas);
            contadorVermas+= 12;
        })

    }else{
        url = `${urlGiphy}/gifs/search?api_key=${apiKey}&q=${keywordGuardada}&limit=12&offset=${contadorVermas}`;
        let respuestaVermas  = conexionApi(url);
        respuestaVermas.then(data => {
            nuevaGrilla = document.createElement('div');
            nuevaGrilla.setAttribute("id", "nuevagrilla");
            if(mediaqueryList.matches == true){
                nuevaGrilla.style.marginTop = "1.75rem";
            }else{
                nuevaGrilla.style.marginTop= '1.56rem';
            }
            for (var i = 0; i < (data.data.length- is_negative_number((data.data.length-(contadorVermas+12)))); i++) {
                divImg.innerHTML= '';
                crearElementoVerMas(data, i);
                divImg.classList.add('card-hover');
                nuevaGrilla.appendChild(divImg.cloneNode(true));
                gifsRespuestas.push(data.data[i]);
            }
            console.log(data.data.length); 
            if(data.data.length < 11){
                btnVerMas.style.display = 'none';
                for (var i = data.data.length; i < 12; i++) {
                    let imgRelleno = document.createElement('img');
                    imgRelleno.src = 'assets/grilla-sinfavoritos.svg';
                    imgRelleno.style.width = '100%';
                    imgRelleno.style.height = '100%';
                    nuevaGrilla.appendChild(imgRelleno);
                }
            }else{
                btnVerMas.style.display = 'block';
            }
            busqueda.insertBefore(nuevaGrilla, btnVerMas);
            contadorVermas+= 12;
        })
    }
});

//eventos de manejo barra de búsqueda pag principal y nav
inputBusq.addEventListener("keyup", event =>{
    grillaBusq.innerHTML = '';
    if(event.which === 13 || event.keyCode == 13){
        btnSearch.style.display = 'none';
        btnClose.style.display = 'block';
        btnSearch.style.width = '1.25rem';
        btnVerMas.style.display = 'block';
        agregarEstilosBusq();
        keyword = inputBusq.value
        buscarGifs(keyword);
    }else{
        //estilo
        estilosComunes();
        tituloTred.style.display = "block";

        //funcion
        mostrarSugerencias();
    }

})

inputBusqNav.addEventListener("keyup", event =>{
    if(event.which === 13 || event.keyCode == 13){
        busquedaNav();
    }
})

inputBusq.addEventListener("click", () =>{
    grillaBusq.innerHTML = '';
    contadorVermas = 12;
    if(contador == 0){
        mostrarSugerencias();
        //ESTILOS
        if(mediaqueryList.matches == true){
            estilosComunes();
            tituloTred.style.visibility = "hidden";

        }else{
            tituloTred.style.display = "block";
            tituloH1.style.display = "none";
            dibujo.style.display = "none";
            estilosComunes();
            barraBusq.style.width = "17.44rem";
            contenedorBusq.style.marginTop = "7.75rem";
            tituloTred.style.visibility = "visible";
        }
        contador = 1;
    }else{
        quitarEstilosBusq();
        btnSearch.style.display = 'block';
        btnClose.style.display = 'none';
        contador = 0;
        tituloTred.style.visibility = "visible";
    }

})

inputBusqNav.addEventListener("click", () =>{
    inputBusqNav.value = "";
})
//eventos de botones slider gif Max
btnSliderDerGifMax.addEventListener("click", () =>{
    if(idCardMax != (arrayGifsSlider.length-1)){
        idCardMax++;
        movimientoSlider();
    }
})

btnSliderIzqGifMax.addEventListener("click", () =>{
if(idCardMax != 0){
    idCardMax--;
    movimientoSlider();
}
})

//evento botones sugerencias
pSug1.addEventListener('click', ()=>{
    inputBusq.value = pSug1.textContent;
    grillaBusq.innerHTML = '';
    quitarEstilosBusq();
    btnSearch.style.display = 'none';
    btnClose.style.display = 'block';
    btnVerMas.style.display = 'block';
    sugerencias.style.display = "none";
    buscarGifs(pSug1.textContent);
    agregarEstilosSug();
    contadorVermas = 12;
})

pSug2.addEventListener('click', ()=>{
    inputBusq.value = pSug2.textContent;
    grillaBusq.innerHTML = '';
    quitarEstilosBusq();
    btnSearch.style.display = 'none';
    btnClose.style.display = 'block';
    btnVerMas.style.display = 'block';
    sugerencias.style.display = "none";
    buscarGifs(pSug2.textContent);
    agregarEstilosSug();
    contadorVermas = 12;
})

pSug3.addEventListener('click', ()=>{
    inputBusq.value = pSug3.textContent;
    grillaBusq.innerHTML = '';
    quitarEstilosBusq();
    btnSearch.style.display = 'none';
    btnClose.style.display = 'block';
    btnVerMas.style.display = 'block';
    sugerencias.style.display = "none";
    buscarGifs(pSug3.textContent);
    agregarEstilosSug();
    contadorVermas = 12;
})

pSug4.addEventListener('click', ()=>{
    inputBusq.value = pSug4.textContent;
    grillaBusq.innerHTML = '';
    quitarEstilosBusq();
    btnSearch.style.display = 'none';
    btnClose.style.display = 'block';
    btnVerMas.style.display = 'block';
    sugerencias.style.display = "none";
    buscarGifs(pSug4.textContent);
    agregarEstilosSug();
    contadorVermas = 12;
})


//FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES//


//funcion async general
let url;
async function conexionApi(url){
    const resp = await fetch(url);
    const data = await resp.json()
    return data
}

function is_negative_number(number){
    if(number<0){
        return 0;
    }else{
        return number;
    }
}

//funcion que detecta el movimiento del scroll
var tiempo; 

function desplaza() {
    clearTimeout(tiempo); 
    tiempo = setTimeout(oculta, 400); 
    document.querySelector("nav").className = "aparece";
    if(document.getElementById('pagPrincipal').offsetTop > 10 && mediaqueryList.matches){
    document.getElementsByClassName('contenedor-barra-busq-nav')[0].style.display='flex';
    }
}

function oculta() {
  if((document.documentElement.scrollTop || self.pageYOffset) != 0) {
  document.querySelector("nav").className = "desaparece"; 
  }else{
    document.getElementsByClassName('contenedor-barra-busq-nav')[0].style.display='none';
  }
}

onscroll = desplaza;


//funcion buscar Gifs
function buscarGifs(keyword){
    remove('#nuevagrilla')
    gifsRespuestas = [];
    grillaBusq.innerHTML = '';
    //Es la variable donde se guarda la entrada de busqueda
    keywordGuardada = keyword;

    if(keyword == ""){
        //busqueda de gifs tendencias

        tituloBusqueda.textContent = "Ultimos en tendencia"
        url = `${urlGiphy}/gifs/trending?api_key=${apiKey}&limit=12&offset=0`;
        let topTendencias = conexionApi(url);

        topTendencias.then(data => {
            console.log(data);

            for (var i = 0; i <= 12; i++) {
                divImg.innerHTML= '';
                crearElemento(data, i);
                divImg.classList.add('card-hover');
                grillaBusq.appendChild(divImg.cloneNode(true));
                gifsRespuestas.push(data.data[i]);
            }

        }).catch(err => {
            console.error('fetch failed', err);
        })

    }else{
        ////busqueda de gifs palabra ingresada
        tituloBusqueda.textContent = keyword;
        url = `${urlGiphy}/gifs/search?api_key=${apiKey}&q=${keyword}&limit=12&offset=0`;
        let respuesta  = conexionApi(url);
        respuesta.then(data => {
            console.log(data);
            if(data.data.length == 0){
                busquedaSinCont.style.display = 'block';
                grillaBusq.style.display = 'none';
                btnVerMas.style.display = 'none';
            }else{
                if(data.data.length < 11){
                    console.log('estoy en el if');
                    btnVerMas.style.display = 'none';
                    for (var i = 0; i < data.data.length; i++) {
                        divImg.innerHTML= '';
                        crearElemento(data, i);
                        divImg.classList.add('card-hover');
                        grillaBusq.appendChild(divImg.cloneNode(true));
                        gifsRespuestas.push(data.data[i]);
                    }
                    for (var i = data.data.length; i < 12; i++) {
                        let imgRelleno = document.createElement('img');
                        imgRelleno.src = 'assets/grilla-sinfavoritos.svg';
                        imgRelleno.style.width = '100%';
                        imgRelleno.style.height = '100%';
                        grillaBusq.appendChild(imgRelleno);
                    }
                }else{
                    console.log('estoy en el else');
                    for (var i = 0; i < 12; i++) {
                        divImg.innerHTML= '';
                        crearElemento(data, i);
                        divImg.classList.add('card-hover');
                        grillaBusq.appendChild(divImg.cloneNode(true));
                        gifsRespuestas.push(data.data[i]);
                    }
                }
            }

        }).catch(err => {
            console.error('fetch failed', err);
        })

    }
}


function crearElemento(d, i){
    let datos = d.data[i];
    //links GIF
    favCard.dataset.id= i;
    comprobarFavorito(datos.id, favCard);
    descCard.dataset.id= i;
    maxCard.dataset.id= i;
    divImg.appendChild(divLinks.cloneNode(true));
    //Usuario Gif
    pCard.innerHTML= '';
    textUser = document.createTextNode(datos.username);
    pCard.appendChild(textUser);
    divTextos.appendChild(pCard);

    //Titulo Gif
    h6Card.innerHTML= '';
    textTit = document.createTextNode(datos.title.substring(0,25));
    h6Card.appendChild(textTit);
    divTextos.appendChild(h6Card);

    divImg.appendChild(divTextos);

    // Gif
    dataImg.src = datos.images.original.url;
    divImg.appendChild(dataImg);
    
    // crearElementoComun(datos);
}



function crearElementoVerMas(d, i){
    let datos = d.data[i];
    //links GIF
    favCard.dataset.id= i+contadorVermas;
    descCard.dataset.id= i+contadorVermas;
    maxCard.dataset.id= i+contadorVermas;
    divImg.appendChild(divLinks.cloneNode(true));
     //Usuario Gif
     pCard.innerHTML= '';
     textUser = document.createTextNode(datos.username);
     pCard.appendChild(textUser);
     divTextos.appendChild(pCard);

     //Titulo Gif
     h6Card.innerHTML= '';
     textTit = document.createTextNode(datos.title.substring(0,25));
     h6Card.appendChild(textTit);
     divTextos.appendChild(h6Card);

     divImg.appendChild(divTextos);

     // Gif
     dataImg.src = datos.images.original.url;
     divImg.appendChild(dataImg);
    //  crearElementoComun(datos);
}

function crearElementoComun(datos){
    console.log(datos.id);
    //Usuario Gif
    pCard.innerHTML= '';
    textUser = document.createTextNode(datos.username);
    pCard.appendChild(textUser);
    divTextos.appendChild(pCard);

    //Titulo Gif
    h6Card.innerHTML= '';
    textTit = document.createTextNode(datos.title.substring(0,25));
    h6Card.appendChild(textTit);
    divTextos.appendChild(h6Card);

    divImg.appendChild(divTextos);

    // Gif
    dataImg.src = datos.images.original.url;
    divImg.appendChild(dataImg);
}


//funcion sugerencias
function mostrarSugerencias(){
    let palabra = inputBusq.value;
    if(palabra != ""){
        url = `${urlGiphy}/gifs/search/tags?api_key=${apiKey}&q=${palabra}`;
        let palabraSugerencias = conexionApi(url);
        palabraSugerencias.then(data => {
            pSug1.textContent = data.data[1].name;
            pSug2.textContent = data.data[2].name;
            pSug3.textContent = data.data[3].name;
            pSug4.textContent = data.data[4].name;
            console.log('if');
        }).catch(err => {
            console.error('fetch failed', err);
        })

    }else{
        url = `${urlGiphy}/trending/searches?api_key=${apiKey}`;
        let palabrasSugerencias = conexionApi(url);
        palabrasSugerencias.then(data => {
            pSug1.textContent = data.data[1];
            pSug2.textContent = data.data[2];
            pSug3.textContent = data.data[3];
            pSug4.textContent = data.data[4];
            console.log('else');

        }).catch(err => {
            console.error('fetch failed', err);
        })
    }
}


function agregarEstilosBusq(){
    if(mediaqueryList.matches == true){
        busqueda.style.display = "block";
        estilosComunes();
        tituloTred.style.display = "none";
        btnVerMas.style.marginTop = "4.87rem";
    }else{
        busqueda.style.display = "block";
        tituloTred.style.display = "block";
        tituloH1.style.display = "none";
        dibujo.style.display = "none";
        estilosComunes();
        barraBusq.style.width = "17.44rem";
        contenedorBusq.style.marginTop = "7.75rem";
        btnVerMas.style.marginTop = "4.87rem";
    }
}

function quitarEstilosBusq(){
    if(mediaqueryList.matches == true){
        btnSearch.style.width = "1.25rem";
        btnSearch.style.height = "1.25rem";
        busqueda.style.display = "none";
        // inputBusq.value = "";
        contenedorBusq.style.height = "3.12rem";
        imgSug0.style.display = "none";
        sugerencias.style.display = "none";
        tituloTred.style.display = "block";

        //reseteo la grilla
        grillaBusq.innerHTML = '';
        // resetear();
    }else{
        btnSearch.style.width = "1.25rem";
        btnSearch.style.height = "1.25rem";
        busqueda.style.display = "none";
        // inputBusq.value = "";
        tituloH1.style.display = "block";
        dibujo.style.display = "block";
        sugerencias.style.display = "none";
        contenedorBusq.style.height = "3.12rem";
        imgSug0.style.display = "none";
        contenedorBusq.style.marginTop = "auto";

        //reseteo la grilla
        grillaBusq.innerHTML = '';
        // resetear();

    }
}
function estilosComunes(){
    contenedorBusq.style.height = "12.5rem";
    contenedorBusq.style.padding = "0px";
    contenedorBusq.style.flexDirection = "column";
    barraBusq.style.marginTop = "0.81rem";
    imgSug0.style.display = "block";
    imgSug0.style.marginRight = "0.91rem";
    sugerencias.style.display = "flex";
}

function agregarEstilosSug(){
    if(mediaqueryList.matches == true){
        busqueda.style.display = "block";
        tituloTred.style.display = "none";
        btnVerMas.style.marginTop = "4.87rem";
    }else{
        busqueda.style.display = "block";
        tituloTred.style.display = "block";
        tituloH1.style.display = "none";
        dibujo.style.display = "none";
        barraBusq.style.width = "17.44rem";
        contenedorBusq.style.marginTop = "7.75rem";
        btnVerMas.style.marginTop = "4.87rem";
    }
}

function busquedaNav(){
    //estilos
    busqueda.style.display = "block";
    btnSearchNav.style.display = 'none';
    btnCloseNav.style.display = 'block';
    document.getElementsByClassName('contenedor-barra-busq-nav')[0].style.padding = '0 0 0 2.12rem'
    inputBusqNav.style.width = '12.5rem';
    btnVerMas.style.marginTop = "4.87rem";
    imgSug0Nav.style.display = "block";
    imgSug0Nav.style.marginRight = "0.62rem";
    tituloTred.style.display = "none";
    //busqueda GIFS
    keyword = inputBusqNav.value
    buscarGifs(keyword);
    moverseA('busqueda');
    contadorVermas = 12;
}

function remove(item) {
    var elem = document.querySelectorAll(item);
    for(var i=0; i<elem.length; i++) {
        var del = elem[i];
        del.parentNode.removeChild(del);
    }
}


//funcion que llamo en el Onclick de anchor de Descarga arriba
 function descargaGif (info, arrayGifs){
     let gif= arrayGifs[info];
     var x=new XMLHttpRequest();
     x.open("GET", gif.images.original.url, true);
     x.responseType = 'blob';
     x.onload=function(e){download(x.response, "descarga.gif", "image/jpg"); }
     x.send();
 };


 function download(data, strFileName, strMimeType) {
     var self = window, // this script is only for browsers anyway...
         defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
         mimeType = strMimeType || defaultMime,
         payload = data,
         url = !strFileName && !strMimeType && payload,
         anchor = document.createElement("a"),
         toString = function(a){return String(a);},
         myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
         fileName = strFileName || "download",
         blob,
         reader;
         myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
     if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
         payload=[payload, mimeType];
         mimeType=payload[0];
         payload=payload[1];
     }
     if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
         fileName = url.split("/").pop().split("?")[0];
         anchor.href = url; // assign href prop to temp anchor
           if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
             var ajax=new XMLHttpRequest();
             ajax.open( "GET", url, true);
             ajax.responseType = 'blob';
             ajax.onload= function(e){
               download(e.target.response, fileName, defaultMime);
             };
             setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
             return ajax;
         } // end if valid url?
     } // end if url?
     //go ahead and download dataURLs right away
     if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
         if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
             payload=dataUrlToBlob(payload);
             mimeType=payload.type || defaultMime;
         }else{
             return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                 navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                 saver(payload) ; // everyone else can save dataURLs un-processed
         }
     }//end if dataURL passed?
     blob = payload instanceof myBlob ?
         payload :
         new myBlob([payload], {type: mimeType}) ;
     function dataUrlToBlob(strUrl) {
         var parts= strUrl.split(/[:;,]/),
         type= parts[1],
         decoder= parts[2] == "base64" ? atob : decodeURIComponent,
         binData= decoder( parts.pop() ),
         mx= binData.length,
         i= 0,
         uiArr= new Uint8Array(mx);
         for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
         return new myBlob([uiArr], {type: type});
      }
     function saver(url, winMode){
         if ('download' in anchor) { //html5 A[download]
             anchor.href = url;
             anchor.setAttribute("download", fileName);
             anchor.className = "download-js-link";
             anchor.innerHTML = "downloading...";
             anchor.style.display = "none";
             document.body.appendChild(anchor);
             setTimeout(function() {
                 anchor.click();
                 document.body.removeChild(anchor);
                 if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
             }, 66);
             return true;
         }
         // handle non-a[download] safari as best we can:
         if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
             url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
             if(!window.open(url)){ // popup blocked, offer direct download:
                 if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
             }
             return true;
         }
         //do iframe dataURL download (old ch+FF):
         var f = document.createElement("iframe");
         document.body.appendChild(f);
         if(!winMode){ // force a mime that will download:
             url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
         }
         f.src=url;
         setTimeout(function(){ document.body.removeChild(f); }, 333);
     }//end saver
     if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
         return navigator.msSaveBlob(blob, fileName);
     }
     if(self.URL){ // simple fast and modern way using Blob and URL:
         saver(self.URL.createObjectURL(blob), true);
     }else{
         // handle non-Blob()+non-URL browsers:
         if(typeof blob === "string" || blob.constructor===toString ){
             try{
                 return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
             }catch(y){
                 return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
             }
         }
         // Blob but not URL support:
         reader=new FileReader();
         reader.onload=function(e){
             saver(this.result);
         };
         reader.readAsDataURL(blob);
     }
     return true;
 }; /* end download() */

//funcion que llamo en el Onclick de anchor de Favoritos arriba
function favoritosGif(info, posiciongif, arrayGifs) {
    let gif = arrayGifs[posiciongif];
    let idGif = gif.id;
    agregarFavoritos(gif);
    function agregarFavoritos(gif){
        let bandera;
        gifFavoritos = JSON.parse(localStorage.getItem("favoritos"));
        if(gifFavoritos == null){
            gifFavoritos = [];
            gifFavoritos.push(gif);
            localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
        }else{
            for(i = 0; i<gifFavoritos.length; i++){
                if(gifFavoritos[i].id == idGif){
                    bandera = true;
                    gifFavoritos.splice(i,1);
                    i = gifFavoritos.length;

                }
            }
            if(bandera){
                console.log('favorito duplicado');
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
                info[0].src = 'assets/icon-fav-hover.svg';

            }else{
                gifFavoritos.push(gif);
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
                info[0].src = 'assets/icon-fav-active.svg';
                console.log('estoy en agregar favorito');
            }
        }

    }

}
//funcion que llamo en los Onclick de anchor de Maximizar Gifs
function maximizarGif(gifId, arrayGifs){
    arrayGifsSlider = arrayGifs.slice();
    pagPrincipal.style.display = 'none';
    divMaxGif.style.display = 'flex';
    idCardMax = gifId;
    favCardMax.dataset.id= idCardMax;
    descCardMax.dataset.id= idCardMax;
    let gif= arrayGifsSlider[idCardMax];
    dataImgMax.src = gif.images.original.url;
    h6CardMax.innerHTML= '';
    textTit = document.createTextNode(gif.title.substring(0,25));
    h6CardMax.appendChild(textTit);
    pCardMax.innerHTML= '';
    textUser = document.createTextNode(gif.username);
    pCardMax.appendChild(textUser);
    comprobarFavoritoSlider(idCardMax, favCardMax, arrayGifsSlider);
    scrollBy(0,-200);
}

function minimizarGif(){
    pagPrincipal.style.display = 'block';
    divMaxGif.style.display = 'none';
    localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
}

function comprobarFavoritoSlider(id, info, arrayGifs){
    console.log(info);
    let gif = arrayGifs[id];
    let idGif = gif.id;
    let bandera;
    gifFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    for(i = 0; i< gifFavoritos.length; i++){
        if(gifFavoritos[i].id == idGif){
            bandera = true;
            posicionFav = i;
            i = gifFavoritos.length;
        }
    }
    if(bandera){
        info.firstElementChild.src = 'assets/icon-fav-active.svg';
        console.log('estoy en comprobar favorito');
    }else{
        info.firstElementChild.src = 'assets/icon-fav-hover.svg';
        console.log('no exite coincidencias');
    }
    
}

function movimientoSlider(){
    favCardMax.dataset.id= idCardMax;
    descCardMax.dataset.id= idCardMax;
    let gif= arrayGifsSlider[idCardMax];
    dataImgMax.src = gif.images.original.url;
    h6CardMax.innerHTML= '';
    textTit = document.createTextNode(gif.title.substring(0,25));
    h6CardMax.appendChild(textTit);
    pCardMax.innerHTML= '';
    textUser = document.createTextNode(gif.username);
    pCardMax.appendChild(textUser);
    comprobarFavoritoSlider(idCardMax, favCardMax, arrayGifsSlider);
}
//treding
function slidering(){
    console.log('estoy en slidering')
    setTimeout(function(){
        slider.insertBefore(slider.lastElementChild,slider.firstElementChild);
        slider.scrollBy({
            left: 400,
        });
        siguiente.addEventListener('click',next,false);
        anterior.addEventListener('click',prev,false);
    },1000)
}

function next(){
    console.log('next');
    
    slider.scrollBy({
        left: 0,
        behavior:'smooth',
    });

    //para evitar el desplazamiento con un doble click
    setTimeout(function(){
        siguiente.addEventListener('click',next);
    },500);
    siguiente.removeEventListener('click',next);

    setTimeout(function(){
        slider.appendChild(slider.firstElementChild);
    },500)

}

function prev(){
    console.log('prev');
    
    slider.scrollBy({
        left: -0,
        behavior: 'smooth',
    });
    //para evitar el desplazamiento con un doble click
    setTimeout(function(){
        anterior.addEventListener('click',prev);
    },500);
    anterior.removeEventListener('click',prev);

    setTimeout(function(){
        slider.insertBefore(slider.lastElementChild,slider.firstElementChild);
    },500)
}


if(mediaqueryList.matches){
    slidering();
    console.log('hola resolucion.matches');
}
insertaGifTreding();

function insertaGifTreding(){

    url = `${urlGiphy}/gifs/trending?api_key=${apiKey}&limit=6&offset=0`;
    let topTreding = conexionApi(url);
    gifFavoritos = JSON.parse(localStorage.getItem("favoritos"));

    topTreding.then(data => {
        for (var i = 0; i < 6; i++) {
            divImgTred.innerHTML= '';
            let datos = data.data[i];
            console.log(datos.id);
            //links GIF
            favCardTred.dataset.id= i;
            comprobarFavorito(datos.id, favCardTred);
            descCardTred.dataset.id= i;
            maxCardTred.dataset.id= i;
            divImgTred.appendChild(divLinksTred.cloneNode(true));
        
            //Usuario Gif
            pCardTred.innerHTML= '';
            textUser = document.createTextNode(datos.username);
            pCardTred.appendChild(textUser);
            divTextosTred.appendChild(pCardTred);
        
            //Titulo Gif
            h6CardTred.innerHTML= '';
            textTit = document.createTextNode(datos.title.substring(0,25));
            h6CardTred.appendChild(textTit);
            divTextosTred.appendChild(h6CardTred);
        
            divImgTred.appendChild(divTextosTred);
        
            // Gif
            dataImgTred.src = datos.images.original.url;
            divImgTred.appendChild(dataImgTred);
            divImgTred.classList.add('card-hover');
            slider.appendChild(divImgTred.cloneNode(true));
            gifTendencias.push(data.data[i]);



        }
        slider.removeChild(divImgTred);
        

    }).catch(err => {
        console.error('fetch failed', err);
    })
}

function moverseA(idDelElemento) {
    location.hash = "#" + idDelElemento;
    console.log('estoy en moverseA');
}

function comprobarFavorito (idGif, favCard){
    console.log(idGif)
    let bandera;
    for(i = 0; i< gifFavoritos.length; i++){
        console.log(i);
        if(gifFavoritos[i].id == idGif){
            bandera = true;
            i = gifFavoritos.length;
        }
    }
    if(bandera){
        favCard.firstElementChild.src = 'assets/icon-fav-active.svg';
        console.log('existen coincidencias con favorito');
    }else{
        console.log('no exite coincidencias');
        favCard.firstElementChild.src = 'assets/icon-fav-hover.svg';
    }
}
