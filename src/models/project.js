'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Charity, { foreignKey: 'charity_id', as: 'charity' });
      Project.hasMany(models.Donation, { foreignKey: 'project_id', as: 'donations' });
      Project.hasMany(models.ImpactUpdate, { foreignKey: 'project_id', as: 'updates' });
    }
  }
  Project.init({
    charity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    target_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    raised_amount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00
    },
    status: {
      type: DataTypes.ENUM('active', 'completed'),
      defaultValue: 'active'
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};