module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define('Comment',{//mysqul => Comment
        content:{
            type:DataTypes.TEXT,
            allowNull:false,            
        },
    },{
        //model setting
        charset:'utf-8mb4',
        collate:'utf-8mb4_general_ci'//이모티콘까지
    })
    Comment.associate=(db)=>{};
    return Comment;
}