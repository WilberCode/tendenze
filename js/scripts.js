let _callServices = () => {
  fetch('json/services.json')
  .then(response => response.json())
  .then(data => {
    let services = document.getElementsByClassName('services');
    let arrayData = data.services;
    arrayData.map((val, index) =>{
      let tagWrapp = document.createElement('div');
      let imgWrapp = document.createElement('img');
      let title = document.createElement('h3');
      let description = document.createElement('p');
      title.innerHTML = val.title;
      imgWrapp.alt = val.title;
      imgWrapp.title = val.title;
      description.innerHTML = val.description;
      tagWrapp.appendChild(imgWrapp).src = val.img;
      tagWrapp.appendChild(title).classList.add('align_center');
      tagWrapp.appendChild(description).classList.add('align_center');
      services[0].appendChild(tagWrapp).classList.add('itemServices');
    });
  });
}

let _callClients = () => {
  fetch('json/clients.json')
    .then(response => response.json())
    .then(data => {
      let clientes = document.getElementsByClassName('clientes');
      let arrayData = data.clientes;
      arrayData.map((val, index) => {
        let imgWrapp = document.createElement('img');
        imgWrapp.width = val.width;
        imgWrapp.title = val.title;
        imgWrapp.alt = val.title;
        imgWrapp.classList.add('cli-'+val.tipo);
        clientes[0].appendChild(imgWrapp).src = val.img
      });
    });
}

let _callGallery = () => {
  fetch('json/gallery.json')
    .then(response => response.json())
    .then(data => {
      let gallery = document.getElementsByClassName('gallery');
      let arrayData = data.gallery;
      arrayData.map((val, index) => {
        let tagWrapp = document.createElement('div');
        tagWrapp.classList.add('itemGallery');
        let imgWrapp = document.createElement('img');
        imgWrapp.title = val.title;
        imgWrapp.src = val.img;
        imgWrapp.alt = val.title;
        tagWrapp.appendChild(imgWrapp);
        gallery[0].appendChild(tagWrapp)
      });
    });
}

let dimensionSLiderAbout = 80;

let _getDataAbout = () => {
  fetch('json/about.json')
    .then(response => response.json())
    .then(data => {
      let sliderInformacion = document.getElementsByClassName('wrappSliderAbout');
      let arrayData = data.aboutData;
      let sizeWrappSlider = arrayData.length * dimensionSLiderAbout;
      sliderInformacion[0].style.width = sizeWrappSlider + 'vw';

      let dots = document.getElementsByClassName('dots'); 

      arrayData.map((val, index) => {

        let tagWrapp = document.createElement('div');
        let title = document.createElement('h2');
        let description = document.createElement('p');
        title.innerHTML = val.title + ' <span>'+val.focusTitle+'</span>';
        description.innerHTML = val.description;
        tagWrapp.classList.add('itemSlider');
        tagWrapp.setAttribute('id', 'item'+val.id)
        tagWrapp.classList.add('section_middle_left');
        if(val.reverse == 'true'){
          tagWrapp.classList.add('reverseItemSlider');
        }

        let dot = document.createElement('button');
        dot.setAttribute('data-posicion', val.id)
        dot.setAttribute('onclick', '_goToSlide(this)');
        if(val.id == 0){
          dot.classList.add('active');
          dot.setAttribute('disabled', true);
        }
        dots[0].appendChild(dot);
        tagWrapp.appendChild(title);
        tagWrapp.appendChild(description);
        sliderInformacion[0].appendChild(tagWrapp);
      });
    });
}

/*Fixed header */
let sticky = 0;

let _fixedHeader = () => {
  let header = document.getElementById("header");
  sticky = parseInt(header.offsetTop) + 300;

  if (window.pageYOffset > sticky) {
    header.classList.add("fixedHeader");
  } else {
    header.classList.remove("fixedHeader");
  }
}

let _parallaxSlider = () => {
    let slider = document.getElementById("sliderPrincipal");
    let posElementWrapp = slider.getBoundingClientRect();
    let heightScreen = window.innerHeight - 50;
    if (posElementWrapp.top < heightScreen) {
      slider.style.backgroundPosition = 'center ' + -parseInt(posElementWrapp.top / 8) + 'px';
    }
}

