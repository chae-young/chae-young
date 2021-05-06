module.exports = (sequelize,DataTypes)=>{
    const Hashtag = sequelize.define('Hashtag',{//mysqul => Hashtag
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,            
        },
    },{
        //model setting
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'//이모티콘까지
    })
    Hashtag.associate=(db)=>{
        db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'})//다대다관계
    };
    return Hashtag;
}