//VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES//

//datos de la GIPHY :    dc6zaTOxFJmzC
const apiKey = 'pafWZGqk8MHrstQqfclfqcJHSjDCHO9f';
const urlGiphy = 'https://api.giphy.com/v1';

// modo nocturno

let html = document.querySelector('html');
let btnNocturno = document.getElementById('btnNocturno');

//mostrar fav
let grillaFav = document.getElementById('resultado-favoritos');
let favoritos = document.getElementById('favoritos');
let favSinCont = document.getElementById('favoritos-sincontenido');
let gifFavoritos = JSON.parse(localStorage.getItem("favoritos"));
let btnVerMasFav = document.getElementById('verMas-favoritos');
let contadorVermasFav = 12;
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
var mediaqueryList = window.matchMedia("(min-width: 768px)");

let gifTendencias= [];



//ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS//

btnNocturno.addEventListener('click', () =>{

    if(!html.classList.contains('modo-nocturno')){
        html.classList.add('modo-nocturno');
        btnNocturno.textContent = 'Modo Diurno';
    }else{
        html.classList.remove('modo-nocturno');
        btnNocturno.textContent = 'Modo Nocturno';
    }

});


btnVerMasFav.addEventListener('click', () =>{
    nuevaGrilla = document.createElement('div');
    nuevaGrilla.setAttribute("id", "nuevagrilla-favoritos");
    // nuevaGrilla.style.marginTop = "1.75rem";
    grillaFav.style.marginBottom = "0px";
    for (var i = contadorVermasFav ; i < (gifFavoritos.length- is_negative_number((gifFavoritos.length-(contadorVermasFav+12)))); i++) {
        divImg.innerHTML= '';
        crearElemento(gifFavoritos, i);
        divImg.classList.add('card-hover');
        nuevaGrilla.appendChild(divImg.cloneNode(true));
    }
    if(gifFavoritos.length < (contadorVermasFav +12)){
        btnVerMasFav.style.display = 'none';
        for (var i = gifFavoritos.length; i < (contadorVermasFav +12); i++) {
            let imgRelleno = document.createElement('img');
            imgRelleno.src = 'assets/grilla-sinfavoritos.svg';
            imgRelleno.style.width = '100%';
            imgRelleno.style.height = '100%';
            nuevaGrilla.appendChild(imgRelleno);
        }
    }else{
        btnVerMasFav.style.display = 'block';
    }
    favoritos.insertBefore(nuevaGrilla, btnVerMasFav);
    contadorVermasFav+= 12;

});

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

//FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES//
function cargaFav() {
    if(gifFavoritos == null){
        favSinCont.style.display = 'block';
        favoritos.style.display = 'none';
    }else{
        favoritos.style.display = 'block';
        if(gifFavoritos.length <= 12){
            btnVerMasFav.style.display = 'none';
            for (var i = 0; i < gifFavoritos.length ; i++) {
                divImg.innerHTML= '';
                crearElemento(gifFavoritos, i);
                divImg.classList.add('card-hover');
                grillaFav.appendChild(divImg.cloneNode(true));
            }
            grillaFav.removeChild(divImg);
            for (var i = gifFavoritos.length; i < 12; i++) {
                let imgRelleno = document.createElement('img');
                imgRelleno.src = 'assets/grilla-sinfavoritos.svg';
                imgRelleno.style.width = '100%';
                imgRelleno.style.height = '100%';
                grillaFav.appendChild(imgRelleno);
            }
            if(gifFavoritos.length == 0){
                favSinCont.style.display = 'block';
                favoritos.style.display = 'none';
            }
        }else{
            for (var i = 0; i < 12; i++) {
                divImg.innerHTML= '';
                crearElemento(gifFavoritos, i);
                divImg.classList.add('card-hover');
                grillaFav.appendChild(divImg.cloneNode(true));
            }
            grillaFav.removeChild(divImg);
            btnVerMasFav.style.display = 'block';
        }

    }
}

function crearElemento(d, i){
    let datos = d[i];
    //links GIF
    favCard.dataset.id= i;
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
}


function is_negative_number(number){
    if(number<0){
        return 0;
    }else{
        return number;
    }
}

//funcion async general
let url;
async function conexionApi(url){
    const resp = await fetch(url);
    const data = await resp.json()
    return data
}

//funcion que detecta el movimiento del scroll
var tiempo; 

function desplaza() {
    clearTimeout(tiempo); 
    tiempo = setTimeout(oculta, 400); 
    document.querySelector("nav").className = "aparece";
}

function oculta() {
  if((document.documentElement.scrollTop || self.pageYOffset) != 0) {
  document.querySelector("nav").className = "desaparece"; 
  }
}

onscroll = desplaza;



//funcion que llamo en el Onclick de anchor de Favoritos arriba
function favoritosGif(id, info, posiciongif, arrayGifs) {
    let gif = arrayGifs[posiciongif];
    let idGif = gif.id;
    let bandera;
    let posicionFav;
    if(id == 'fav-tred'){
        agregarFavoritos(gif);
            function agregarFavoritos(gif){
            if(gifFavoritos == null){
                gifFavoritos = [];
                gifFavoritos.push(gif);
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
            }else{
                for(i = 0; i<gifFavoritos.length; i++){
                    if(gifFavoritos[i].id == idGif){
                        bandera = true;
                        posicionFav = i;
                        i = gifFavoritos.length;
                    }
                }
                if(bandera){
                    info[0].src = 'assets/icon-fav-hover.svg';
                    gifFavoritos.splice(posicionFav,1);
                    localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));

                }else{
                    gifFavoritos.push(gif);
                    localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
                    info[0].src = 'assets/icon-fav-active.svg';
                }
            }
        }

    }else if(id == 'fav'){
        info[0].src= 'assets/icon-fav-hover.svg';
        gifFavoritos.splice((posiciongif),1);
        localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
        location.reload();
    }else{
        for(i = 0; i<gifFavoritos.length; i++){
            if(gifFavoritos[i].id == idGif){
                bandera = true;
                posicionFav = i;
                i = gifFavoritos.length;
            }
        }
        if(bandera){
            info[0].src = 'assets/icon-fav-hover.svg';
            gifFavoritos.splice(posicionFav,1);
            localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
        }else{
            gifFavoritos.push(gif);
            localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
            info[0].src = 'assets/icon-fav-active.svg';
        }
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
    comprobarFavorito(idCardMax, favCardMax, arrayGifsSlider);
    scrollBy(0,-200);

}

function minimizarGif(){
    pagPrincipal.style.display = 'block';
    divMaxGif.style.display = 'none';
    localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
}

function comprobarFavorito(id, info, arrayGifs){
    let gif = arrayGifs[id];
    let idGif = gif.id;
    let bandera;
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
    comprobarFavorito(idCardMax, favCardMax, arrayGifsSlider);
}
//treding
function slidering(){
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
}

insertaGifTreding();

function insertaGifTreding(){

    url = `${urlGiphy}/gifs/trending?api_key=${apiKey}&limit=6&offset=0`;
    let topTreding = conexionApi(url);

    topTreding.then(data => {
        for (var i = 0; i < 6; i++) {
            divImgTred.innerHTML= '';
            let datos = data.data[i];
            //links GIF
            favCardTred.dataset.id= i;
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