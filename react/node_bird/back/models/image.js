module.exports = (sequelize,DataTypes)=>{
    const Image = sequelize.define('Image',{//mysqul => Image
        src:{
            type:DataTypes.STRING(200),
            allowNull:false,              
        },
    },{
        //model setting
        charset:'utf8',
        collate:'utf8_general_ci'//이모티콘까지
    })
    Image.associate=(db)=>{
        db.Image.belongsTo(db.Post);        
    };
    return Image;
}