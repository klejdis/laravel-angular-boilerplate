const mix = require('laravel-mix');
let path = require('path');
let webpack = require('webpack');


mix.ts('resources/js/app.ts', 'public/js/app.js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);;
