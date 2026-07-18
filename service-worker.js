const CACHE_NAME = "ghazal-calculator-v4";
const FILES = [
  "./",
  "index.html",
  "calculator.html",
  "home.html",
  "style.css",
  "script.js",
  "logo.png",
  "manifest.json",

  "posts.html",
  "posts.js",
  "posts.css",

  "saved-posts.html",
  "saved-posts.js",

  "add-products.html",
  "products.js",

  "pricing-settings.html",
  "pricing-settings.js",

  "categories.html",
  "categories.js",

  "suppliers.html",
  "suppliers.js",

  "backup.html",
  "backup.js"
];


self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

    .then(cache => {

      return cache.addAll(FILES);

    })

  );

});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()

    .then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

    .then(response => {

      return response || fetch(event.request);

    })

  );

});