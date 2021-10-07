const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post,Image,Comment, User } = require('../models');
const {isLoggedIn,isNotLoggedIn} = require('./middlewares')
const router = express.Router();

try{
    fs.accessSync('uploads')//폴더있는지 검사
}catch{
    console.log('uploads파일이 없으니 생성합니다')
    fs.mkdirSync('uploads');
}

router.post('/', isLoggedIn ,upload.none(),async (req,res,next)=>{// /post
    try{
        const post = await Post.create({
            content:req.body.content,
            UserId:req.user.id,
        })
        
        const fullPost = await Post.findOne({
            where:{id:post.id},
            include:[{
                model:Image,
            },{
                model:Comment,
                include:[{
                    model:User,//댓글작성자
                    attributes:['id','nickname']
                }]                
            },{
                model:User,//게시글작성자
                attributes:['id','nickname']
            },{
                model:User,//좋아요작성자
                as:'Likers',
                attributes:['id'] 
            }]
        })
        res.status(201).json(fullPost);//프론트로 보내기 -> result로

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
            return res.status(403).send('존재하지않는 게시물입니다')
        }
        const comment = await Comment.create({
            content:req.body.content,
            PostId:parseInt(req.params.postId,10),//id 접근
            UserId:req.user.id,
        })
        const fullComment = await Comment.findOne({
            where:{id:comment.id},
            include:[{
                model:User,
                attributes:['id','nickname']
            }]
        })
        res.status(201).json(fullComment);//프론트로 보내기 -> result로
    }catch(error){
        console.error(error);
        next(error);
    }
    // res.json([//데이터
    //     {id:'2',content:'text'},
    // ])
})

router.patch('/:postId/like',isLoggedIn,async (req,res,next)=>{
    try{
        const post = await Post.findOne({where:{id:req.params.postId}});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다')
        }
        await post.addLikers(req.user.id);
        res.json({PostId:post.id,UserId:req.user.id})
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.delete('/:postId/like', isLoggedIn ,async (req,res,next)=>{
    try{
        const post = await Post.findOne({where:{id:req.params.postId}});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다')
        }
        await post.removeLikers(req.user.id);
        res.json({PostId:post.id,UserId:req.user.id})
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.delete('/:postId',isLoggedIn,async(req,res,next)=>{
    try{
        await Post.destroy({
            where:{
                id:req.params.postId,
                UserId:req.user.id
            }
        })
        res.status(200).json({PostId:parseInt(req.params.postId,10)})
    }catch(error){
        console.error(error);
        next(error);
    }
})

//image
const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads');
        },
        filename(req,file,done){//이채영.png
            const ext = path.extname(file.originalname)// 확장자 추출 .png
            const basename = path.basename(file.originalname,ext)//이채영

            done(null,basename + '_' + new Date().getTime() + ext)
        }
    })
})
router.post('/images',isLoggedIn,upload.array('image'), (req,res,next)=>{
    //업로드후 실행
    console.log(req.files)
    res.json(req.files.map(v=>v.filename))
})
module.exports = router;