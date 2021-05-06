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
const userRouter = require('./routes/post');
const db = require('./models');
const app = express();

db.sequelize.sync()
    .then(()=>{
        console.log('db 연결성공')
    })
    .catch(console.error);

//front에서 받아온 data를 해석해서 req.body로 받아옴
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
app.use('/user',userRouter)

app.listen(3065,()=>{
    console.log('서버실행중')
})