let _parallaxCategorias = () => {
    let categoriasWrapp = document.getElementsByClassName("categorias");
    let posElementWrapp = categoriasWrapp[0].getBoundingClientRect();
    
    let heightScreen = window.innerHeight - 50;
    
    if (posElementWrapp.top < heightScreen) {
      categoriasWrapp[0].style.backgroundPosition = 'center ' + - parseInt(posElementWrapp.top / 2 ) + 'px';
    }
}

let _cleanItemSlide = () => {
  var dots = document.querySelectorAll('.dots > button');
  for (let i = 0; i < dots.length; i++) {
    dots[i].removeAttribute('disabled');
    dots[i].classList.remove('active');
  }
}

let _goToSlide = (element) => {
  _cleanItemSlide();
  element.setAttribute('disabled', true);
  element.classList.add('active');
  let posicion = element.dataset.posicion;
  let move = dimensionSLiderAbout * posicion;

  let contenedorSlider = document.getElementsByClassName('wrappSliderAbout');
  contenedorSlider[0].style.transform = 'translateX(-' + move + 'vw)';
}

/*Ready functions */
_callGallery();
_callServices();
_callClients();
_getDataAbout();


let _clickAnchorLink = () =>{
  document.querySelectorAll('.anchor[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      let header = document.getElementById('header').offsetHeight;
      let attribute = document.querySelector(this.getAttribute('href'));
      let position = parseInt(attribute.offsetTop) - (parseInt(header) + 20);

      document.getElementById('hb').classList.remove('activeHamburguer');
      document.querySelector('nav > ul').classList.remove('activeMenu');

      window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth'
      });
    });
  });
}

let _openHideMenu = () => {
  let hb = document.getElementById('hb');
  let ulMenu = document.querySelector('nav > ul');
  hb.onclick = function(e){
    e.preventDefault();
    hb.classList.toggle('activeHamburguer');
    ulMenu.classList.toggle('activeMenu');
  }
}

/*Youtube */
let player;

let _onYouTubeIframeAPIReady = (idVideo) => {
  player = new YT.Player('video-placeholder', {
    width: '100%',
    height: '100%',
    videoId: idVideo,
    playerVars: {
      enablejsapi: 1,
      color: 'black',
      // playlist: 'taJ60kskkns, FG0fTKAqZ5g',
      // origin: 'http://127.0.0.1:5500'
    },
    events: {
      // onReady: _initialize()
    }
  });
}

let _openVideo = () => {
  let videos = document.querySelectorAll('.videoButon');
  for (let i = 0; i < videos.length; i++) {
    videos[i].onclick = () =>{
      let idVideo = videos[i].dataset.video;
      player.cueVideoById(idVideo);
      player.setPlaybackQuality('hd1080');
      player.unMute();
      player.setVolume(50);

      document.getElementsByClassName('overflowVideo')[0].classList.add('activeOverflowVideo');
      document.getElementsByClassName('modalWrappVideo')[0].classList.add('activeModalWrappVideo');

      setTimeout(() => {
        player.playVideo();
      }, 500);
    }
  }
}

let _closeVideo = () =>{
  let closeModalTg = document.getElementById('closeModal');

  closeModalTg.onclick = (e) => {
    e.preventDefault();

    player.pauseVideo();
    player.mute();

    document.getElementsByClassName('overflowVideo')[0].classList.remove('activeOverflowVideo');
    document.getElementsByClassName('modalWrappVideo')[0].classList.remove('activeModalWrappVideo');
  }

}

let _sliderAbout = () =>{
  

}

window.onload = () => {
  _onYouTubeIframeAPIReady(0);
  _openVideo();
  _clickAnchorLink();
  _openHideMenu();
  _closeVideo();
  _parallaxSlider();
  _sliderAbout();

  window.onscroll = () => {
    _parallaxSlider();
    _fixedHeader();
    _parallaxCategorias();
  }
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
} 