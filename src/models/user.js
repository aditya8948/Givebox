'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Charity, {foreignKey: 'user_id', as: 'charity'});

      User.hasMany(models.Donation, {foreignKey: 'user_id', as: 'donations'});
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {isEmail: true}
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('donor', 'charity', 'admin'),
      defaultValue: 'donor'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};