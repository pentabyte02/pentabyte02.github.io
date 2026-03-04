import { resaltaSiEstasEn } from "./lib/resaltaSiEstasEn.js"

export class NavTabFixed extends HTMLElement {

 constructor() {
  super()
  this.creado = false
 }

 connectedCallback() {
  this.classList.add("md-tab", "fixed")

  if (!this.creado) {

   this.innerHTML = /* HTML */`
    <a ${resaltaSiEstasEn(["/index.html"])} href="index.html">
     <span class="material-symbols-outlined">help</span>
     Ayuda
    </a>

    <a ${resaltaSiEstasEn(["/geolocalizacion.html"])} href="geolocalizacion.html">
     <span class="material-symbols-outlined">location_on</span>
     Ubicación
    </a>

    <a ${resaltaSiEstasEn(["/camara.html"])} href="camara.html">
     <span class="material-symbols-outlined">photo_camera</span>
     Cámara
    </a>

    <a ${resaltaSiEstasEn(["/archivos.html"])} href="archivos.html">
     <span class="material-symbols-outlined">folder</span>
     Archivos
    </a>


   `

   this.creado = true
  }
 }

}

customElements.define("nav-tab-fixed", NavTabFixed)