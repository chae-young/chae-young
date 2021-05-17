const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {User, Post} = require('../models');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');

//미들웨어 확장
//done이 매개변수로 전달
router.post('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason)
        }
        return req.login(user,async(loginErr)=>{
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where:{id:user.id},
                //비번만 제외
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Post,
                },{
                    model:User,
                    as:'Followers'
                },
                {
                    model:User,
                    as:'Followings'
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);  
        })
    })(req,res,next)
})// post /user/login

router.post('/',isNotLoggedIn,async (req,res,next)=>{// POST /user/
    try{
        const exUser = await User.findOne({
            where:{
                email:req.body.email,
            }
        })
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다'); //응답은 한번만
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);  
        await User.create({//table에 넣기
            email:req.body.email,
            nickname:req.body.nickname,
            password:hashedPassword,
        })
        res.status(200).send('ok');//await 끝나고 실행
    }catch(error){
        console.log(error);
        next(error);
    }
})

router.post('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('ok');
})

module.exports = router;
