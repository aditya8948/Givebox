'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      charity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Charities',
         key: 'id'
       },
        onDelete: 'CASCADE',
           onUpdate: 'CASCADE'
        },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      target_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      raised_amount: {
        type: Sequelize.DECIMAL(12,2),
        defaultValue: 0.00
      },
      status: {
        type: Sequelize.ENUM('active', 'completed'),
        defaultValue: 'active',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};