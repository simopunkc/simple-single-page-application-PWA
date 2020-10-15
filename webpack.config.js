const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {InjectManifest}=require('workbox-webpack-plugin');
const config={
    mode: "production",
    entry: [
        './js/custom.js',
        './js/materialize.min.js'
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