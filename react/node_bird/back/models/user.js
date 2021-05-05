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
        charset:'utf-8',
        collate:'utf-8_general_ci'//한글 저장
    })
    User.associate=(db)=>{};
    return User;
}