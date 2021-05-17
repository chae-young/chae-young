const express = require('express');
const { Post } = require('../models');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares')
const router = express.Router();

router.post('/', isLoggedIn ,async (req,res,next)=>{// /post
    try{
        const post = await Post.create({
            content:req.body.content,
            UserId:req.user.id,
        })
        res.status(201).json(post);//프론트로 보내기 -> result로
    }catch(error){
        console.error(error);
        next(error);
    }
    // res.json([//데이터
    //     {id:'2',content:'text'},
    // ])
})

router.post('/:postId/comment',  isLoggedIn ,async (req,res,next)=>{// /post/1/comment
    try{
        const post = await Post.findOne({
            where:{id:req.params.postId},
        })
        if(!post){
            return rea.status(403).send('존재하지않는 게시물입니다')
        }
        const comment = await Post.create({
            content:req.body.content,
            PostId:req.params.postId,//id 접근
            UserId:req.user.id,
        })
        res.status(201).json(comment);//프론트로 보내기 -> result로
    }catch(error){
        console.error(error);
        next(error);
    }
    // res.json([//데이터
    //     {id:'2',content:'text'},
    // ])
})

router.delete('/',(req,res)=>{
    res.json([//데이터
        {id:'2',content:'text'},
    ])
})

module.exports = router;