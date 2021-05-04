// const http = require('http');
// const server = http.createServer((req,res)=>{//요청,응답
//     console.log(req.url,req.method);
//     if(req.method === 'GET'){
//         if(req.url === '/api/post'){
            
//         }
//     }
//     res.end('hello');//

// })
// server.listen(3065,()=>{
//     console.log('서버 실행 중')
// });

const express = require('express');
const postRouter = require('./routes/post');
const app = express();

app.get('/',(req,res)=>{
    res.send('hello')
})
app.get('/',(req,res)=>{
    res.send('hello api')
})
app.get('/posts',(req,res)=>{
    res.json([//데이터
        {id:'1',content:'text'},
        {id:'1',content:'text'},
        {id:'1',content:'text'},
    ])
})

app.use('/post',postRouter)

app.listen(3065,()=>{
    console.log('서버실행중')
})