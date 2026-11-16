'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImpactUpdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImpactUpdate.belongsTo(models.Charity, { foreignKey: 'charity_id', as: 'charity' });
      ImpactUpdate.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    }
  }
  ImpactUpdate.init({
    charity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    funds_utilized: DataTypes.DECIMAL(12, 2)
  }, {
    sequelize,
    modelName: 'ImpactUpdate',
  });
  return ImpactUpdate;
};