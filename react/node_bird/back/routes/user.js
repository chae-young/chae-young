const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {User, Post} = require('../models');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('./middlewares');

router.get('/',async (req,res,next)=>{
    try{
        if(req.user){
            const fullUserWithoutPassword = await User.findOne({
                where:{id:req.user.id},
                //비번만 제외
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Post,
                    attributes:['id'],
                },{
                    model:User,
                    as:'Followers',
                    attributes:['id'],
                },
                {
                    model:User,
                    as:'Followings',
                    attributes:['id'],
                }]
            })            
            res.status(200).json(fullUserWithoutPassword);
        }else{
            res.status(200).json(null);
        }
    }catch(error){
        console.error(error);
        next(error);
    }
})

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
                    attributes:['id'],                    
                },{
                    model:User,
                    as:'Followers',
                    attributes:['id'],                    
                },
                {
                    model:User,
                    as:'Followings',
                    attributes:['id'],                    
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

router.patch('/nickname',isLoggedIn,async (req,res,next)=>{

    try{
        await User.update({//내 아이디의 닉네임을 프론트에서 받은 닉네임으로 수정
            nickname:req.body.nickname,
        },{//조건
            where:{id:req.user.id}
        })
    res.status(200).json({nickname:req.body.nickname})
    }catch(error){
        console.error(error);
        next(error)
    }
})

router.patch('/:userId/follow',isLoggedIn,async (req,res,next)=>{//user/1/follow

    try{
        const user = await User.findOne({where:{id:req.params.userId}})
        if(!user){
            return res.status(403).send('없는 사람입니다')
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({UserId:parseInt(req.params.userId)})
    }catch(error){
        console.error(error);
        next(error)
    }
})

router.delete('/:userId/follow',isLoggedIn,async (req,res,next)=>{//user/1/unfollow

    try{
        const user = await User.findOne({where:{id:req.params.userId}})
        if(!user){
            return res.status(403).send('없는 사람입니다')
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({UserId:parseInt(req.params.userId)})
    }catch(error){
        console.error(error);
        next(error)
    }
})


router.delete('/follower/:userId',isLoggedIn,async (req,res,next)=>{//user/follower/2

    try{
        const user = await User.findOne({where:{id:req.params.userId}})
        if(!user){
            return res.status(403).send('없는 사람입니다')
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({UserId:parseInt(req.params.userId)})
    }catch(error){
        console.error(error);
        next(error)
    }
})

router.get('/followers',isLoggedIn,async (req,res,next)=>{//user/followers

    try{
        const user = await User.findOne({where:{id:req.user.id}}) //나를 찾고
        if(!user){
            return res.status(403).send('없는 사람입니다')
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers)
    }catch(error){
        console.error(error);
        next(error)
    }
})

router.get('/followings',isLoggedIn,async (req,res,next)=>{//user/followings

    try{
        const user = await User.findOne({where:{id:req.user.id}})
        if(!user){
            return res.status(403).send('없는 사람입니다')
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings)
    }catch(error){
        console.error(error);
        next(error)
    }
})
module.exports = router;
