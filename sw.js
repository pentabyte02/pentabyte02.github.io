const VERSION = "1.02.1";

const CACHE = "pwamd";

const ARCHIVOS = [
  // HTML
  "index.html",
  "archivos.html",
  "archivos.txt",
  "camara.html",
  "geolocalizacion.html",

  // Manifest y favicons
  "site.webmanifest",
  "favicon.ico",
  "favicon.png",

  // CSS
  "css/baseline.css",
  "css/colors.css",
  "css/elevation.css",
  "css/estilos.css",
  "css/material-symbols-outlined.css",
  "css/md-filled-button.css",
  "css/md-filled-text-field.css",
  "css/md-headline.css",
  "css/md-list.css",
  "css/md-outline-button.css",
  "css/md-tab.css",
  "css/motion.css",
  "css/palette.css",
  "css/roboto.css",
  "css/shape.css",
  "css/state.css",
  "css/transicion_pestanas.css",
  "css/typography.css",

  // Theme
  "css/theme/dark.css",
  "css/theme/light.css",

  // Fonts
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "fonts/roboto-v32-latin-regular.woff2",

  // Imágenes
  "img/icono2048.png",
  "img/maskable_icon.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/screenshot_horizontal_1.png",
  "img/screenshot_horizontal_2.png",
  "img/screenshot_horizontal_3.png",
  "img/screenshot_horizontal_4.png",
  "img/screenshot_horizontal_5.png",
  "img/screenshot_vertical_1.png",
  "img/screenshot_vertical_2.png",
  "img/screenshot_vertical_3.png",
  "img/screenshot_vertical_4.png",
  "img/screenshot_vertical_5.png",

  // JS
  "js/nav-tab-fixed.js",
  "js/lib/ES_APPLE.js",
  "js/lib/getAttribute.js",
  "js/lib/manejaErrores.js",
  "js/lib/muestraError.js",
  "js/lib/muestraTextoDeAyuda.js",
  "js/lib/ProblemDetailsError.js",
  "js/lib/querySelector.js",
  "js/lib/registraServiceWorker.js",
  "js/lib/resaltaSiEstasEn.js",
  "js/lib/custom/md-app-bar.js",

  "/",
];
// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener("install", (evt) => {
    console.log("El service worker se está instalando.");
    evt.waitUntil(llenaElCache());
  });

  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  self.addEventListener("activate", () =>
    console.log("El service worker está activo."),
  );
}

async function llenaElCache() {
  console.log("Intentando cargar caché:", CACHE);

  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }

  const cache = await caches.open(CACHE);

  for (const archivo of ARCHIVOS) {
    try {
      await cache.add(archivo);
      console.log("Cacheado:", archivo);
    } catch (error) {
      console.warn("No se pudo cachear:", archivo);
    }
  }

  console.log("Cache cargado:", CACHE);
  console.log("Versión:", VERSION);
}

async function buscaLaRespuestaEnElCache(evt) {
  const cache = await caches.open(CACHE);
  const request = evt.request;

  const response = await cache.match(request, { ignoreSearch: true });

  if (response === undefined) {
    return fetch(request);
  } else {
    return response;
  }
}
