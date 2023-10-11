module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Email:{
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password:{
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    }, {
      createdAt:'TimeStamp',
      updatedAt:false,
    });
    return Users;
  };
  