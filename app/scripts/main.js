/*
*   main.js
*   This file is where all scripts will be configured and/or imported
*/

'use strict';
require.config({
    paths: {
        domReady: '../bower_components/requirejs-domready/domReady',
        jquery: '../bower_components/jquery/dist/jquery',
        socketio: '../bower_components/socket.io-client/dist/socket.io',
        Proton: 'vendor/proton-1.0.0',
        Beacon: 'beacon',
        Lightbulb: 'lightbulb',
        User: 'user',
        particles: 'particles',
        practices: 'practices',
        app: 'app'
    },
    shim: {
        socketio: {
            exports: 'io'
        },
        app: {
            deps: ['jquery']
        },
        'Proton': {
            exports: 'Proton'
        },
    }
});

require(['app', 'domReady'], function (app, domReady) {
    domReady(function () {
        // use app here
        app.init();
    });
});