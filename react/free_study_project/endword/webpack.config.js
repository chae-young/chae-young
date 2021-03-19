const path = require('path');
const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name:'wordrelay',//웹팩이름
    mode:'development',
    devtool:'eval',
    resolve:{
        extensions:['.js','.jsx']
    },
    entry:{
        app:['./client'],
    },//입력
    //entry을 읽고 모듈을 적용한후 ouput한다
    module:{
        //규칙
        rules:[{
            //js,jsx파일 적용하겠다
            test:/\.jsx?/,
            //최신문법으로 바꿔주겠다
            loader:'babel-loader',
            //바벨옵션
            options:{
                presets:[ 
                ["@babel/preset-env",{
                    targets:{
                        browsers:['> 5% in KR','last 2 chrome versions'],
                    }
                }],
                "@babel/preset-react"
                ],
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }]
    },
    plugins:[
        new refreshWebpackPlugin()
    ],
    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.js',
        publicPath:'/dist/'
    },//출력
    devServer:{
        publicPath:'/dist/',
        hot:true
    }
};