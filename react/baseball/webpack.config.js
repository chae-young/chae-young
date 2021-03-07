const path = require('path');
const webpack = require('webpack');
//rocess.env.NODE_ENV = 'production'; 배포시 환경설정

module.exports = {
    mode:'development', //배포: production
    devtool:'eval',
    resolve:{
        extensions:['.jsx','.js']
    },
    entry:{
        app:'./client',
    },
    module:{
        rules:[{
            test:/\.jsx?/,
            loader:'babel-loader',
            options:{
                presets:[
                ["@babel/preset-env",{
                    targets:{
                        browsers:['> 5% in KR','last 2 chrome versions'],
                    }
                }],
                "@babel/preset-react"
                ],
                plugins:['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true})
    ],
    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.js',
    },
}