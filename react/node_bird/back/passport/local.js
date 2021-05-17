const passport = require('passport');
const {Strategy:LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const {User} = require('../models');

module.exports=()=>{
    passport.use(new LocalStrategy({
        //req.body.email ~ 
        usernameField:'email',
        passwordField:'password'
    },async (email,password,done)=>{
        try{
            const user = await User.findOne({
                where:{email}//email:email
            })
            if(!user){
                //1.서버에러 2.성공 3.클라이언트에러
                return done(null,false,{reason:'존재하지않는 이메일입니다'})
            }
            //이메일검사완료후 패스워드비교
            const result = await bcrypt.compare(password,user.password)//db 비번과 비교
            if(result){
                return done(null,user)
            }
            return done(null,false,{reason:'비밀번호가 틀렸습니다'})
        }catch(error){
            console.error(error);
            return done(error);
        }

    }));
}