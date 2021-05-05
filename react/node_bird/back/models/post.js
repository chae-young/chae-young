module.exports = (sequelize,DataTypes)=>{
    const Post = sequelize.define('Post',{//mysqul => post
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
    },{
        //model setting
        charset:'utf-8mb4',
        collate:'utf-8mb4_general_ci'//이모티콘까지
    })
    Post.associate=(db)=>{};
    return Post;
}