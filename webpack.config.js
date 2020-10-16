const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {InjectManifest}=require('workbox-webpack-plugin');
const config={
    mode: "production",
    entry: [
        './js/ajax_xhr.js',
        './js/appshell.js',
        './js/custom.js',
        './js/daftarteam_football.js',
        './js/indexeddb_promise.js',
        './js/info_fetch.js',
        './js/infotim_football.js',
        './js/jadwal_football.js',
        './js/klasemen_football.js',
        './js/load_page.js',
        './js/materialize.min.js',
        './js/notifikasi.js',
        './js/timfavorit.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(path.join(__dirname, '/')),
    },
    module: {
        rules: [
            {
                test: /\.(?:css)$/,
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        new InjectManifest({
            swSrc: './swori.js',
            swDest: './sw.js'
        })
    ]
}
module.exports=config