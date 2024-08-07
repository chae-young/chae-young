const express = require('express');

const { Post, User ,Image , Comment} = require('../models');
const router = express.Router();

router.get('/', async (req,res,next)=>{ // /posts
    try{
        const posts = await Post.findAll({
            limit:10,
            order:[
                ['createdAt','DESC'],
                [Comment,'createdAt','DESC']
            ],
            include:[{
                model:User,
                attributes:['id','nickname']
            },{
                model:Image,
            },{
                model:Comment,
                include:[{
                    model:User,
                    attributes:['id','nickname']
                }]
            },{
                model:User,//좋아요작성자
                as:'Likers',
                attributes:['id'] 
            }]
        })
        res.status(200).json(posts);
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;