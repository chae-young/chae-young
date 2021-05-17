const passport = require('passport');
const { User } = require('../models');
const local = require('./local');


module.exports=()=>{
    //req.login 실행후
    passport.serializeUser((user,done)=>{
        done(null,user.id);//쿠키에 id 저장
    })

    //로그인후 라우터접근전에 실행
    passport.deserializeUser(async (id,done)=>{//그 id 로 db에서 정보 불러오기
        try{
            const user = await User.findOne({where:{id}})
            done(null,user);//req.user
        }catch(error){
            console.error(error);
            done(error);
        }
    })
    
    local()
}