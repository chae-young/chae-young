//로그인 유무 미들웨어
exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){//passport에서 제공
        next()
    }else{
        res.status(401).send('로그인이 필요합니다.')
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){//passport에서 제공
        next()
    }else{
        res.status(401).send('로그인하지 않은 사용자만 접근가능합니다.')
    }
}