module.exports = (sequelize,DataTypes)=>{
    const Post = sequelize.define('Post',{//mysqul => post
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
    },{
        //model setting
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'//이모티콘까지
    })
    Post.associate=(db)=>{
        db.Post.belongsTo(db.User);//post가 user에 속해있다 1대다 관계
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'})//다대다관계
        db.Post.hasMany(db.Comment);//1 post에 댓글여러개 1대다 관계
        db.Post.hasMany(db.Image); 
        db.Post.belongsTo(db.Post,{as:'Retweet'})     
        db.Post.belongsToMany(db.User,{through:'Like',as:'Likers'});//사용자 좋아요,좋아요 누른 사람들
    };
    return Post;
}