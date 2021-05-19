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
const cors = require('cors');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();
const passport = require('passport');    
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

db.sequelize.sync()
    .then(()=>{
        console.log('db 연결성공')
    })
    .catch(console.error);

app.use(cors({
    //origin:'*',
    origin:'http://localhost:3000',//쿠키전달시 정확한 주소전달 or true
    credentials:true,//쿠키전달()
}));

dotenv.config();
passportConfig();
app.use(morgan('dev'));
//front에서 받아온 data를 해석해서 req.body로 받아옴
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('hello')
})
app.get('/',(req,res)=>{
    res.send('hello api')
})


app.use('/post',postRouter)
app.use('/posts',postsRouter)
app.use('/user',userRouter)

app.listen(3065,()=>{
    console.log('서버실행중')
})