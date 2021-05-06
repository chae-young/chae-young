module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('User',{//mysqul => users
        email:{
            type:DataTypes.STRING(30),     
            allowNull:false,//필수  
            unique:true//고유한값,     
        },
        nickname:{
            type:DataTypes.STRING(30),     
            allowNull:false,//필수  
        },
        password:{
            type:DataTypes.STRING(100),     
            allowNull:false,//필수  
        },
    },{
        //model setting
        charset:'utf8',
        collate:'utf8_general_ci'//한글 저장
    })
    User.associate=(db)=>{
        db.User.hasMany(db.Post);//user1명이 post를 여러개 
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post,{through:'Like',as:'Liked'});//사용자 좋아요,위에랑 헷갈리기때문에 이름지정
        db.User.belongsToMany(db.User,{through:'Follow',as:'Followers',foreignKey:'FollowingId'});//같은테이블이라서 key이름지정
        db.User.belongsToMany(db.User,{through:'Follow',as:'Followings',foreignKey:'FollowerId'});//
    };
    return User;
}