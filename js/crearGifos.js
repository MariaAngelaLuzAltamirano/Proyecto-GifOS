//VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES////VARIABLES//
//datos de la GIPHY :    dc6zaTOxFJmzC
const apiKey = 'pafWZGqk8MHrstQqfclfqcJHSjDCHO9f';

//crear Gifos
let crear1 = document.getElementById('crear1');
let crear2 = document.getElementById('crear2');
let crear3 = document.getElementById('crear3');
let btnComenzar = document.getElementById('comenzar');
let botones = document.getElementById('botones-pag');
let video = document.getElementById('videoGif');
let btnGrabar= document.getElementById('grabar');
let btnFinalizar = document.getElementById('finalizar');
let repetirCap= document.getElementById('repetirCap');
let btnSubir = document.getElementById('subirGifo');
let cronometro = document.getElementById('contador');
let h = 0;
let m = 0;
let s = 0;
let objStream;
let recorder;
let previewGif= document.getElementById('previewGif');
let form;
let gifCreado;
let subiendoGif = document.getElementById('subiendoGif');
let gifSubido = document.getElementById('gifSubido');
let descarga = document.getElementById('desc');
let link = document.getElementById('link');
let gifmisGifos = JSON.parse(localStorage.getItem("misGifos"));


// modo nocturno

let html = document.querySelector('html');
let btnNocturno = document.getElementById('btnNocturno');
let elementoCam1 = document.getElementById('elemento1-cam');
let elementoCam2 = document.getElementById('elemento2-cam');
let elementoCam3 = document.getElementById('elemento3-cam');
let elementoCam5 = document.getElementById('elemento5-cam');


//ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS////ADDEVELISTENERS//

btnNocturno.addEventListener('click', () =>{

    if(!html.classList.contains('modo-nocturno')){
        html.classList.add('modo-nocturno');
        btnNocturno.textContent = 'Modo Diurno';
        elementoCam1.src = 'assets/element_cinta1-modo-noc.svg';
        elementoCam2.src = 'assets/element_cinta2-modo-noc.svg';
        elementoCam5.src = 'assets/pelicula-modo-noc.svg';
    }else{
        html.classList.remove('modo-nocturno');
        btnNocturno.textContent = 'Modo Nocturno';
        elementoCam1.src = 'assets/element_cinta1.svg';
        elementoCam2.src = 'assets/element_cinta2.svg';
        elementoCam5.src = 'assets/pelicula.svg';
    }

});

btnComenzar.addEventListener('click', () =>{
    botones.children[0].className +="btn-activos";
    crear1.style.display = 'none';
    crear2.style.display = 'block';
    btnComenzar.style.display = 'none';
    getStreamAndRecord();

});


btnGrabar.addEventListener("click",cronometrar);
btnFinalizar.addEventListener("click",parar);
repetirCap.addEventListener("click",reiniciar);
btnSubir.addEventListener("click", subirGifo);
descarga.addEventListener("click",descargaGif);

//FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES////FUNCIONES//


function getStreamAndRecord() { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height: { max: 480 }
    }
    })
    .then(function(stream) {
        crear2.style.display = 'none';
        crear3.style.display = 'flex';
        botones.children[0].classList.remove("btn-activos");
        botones.children[1].className +="btn-activos";
        btnGrabar.style.display = 'block';
        previewGif.style.display = 'none';
        objStream = stream;
        video.srcObject = stream;
        video.play();
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 480,
            height: 320,
            onGifRecordingStarted: function() {
             console.log('started')
           },
        });
        
    }).catch((err) =>{
        console.log(err);
    })
}

     
function cronometrar(){
    cronometro.style.display = 'block';
    btnGrabar.style.display = 'none';
    btnFinalizar.style.display = 'block';
    escribir();
    id = setInterval(escribir,1000);
    recorder.startRecording();
}
function escribir(){
    setTimeout(function(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    cronometro.innerHTML = hAux + ":" + mAux + ":" + sAux;
    },1000)
}

function parar(){
    clearInterval(id);
    btnFinalizar.style.display = 'none';
    cronometro.style.display = 'none';
    repetirCap.style.display = 'block';
    btnSubir.style.display = 'block';
    recorder.stopRecording(function() {
        form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
        let reader = new FileReader();
        reader.readAsDataURL(form.get('file'));
        setTimeout(function(){
            previewGif.style.display = 'block';
            previewGif.src = reader.result;
        }, 3000);
        video.style.display = 'none';;
    });
    stopStream(objStream);
}

function reiniciar(){
    clearInterval(id);
    cronometro.innerHTML="00:00:00";
    h=0;m=0;s=0;
    repetirCap.style.display = 'none';
    btnSubir.style.display = 'none';
    btnGrabar.style.display = 'block';
    subiendoGif.style.display = 'none';
    botones.children[1].classList.remove("btn-activos");
    crear3.classList.remove("contenedor-camaraActiva");
    previewGif.style.display = 'none';
    previewGif.src = "";
    video.style.display = 'block';
    getStreamAndRecord();
}

function stopStream(stream){
    console.log('stop called');
    stream.getVideoTracks().forEach(function (track) {
        track.stop();
    });
}

function subirGifo(form){
    btnSubir.style.display = 'none';
    repetirCap.style.display = 'none';
    subiendoGif.style.display = 'flex';
    crear3.className +="contenedor-camaraActiva";
    botones.children[1].classList.remove("btn-activos");
    botones.children[2].className +="btn-activos";

    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
        method: "POST",
        body: form,
        mode: 'no-cors'
    })
    .then(response => {
        let data = response.json();
        console.log(data);
        link.href = data.embed_url;
        gifCreado = data;
        subiendoGif.style.display = 'none';
        gifSubido.style.display = 'flex';
        gifmisGifos.push(gif);
        localStorage.setItem('favoritos', JSON.stringify(gifmisGifos));
    }).catch( err=> {
        console.log(err);
    })
    
}



//funcion que llamo en el Onclick de anchor de Descarga arriba
function descargaGif (){
    var x=new XMLHttpRequest();
    x.open("GET", gifCreado.images.original.url, true);
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
