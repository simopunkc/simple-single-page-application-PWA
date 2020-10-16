importScripts('/workbox/workboxsw.js');
workbox.setConfig({
    modulePathPrefix: '/workbox/workbox-v5.1.4/'
});
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.precaching.precacheAndRoute([
    '/favicon.ico',
    '/json.webmanifest',
    '/index.html',
    '/appshell/nav.html',
    '/appshell/sidebar.html',
    '/logo/logo36.png',
    '/logo/logo48.png',
    '/logo/logo72.png',
    '/logo/logo96.png',
    '/logo/logo144.png',
    '/logo/logo192.png',
    '/logo/logo512.png',
    '/pages/about.html',
    '/pages/klasemen.html',
    '/pages/daftartim.html',
    '/pages/daftartimfavorit.html',
    '/pages/contact.html',
    '/pages/infotim.html',
    '/pages/jadwaltim.html'
]);
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponse} from 'workbox-cacheable-response';
workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new StaleWhileRevalidate({
        cacheName: 'pages'
    })
);
workbox.routing.registerRoute(
    /\.(?:html|png|ico|jpg|jpeg|css|eot|json|ttf|woff|woff2|scss)$/,
    new CacheFirst({
        cacheName: 'statik',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
        ]
    })
);
workbox.routing.registerRoute(
    /\.(?:webmanifest)$/,
    new StaleWhileRevalidate({
        cacheName: 'manifest'
    })
);
workbox.routing.registerRoute(
    /^https:\/\/(?:.*\.football\-data\.org|.*\.googleapis\.com)/,
    new StaleWhileRevalidate({
        cacheName: 'apiexternal',
        plugins: [
            new CacheableResponse({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 500,
            }),
        ],
    })
);
workbox.core.skipWaiting();
workbox.core.clientsClaim();
self.addEventListener('push', function(event){
    var body;
    if(event.data){
        body=event.data.text();
    }else{
        body='Push message no payload';
    }
    var options={
        body: body,
        icon: '/logo/logo144.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});