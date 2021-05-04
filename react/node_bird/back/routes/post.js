const express = require('express');

const router = express.Router();

router.post('/',(req,res)=>{// /post
    res.json([//데이터
        {id:'2',content:'text'},
    ])
})
router.delete('/',(req,res)=>{
    res.json([//데이터
        {id:'2',content:'text'},
    ])
})

module.exports = router;