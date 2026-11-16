'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Charity.belongsTo(models.User,{foreignKey: 'user_id', as:'owner'});
      Charity.hasMany(models.Project, { foreignKey: 'charity_id', as: 'projects' });
      Charity.hasMany(models.Donation, { foreignKey: 'charity_id', as: 'donations' });
      Charity.hasMany(models.ImpactUpdate, { foreignKey: 'charity_id', as: 'updates' });
    }
  }
  Charity.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    registration_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    vision: DataTypes.TEXT,
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    verification_status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    rejection_reason: DataTypes.TEXT,
    verified_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Charity',
  });
  return Charity;
};