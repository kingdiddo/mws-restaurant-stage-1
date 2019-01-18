const currentVersion = 'v1';

const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// install 'cacheFiles' to the cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentVersion).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

// Implement fetching method 
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log(event.request, ' is in cache.');
                return response;
            }
            else {
                console.log(event.request, 'is not the cache!');
                return fetch(event.request)
                .then(function(response) {
                    // avoid using of response twice, make a copy and cache it again.
                    const myResponse = response.clone(); 
                    caches.open(currentVersion).then(function(cache) {
                        cache.put(event.request, myResponse);
                    })
                    return response;
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        })
    );
});