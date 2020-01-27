"use strict";var _callServices=function(){fetch("json/services.json").then(function(e){return e.json()}).then(function(e){var l=document.getElementsByClassName("services");e.services.map(function(e,t){var n=document.createElement("div"),i=document.createElement("img"),a=document.createElement("h3"),o=document.createElement("p");a.innerHTML=e.title,i.alt=e.title,i.title=e.title,o.innerHTML=e.description,n.appendChild(i).src=e.img,n.appendChild(a).classList.add("align_center"),n.appendChild(o).classList.add("align_center"),l[0].appendChild(n).classList.add("itemServices")})})},_callClients=function(){fetch("json/clients.json").then(function(e){return e.json()}).then(function(e){var i=document.getElementsByClassName("clientes");e.clientes.map(function(e,t){var n=document.createElement("img");n.width=e.width,n.title=e.title,n.alt=e.title,n.classList.add("cli-"+e.tipo),i[0].appendChild(n).src=e.img})})},_callGallery=function(){fetch("json/gallery.json").then(function(e){return e.json()}).then(function(e){var a=document.getElementsByClassName("gallery");e.gallery.map(function(e,t){var n=document.createElement("div");n.classList.add("itemGallery");var i=document.createElement("img");i.title=e.title,i.src=e.img,i.alt=e.title,n.appendChild(i),a[0].appendChild(n)})})},dimensionSLiderAbout=80,_getDataAbout=function(){fetch("json/about.json").then(function(e){return e.json()}).then(function(e){var l=document.getElementsByClassName("wrappSliderAbout"),t=e.aboutData,n=t.length*dimensionSLiderAbout;l[0].style.width=n+"vw";var r=document.getElementsByClassName("dots");t.map(function(e,t){var n=document.createElement("div"),i=document.createElement("h2"),a=document.createElement("p");i.innerHTML=e.title+" <span>"+e.focusTitle+"</span>",a.innerHTML=e.description,n.classList.add("itemSlider"),n.setAttribute("id","item"+e.id),n.classList.add("section_middle_left"),"true"==e.reverse&&n.classList.add("reverseItemSlider");var o=document.createElement("button");o.setAttribute("data-posicion",e.id),o.setAttribute("onclick","_goToSlide(this)"),0==e.id&&(o.classList.add("active"),o.setAttribute("disabled",!0)),r[0].appendChild(o),n.appendChild(i),n.appendChild(a),l[0].appendChild(n)})})},sticky=0,_fixedHeader=function(){var e=document.getElementById("header");sticky=parseInt(e.offsetTop)+300,window.pageYOffset>sticky?e.classList.add("fixedHeader"):e.classList.remove("fixedHeader")},_parallaxSlider=function(){var e=document.getElementById("sliderPrincipal"),t=e.getBoundingClientRect(),n=window.innerHeight-50;t.top<n&&(e.style.backgroundPosition="center "+-parseInt(t.top/8)+"px")},_parallaxCategorias=function(){var e=document.getElementsByClassName("categorias"),t=e[0].getBoundingClientRect(),n=window.innerHeight-50;t.top<n&&(e[0].style.backgroundPosition="center "+-parseInt(t.top/2)+"px")},_cleanItemSlide=function(){for(var e=document.querySelectorAll(".dots > button"),t=0;t<e.length;t++)e[t].removeAttribute("disabled"),e[t].classList.remove("active")},_goToSlide=function(e){_cleanItemSlide(),e.setAttribute("disabled",!0),e.classList.add("active");var t=e.dataset.posicion,n=dimensionSLiderAbout*t;document.getElementsByClassName("wrappSliderAbout")[0].style.transform="translateX(-"+n+"vw)"};_callGallery(),_callServices(),_callClients(),_getDataAbout();var _clickAnchorLink=function(){document.querySelectorAll('.anchor[href^="#"]').forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();var t=document.getElementById("header").offsetHeight,n=document.querySelector(this.getAttribute("href")),i=parseInt(n.offsetTop)-(parseInt(t)+20);document.getElementById("hb").classList.remove("activeHamburguer"),document.querySelector("nav > ul").classList.remove("activeMenu"),window.scrollTo({left:0,top:i,behavior:"smooth"})})})},_openHideMenu=function(){var t=document.getElementById("hb"),n=document.querySelector("nav > ul");t.onclick=function(e){e.preventDefault(),t.classList.toggle("activeHamburguer"),n.classList.toggle("activeMenu")}},player=void 0,_onYouTubeIframeAPIReady=function(e){player=new YT.Player("video-placeholder",{width:"100%",height:"100%",videoId:e,playerVars:{enablejsapi:1,color:"black"},events:{}})},_openVideo=function(){for(var n=document.querySelectorAll(".videoButon"),e=function(t){n[t].onclick=function(){var e=n[t].dataset.video;player.cueVideoById(e),player.setPlaybackQuality("hd1080"),player.unMute(),player.setVolume(50),document.getElementsByClassName("overflowVideo")[0].classList.add("activeOverflowVideo"),document.getElementsByClassName("modalWrappVideo")[0].classList.add("activeModalWrappVideo"),setTimeout(function(){player.playVideo()},500)}},t=0;t<n.length;t++)e(t)},_closeVideo=function(){document.getElementById("closeModal").onclick=function(e){e.preventDefault(),player.pauseVideo(),player.mute(),document.getElementsByClassName("overflowVideo")[0].classList.remove("activeOverflowVideo"),document.getElementsByClassName("modalWrappVideo")[0].classList.remove("activeModalWrappVideo")}},_sliderAbout=function(){};window.onload=function(){_onYouTubeIframeAPIReady(0),_openVideo(),_clickAnchorLink(),_openHideMenu(),_closeVideo(),_parallaxSlider(),_sliderAbout(),window.onscroll=function(){_parallaxSlider(),_fixedHeader(),_parallaxCategorias()}},"serviceWorker"in navigator&&navigator.serviceWorker.register("../sw.js").then(function(e){return console.log("Registro de SW exitoso",e)}).catch(function(e){return console.warn("Error al tratar de registrar el sw",e)});