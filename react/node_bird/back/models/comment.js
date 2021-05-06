module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define('Comment',{//mysqul => Comment
        content:{
            type:DataTypes.TEXT,
            allowNull:false,            
        },
    },{
        //model setting
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'//이모티콘까지
    })
    Comment.associate=(db)=>{
        db.Comment.belongsTo(db.User);//어떤댓글은 작성자가 속해있다 
        db.Comment.belongsTo(db.Post);//어떤댓글은 작성자가 속해있다 
    };
    return Comment;
}