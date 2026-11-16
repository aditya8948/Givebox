'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Donation.belongsTo(models.User, { foreignKey: 'user_id', as: 'donor' });
  Donation.belongsTo(models.Charity, { foreignKey: 'charity_id', as: 'charity' });
  Donation.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    }
  }
  Donation.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    donor_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    donor_email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'success', 'failed'),
      defaultValue: 'pending'
    },
    order_id: DataTypes.STRING,
    payment_id: DataTypes.STRING,
    receipt_number: {
      type: DataTypes.STRING(50),
      unique: true
    },
    receipt_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};