'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: DataTypes.STRING,
    img: DataTypes.STRING,
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
