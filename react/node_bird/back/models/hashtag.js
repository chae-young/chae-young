module.exports = (sequelize,DataTypes)=>{
    const Hashtag = sequelize.define('Hashtag',{//mysqul => Hashtag
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,            
        },
    },{
        //model setting
        charset:'utf-8mb4',
        collate:'utf-8mb4_general_ci'//이모티콘까지
    })
    Hashtag.associate=(db)=>{};
    return Hashtag;
}